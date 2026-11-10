// Canatiles tab: plays and average score per puzzle, read-only.
//
// Reads canatilesDailyStats/{day}-{tier} for a range of days (the last 14 by
// default): n is the players who cleared that puzzle on its day (archive plays
// aren't counted) and sumPts their points added up. The puzzles themselves
// ship inside the game (canatilesSourceCode/assets/data); Days left covers
// how many remain.

import { h, clear } from '../ui.js?v=202611101153';
import { longDate, todayEpochDay } from '../dates.js?v=202611101153';
import { launchEd, OFFSET_WEEKS } from '../launch.js?v=202611101153';
import { loadStatsDocs, CANATILES_STATS } from '../store.js?v=202611101153';
import {
  TIERS, MAX_SPAN, DEFAULT_SPAN, clampRange, defaultRange, statsDocIds, playsTable,
} from '../canatiles.js?v=202611101153';

const START_ED = launchEd('canatiles');
const todayIdx = () => todayEpochDay() - START_ED + 1;
const edOf = (day) => START_ED + day - 1;

let range = null; // {from, to}, puzzle numbers
let data = null; // {range, docs} once loaded, or {range, error}
let loading = false;

const fmt = (v) => (v == null ? '–' : v.toLocaleString('en-CA'));

function load(r, rerender) {
  loading = true;
  loadStatsDocs(CANATILES_STATS, statsDocIds(r))
    .then((docs) => { data = { range: r, docs }; })
    .catch((e) => { data = { range: r, error: e.message }; })
    .finally(() => {
      loading = false;
      if (location.hash === '#canatiles') rerender();
    });
}

function cells(c, tag = 'td') {
  return [h(tag, { class: 'num' }, fmt(c.n)), h(tag, { class: 'num' }, fmt(c.avg))];
}

function table(t) {
  return h('div', { class: 'table-wrap' },
    h('table', { class: 'grid' },
      h('thead', {},
        h('tr', {},
          h('th', { rowspan: 2 }, '#'), h('th', { rowspan: 2 }, 'Date'),
          ...TIERS.map((tier) => h('th', { colspan: 2, class: 'num' }, tier.label)),
          h('th', { colspan: 2, class: 'num' }, 'All')),
        h('tr', {}, ...[...TIERS, null].flatMap(() => [h('th', { class: 'num' }, 'Plays'), h('th', { class: 'num' }, 'Avg score')]))),
      h('tbody', {}, t.rows.map((r) => h('tr', {},
        h('td', { class: 'num' }, String(r.day)),
        h('td', { class: 'nowrap' }, longDate(edOf(r.day))),
        ...TIERS.flatMap((tier) => cells(r.tiers[tier.key])),
        ...cells(r.all)))),
      h('tfoot', {}, h('tr', {},
        h('th', { colspan: 2 }, `Total, ${t.rows.length} day${t.rows.length === 1 ? '' : 's'}`),
        ...TIERS.flatMap((tier) => cells(t.totals[tier.key], 'th')),
        ...cells(t.all, 'th')))));
}

export function renderCanatiles(root, rerender) {
  const today = todayIdx();
  if (today < 1) {
    clear(root, h('p', { class: 'muted' },
      `Canatiles launches ${longDate(START_ED)}${OFFSET_WEEKS ? ` (sandbox offset ${OFFSET_WEEKS} weeks)` : ''}. Nothing has been played yet.`));
    return;
  }
  if (!range) range = defaultRange(today);
  if ((!data || data.range !== range) && !loading) load(range, rerender);

  const fromIn = h('input', { type: 'number', min: 1, max: today, value: range.from, style: { width: '6em' } });
  const toIn = h('input', { type: 'number', min: 1, max: today, value: range.to, style: { width: '6em' } });
  const apply = (r) => {
    range = r;
    data = null;
    rerender();
  };
  const show = () => apply(clampRange(Number(fromIn.value), Number(toIn.value), today) || defaultRange(today));
  for (const el of [fromIn, toIn]) el.addEventListener('keydown', (e) => { if (e.key === 'Enter') show(); });

  const ready = data && data.range === range;
  clear(root,
    h('div', { class: 'toolbar' },
      h('label', {}, 'From # ', fromIn),
      h('label', {}, 'to # ', toIn),
      h('button', { class: 'btn small', onclick: show }, 'Show'),
      h('button', { class: 'btn small', onclick: () => apply(defaultRange(today)) }, `Last ${DEFAULT_SPAN} days`),
      h('button', { class: 'btn small', disabled: !ready, onclick: () => apply({ ...range }) }, 'Refresh')),
    h('p', { class: 'muted small' },
      `#${range.from} (${longDate(edOf(range.from))}) to #${range.to} (${longDate(edOf(range.to))}). Today is #${today}.`),
    !ready ? h('p', { class: 'muted' }, 'Loading Canatiles play counts…')
      : data.error ? h('p', { class: 'err' }, `Couldn't read ${CANATILES_STATS}: ${data.error}`)
        : table(playsTable(data.docs, range)),
    h('p', { class: 'muted small' },
      `Plays: players who cleared the puzzle on its day, from ${CANATILES_STATS}/{day}-{tier} (archive plays aren't counted). `
      + `Avg score: their points added up (sumPts) over plays. The All columns and the totals row weigh every play equally. At most ${MAX_SPAN} days at a time.`));
}
