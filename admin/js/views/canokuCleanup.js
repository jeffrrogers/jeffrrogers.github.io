// Canoku cleanup tab: find stale Canoku accounts (dry run), then delete them
// with a backup. Everything runs in the canokuCleanup Cloud Function
// (firebase/functions/src/canokuCleanup.js), which holds the rule, because
// only the server can see Canoku's old per-day boards (subcollections).
//
// Only Canoku data goes (canokuUserData/{id} and everything under it). Each
// account is judged again just before it's deleted, and kept if it no longer
// qualifies or anything in it changed since the scan. The function writes
// every deleted doc to a gzipped backup file in the legacy-export bucket
// first, so there's no download step here.

import { h, clear, toast } from '../ui.js?v=202611190813';
import { callCanokuCleanup } from '../firebase.js?v=202611190813';

const MAX_GAMES = 10;
const threshold = (n) => 10 + (Math.max(n, 1) - 1) * 5;

// Doc-id ranges scanned side by side; ids are compared byte by byte, so these
// cover everything ('' to the first, and the last to the end).
const BOUNDS = ['0', '1', '2', '4', '6', '8', 'A', 'C', 'E', 'G', 'I', 'K', 'M', 'O', 'Q', 'S', 'U', 'W', 'Y', 'a', 'n'];
const RANGES = [[null, BOUNDS[0]], ...BOUNDS.map((b, i) => [b, BOUNDS[i + 1] ?? null])];
const SCAN_WORKERS = 6;
const SCAN_PAGE = 100;
// A scan stops once a batch has checked this many accounts, so they can be
// deleted before the next batch; the next scan carries on from there.
const BATCH = 20000;
// At most canokuCleanup.js's DELETE_MAX a call.
const DELETE_CHUNK = 400;
const DELETE_WORKERS = 4;

// Where each range has got to: [{from, to, after, done}]. A range moves on
// only after a page succeeds, so a failed or stopped scan loses nothing.
// Kept in this browser too, so a reload carries on (a convenience: "Start
// over" or a lost copy just means scanning from the beginning again).
const CURSORS_KEY = 'admin.canokuCleanup.cursors';
const freshCursors = () => RANGES.map(([from, to]) => ({ from, to, after: null, done: false }));
function loadCursors() {
  try {
    const c = JSON.parse(localStorage.getItem(CURSORS_KEY) || 'null');
    return Array.isArray(c) && c.length === RANGES.length ? c : null;
  } catch {
    return null;
  }
}
function saveCursors() {
  try {
    localStorage.setItem(CURSORS_KEY, JSON.stringify(state.cursors.map(({ from, to, after, done }) => ({ from, to, after, done }))));
  } catch {
    // fine: kept for this page only
  }
}

const state = {
  phase: 'idle', // idle | scanning | scanned | deleting | done
  total: 0,
  cursors: loadCursors() || freshCursors(),
  scannedBefore: 0, // in earlier batches (this page's batches only)
  scanned: 0, // this batch
  byReason: {},
  byRule: {},
  byGames: {},
  candidates: [], // {id, activityMs, total, idleDays, rule}
  deleted: 0,
  skipped: [],
  backups: [],
  stop: false,
  error: '',
};

const started = () => state.cursors.some((c) => c.after || c.done);
const finished = () => state.cursors.every((c) => c.done);

export function renderCanokuCleanup(root, rerender) {
  const rules = h('div', { class: 'card' },
    h('h3', {}, 'The rule'),
    h('p', {}, 'A Canoku account is deleted once nothing in it has been updated for ', h('b', {}, '9 months'), ', however many games it has.'),
    h('p', {}, `Before that, the Canuckle rule: an account with N Canoku games, N ≤ ${MAX_GAMES}, can be deleted once it hasn't been updated for 10 + (N − 1) × 5 days. No games counts as one. A game is a puzzle solved or started (old 2.1.0 boards included, if they have a move).`),
    h('table', { class: 'mini' },
      h('tr', {}, h('th', {}, 'Games'), ...[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => h('td', {}, n))),
      h('tr', {}, h('th', {}, 'Days idle'), ...[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => h('td', {}, threshold(n))))),
    h('p', {}, 'Always kept: a linked email in any of the ID\'s player docs, a gamer ID (friends & challenges), and the QA seed accounts. "Updated" means the newest write anywhere in the account: the player doc, its saved games, and its old day boards.'),
    h('p', {}, 'Deleting removes canokuUserData/{id} and everything under it. Other games\' docs for the ID stay. Each account is checked again just before it goes, and kept if it changed since the scan. The function writes a backup of every deleted doc to gs://canuckle-c2157-legacy-export/canoku-cleanup/ first.'));

  const busy = state.phase === 'scanning' || state.phase === 'deleting';
  const n = BATCH.toLocaleString('en-CA');
  const scanBtn = h('button', { class: 'btn primary', disabled: busy || finished(), onclick: () => scan(rerender) },
    finished() ? 'Every account scanned' : started() ? `Scan the next ${n} (dry run)` : `Scan the first ${n} (dry run)`);
  const restartBtn = !busy && started()
    ? h('button', { class: 'btn', onclick: () => { state.cursors = freshCursors(); saveCursors(); state.scannedBefore = 0; rerender(); } }, 'Start over')
    : null;
  const stopBtn = busy ? h('button', { class: 'btn', onclick: () => { state.stop = true; } }, 'Stop') : null;
  const list = (o, label) => h('ul', {}, Object.entries(o).sort((a, b) => b[1] - a[1]).map(([k, c]) => h('li', {}, `${label(k)}: ${c}`)));

  const status = h('div', { class: 'card' },
    h('h3', {}, 'Scan'),
    h('p', {}, `Scans ${n} accounts at a time, then stops so you can delete what it found. The next scan carries on from there, in this browser even after a reload; Start over goes back to the beginning.`),
    h('div', { class: 'actions left' }, scanBtn, stopBtn, restartBtn),
    state.error ? h('p', { class: 'err' }, state.error) : null,
    state.phase !== 'idle' ? h('p', {},
      `This batch: checked ${state.scanned.toLocaleString('en-CA')} accounts. `,
      h('b', {}, `${state.candidates.length.toLocaleString('en-CA')} can be deleted.`),
      state.phase === 'scanning' ? ' Still scanning…' : '',
      state.total ? ` About ${(state.scannedBefore + state.scanned).toLocaleString('en-CA')} of ${state.total.toLocaleString('en-CA')} checked on this page so far.` : '') : null,
    state.phase === 'scanning' ? h('progress', { max: BATCH, value: state.scanned }) : null,
    Object.keys(state.byReason).length ? h('div', { class: 'two-col' },
      h('div', {}, h('h4', {}, 'Kept or deleted, by reason'), list(state.byReason, (r) => REASONS[r] || r)),
      h('div', {}, h('h4', {}, 'To delete, by rule'), list(state.byRule, (r) => RULES[r] || r),
        h('h4', {}, 'To delete under the games rule, by games'), list(state.byGames, (g) => `${g} game${g === '1' ? '' : 's'}`))) : null,
    state.candidates.length ? h('details', {},
      h('summary', {}, `First ${Math.min(50, state.candidates.length)} accounts to delete`),
      h('table', { class: 'grid compact' },
        h('thead', {}, h('tr', {}, h('th', {}, 'ID'), h('th', {}, 'Rule'), h('th', {}, 'Games'), h('th', {}, 'Idle days'))),
        h('tbody', {}, state.candidates.slice(0, 50).map((c) => h('tr', {},
          h('td', { class: 'mono' }, c.id), h('td', {}, RULES[c.rule] || c.rule),
          h('td', { class: 'num' }, c.total ?? '–'), h('td', { class: 'num' }, c.idleDays)))))) : null);

  const canDelete = state.phase === 'scanned' && state.candidates.length > 0;
  const phrase = `DELETE ${state.candidates.length}`;
  const confirmInput = h('input', { placeholder: phrase, disabled: !canDelete, autocomplete: 'off' });
  const deleteBtn = h('button', { class: 'btn danger', disabled: true }, `Delete ${state.candidates.length} Canoku accounts`);
  confirmInput.addEventListener('input', () => { deleteBtn.disabled = confirmInput.value.trim() !== phrase; });
  deleteBtn.addEventListener('click', () => remove(rerender));

  const skippedBy = {};
  for (const s of state.skipped) skippedBy[s.reason] = (skippedBy[s.reason] || 0) + 1;
  const del = h('div', { class: 'card' },
    h('h3', {}, 'Delete'),
    h('p', {}, 'Type the phrase, then delete. The backup is written by the function, before each group of accounts is deleted.'),
    h('div', { class: 'actions left' }, confirmInput, deleteBtn),
    state.phase === 'deleting' || state.phase === 'done' ? h('p', {},
      `Deleted ${state.deleted} of ${state.candidates.length}; kept ${state.skipped.length} that no longer qualified.`,
      state.phase === 'deleting' ? ' Working…' : '') : null,
    state.phase === 'deleting' ? h('progress', { max: state.candidates.length, value: state.deleted + state.skipped.length }) : null,
    state.skipped.length ? list(skippedBy, (r) => `Kept: ${REASONS[r] || r}`) : null,
    state.backups.length ? h('details', {}, h('summary', {}, `${state.backups.length} backup files`),
      h('ul', {}, state.backups.map((b) => h('li', { class: 'mono small' }, b)))) : null);

  clear(root, rules, status, del);
}

// Cloud Run turns calls away while instances start ("waiting too long for an
// available instance"), which reaches here as internal / unavailable. Both
// ops are safe to repeat: a scan only reads, and a delete judges each account
// again (one already deleted comes back as "gone").
const RETRY_REASONS = ['internal', 'unavailable', 'deadline-exceeded', 'resource-exhausted',
  'functions/internal', 'functions/unavailable', 'functions/deadline-exceeded', 'functions/resource-exhausted'];
const RETRY_WAITS_MS = [2000, 5000, 15000, 30000, 60000, 60000];

async function call(op, data) {
  for (let attempt = 0; ; attempt++) {
    try {
      return await callCanokuCleanup(op, data);
    } catch (e) {
      if (attempt >= RETRY_WAITS_MS.length || !RETRY_REASONS.includes(e.reason) || state.stop) throw e;
      await new Promise((r) => setTimeout(r, RETRY_WAITS_MS[attempt]));
    }
  }
}

/** Runs [n] workers over [work] (a function that returns false when done); the first failure stops them all. */
async function workers(n, work) {
  let failure = null;
  await Promise.all(Array.from({ length: n }, async () => {
    try {
      while (!state.stop && !failure && (await work()) !== false) { /* next */ }
    } catch (e) {
      failure = failure ?? e;
      state.stop = true;
    }
  }));
  if (failure) throw failure;
}

const REASONS = {
  stale: 'Can be deleted',
  gone: 'Gone already',
  seed: 'Kept: QA seed account',
  recent: 'Not idle long enough yet',
  email: 'Kept: linked email',
  'gamer ID': 'Kept: has a gamer ID',
  'more than 10 games': 'Kept: more than 10 games (until 9 months)',
  'not counted': 'Kept: games couldn\'t be counted',
  'no activity date': 'Kept: no update time',
  'changed since scan': 'changed since the scan',
  'unknown subcollection': 'has data the cleanup doesn\'t know',
};
const RULES = { '9 months': 'Idle 9+ months', games: 'Games rule (≤ 10 games)' };

function tally(rows) {
  for (const r of rows) {
    state.byReason[r.reason] = (state.byReason[r.reason] || 0) + 1;
    if (r.eligible) {
      state.byRule[r.rule] = (state.byRule[r.rule] || 0) + 1;
      if (r.rule === 'games') state.byGames[r.total] = (state.byGames[r.total] || 0) + 1;
      state.candidates.push({ id: r.id, activityMs: r.activityMs, total: r.total, idleDays: r.idleDays, rule: r.rule });
    }
  }
  state.scanned += rows.length;
}

/**
 * One batch: up to BATCH accounts, carrying on from each range's cursor.
 * Whatever it found can be deleted even if it stopped early (stopped, or a
 * call failed after its retries): the delete judges every account again on
 * the server, and the cursors only moved past pages that were read.
 */
async function scan(rerender) {
  state.scannedBefore += state.scanned;
  Object.assign(state, {
    phase: 'scanning', scanned: 0, byReason: {}, byRule: {}, byGames: {},
    candidates: [], deleted: 0, skipped: [], backups: [], stop: false, error: '',
  });
  rerender();
  try {
    if (!state.total) state.total = (await call('count')).total;
    rerender();
    await workers(SCAN_WORKERS, async () => {
      if (state.scanned >= BATCH) return false;
      const c = state.cursors.find((x) => !x.done && !x.busy);
      if (!c) return false;
      c.busy = true;
      try {
        while (!state.stop && state.scanned < BATCH) {
          const page = await call('scan', { from: c.from, to: c.to, after: c.after, limit: SCAN_PAGE });
          tally(page.rows);
          if (page.last) c.after = page.last;
          if (page.done) c.done = true;
          saveCursors();
          rerender();
          if (c.done) break;
        }
      } finally {
        c.busy = false;
      }
      return true;
    });
    if (state.stop) state.error = 'Scan stopped. What it found can still be deleted; the next scan carries on from here.';
  } catch (e) {
    state.error = `A scan call failed after several retries: ${e.message} (${e.reason}). `
      + 'What this batch found can still be deleted, and the next scan carries on from where it stopped.';
  }
  state.candidates.sort((a, b) => (a.id < b.id ? -1 : 1));
  state.phase = 'scanned';
  rerender();
}

async function remove(rerender) {
  state.phase = 'deleting';
  state.stop = false;
  rerender();
  const chunks = [];
  for (let i = 0; i < state.candidates.length; i += DELETE_CHUNK) {
    chunks.push(state.candidates.slice(i, i + DELETE_CHUNK).map((c) => ({ id: c.id, activityMs: c.activityMs })));
  }
  try {
    await workers(DELETE_WORKERS, async () => {
      if (!chunks.length) return false;
      const r = await call('delete', { accounts: chunks.shift() });
      state.deleted += r.deleted.length;
      state.skipped.push(...r.skipped);
      if (r.backup) state.backups.push(r.backup);
      rerender();
      return true;
    });
    toast(state.stop ? `Stopped after deleting ${state.deleted} accounts.` : `Deleted ${state.deleted} Canoku accounts.`);
  } catch (e) {
    toast(`Delete stopped: ${e.message}`, { error: true });
  }
  state.phase = 'done';
  rerender();
}
