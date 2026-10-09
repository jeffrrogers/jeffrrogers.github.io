// Badge definitions, evaluated from everyone's derived progress.
//
// Pure functions: given the games and their progress, say which badges are
// earned, how close the locked ones are, and the day each earned badge was
// first earned according to the games' own history (since()). Recording a
// badge (and announcing it) is store.js's job, which is also why a badge that
// depends on a recent window (Clean Sweep) only needs to be seen once.

import { SOLVED, minEd, finishOn } from '../status.js?v=202610091437';

function finishDays(game, p) {
  return [...p.doneIdx].map((i) => finishOn(game, p, i));
}

/** The [n]th earliest of [days] (nulls ignored), or null if there are fewer. */
function nthEarliest(days, n) {
  const sorted = days.filter((d) => d != null).sort((a, b) => a - b);
  return sorted.length >= n ? sorted[n - 1] : null;
}

/** Earliest day by which [n] consecutive indices of [set] had all been done. */
function runReachedOn(set, n, dayOf) {
  const idx = [...set].sort((a, b) => a - b);
  let best = null;
  let start = 0;
  for (let k = 0; k < idx.length; k++) {
    if (k > 0 && idx[k] !== idx[k - 1] + 1) start = k;
    if (k - start + 1 < n) continue;
    let on = -Infinity;
    for (let j = k - n + 1; j <= k; j++) on = Math.max(on, dayOf(idx[j]));
    best = minEd(best, on);
  }
  return best;
}

function streakReachedOn(game, p, n) {
  return runReachedOn(p.streakIdx || p.doneIdx, n, (i) => finishOn(game, p, i));
}

const DAILY_STREAKS = [
  { n: 7, name: 'On a Roll', tier: 'bronze' },
  { n: 30, name: 'Month Strong', tier: 'silver' },
  { n: 100, name: 'Centurion', tier: 'gold' },
  { n: 365, name: 'Year Round', tier: 'gold' },
];
const WEEKLY_STREAKS = [
  { n: 4, name: 'Monthly Regular', tier: 'bronze' },
  { n: 12, name: 'Season Pass', tier: 'silver' },
  { n: 52, name: 'Full Year', tier: 'gold' },
];
const DAILY_TOTALS = [
  { n: 10, name: 'Getting Going', tier: 'bronze' },
  { n: 50, name: 'Regular', tier: 'silver' },
  { n: 250, name: 'Devoted', tier: 'gold' },
];
const WEEKLY_TOTALS = [
  { n: 5, name: 'Getting Going', tier: 'bronze' },
  { n: 20, name: 'Regular', tier: 'silver' },
  { n: 52, name: 'Devoted', tier: 'gold' },
];

const SWEEP_DESC = {
  canoku: 'Solve a 9×9, a 6×6 and a 4×4 board on the same day.',
  canolitaire: 'Win all three Draw 1 deals, or all three Draw 3 deals, on the same day.',
  canominoes: 'Solve the Easy, Medium and Hard puzzles on the same day.',
  canoggle: 'Solve both the Daily board and the Mini on the same day.',
};

const SPECIALS = {
  canuckle: [
    { key: 'quick', name: 'Two and Through', glyph: 'star', tier: 'gold',
      desc: 'Win a Canuckle in two guesses or fewer.',
      check: (p) => [p.flags.quickWin ? 1 : 0, 1],
      since: (p) => p.flagOn?.quickWin },
    { key: 'archive', name: 'Time Traveller', glyph: 'clock', tier: 'silver',
      desc: 'Finish 10 Canuckle games from the archive.',
      check: (p) => [p.flags.archive || 0, 10],
      since: (p) => nthEarliest(p.flagOn?.archive || [], 10) },
  ],
  duo: [
    { key: 'perfect', name: 'Perfect Duo', glyph: 'star', tier: 'silver',
      desc: 'Solve both Canuckle Duo words by your fourth guess.',
      check: (p) => [p.flags.perfect ? 1 : 0, 1],
      since: (p) => p.flagOn?.perfect },
    { key: 'perfect10', name: 'Perfect Ten', glyph: 'star', tier: 'gold',
      desc: 'Get 10 Perfect Duos.',
      check: (p) => [Math.min(p.flags.perfects || 0, 10), 10],
      since: (p) => nthEarliest(p.flagOn?.perfectDays || [], 10) },
    { key: 'doubledouble', name: 'Double Double', glyph: 'cup', tier: 'gold',
      desc: 'Get a Perfect Duo two days in a row.',
      check: (p) => [p.flags.doubleDouble ? 1 : 0, 1],
      since: (p) => p.flagOn?.doubleDouble },
    { key: 'twice', name: 'Twice as Nice', glyph: 'star', tier: 'gold',
      desc: 'Solve both Canuckle Duo words in just two guesses.',
      check: (p) => [p.flags.twice ? 1 : 0, 1],
      since: (p) => p.flagOn?.twice },
    { key: 'lucky', name: 'Lucky Hoser', glyph: 'star', tier: 'bronze',
      desc: 'Win a Canuckle Duo on your seventh and final guess.',
      check: (p) => [p.flags.lucky ? 1 : 0, 1],
      since: (p) => p.flagOn?.lucky },
    { key: 'archive', name: 'Time Traveller', glyph: 'clock', tier: 'silver',
      desc: 'Finish 10 Canuckle Duo puzzles from the archive.',
      check: (p) => [Math.min(p.flags.archive || 0, 10), 10] },
  ],
  canoku: [
    { key: 'expert', name: 'Expert, Eh?', glyph: 'star', tier: 'gold',
      desc: 'Solve a 9×9 Expert board.',
      check: (p) => [p.flags.expert9 ? 1 : 0, 1] },
  ],
  canolitaire: [
    { key: 'draw3', name: "Three's Company", glyph: 'star', tier: 'silver',
      desc: 'Win a Draw 3 deal.',
      check: (p) => [p.flags.draw3Win ? 1 : 0, 1],
      since: (p) => p.flagOn?.draw3Win },
  ],
  canominoes: [
    { key: 'hard', name: 'Hard Case', glyph: 'star', tier: 'silver',
      desc: 'Solve a Hard Canominoes puzzle.',
      check: (p) => [p.flags.hardSolved ? 1 : 0, 1],
      since: (p) => p.flagOn?.hardSolved },
  ],
  canoggle: [
    { key: 'canuckle', name: 'Canuckle Connection', glyph: 'leaf', tier: 'silver',
      desc: 'Find the hidden Canuckle word on 10 boards.',
      check: (p) => [p.flags.canuckleWords || 0, 10] },
  ],
};

function gameBadges(game) {
  const weekly = game.cadence === 'weekly';
  const unit = weekly ? 'week' : 'day';
  const list = [{
    id: `${game.id}.first`, game: game.id, name: 'First Finish', glyph: 'leaf', tier: null,
    desc: `Finish your first ${game.name} puzzle.`,
    check: (p) => [Math.min(p.doneIdx.size, 1), 1],
    since: (p) => nthEarliest(finishDays(game, p), 1),
  }];
  for (const s of weekly ? WEEKLY_STREAKS : DAILY_STREAKS) {
    list.push({
      id: `${game.id}.streak${s.n}`, game: game.id, name: s.name, glyph: 'flame', tier: s.tier,
      desc: `Reach a ${s.n}-${unit} ${game.name} streak.`,
      check: (p) => [Math.min(p.maxStreak, s.n), s.n],
      since: (p) => streakReachedOn(game, p, s.n),
    });
  }
  for (const t of weekly ? WEEKLY_TOTALS : DAILY_TOTALS) {
    list.push({
      id: `${game.id}.total${t.n}`, game: game.id, name: t.name, glyph: 'stack', tier: t.tier,
      desc: `Finish ${t.n} ${game.name} puzzles.`,
      check: (p) => [Math.min(p.doneIdx.size, t.n), t.n],
      since: (p) => nthEarliest(finishDays(game, p), t.n),
    });
  }
  if (SWEEP_DESC[game.id]) {
    list.push({
      id: `${game.id}.sweep`, game: game.id, name: 'Clean Sweep', glyph: 'sweep', tier: 'silver',
      desc: SWEEP_DESC[game.id],
      check: (p) => [p.flags.sweep ? 1 : 0, 1],
      since: (p) => p.flagOn?.sweep ?? null,
    });
  }
  for (const s of SPECIALS[game.id] || []) {
    list.push({ ...s, id: `${game.id}.${s.key}`, game: game.id });
  }
  return list;
}

/**
 * Daily games finished for each calendar day: epoch day -> the days those
 * games were actually finished on (one entry per game; its length is the count).
 */
export function finishesByDate(games, state) {
  const byDate = new Map();
  for (const g of games) {
    if (g.cadence !== 'daily') continue;
    const p = state[g.id]?.progress;
    if (!p) continue;
    for (const i of p.doneIdx) {
      const ed = g.edForIndex(i);
      if (!byDate.has(ed)) byDate.set(ed, []);
      byDate.get(ed).push(finishOn(g, p, i));
    }
  }
  return byDate;
}

/** Earliest day any calendar day reached [k] finished daily games. */
function sameDayReachedOn(byDate, k) {
  let best = null;
  for (const days of byDate.values()) best = minEd(best, nthEarliest(days, k));
  return best;
}

const most = (byDate) => Math.max(0, ...[...byDate.values()].map((d) => d.length));

function longestRunOfDates(dates) {
  let best = 0;
  for (const d of dates) {
    if (dates.has(d - 1)) continue;
    let n = 1;
    while (dates.has(d + n)) n++;
    best = Math.max(best, n);
  }
  return best;
}

function familyBadges(games) {
  const dailyCount = games.filter((g) => g.cadence === 'daily').length;
  const list = [{
    id: 'family.explorer', game: null, name: 'Explorer', glyph: 'compass', tier: 'bronze',
    desc: 'Finish a puzzle in every Canuckle game.',
    check: ({ state }) => [games.filter((g) => state[g.id]?.progress?.doneIdx.size > 0).length, games.length],
    since: ({ state }) => games.reduce((on, g) => {
      const p = state[g.id]?.progress;
      const first = p ? nthEarliest(finishDays(g, p), 1) : null;
      return on == null || first == null ? null : Math.max(on, first);
    }, -Infinity),
  }];
  if (dailyCount >= 3) {
    list.push(
      {
        id: 'family.hattrick', game: null, name: 'Hat Trick', glyph: 'toque', tier: 'bronze',
        desc: 'Finish three different daily games on the same day.',
        check: ({ byDate }) => [Math.min(most(byDate), 3), 3],
        since: ({ byDate }) => sameDayReachedOn(byDate, 3),
      },
      {
        id: 'family.hattrickweek', game: null, name: 'Hat Trick Week', glyph: 'toque', tier: 'gold',
        desc: 'Score a Hat Trick seven days in a row.',
        check: ({ byDate }) => {
          const days = new Set([...byDate].filter(([, d]) => d.length >= 3).map(([ed]) => ed));
          return [Math.min(longestRunOfDates(days), 7), 7];
        },
        since: ({ byDate }) => {
          const days = new Set([...byDate].filter(([, d]) => d.length >= 3).map(([ed]) => ed));
          return runReachedOn(days, 7, (ed) => nthEarliest(byDate.get(ed), 3));
        },
      },
    );
  }
  if (dailyCount >= 4) {
    list.push({
      id: 'family.fullslate', game: null, name: 'Full Slate', glyph: 'slate', tier: 'gold',
      desc: `Finish all ${dailyCount} daily games on the same day.`,
      check: ({ byDate }) => [Math.min(most(byDate), dailyCount), dailyCount],
      since: ({ byDate }) => sameDayReachedOn(byDate, dailyCount),
    });
  }
  if (games.length >= 3) {
    list.push({
      id: 'family.truenorth', game: null, name: 'True North', glyph: 'north', tier: 'gold',
      desc: 'Reach a 30-day streak in three different games.',
      check: ({ state }) => [Math.min(games.filter((g) =>
        g.cadence === 'daily' && (state[g.id]?.progress?.maxStreak || 0) >= 30).length, 3), 3],
      since: ({ state }) => nthEarliest(games.filter((g) => g.cadence === 'daily' && state[g.id]?.progress)
        .map((g) => streakReachedOn(g, state[g.id].progress, 30)), 3),
    });
  }
  return list;
}

const COLLECTOR = {
  id: 'family.collector', game: null, name: 'Badge Collector', glyph: 'trophy', tier: 'silver',
  desc: 'Earn 10 other badges.',
};

/**
 * Daily Double: win Canuckle and Canuckle Duo on the same day. A Duo badge
 * that needs Canuckle's progress too, so it is evaluated against everyone's
 * state ([cross]) rather than Duo's alone.
 */
function dailyDouble(canuckle, duo) {
  const pairs = (state) => {
    const pc = state[canuckle.id]?.progress;
    const pd = state[duo.id]?.progress;
    if (!pc || !pd) return [];
    const wonOn = new Map(); // calendar day of a won Canuckle -> day it was finished
    for (const [i, d] of pc.days) {
      if (d.status === SOLVED) wonOn.set(canuckle.edForIndex(i), finishOn(canuckle, pc, i));
    }
    const out = [];
    for (const [i, d] of pd.days) {
      const ed = duo.edForIndex(i);
      if (d.status === SOLVED && wonOn.has(ed)) out.push(Math.max(wonOn.get(ed), finishOn(duo, pd, i)));
    }
    return out;
  };
  return {
    id: `${duo.id}.dailydouble`, game: duo.id, cross: true, name: 'Daily Double', glyph: 'pair', tier: 'silver',
    desc: 'Win Canuckle and Canuckle Duo on the same day.',
    check: ({ state }) => [Math.min(pairs(state).length, 1), 1],
    since: ({ state }) => nthEarliest(pairs(state), 1),
  };
}

/** Every badge definition for the given (live) games. */
export function badgeDefinitions(games) {
  const list = [...familyBadges(games), COLLECTOR, ...games.flatMap(gameBadges)];
  const canuckle = games.find((g) => g.id === 'canuckle');
  const duo = games.find((g) => g.id === 'duo');
  if (canuckle && duo) list.push(dailyDouble(canuckle, duo));
  return list;
}

/**
 * Evaluates every badge. Returns [{ ...definition, earned, have, need,
 * earnedOn, earnedBy }]. For a badge the progress earns, earnedOn is the
 * epoch day it was first earned, or null when the history can't say; earnedBy
 * is then the latest day the player finished a puzzle it counts, a day it was
 * earned by. [alreadyEarned] (ids recorded in the store) keeps a badge earned
 * even if the progress that earned it has since scrolled out of view.
 */
export function evaluateBadges(games, state, alreadyEarned = new Set()) {
  const byDate = finishesByDate(games, state);
  const ctx = { state, byDate };
  const lastActive = {};
  for (const g of games) {
    const p = state[g.id]?.progress;
    const days = p ? finishDays(g, p) : [];
    lastActive[g.id] = days.length ? Math.max(...days) : null;
  }
  const active = Object.values(lastActive).filter((d) => d != null);
  const anyActive = active.length ? Math.max(...active) : null;

  const results = [];
  for (const def of badgeDefinitions(games)) {
    if (def === COLLECTOR) continue;
    const p = def.game ? state[def.game]?.progress : null;
    if (def.game && !p) continue;
    const arg = def.game && !def.cross ? p : ctx;
    const [have, need] = def.check(arg);
    const reached = have >= need;
    const on = reached && def.since ? def.since(arg) : null;
    results.push({
      ...def,
      have,
      need,
      earned: reached || alreadyEarned.has(def.id),
      earnedOn: Number.isFinite(on) ? on : null,
      earnedBy: reached ? (def.game ? lastActive[def.game] : anyActive) : null,
    });
  }
  const earned = results.filter((b) => b.earned);
  const reached = earned.length >= 10;
  results.unshift({
    ...COLLECTOR,
    have: Math.min(earned.length, 10),
    need: 10,
    earned: reached || alreadyEarned.has(COLLECTOR.id),
    // Exact only when every badge it counts is dated; otherwise the tenth
    // known date could be later than the real tenth.
    earnedOn: reached && earned.every((b) => b.earnedOn != null)
      ? nthEarliest(earned.map((b) => b.earnedOn), 10) : null,
    earnedBy: reached ? anyActive : null,
  });
  return results;
}
