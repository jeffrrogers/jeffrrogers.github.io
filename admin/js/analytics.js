// Analytics tab: level_start / level_end counts per game from GA4.
//
// Every game sends level_start when a puzzle is begun and level_end when it's
// finished, each with a `game` param (registered in GA4 as the event-scoped
// custom dimension customEvent:game). This file builds the Data API requests
// and turns the responses into a table; the pure parts are unit-tested in
// admin/tests/run.mjs. Analytics only runs on *.canucklegame.ca, so sandbox
// plays never show up here.

import { GA_PROPERTY_ID } from './config.js?v=202611121452';

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

// level_end's `seconds` param (time on the puzzle), registered in GA4 as an
// event-scoped custom metric. GA reports it as a sum; the average is that over
// the finishes. Canuckle, Canuckle+ and Duo have no timer and don't send it.
export const SECONDS_METRIC = 'customEvent:seconds';

/**
 * The runReport bodies: per game, and overall (for players across all games).
 * [withSeconds] false leaves out the seconds metric, for when GA4 doesn't
 * have it registered.
 */
export function reportRequests(range, { withSeconds = true } = {}) {
  const dateRanges = [{ startDate: range.startDate, endDate: range.endDate }];
  return {
    byGame: {
      dateRanges,
      dimensions: [{ name: 'customEvent:game' }, { name: 'eventName' }],
      metrics: [{ name: 'eventCount' }, { name: 'totalUsers' }, ...(withSeconds ? [{ name: SECONDS_METRIC }] : [])],
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

const ratio = (n, d) => (d ? n / d : null);

/**
 * Adds the worked-out columns: finish rate, starts / finishes per player and
 * the average seconds per finish (null for games that send no time).
 */
function withRatios(g) {
  return {
    ...g,
    rate: ratio(g.ends, g.starts),
    startsPer: ratio(g.starts, g.players),
    endsPer: ratio(g.ends, g.finishers),
    avgSeconds: g.seconds > 0 ? ratio(g.seconds, g.timedEnds) : null,
  };
}

/**
 * The table: one row per game {game, label, starts, ends, rate, players,
 * finishers, startsPer, endsPer}, most starts first, and totals. players is
 * the users who started a puzzle in that game and finishers the users who
 * finished one; startsPer and endsPer are starts per player and finishes per
 * finisher. avgSeconds is the average time per finish, from level_end's
 * seconds. The totals' players and finishers come from [overall], since a
 * player can play several games and the per-game counts don't add up; the
 * totals' avgSeconds covers only the games that send a time.
 */
export function levelTable(byGame, overall) {
  const games = new Map();
  for (const r of rowsOf(byGame)) {
    const id = r['customEvent:game'] || '(not set)';
    const g = games.get(id)
      || { game: id, label: gameLabel(id), starts: 0, ends: 0, players: 0, finishers: 0, seconds: 0, timedEnds: 0 };
    if (r.eventName === 'level_start') {
      g.starts += r.eventCount;
      g.players += r.totalUsers;
    } else if (r.eventName === 'level_end') {
      g.ends += r.eventCount;
      g.finishers += r.totalUsers;
      const secs = r[SECONDS_METRIC] || 0;
      if (secs > 0) {
        g.seconds += secs;
        g.timedEnds += r.eventCount;
      }
    }
    games.set(id, g);
  }
  const rows = [...games.values()]
    .map(withRatios)
    .sort((a, b) => b.starts - a.starts || b.ends - a.ends || a.label.localeCompare(b.label));

  let totals = {
    starts: 0,
    ends: 0,
    players: null,
    finishers: null,
    seconds: rows.reduce((s, g) => s + g.seconds, 0),
    timedEnds: rows.reduce((s, g) => s + g.timedEnds, 0),
  };
  const all = rowsOf(overall);
  if (all.length) {
    for (const r of all) {
      if (r.eventName === 'level_start') {
        totals.starts += r.eventCount;
        totals.players = r.totalUsers;
      } else if (r.eventName === 'level_end') {
        totals.ends += r.eventCount;
        totals.finishers = r.totalUsers;
      }
    }
  } else {
    for (const g of rows) {
      totals.starts += g.starts;
      totals.ends += g.ends;
    }
  }
  totals = withRatios(totals);

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
    err.raw = raw;
    throw err;
  }
  return json;
}

/** "1:05", "12:30", "1:02:03" for a number of seconds; "–" for none. */
export function fmtDuration(secs) {
  if (secs == null || !Number.isFinite(secs)) return '–';
  const s = Math.round(secs);
  const hh = Math.floor(s / 3600);
  const mm = Math.floor((s % 3600) / 60);
  const ss = String(s % 60).padStart(2, '0');
  return hh ? `${hh}:${String(mm).padStart(2, '0')}:${ss}` : `${mm}:${ss}`;
}

/** True for the Data API's complaint that a field (here the seconds metric) isn't registered. */
export function isUnknownSecondsMetric(err) {
  return err?.status === 400 && /customEvent:seconds/.test(err.raw || err.message || '');
}

/**
 * Fetches both reports for [range] and returns levelTable()'s result, plus
 * secondsMissing when GA4 has no seconds custom metric (the table then loads
 * without times rather than failing).
 */
export async function fetchLevelTable(token, range) {
  const get = (withSeconds) => {
    const req = reportRequests(range, { withSeconds });
    return Promise.all([runReport(token, req.byGame), runReport(token, req.overall)]);
  };
  try {
    const [byGame, overall] = await get(true);
    return { ...levelTable(byGame, overall), secondsMissing: false };
  } catch (e) {
    if (!isUnknownSecondsMetric(e)) throw e;
    const [byGame, overall] = await get(false);
    return { ...levelTable(byGame, overall), secondsMissing: true };
  }
}
