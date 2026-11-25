// Archive tab: find Canuckle accounts idle 9+ months (dry run), then move them
// to archivedUserData. The rule is in ../archive.js.

import { h, clear, toast, downloadJson } from '../ui.js?v=202611251019';
import { ARCHIVE_IDLE_DAYS, ARCHIVE_COLLECTION, RESTORE_IN_PRODUCTION, summarizeArchive } from '../archive.js?v=202611251019';
import { clockProblem } from '../cleanup.js?v=202611251019';
import { findArchivable, findSeedArchivable, archiveAccounts, serverNow } from '../store.js?v=202611251019';
import { USE_EMULATOR } from '../config.js?v=202611251019';

const state = {
  phase: 'idle', // idle | scanning | scanned | archiving | done
  mode: 'real', // real | seed (the test run on QA seed accounts)
  scanned: 0,
  verdicts: [],
  candidates: [], // {id, idleDays, lastUpdated, user}
  archived: 0,
  skipped: {}, // id -> why
  stop: false,
  error: '',
  startedAt: 0,
};

const REASONS = {
  archive: 'Can be archived',
  recent: 'Not idle long enough',
  seed: 'Kept: QA seed account',
  'not packed': 'Kept: not in the packed format yet',
  'open challenge': 'Kept: in an open challenge',
  'no lastUpdated': 'Kept: no lastUpdated',
  'social unread': 'Kept: social doc not read',
  'not seed': 'Kept: not a QA seed account',
  'no account': 'No Canuckle doc',
};

const SKIPS = {
  gone: 'gone since the scan',
  changed: 'played since the scan',
  'already archived': 'already had an archive doc',
};

export function renderArchive(root, rerender) {
  const rules = h('div', { class: 'card' },
    h('h3', {}, 'The rule'),
    h('p', {}, `A Canuckle account that hasn't been updated for ${ARCHIVE_IDLE_DAYS} days (9 months) and is in the packed format moves from newUserData to ${ARCHIVE_COLLECTION}, unchanged except for an archivedAt time. Kept: QA seed accounts, accounts in an open challenge, and anything without a lastUpdated.`),
    h('p', {}, 'Nothing is deleted. When the player comes back, Canuckle or the Arena moves the account back by itself (the restoreAccount function), merging in anything played meanwhile. Only the Canuckle doc moves; the other games\' docs stay where they are.'),
    h('p', {}, 'Each account is read again just before it moves, and skipped if the player came back since the scan.'),
    RESTORE_IN_PRODUCTION ? null : h('p', { class: 'err' },
      'Locked: production Canuckle and the Arena can\'t restore an account yet, and Firestore is shared, so real accounts can only be scanned. "Test with QA seed accounts" archives the seed accounts (idle or not) to try the real path. Unlock by setting RESTORE_IN_PRODUCTION in admin/js/archive.js once the restore path is in production.'));

  const busy = state.phase === 'scanning' || state.phase === 'archiving';
  const s = summarizeArchive(state.verdicts);
  const seed = state.mode === 'seed';

  const scanBtn = h('button', { class: 'btn primary', disabled: busy, onclick: () => scan(rerender, 'real') },
    state.phase === 'idle' || seed ? 'Scan (dry run)' : 'Scan again');
  const seedBtn = h('button', { class: 'btn', disabled: busy, onclick: () => scan(rerender, 'seed') }, 'Test with QA seed accounts');
  const stopBtn = busy ? h('button', { class: 'btn', onclick: () => { state.stop = true; } }, 'Stop') : null;

  const status = h('div', { class: 'card' },
    h('h3', {}, 'Scan'),
    h('div', { class: 'actions left' }, scanBtn, seedBtn, stopBtn),
    state.error ? h('p', { class: 'err' }, state.error) : null,
    state.phase !== 'idle' ? h('p', {},
      seed ? `Test run: found ${state.scanned} QA seed accounts with a Canuckle doc. ` : `Checked ${state.scanned} accounts idle ${ARCHIVE_IDLE_DAYS}+ days. `,
      h('b', {}, `${state.candidates.length} can be archived.`),
      state.phase === 'scanning' ? ' Still scanning…' : '') : null,
    Object.keys(s.byReason).length ? h('div', { class: 'two-col' },
      h('div', {}, h('h4', {}, 'By reason'), h('ul', {},
        Object.entries(s.byReason).map(([r, n]) => h('li', {}, `${REASONS[r] || r}: ${n}`)))),
      h('div', {}, h('h4', {}, 'To archive, by months idle'), h('ul', {},
        Object.entries(s.byMonths).map(([m, n]) => h('li', {}, `${m} months: ${n}`))))) : null,
    state.candidates.length ? h('details', {},
      h('summary', {}, `First ${Math.min(50, state.candidates.length)} accounts to archive`),
      h('table', { class: 'grid compact' },
        h('thead', {}, h('tr', {}, h('th', {}, 'ID'), h('th', {}, 'Games'), h('th', {}, 'Idle days'))),
        h('tbody', {}, state.candidates.slice(0, 50).map((c) =>
          h('tr', {}, h('td', { class: 'mono' }, c.id), h('td', { class: 'num' }, c.user.gamesCount ?? ''), h('td', { class: 'num' }, c.idleDays)))))) : null);

  const canArchive = state.phase === 'scanned' && state.candidates.length > 0 && (seed || RESTORE_IN_PRODUCTION);
  const phrase = `ARCHIVE ${state.candidates.length}`;
  const confirmInput = h('input', { placeholder: phrase, disabled: !canArchive, autocomplete: 'off' });
  const goBtn = h('button', { class: 'btn danger', disabled: true }, `Archive ${state.candidates.length} accounts`);
  confirmInput.addEventListener('input', () => { goBtn.disabled = confirmInput.value.trim() !== phrase; });
  goBtn.addEventListener('click', () => archive(rerender));

  const skipped = Object.entries(state.skipped);
  const act = h('div', { class: 'card' },
    h('h3', {}, 'Archive'),
    h('p', {}, 'Type the phrase, then archive. The backup is optional (the archive is itself a copy, and the daily backups cover it); it holds every doc as the scan read it.'),
    h('div', { class: 'actions left' },
      h('button', { class: 'btn', disabled: !canArchive || busy, onclick: backup }, 'Download backup'),
      confirmInput, goBtn),
    state.phase === 'archiving' || state.phase === 'done'
      ? h('p', {}, `Archived ${state.archived} of ${state.candidates.length}${skipped.length ? `, skipped ${skipped.length}` : ''}.${state.phase === 'archiving' ? ' Working…' : ''}`)
      : null,
    state.phase === 'archiving' ? h('progress', { max: state.candidates.length, value: state.archived + skipped.length }) : null,
    skipped.length ? h('details', {},
      h('summary', {}, `Skipped (${skipped.length})`),
      h('ul', {}, skipped.slice(0, 200).map(([id, why]) => h('li', {}, h('span', { class: 'mono' }, id), ` ${SKIPS[why] || why}`)))) : null);

  clear(root, rules, status, act);
}

async function checkClock() {
  if (USE_EMULATOR) return null;
  return clockProblem(Date.now(), await serverNow());
}

async function scan(rerender, mode) {
  Object.assign(state, {
    phase: 'scanning', mode, scanned: 0, verdicts: [], candidates: [], archived: 0, skipped: {},
    stop: false, error: '', startedAt: Date.now(),
  });
  rerender();
  const clock = await checkClock();
  if (clock) {
    Object.assign(state, { phase: 'idle', error: clock });
    rerender();
    return;
  }
  try {
    if (mode === 'seed') {
      Object.assign(state, await findSeedArchivable(state.startedAt));
    } else await findArchivable(state.startedAt, {
      onPage: (verdicts, candidates, scanned) => {
        state.verdicts.push(...verdicts);
        state.candidates.push(...candidates);
        state.scanned += scanned;
        rerender();
      },
      shouldStop: () => state.stop,
    });
    state.phase = 'scanned';
  } catch (e) {
    state.phase = 'idle';
    state.error = `Scan failed: ${e.message}`;
  }
  rerender();
}

function backup() {
  const accounts = Object.fromEntries(state.candidates.map((c) => [c.id, c.user]));
  const stamp = new Date(state.startedAt).toISOString().slice(0, 16).replace(/[:T]/g, '-');
  downloadJson(`canuckle-archive-backup-${stamp}.json`, { scannedAt: new Date(state.startedAt).toISOString(), accounts });
}

async function archive(rerender) {
  const clock = await checkClock();
  if (clock) {
    toast(clock, { error: true });
    return;
  }
  state.phase = 'archiving';
  state.stop = false;
  rerender();
  try {
    await archiveAccounts(state.candidates, {
      shouldStop: () => state.stop,
      onBatch: (r) => {
        state.archived += r.archived.length;
        Object.assign(state.skipped, r.skipped);
        rerender();
      },
    });
    toast(`Archived ${state.archived} accounts.`);
  } catch (e) {
    toast(`Archive stopped: ${e.message}`, { error: true });
  }
  state.phase = 'done';
  rerender();
}
