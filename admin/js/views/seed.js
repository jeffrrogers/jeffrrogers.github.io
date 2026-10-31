// Seed tab (sandbox only): writes the QA test accounts (../seed/accounts.js)
// for Jeff and Mark, and deletes them again before launch. The sandbox shares
// the production Firestore project, so these are real docs; only IDs of the
// form QA-JR-L01 are ever written or deleted (store.js refuses any other).

import { h, clear, toast, modal } from '../ui.js?v=202610311155';
import { ctx } from '../context.js?v=202610311155';
import { todayEpochDay, longDate, epochDay } from '../dates.js?v=202610311155';
import { buildAccounts, allSeedIds, TESTERS } from '../seed/accounts.js?v=202610311155';
import { seedAccounts, deleteSeedAccounts, seedStatus } from '../store.js?v=202610311155';

// The Arena and games default to this offset on the sandbox (js/config.js
// DEFAULT_OFFSET_WEEKS); seeds must use the one testers' browsers use.
const DEFAULT_OFFSET = 5;
const CANOKU_START = epochDay(2023, 10, 16);

const state = {
  tester: 'all', // 'all' or a key of TESTERS
  phase: 'all', // 'all', '1' or '2'
  offset: DEFAULT_OFFSET,
  busy: '',
  done: 0,
  total: 0,
  status: null, // Map<id, collections[]>
  error: '',
};

/** The real answers, from the puzzles the admin page has loaded. */
const words = {
  canuckle: (i) => ctx.puzzles.canuckle.get(i)?.answer || null,
  plus: (i) => ctx.puzzles.plus.get(i)?.answer || null,
  duo: (i) => {
    const d = ctx.puzzles.duo.get(i);
    const list = d?.puzzles.map((c) => ctx.puzzles.canuckle.get(c)?.answer || null) || [];
    return list.length === 2 && list.every(Boolean) ? list : null;
  },
};

function plan() {
  const todayEd = todayEpochDay();
  return buildAccounts({
    todayEd,
    offsetWeeks: state.offset,
    nowMs: Date.now(),
    words,
    testers: state.tester === 'all' ? Object.keys(TESTERS) : [state.tester],
    phases: state.phase === 'all' ? [1, 2] : [Number(state.phase)],
  });
}

/** Canoku days whose 2.1.0 board subcollections L04 may hold (seeded or migrated). */
function canokuDays() {
  const today = todayEpochDay() - CANOKU_START + 1;
  return Array.from({ length: 31 }, (_, k) => today - k);
}

export function renderSeed(root, rerender) {
  const busy = !!state.busy;
  const { accounts, problems } = plan();

  const select = (value, options, onchange) => {
    const el = h('select', { disabled: busy }, options.map(([v, label]) => h('option', { value: v, selected: v === value }, label)));
    el.addEventListener('change', () => onchange(el.value));
    return el;
  };
  const offset = h('input', { type: 'number', value: state.offset, min: 0, max: 20, step: 1, disabled: busy, style: { width: '64px' } });
  offset.addEventListener('change', () => {
    const n = Number(offset.value);
    state.offset = Number.isInteger(n) ? n : DEFAULT_OFFSET;
    rerender();
  });

  const intro = h('div', { class: 'card' },
    h('h3', {}, 'QA seed accounts'),
    h('p', {}, 'Test accounts for the launch: legacy Canuckle, Canuckle+ and Canoku players (phase 1, L01–L10) and accounts one play away from a new-game or family badge (phase 2, N01–N11). Each tester gets their own copy, QA-JR-… for Jeff and QA-MR-… for Mark.'),
    h('p', { class: 'small muted' }, `Today is ${longDate(todayEpochDay())}. Phase 2 accounts are built around today's puzzles, so re-seed them each test day. Seeding replaces the whole account: anything played on it is lost. The sandbox shares Firestore with production, so delete them all before launch (Nov 1 runbook, step 1).`),
    h('div', { class: 'actions left' },
      h('label', { class: 'row small' }, 'Tester ', select(state.tester, [['all', 'Both'], ...Object.entries(TESTERS)], (v) => { state.tester = v; state.status = null; rerender(); })),
      h('label', { class: 'row small' }, 'Phase ', select(state.phase, [['all', 'Both'], ['1', '1: legacy'], ['2', '2: new games']], (v) => { state.phase = v; state.status = null; rerender(); })),
      h('label', { class: 'row small', title: 'Must match the sandboxOffsetWeeks in the testers\' browsers (default 5)' }, 'Sandbox offset (weeks) ', offset)),
    problems.length
      ? h('div', {}, h('p', { class: 'err' }, 'Can\'t seed these accounts:'), h('ul', { class: 'small' }, problems.slice(0, 12).map((p) => h('li', {}, p))))
      : null,
    h('div', { class: 'actions left' },
      h('button', { class: 'btn primary', disabled: busy || problems.length > 0 || !ctx.loaded, onclick: () => seed(accounts, rerender) },
        `Seed ${accounts.length} account${accounts.length === 1 ? '' : 's'}`),
      h('button', { class: 'btn', disabled: busy, onclick: () => checkStatus(accounts.map((a) => a.id), rerender) }, 'Check what exists'),
      h('span', { class: 'spacer' }),
      h('button', { class: 'btn danger', disabled: busy, onclick: () => removeAll(rerender) }, 'Delete all QA accounts')),
    state.busy ? h('p', {}, `${state.busy} ${state.done} of ${state.total}…`) : null,
    state.busy ? h('progress', { max: state.total, value: state.done }) : null,
    state.error ? h('p', { class: 'err' }, state.error) : null);

  const table = h('div', { class: 'table-wrap' },
    h('table', { class: 'grid compact' },
      h('thead', {}, h('tr', {}, ['ID', 'Account', 'Docs', 'Exists now'].map((t) => h('th', {}, t)))),
      h('tbody', {}, accounts.map((a) => h('tr', {},
        h('td', { class: 'mono nowrap' }, a.id),
        h('td', {}, h('b', {}, a.title), h('div', { class: 'small muted' }, a.story)),
        h('td', { class: 'num' }, a.docs.length),
        h('td', { class: 'small' }, statusText(a.id)))))));

  clear(root, intro, table);
}

function statusText(id) {
  if (!state.status) return '—';
  const colls = state.status.get(id) || [];
  return colls.length ? colls.map((c) => c.replace('UserData', '')).join(', ') : 'none';
}

async function run(label, total, rerender, work) {
  Object.assign(state, { busy: label, done: 0, total, error: '' });
  rerender();
  try {
    await work(() => {
      state.done++;
      rerender();
    });
  } catch (e) {
    state.error = `${label} failed: ${e.message}`;
  }
  state.busy = '';
  rerender();
}

async function seed(accounts, rerender) {
  const ok = await modal('Seed QA accounts?', (close) => h('div', {},
    h('p', {}, `This replaces ${accounts.length} QA accounts with fresh copies for ${longDate(todayEpochDay())}, with the sandbox offset at ${state.offset} weeks. Anything played on them so far is deleted.`),
    h('div', { class: 'actions' },
      h('button', { class: 'btn', onclick: () => close(false) }, 'Cancel'),
      h('button', { class: 'btn primary', onclick: () => close(true) }, 'Seed'))));
  if (!ok) return;
  await run('Seeding', accounts.length, rerender, async (tick) => {
    await seedAccounts(accounts, { canokuDays: canokuDays(), onAccount: tick });
    toast(`Seeded ${accounts.length} QA accounts.`);
  });
  await checkStatus(accounts.map((a) => a.id), rerender);
}

async function removeAll(rerender) {
  const ids = allSeedIds();
  const phrase = 'DELETE QA';
  const ok = await modal('Delete every QA account?', (close) => {
    const input = h('input', { placeholder: phrase, autocomplete: 'off' });
    const go = h('button', { class: 'btn danger', disabled: true, onclick: () => close(true) }, `Delete ${ids.length} accounts`);
    input.addEventListener('input', () => { go.disabled = input.value.trim() !== phrase; });
    return h('div', {},
      h('p', {}, `Deletes every doc of all ${ids.length} QA accounts (both testers, both phases), including their games/ subcollections. No other account is touched. Type ${phrase} to confirm.`),
      h('div', { class: 'actions' }, h('button', { class: 'btn', onclick: () => close(false) }, 'Cancel'), input, go));
  });
  if (!ok) return;
  await run('Deleting', ids.length, rerender, async (tick) => {
    await deleteSeedAccounts(ids, { canokuDays: canokuDays(), onAccount: tick });
    toast(`Deleted ${ids.length} QA accounts.`);
  });
  await checkStatus(ids, rerender);
}

async function checkStatus(ids, rerender) {
  await run('Checking', 1, rerender, async (tick) => {
    state.status = await seedStatus(ids);
    tick();
  });
}
