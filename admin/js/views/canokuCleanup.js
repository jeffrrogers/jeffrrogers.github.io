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

import { h, clear, toast } from '../ui.js?v=202611181714';
import { callCanokuCleanup } from '../firebase.js?v=202611181714';

const MAX_GAMES = 10;
const threshold = (n) => 10 + (Math.max(n, 1) - 1) * 5;

// Doc-id ranges scanned side by side; ids are compared byte by byte, so these
// cover everything ('' to the first, and the last to the end).
const BOUNDS = ['0', '1', '2', '4', '6', '8', 'A', 'C', 'E', 'G', 'I', 'K', 'M', 'O', 'Q', 'S', 'U', 'W', 'Y', 'a', 'n'];
const RANGES = [[null, BOUNDS[0]], ...BOUNDS.map((b, i) => [b, BOUNDS[i + 1] ?? null])];
const SCAN_WORKERS = 6;
const SCAN_PAGE = 100;
const DELETE_CHUNK = 25;
const DELETE_WORKERS = 3;

const state = {
  phase: 'idle', // idle | scanning | scanned | deleting | done
  total: 0,
  scanned: 0,
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
  const scanBtn = h('button', { class: 'btn primary', disabled: busy, onclick: () => scan(rerender) },
    state.phase === 'idle' ? 'Scan (dry run)' : 'Scan again');
  const stopBtn = busy ? h('button', { class: 'btn', onclick: () => { state.stop = true; } }, 'Stop') : null;
  const list = (o, label) => h('ul', {}, Object.entries(o).sort((a, b) => b[1] - a[1]).map(([k, n]) => h('li', {}, `${label(k)}: ${n}`)));

  const status = h('div', { class: 'card' },
    h('h3', {}, 'Scan'),
    h('div', { class: 'actions left' }, scanBtn, stopBtn),
    state.error ? h('p', { class: 'err' }, state.error) : null,
    state.phase !== 'idle' ? h('p', {},
      `Checked ${state.scanned} of ${state.total} Canoku accounts. `,
      h('b', {}, `${state.candidates.length} can be deleted.`),
      state.phase === 'scanning' ? ' Still scanning…' : '') : null,
    state.phase === 'scanning' ? h('progress', { max: state.total || 1, value: state.scanned }) : null,
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

async function scan(rerender) {
  Object.assign(state, {
    phase: 'scanning', total: 0, scanned: 0, byReason: {}, byRule: {}, byGames: {},
    candidates: [], deleted: 0, skipped: [], backups: [], stop: false, error: '',
  });
  rerender();
  try {
    state.total = (await callCanokuCleanup('count')).total;
    rerender();
    const queue = [...RANGES];
    await Promise.all(Array.from({ length: SCAN_WORKERS }, async () => {
      while (queue.length && !state.stop) {
        const [from, to] = queue.shift();
        let after = null;
        for (;;) {
          if (state.stop) return;
          const page = await callCanokuCleanup('scan', { from, to, after, limit: SCAN_PAGE });
          for (const r of page.rows) {
            state.byReason[r.reason] = (state.byReason[r.reason] || 0) + 1;
            if (r.eligible) {
              state.byRule[r.rule] = (state.byRule[r.rule] || 0) + 1;
              if (r.rule === 'games') state.byGames[r.total] = (state.byGames[r.total] || 0) + 1;
              state.candidates.push({ id: r.id, activityMs: r.activityMs, total: r.total, idleDays: r.idleDays, rule: r.rule });
            }
          }
          state.scanned += page.rows.length;
          rerender();
          if (page.done) break;
          after = page.last;
        }
      }
    }));
    state.candidates.sort((a, b) => (a.id < b.id ? -1 : 1));
    state.phase = state.stop ? 'idle' : 'scanned';
    if (state.stop) state.error = 'Scan stopped. Scan again before deleting.';
  } catch (e) {
    state.phase = 'idle';
    state.error = `Scan failed: ${e.message}`;
  }
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
    await Promise.all(Array.from({ length: DELETE_WORKERS }, async () => {
      while (chunks.length && !state.stop) {
        const r = await callCanokuCleanup('delete', { accounts: chunks.shift() });
        state.deleted += r.deleted.length;
        state.skipped.push(...r.skipped);
        if (r.backup) state.backups.push(r.backup);
        rerender();
      }
    }));
    toast(state.stop ? `Stopped after deleting ${state.deleted} accounts.` : `Deleted ${state.deleted} Canoku accounts.`);
  } catch (e) {
    toast(`Delete stopped: ${e.message}`, { error: true });
  }
  state.phase = 'done';
  rerender();
}
