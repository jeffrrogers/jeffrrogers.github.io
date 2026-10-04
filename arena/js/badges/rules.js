// Badge definitions, evaluated from everyone's derived progress.
//
// Pure functions: given the games and their progress, say which badges are
// earned and how close the locked ones are. Recording WHEN a badge was first
// earned (and announcing it) is store.js's job, which is also why a badge
// that depends on a recent window (Clean Sweep) only needs to be seen once.

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
      check: (p) => [p.flags.quickWin ? 1 : 0, 1] },
    { key: 'archive', name: 'Time Traveller', glyph: 'clock', tier: 'silver',
      desc: 'Finish 10 Canuckle games from the archive.',
      check: (p) => [p.flags.archive || 0, 10] },
  ],
  canoku: [
    { key: 'expert', name: 'Expert, Eh?', glyph: 'star', tier: 'gold',
      desc: 'Solve a 9×9 Expert board.',
      check: (p) => [p.flags.expert9 ? 1 : 0, 1] },
  ],
  canolitaire: [
    { key: 'draw3', name: "Three's Company", glyph: 'star', tier: 'silver',
      desc: 'Win a Draw 3 deal.',
      check: (p) => [p.flags.draw3Win ? 1 : 0, 1] },
  ],
  canominoes: [
    { key: 'hard', name: 'Hard Case', glyph: 'star', tier: 'silver',
      desc: 'Solve a Hard Canominoes puzzle.',
      check: (p) => [p.flags.hardSolved ? 1 : 0, 1] },
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
  }];
  for (const s of weekly ? WEEKLY_STREAKS : DAILY_STREAKS) {
    list.push({
      id: `${game.id}.streak${s.n}`, game: game.id, name: s.name, glyph: 'flame', tier: s.tier,
      desc: `Reach a ${s.n}-${unit} ${game.name} streak.`,
      check: (p) => [Math.min(p.maxStreak, s.n), s.n],
    });
  }
  for (const t of weekly ? WEEKLY_TOTALS : DAILY_TOTALS) {
    list.push({
      id: `${game.id}.total${t.n}`, game: game.id, name: t.name, glyph: 'stack', tier: t.tier,
      desc: `Finish ${t.n} ${game.name} puzzles.`,
      check: (p) => [Math.min(p.doneIdx.size, t.n), t.n],
    });
  }
  if (SWEEP_DESC[game.id]) {
    list.push({
      id: `${game.id}.sweep`, game: game.id, name: 'Clean Sweep', glyph: 'sweep', tier: 'silver',
      desc: SWEEP_DESC[game.id],
      check: (p) => [p.flags.sweep ? 1 : 0, 1],
    });
  }
  for (const s of SPECIALS[game.id] || []) {
    list.push({ ...s, id: `${game.id}.${s.key}`, game: game.id });
  }
  return list;
}

/** Number of daily games finished on each calendar day (epoch day -> count). */
export function finishesByDate(games, state) {
  const counts = new Map();
  for (const g of games) {
    if (g.cadence !== 'daily') continue;
    const p = state[g.id]?.progress;
    if (!p) continue;
    for (const i of p.doneIdx) {
      const ed = g.edForIndex(i);
      counts.set(ed, (counts.get(ed) || 0) + 1);
    }
  }
  return counts;
}

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
  }];
  if (dailyCount >= 3) {
    list.push(
      {
        id: 'family.hattrick', game: null, name: 'Hat Trick', glyph: 'toque', tier: 'bronze',
        desc: 'Finish three different daily games on the same day.',
        check: ({ byDate }) => [Math.min(Math.max(0, ...byDate.values()), 3), 3],
      },
      {
        id: 'family.hattrickweek', game: null, name: 'Hat Trick Week', glyph: 'toque', tier: 'gold',
        desc: 'Score a Hat Trick seven days in a row.',
        check: ({ byDate }) => {
          const days = new Set([...byDate].filter(([, n]) => n >= 3).map(([d]) => d));
          return [Math.min(longestRunOfDates(days), 7), 7];
        },
      },
    );
  }
  if (dailyCount >= 4) {
    list.push({
      id: 'family.fullslate', game: null, name: 'Full Slate', glyph: 'slate', tier: 'gold',
      desc: `Finish all ${dailyCount} daily games on the same day.`,
      check: ({ byDate }) => [Math.min(Math.max(0, ...byDate.values()), dailyCount), dailyCount],
    });
  }
  if (games.length >= 3) {
    list.push({
      id: 'family.truenorth', game: null, name: 'True North', glyph: 'north', tier: 'gold',
      desc: 'Reach a 30-day streak in three different games.',
      check: ({ state }) => [Math.min(games.filter((g) =>
        g.cadence === 'daily' && (state[g.id]?.progress?.maxStreak || 0) >= 30).length, 3), 3],
    });
  }
  return list;
}

const COLLECTOR = {
  id: 'family.collector', game: null, name: 'Badge Collector', glyph: 'trophy', tier: 'silver',
  desc: 'Earn 10 other badges.',
};

/** Every badge definition for the given (live) games. */
export function badgeDefinitions(games) {
  return [...familyBadges(games), COLLECTOR, ...games.flatMap(gameBadges)];
}

/**
 * Evaluates every badge. Returns [{ ...definition, earned, have, need }].
 * [alreadyEarned] (ids recorded in the store) keeps a badge earned even if
 * the progress that earned it has since scrolled out of view.
 */
export function evaluateBadges(games, state, alreadyEarned = new Set()) {
  const byDate = finishesByDate(games, state);
  const ctx = { state, byDate };
  const results = [];
  for (const def of badgeDefinitions(games)) {
    if (def === COLLECTOR) continue;
    const p = def.game ? state[def.game]?.progress : null;
    if (def.game && !p) continue;
    const [have, need] = def.game ? def.check(p) : def.check(ctx);
    results.push({ ...def, have, need, earned: have >= need || alreadyEarned.has(def.id) });
  }
  const earnedCount = results.filter((b) => b.earned).length;
  results.unshift({
    ...COLLECTOR,
    have: Math.min(earnedCount, 10),
    need: 10,
    earned: earnedCount >= 10 || alreadyEarned.has(COLLECTOR.id),
  });
  return results;
}
