// Analytics tab: level_start / level_end counts per game from GA4.
//
// Every game sends level_start when a puzzle is begun and level_end when it's
// finished, each with a `game` param (registered in GA4 as the event-scoped
// custom dimension customEvent:game). This file builds the Data API requests
// and turns the responses into a table; the pure parts are unit-tested in
// admin/tests/run.mjs. Analytics only runs on *.canucklegame.ca, so sandbox
// plays never show up here.

import { GA_PROPERTY_ID } from './config.js?v=202611101147';

export const LEVEL_EVENTS = ['level_start', 'level_end'];

/** Quick date ranges, in GA's own relative dates (the property's time zone). */
export const PRESETS = [
  { key: 'today', label: 'Today', startDate: 'today', endDate: 'today' },
  { key: 'yesterday', label: 'Yesterday', startDate: 'yesterday', endDate: 'yesterday' },
  { key: '7d', label: 'Last 7 days', startDate: '6daysAgo', endDate: 'today' },
  { key: '28d', label: 'Last 28 days', startDate: '27daysAgo', endDate: 'today' },
];

const LABELS = {
  canuckle: 'Canuckle',
  plus: 'Canuckle+',
  duo: 'Canuckle Duo',
  canoku: 'Canoku',
  canolitaire: 'Canolitaire',
  canominoes: 'Canominoes',
  canoggle: 'Canoggle',
  canagrams: 'Canagrams',
  canatiles: 'Canatiles',
  canundrum: 'Canundrum',
  canamaze: 'Canamaze',
  canadrift: 'Canadrift',
  arena: 'Arena',
};

/** A readable name for a `game` param value. */
export function gameLabel(id) {
  if (!id || id === '(not set)') return '(no game param)';
  return LABELS[id] || id.charAt(0).toUpperCase() + id.slice(1);
}

const ISO = /^\d{4}-\d{2}-\d{2}$/;

/** A custom {key, label, startDate, endDate} range, or null if the dates don't make one. */
export function customRange(from, to) {
  if (!ISO.test(from || '') || !ISO.test(to || '') || from > to) return null;
  return { key: 'custom', label: from === to ? from : `${from} to ${to}`, startDate: from, endDate: to };
}

const levelFilter = {
  filter: { fieldName: 'eventName', inListFilter: { values: LEVEL_EVENTS } },
};

/** The runReport bodies: per game, and overall (for players across all games). */
export function reportRequests(range) {
  const dateRanges = [{ startDate: range.startDate, endDate: range.endDate }];
  return {
    byGame: {
      dateRanges,
      dimensions: [{ name: 'customEvent:game' }, { name: 'eventName' }],
      metrics: [{ name: 'eventCount' }, { name: 'totalUsers' }],
      dimensionFilter: levelFilter,
      limit: 1000,
    },
    overall: {
      dateRanges,
      dimensions: [{ name: 'eventName' }],
      metrics: [{ name: 'eventCount' }, { name: 'totalUsers' }],
      dimensionFilter: levelFilter,
    },
  };
}

/** A runReport response's rows as plain {dimensionOrMetricName: value} objects. */
export function rowsOf(report) {
  const dims = (report?.dimensionHeaders || []).map((x) => x.name);
  const mets = (report?.metricHeaders || []).map((x) => x.name);
  return (report?.rows || []).map((r) => {
    const o = {};
    dims.forEach((n, i) => { o[n] = r.dimensionValues?.[i]?.value ?? ''; });
    mets.forEach((n, i) => { o[n] = Number(r.metricValues?.[i]?.value) || 0; });
    return o;
  });
}

const rate = (starts, ends) => (starts ? ends / starts : null);

/**
 * The table: one row per game {game, label, starts, ends, rate, players},
 * most starts first, and totals. players is the users who started a puzzle in
 * that game; the totals' players comes from [overall], since a player can play
 * several games and the per-game counts don't add up.
 */
export function levelTable(byGame, overall) {
  const games = new Map();
  for (const r of rowsOf(byGame)) {
    const id = r['customEvent:game'] || '(not set)';
    const g = games.get(id) || { game: id, label: gameLabel(id), starts: 0, ends: 0, players: 0 };
    if (r.eventName === 'level_start') {
      g.starts += r.eventCount;
      g.players += r.totalUsers;
    } else if (r.eventName === 'level_end') {
      g.ends += r.eventCount;
    }
    games.set(id, g);
  }
  const rows = [...games.values()]
    .map((g) => ({ ...g, rate: rate(g.starts, g.ends) }))
    .sort((a, b) => b.starts - a.starts || b.ends - a.ends || a.label.localeCompare(b.label));

  const totals = { starts: 0, ends: 0, players: null };
  const all = rowsOf(overall);
  if (all.length) {
    for (const r of all) {
      if (r.eventName === 'level_start') {
        totals.starts += r.eventCount;
        totals.players = r.totalUsers;
      } else if (r.eventName === 'level_end') {
        totals.ends += r.eventCount;
      }
    }
  } else {
    for (const g of rows) {
      totals.starts += g.starts;
      totals.ends += g.ends;
    }
  }
  totals.rate = rate(totals.starts, totals.ends);

  const meta = byGame?.metadata || {};
  return {
    rows,
    totals,
    timeZone: meta.timeZone || null,
    thresholded: !!meta.subjectToThresholding,
  };
}

/** Explains a Data API failure in admin terms. */
export function explainError(status, message = '') {
  if (status === 401) return 'Your Google Analytics access has expired. Connect again.';
  if (status === 403 && /has not been used|is disabled|SERVICE_DISABLED/i.test(message)) {
    return 'The Google Analytics Data API isn\'t enabled in the canuckle-c2157 Cloud project. Enable it, wait a minute, then Refresh.';
  }
  if (status === 403) {
    return `This Google account can't read GA4 property ${GA_PROPERTY_ID}. Give it Viewer access in GA4 Admin → Property access management. (${message})`;
  }
  if (status === 400 && /customEvent:game/.test(message)) {
    return `GA4 doesn't know the "game" custom dimension. Register it as an event-scoped custom dimension. (${message})`;
  }
  return message || `Request failed (${status || 'network'})`;
}

async function runReport(token, body) {
  const res = await fetch(`https://analyticsdata.googleapis.com/v1beta/properties/${GA_PROPERTY_ID}:runReport`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    const raw = json.error?.message || '';
    const err = new Error(explainError(res.status, raw));
    err.status = res.status;
    throw err;
  }
  return json;
}

/** Fetches both reports for [range] and returns levelTable()'s result. */
export async function fetchLevelTable(token, range) {
  const req = reportRequests(range);
  const [byGame, overall] = await Promise.all([runReport(token, req.byGame), runReport(token, req.overall)]);
  return levelTable(byGame, overall);
}
