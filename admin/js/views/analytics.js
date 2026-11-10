// Analytics tab: level_start / level_end counts per game, read from GA4 with
// the Data API (analytics.js). Read-only; needs a Google Analytics token from
// a "Connect" popup once an hour (firebase.js analyticsToken).

import { h, clear, sortHead } from '../ui.js?v=202611101204';
import { USE_EMULATOR, GA_PROPERTY_ID } from '../config.js?v=202611101204';
import { analyticsToken, dropAnalyticsToken } from '../firebase.js?v=202611101204';
import { PRESETS, customRange, fetchLevelTable, fmtDuration } from '../analytics.js?v=202611101204';
import { nextSort, sortRows } from '../sort.js?v=202611101204';

let range = PRESETS[0];
let data = null; // {range, table} | {range, needsConnect} | {range, error}
let loading = false;
let sort = null;
let customFrom = '';
let customTo = '';

const fmt = (v) => (v == null ? '–' : v.toLocaleString('en-CA'));
const pct = (v) => (v == null ? '–' : `${Math.round(v * 100)}%`);
const per = (v) => (v == null ? '–' : v.toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));

async function load(r, rerender, { interactive = false } = {}) {
  loading = true;
  try {
    const token = await analyticsToken({ interactive });
    if (!token) data = { range: r, needsConnect: true };
    else data = { range: r, table: await fetchLevelTable(token, r) };
  } catch (e) {
    if (e.code === 'auth/popup-closed-by-user' || e.code === 'auth/cancelled-popup-request') {
      data = { range: r, needsConnect: true };
    } else if (e.code === 'auth/user-mismatch') {
      data = { range: r, needsConnect: true, error: 'Pick the same Google account you\'re signed in to the admin with.' };
    } else if (e.status === 401) {
      dropAnalyticsToken();
      data = { range: r, needsConnect: true, error: e.message };
    } else {
      data = { range: r, error: e.message };
    }
  } finally {
    loading = false;
    if (location.hash === '#analytics') rerender();
  }
}

const COLUMNS = [
  { label: 'Game', key: 'label' },
  { label: 'Starts', key: 'starts' },
  { label: 'Finishes', key: 'ends' },
  { label: 'Finish rate', key: 'rate' },
  { label: 'Players', key: 'players' },
  { label: 'Starts / player', key: 'startsPer' },
  { label: 'Finishes / player', key: 'endsPer' },
  { label: 'Avg time', key: 'avgSeconds' },
];

function table(t, rerender) {
  if (!t.rows.length) return h('p', { class: 'muted' }, 'No level_start or level_end events in this range.');
  const head = sortHead(COLUMNS, sort, (key) => {
    sort = nextSort(sort, key);
    rerender();
  });
  for (const th of head.querySelectorAll('th')) if (th.textContent.trim() !== 'Game') th.classList.add('num');
  return h('div', { class: 'table-wrap' },
    h('table', { class: 'grid' },
      head,
      h('tbody', {}, sortRows(t.rows, (r, k) => r[k], sort).map((r) => h('tr', {},
        h('td', { title: r.game }, r.label),
        h('td', { class: 'num' }, fmt(r.starts)),
        h('td', { class: 'num' }, fmt(r.ends)),
        h('td', { class: 'num' }, pct(r.rate)),
        h('td', { class: 'num' }, fmt(r.players)),
        h('td', { class: 'num' }, per(r.startsPer)),
        h('td', { class: 'num', title: `${fmt(r.finishers)} players finished` }, per(r.endsPer)),
        h('td', { class: 'num' }, fmtDuration(r.avgSeconds))))),
      h('tfoot', {}, h('tr', {},
        h('th', {}, 'All games'),
        h('th', { class: 'num' }, fmt(t.totals.starts)),
        h('th', { class: 'num' }, fmt(t.totals.ends)),
        h('th', { class: 'num' }, pct(t.totals.rate)),
        h('th', { class: 'num', title: 'Players who started any game; one player can play several games.' }, fmt(t.totals.players)),
        h('th', { class: 'num' }, per(t.totals.startsPer)),
        h('th', { class: 'num', title: `${fmt(t.totals.finishers)} players finished` }, per(t.totals.endsPer)),
        h('th', { class: 'num', title: 'Over the games that send a time' }, fmtDuration(t.totals.avgSeconds))))));
}

export function renderAnalytics(root, rerender) {
  if (USE_EMULATOR) {
    clear(root, h('p', { class: 'muted' }, 'Analytics reads the real GA4 property, which the emulator sign-in can\'t do. Open the admin without ?emulator.'));
    return;
  }
  if ((!data || data.range !== range) && !loading) load(range, rerender);

  const apply = (r) => {
    range = r;
    data = null;
    rerender();
  };
  const fromIn = h('input', { type: 'date', value: customFrom, onchange: (e) => { customFrom = e.target.value; } });
  const toIn = h('input', { type: 'date', value: customTo, onchange: (e) => { customTo = e.target.value; } });
  const showCustom = () => {
    const r = customRange(fromIn.value, toIn.value);
    if (r) {
      apply(r);
      return;
    }
    fromIn.setCustomValidity('Pick a start date on or before the end date.');
    fromIn.reportValidity();
    fromIn.setCustomValidity('');
  };

  const ready = data && data.range === range;
  let body;
  if (!ready) {
    body = h('p', { class: 'muted' }, 'Loading from Google Analytics…');
  } else if (data.needsConnect) {
    body = h('div', { class: 'card narrow' },
      h('p', {}, 'Connect the admin Google account to Google Analytics (read-only). Google asks once an hour.'),
      data.error ? h('p', { class: 'err' }, data.error) : null,
      h('button', { class: 'btn primary', onclick: () => load(range, rerender, { interactive: true }) }, 'Connect Google Analytics'));
  } else if (data.error) {
    body = h('p', { class: 'err' }, data.error);
  } else {
    const t = data.table;
    body = [
      t.secondsMissing ? h('p', { class: 'banner warn' },
        'Avg time needs "seconds" registered in GA4 as an event-scoped custom metric (Admin → Custom definitions → Custom metrics, '
        + 'event parameter "seconds", unit Seconds). GA only counts it from the day it\'s registered.') : null,
      t.thresholded ?h('p', { class: 'banner warn' }, 'Google is hiding some low counts for privacy (data thresholds), so these may be a little low.') : null,
      table(t, rerender),
    ];
  }

  clear(root,
    h('div', { class: 'toolbar' },
      PRESETS.map((p) => h('button', { class: `btn small${range.key === p.key ? ' primary' : ''}`, onclick: () => apply(p) }, p.label)),
      h('label', {}, 'From ', fromIn),
      h('label', {}, 'to ', toIn),
      h('button', { class: `btn small${range.key === 'custom' ? ' primary' : ''}`, onclick: showCustom }, 'Show'),
      h('button', { class: 'btn small', disabled: !ready || loading, onclick: () => apply({ ...range }) }, 'Refresh')),
    h('p', { class: 'muted small' },
      `${range.label}${ready && data.table?.timeZone ? ` · dates in ${data.table.timeZone}` : ''}`),
    body,
    h('p', { class: 'muted small' },
      `From GA4 property ${GA_PROPERTY_ID}, the same data as the Analytics dashboard and with the same delay of a few hours; today's numbers keep growing. `
      + 'Starts: level_start (a puzzle begun with no saved game). Finishes: level_end (a puzzle finished; in Canuckle, Canuckle+ and Duo that includes losses). Players: users who started a puzzle in that game. '
      + 'Starts / player: starts divided by those players. Finishes / player: finishes divided by the players who finished one (hover for how many). '
      + 'Avg time: the time on the puzzle that level_end reports (its seconds), averaged over finishes, gave-ups included; '
      + 'Canuckle, Canuckle+ and Duo have no timer. It only covers days since "seconds" was registered as a GA4 custom metric. '
      + 'The finish rate can pass 100% over short ranges, because a puzzle started one day can be finished the next. '
      + 'Only canucklegame.ca sends analytics; sandbox plays aren\'t counted.'));
}
