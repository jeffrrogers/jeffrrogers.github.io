// QA seed accounts for the sandbox: realistic player records, built relative
// to today, for testing the Arena before launch.
//
// Phase 1 (L01-L10) are legacy players: Canuckle (in Canuckle 3.0.2's
// newUserData shape), Canuckle+ and Canoku only, with no arenaUserData, so
// the Arena's first visit backfills their badges. Phase 2 (N01-N11) are each
// one play away from a new-game or family badge.
//
// Pure: buildAccounts() returns every document to write. Each account also
// says what to check before playing, what to do, and what should change, as
// text for the testers' checklist and as badge ids for admin/tests/seed.mjs,
// which runs both versions of each account (as seeded, and with the step
// played: build(true)) through the Arena's own adapters and badge rules.

import { GAMES, epochDay } from '../dates.js?v=202610311155';
import { launchEd } from '../launch.js?v=202610311155';
import {
  ts, midnightOf, timeOn, weekdayOf, canuckleGame, duoGame, canuckleStats, duoStats, newUserStub,
  canokuStats, canokuSettings, canokuBoard, canokuSize,
} from './shapes.js?v=202610311155';

export const TESTERS = { JR: 'Jeff', MR: 'Mark' };

export function seedId(tester, code) {
  return `QA-${tester}-${code}`;
}

/** Only these IDs are ever written or deleted by the Seed tab. */
export function isSeedId(id) {
  return /^QA-(JR|MR)-[LN]\d{2}$/.test(String(id));
}

const CANOKU_START = epochDay(2023, 10, 16);
const DUO_BASE = 120001;

// Wrong guesses, in Canuckle's word lists or near enough: what the stored
// games show as the guesses before the answer.
const DECOYS = {
  5: ['CRANE', 'SLATE', 'MOOSE', 'TOQUE', 'BISON', 'HOSER', 'LOONS', 'CANOE', 'GEESE', 'PUCKS'],
  6: ['CANOES', 'TUNDRA', 'HOCKEY', 'ISLAND', 'FOREST', 'RIVERS', 'PADDLE'],
  7: ['PRAIRIE', 'MOUNTIE', 'BEAVERS', 'GLACIER', 'HARBOUR', 'CARIBOU', 'POUTINE'],
};

function decoys(n, avoid) {
  const len = avoid[0].length;
  const pool = (DECOYS[len] || DECOYS[5]).filter((w) => !avoid.includes(w));
  return Array.from({ length: n }, (_, i) => pool[i % pool.length]);
}

/** Consecutive members of [set] ending today, or yesterday when today isn't in it. */
function currentRun(set, today) {
  let i = set.has(today) ? today : today - 1;
  let n = 0;
  while (set.has(i)) {
    n++;
    i--;
  }
  return n;
}

function longestRun(set) {
  let best = 0;
  for (const i of set) {
    if (set.has(i - 1)) continue;
    let n = 1;
    while (set.has(i + n)) n++;
    best = Math.max(best, n);
  }
  return best;
}

const range = (from, to) => Array.from({ length: to - from + 1 }, (_, i) => from + i);

// ---- The calendar, per game, for one seeding --------------------------------

function makeEnv({ todayEd, offsetWeeks, nowMs, words }) {
  const problems = [];
  const fromLaunch = (gameId) => ({
    first: gameId === 'duo' ? DUO_BASE : 1,
    idx: (ed) => ed - launchEd(gameId, offsetWeeks) + (gameId === 'duo' ? DUO_BASE : 1),
    ed: (i) => launchEd(gameId, offsetWeeks) + i - (gameId === 'duo' ? DUO_BASE : 1),
  });
  const cal = {
    canuckle: { first: 1, idx: GAMES.canuckle.indexForEd, ed: GAMES.canuckle.edForIndex },
    plus: { first: 60001, idx: GAMES.plus.indexForEd, ed: GAMES.plus.edForIndex },
    canoku: { first: 1, idx: (ed) => ed - CANOKU_START + 1, ed: (i) => CANOKU_START + i - 1 },
    duo: fromLaunch('duo'),
    canagrams: fromLaunch('canagrams'),
    canominoes: fromLaunch('canominoes'),
    canoggle: fromLaunch('canoggle'),
    canolitaire: fromLaunch('canolitaire'),
  };
  return {
    todayEd,
    nowMs,
    offsetWeeks,
    problems,
    cal,
    /** Puzzle index of [game] [k] days from today (k <= 0), checked to exist. */
    at(game, k) {
      const i = cal[game].idx(todayEd + k);
      if (i == null || i < cal[game].first) {
        problems.push(`${game} has no puzzle ${-k} days ago with the sandbox offset at ${offsetWeeks} weeks`);
        return cal[game].first;
      }
      return i;
    },
    today(game) {
      return cal[game].idx(todayEd);
    },
    word(game, i) {
      const w = words[game]?.(i);
      if (game === 'duo') {
        if (Array.isArray(w) && w.length === 2 && w.every(Boolean)) return w.map((x) => x.toUpperCase());
        problems.push(`no Duo answers for puzzle #${i - 120000}`);
        return ['MAPLE', 'TOQUE'];
      }
      if (w) return w.toUpperCase();
      problems.push(`no ${game} answer for #${i}`);
      return game === 'plus' ? 'BEAVER' : 'MAPLE';
    },
  };
}

// ---- newUserData: Canuckle, Canuckle+ and Duo -----------------------------

/**
 * A Canuckle or Canuckle+ game list entry. [g]: {index, win, guesses (wins),
 * archive, playedEd, hard, old}. Losses take all six guesses.
 */
function wordGame(env, game, g) {
  const answer = env.word(game, g.index);
  const n = g.win ? g.guesses : 6;
  const guesses = g.win ? [...decoys(n - 1, [answer]), answer] : decoys(6, [answer]);
  const playedEd = g.playedEd ?? env.cal[game].ed(g.index) + (game === 'plus' ? 1 : 0);
  return {
    json: canuckleGame({ answer, index: g.index, guesses, archive: !!g.archive, startMs: midnightOf(playedEd), oldFormat: g.old }),
    result: { won: g.win, guesses: n, hard: !!g.hard },
  };
}

/** A Duo list entry. [g]: {index, win, finishedOn (2-7, wins), archive}. */
function duoEntry(env, g) {
  const [a, b] = env.word('duo', g.index);
  const guesses = g.win ? [...decoys(g.finishedOn - 2, [a, b]), a, b] : [a, ...decoys(6, [a, b])];
  return {
    json: duoGame({ answers: [a, b], index: g.index, guesses, archive: !!g.archive, startMs: midnightOf(env.cal.duo.ed(g.index)) }),
    result: { won: g.win, finishedOn: g.finishedOn },
  };
}

const streaksOf = (list, today) => {
  const wins = new Set(list.filter((g) => g.win).map((g) => g.index));
  return [currentRun(wins, today), longestRun(wins)];
};

/**
 * newUserData/{id}. shape '302' is Canuckle 3.0.2's save (live until the
 * Nov 1 deploy: no Duo fields, the old achievement and trivia fields);
 * 'current' is what Canuckle writes now (user.dart toJson).
 */
function newUser(env, { daily = [], plus = [], duo = [], shape = 'current', email = '' }) {
  const d = daily.map((g) => wordGame(env, 'canuckle', g));
  const p = plus.map((g) => wordGame(env, 'plus', g));
  const [streak, maxStreak] = streaksOf(daily, env.today('canuckle'));
  const [plusStreak, maxPlusStreak] = streaksOf(plus, env.today('plus'));
  const common = {
    games: d.map((x) => x.json),
    gamesCount: d.length,
    plusGames: p.map((x) => x.json),
    plusGamesCount: p.length,
    normalStats: canuckleStats(d.filter((x) => !x.result.hard).map((x) => x.result)),
    hardModeStats: canuckleStats(d.filter((x) => x.result.hard).map((x) => x.result)),
    plusStats: canuckleStats(p.map((x) => x.result)),
    streak, maxStreak, plusStreak, maxPlusStreak,
    lastUpdated: env.nowMs,
    archiveGame: '',
    email,
    isHardMode: false,
    isDarkMode: false,
    isHighContrast: false,
  };
  if (shape === '302') {
    if (duo.length) throw new Error('Canuckle 3.0.2 had no Duo');
    return {
      ...common,
      triviaStats: '{}', triviaMaxStreak: 0, triviaStreak: 0, triviaGames: [], unreadAchivements: [],
      achOne: false, achShare: false, achSorry: false, achArchive: false, achGames: false,
      achStreak: false, achThree: false, achFour: false,
    };
  }
  const u = duo.map((g) => duoEntry(env, g));
  const [duoStreak, maxDuoStreak] = streaksOf(duo, env.today('duo'));
  return {
    ...common,
    duoGames: u.map((x) => x.json),
    duoGamesCount: u.length,
    duoStats: duoStats(u.map((x) => x.result)),
    duoStreak,
    maxDuoStreak,
  };
}

// ---- canokuUserData --------------------------------------------------------

const canokuSec = (mode) => ({ 4: 95, 6: 260, 9: 540 })[canokuSize(mode)] + (mode.startsWith('VHARD') ? 600 : 0);

/**
 * canokuUserData/{id} and what hangs off it. [days]: {index, modes}, every
 * mode solved that day. Current (savesVersion 2): completedModes plus a
 * games/{day}.{MODE} done:true doc per solve, as Canoku 3 keeps them in step.
 * [legacy]: Canoku 2.1.0's doc (no completedModes, savesVersion or
 * completedAt) with a {gameData} board per mode under /{day}/, and
 * [unfinished] ({index, mode}) boards beside them.
 */
function canoku(env, id, { days, legacy = false, unfinished = [] }) {
  const solves = days.flatMap((d) => d.modes.map((mode) => ({ day: d.index, mode, sec: canokuSec(mode), hints: 0 })));
  const done = new Set(days.map((d) => d.index));
  const doc = {
    ...canokuSettings(env.nowMs),
    ...canokuStats(solves),
    completedIndices: [...done].sort((a, b) => a - b),
    streak: currentRun(done, env.today('canoku')),
    maxStreak: longestRun(done),
  };
  const out = [];
  const at = (day) => timeOn(env.cal.canoku.ed(day), 9);
  if (legacy) {
    out.push({ path: ['canokuUserData', id], data: doc });
    for (const s of solves) {
      out.push({
        path: ['canokuUserData', id, String(s.day), s.mode],
        data: { gameData: canokuBoard({ mode: s.mode, day: s.day, dateMs: at(s.day), solved: true, time: s.sec }) },
      });
    }
    for (const u of unfinished) {
      out.push({
        path: ['canokuUserData', id, String(u.index), u.mode],
        data: { gameData: canokuBoard({ mode: u.mode, day: u.index, dateMs: at(u.index), solved: false, time: 140 }) },
      });
    }
    return out;
  }
  doc.savesVersion = 2;
  doc.completedModes = {};
  doc.completedAt = {};
  for (const s of solves) {
    (doc.completedModes[s.day] ||= {})[s.mode] = [s.sec, s.hints];
    doc.completedAt[s.day] = at(s.day);
    out.push({
      path: ['canokuUserData', id, 'games', `${s.day}.${s.mode}`],
      data: { day: s.day, mode: s.mode, done: true, sec: s.sec, hints: s.hints, updatedAt: ts(at(s.day)) },
    });
  }
  out.unshift({ path: ['canokuUserData', id], data: doc });
  return out;
}

// ---- The four new games ----------------------------------------------------

/** Day-level streak fields the new games keep, rebuilt from their day set. */
function dayStreak(set, today) {
  const sorted = [...set].sort((a, b) => a - b);
  return { st: currentRun(set, today), ld: sorted.length ? sorted[sorted.length - 1] : 0 };
}

/** dominoUserData (pipsSourceCode/lib/data/stats.dart). [solves]: {index, tier}. */
function canominoes(env, id, solves) {
  const sec = { e: 70, m: 150, h: 320 };
  const moves = { e: 12, m: 18, h: 26 };
  const tiers = {};
  for (const t of ['e', 'm', 'h']) {
    const mine = solves.filter((s) => s.tier === t);
    tiers[t] = mine.length
      ? { p: mine.length, w: mine.length, bs: sec[t], fm: moves[t], ts: sec[t] * mine.length }
      : { p: 0, w: 0, bs: 0, fm: 0, ts: 0 };
  }
  const sd = new Set(solves.map((s) => s.index));
  const { st, ld } = dayStreak(sd, env.today('canominoes'));
  const out = [{
    path: ['dominoUserData', id],
    data: { ...tiers, st, ms: longestRun(sd), ld, sd: [...sd].sort((a, b) => a - b), updatedAt: ts(env.nowMs) },
  }];
  for (const s of solves) {
    out.push({
      path: ['dominoUserData', id, 'games', `${s.index}.${s.tier}`],
      data: {
        day: s.index, tier: s.tier, sec: sec[s.tier], mc: moves[s.tier], ht: 0, solved: true, done: true,
        updatedAt: ts(timeOn(env.cal.canominoes.ed(s.index), 11)),
      },
    });
  }
  return out;
}

/**
 * solitaireUserData (solitaireSourceCode/lib/data/stats.dart). [deals]:
 * {index, draw (1|3), tier, won}. Every deal is an attempt (cd, the streak);
 * only won deals have a games/ doc, as the game writes them.
 */
function canolitaire(env, id, deals) {
  const LEVELS = ['e', 'm', 'h'];
  const draw = (n) => {
    const mine = deals.filter((d) => d.draw === n);
    const won = mine.filter((d) => d.won);
    return {
      dl: { p: mine.length, w: won.length },
      rd: { p: 0, w: 0 },
      bs: won.length ? 245 : 0,
      fm: won.length ? 104 : 0,
      sc: won.length ? 620 : 0,
      ts: won.length * 300,
    };
  };
  const cd = new Set(deals.map((d) => d.index));
  const { st, ld } = dayStreak(cd, env.today('canolitaire'));
  const out = [{
    path: ['solitaireUserData', id],
    data: {
      d1: draw(1), d3: draw(3), st, ms: longestRun(cd), ld, cd: [...cd].sort((a, b) => a - b),
      gk: { n: 0, bp: 0, bw: 0, so: 0 }, updatedAt: ts(env.nowMs),
    },
  }];
  for (const d of deals.filter((x) => x.won)) {
    out.push({
      path: ['solitaireUserData', id, 'games', `${d.index}.${d.draw}.${d.tier}`],
      data: {
        day: d.index, dm: d.draw === 3 ? 1 : 0, df: LEVELS.indexOf(d.tier), seed: 0, sec: 300, sc: 620, mc: 120, un: 0, st: 1,
        updatedAt: ts(timeOn(env.cal.canolitaire.ed(d.index), 12)),
      },
    });
  }
  return out;
}

/** chainUserData (squaredleSourceCode/lib/data/stats.dart). [boards]: {index, kind ('d'|'m')}, all solved. */
function canoggle(env, id, boards, { cw = 0 } = {}) {
  const req = { d: 14, m: 6 };
  const pts = { d: 140, m: 60 };
  const main = boards.filter((b) => b.kind === 'd');
  const sd = new Set(main.map((b) => b.index));
  const { st, ld } = dayStreak(sd, env.today('canoggle'));
  const rs = {};
  for (const b of boards) {
    rs[`${b.index}-${b.kind}`] = [weekdayOf(env.cal.canoggle.ed(b.index)), pts[b.kind], b.kind === 'd' ? 380000 : 90000, 0, 1];
  }
  const out = [{
    path: ['chainUserData', id],
    data: {
      ms: main.length, mn: boards.length - main.length, mr: 0,
      wf: boards.reduce((n, b) => n + req[b.kind], 0), bf: 0, cw, bc: 0,
      st, mx: longestRun(sd), ld, sd: [...sd].sort((a, b) => a - b), rs, updatedAt: ts(env.nowMs),
    },
  }];
  for (const b of boards) {
    out.push({
      path: ['chainUserData', id, 'games', `${b.index}.${b.kind}`],
      data: {
        day: b.index, kind: b.kind, req: req[b.kind], bonus: 0, solved: true, pts: pts[b.kind], bw: [],
        updatedAt: ts(timeOn(env.cal.canoggle.ed(b.index), 13)),
      },
    });
  }
  return out;
}

/**
 * anagramUserData (canagramsSourceCode/lib/data/stats.dart). [solves]:
 * {index, hints}. [counts] sets running totals the history alone doesn't
 * reach (no-hint solves, bonus words, Canuckle words), to put a badge one
 * puzzle away; the game keeps the larger of its own and the server's.
 */
function canagrams(env, id, solves, counts = {}) {
  const ms = 260000;
  const points = 980;
  const words = 14;
  const sd = new Set(solves.map((s) => s.index));
  const { st, ld } = dayStreak(sd, env.today('canagrams'));
  const rs = {};
  let sundays = 0;
  for (const s of solves) {
    const wd = weekdayOf(env.cal.canagrams.ed(s.index));
    if (wd === 7 && !s.hints) sundays++;
    rs[s.index] = [wd, points, ms, 0, s.hints];
  }
  const out = [{
    path: ['anagramUserData', id],
    data: {
      ds: solves.length,
      nh: counts.nh ?? solves.filter((s) => !s.hints).length,
      pt: points * solves.length,
      bp: solves.length ? points : 0,
      ft: solves.length ? ms : 0,
      wf: words * solves.length,
      bf: counts.bf ?? 0,
      cw: counts.cw ?? 0,
      sn: sundays,
      fe: 0,
      st, mx: longestRun(sd), ld, sd: [...sd].sort((a, b) => a - b), rs, updatedAt: ts(env.nowMs),
    },
  }];
  for (const s of solves) {
    out.push({
      path: ['anagramUserData', id, 'games', String(s.index)],
      data: {
        day: s.index, pts: points, ms, hints: s.hints, words, bonus: 0, bw: [], cw: false, solved: true,
        updatedAt: ts(timeOn(env.cal.canagrams.ed(s.index), 8)),
      },
    });
  }
  return out;
}

// ---- The accounts ------------------------------------------------------------

/** Canuckle wins on each of [ks] (days from today), [guesses] each unless set. */
const canuckleWins = (env, ks, guesses = 4) => ks.map((k) => ({ index: env.at('canuckle', k), win: true, guesses }));
const duoWins = (env, ks, finishedOn = 5) => ks.map((k) => ({ index: env.at('duo', k), win: true, finishedOn }));
const canokuDays = (env, ks, modes = ['EASY']) => ks.map((k) => ({ index: env.at('canoku', k), modes }));
const doc = (path, data) => ({ path, data });

/**
 * Every account. Each: {code, phase, title, story, before, steps, after,
 * expect: {before: badge ids earned as seeded, after: ids newly earned once
 * [steps] are played}, streaks: {game: [current, best]} as seeded, build(played)}.
 */
function definitions(env) {
  const T = (k) => env.at('canuckle', k);
  const list = [];
  const add = (a) => list.push(a);

  // -- Phase 1: legacy players ------------------------------------------------

  add({
    code: 'L01', phase: 1, title: 'Canuckle veteran',
    story: 'About 400 Canuckle games: a 210-day streak long ago, and a 120-day streak running up to yesterday. 12 archive games, one 2-guess win, a month in hard mode.',
    before: ['The Arena opens with a one-time summary of badges earned, not a pop-up for each.', 'Canuckle: current streak 120, best 210.', 'Streak ladder up to Legend (200). Getting Going, Regular, Devoted, Two and Through, Time Traveller, Badge Collector.'],
    steps: ['Play and win today\'s Canuckle.'],
    after: ['Current streak 121. No new badges.'],
    streaks: { canuckle: [120, 210] },
    expect: {
      before: ['canuckle.first', ...[5, 10, 20, 25, 30, 40, 50, 75, 100, 125, 150, 200].map((n) => `canuckle.streak${n}`),
        'canuckle.total10', 'canuckle.total50', 'canuckle.total250', 'canuckle.quick', 'canuckle.archive', 'family.collector'],
      after: [],
    },
    build(id, played) {
      const daily = [];
      for (let k = 400; k >= 191; k--) daily.push({ index: T(-k), win: true, guesses: k === 300 ? 2 : 3 + (k % 4) });
      for (let k = 190; k >= 121; k--) {
        if (k === 190 || (k % 5 === 0 && k !== 121)) continue;
        daily.push({ index: T(-k), win: k !== 121 && k % 7 !== 0, guesses: 3 + (k % 3) });
      }
      for (let k = 120; k >= 1; k--) daily.push({ index: T(-k), win: true, guesses: 3 + (k % 4), hard: k >= 31 && k <= 60 });
      for (let j = 0; j < 12; j++) daily.push({ index: 200 + j, win: true, guesses: 4, archive: true, playedEd: env.todayEd - 150 + j });
      if (played) daily.push({ index: T(0), win: true, guesses: 4 });
      return [doc(['newUserData', id], newUser(env, { daily, shape: '302' }))];
    },
  });

  add({
    code: 'L02', phase: 1, title: 'Canuckle+ regular',
    story: '25 weeks of Canuckle+ (one loss, 15 weeks ago), with a 14-week streak up to last week. A few daily Canuckles.',
    before: ['Canuckle+: streak 14 weeks, 25 played, 24 won.', 'Monthly Regular, Season Pass, Getting Going, Regular. Canuckle First Finish.'],
    steps: ['Play and win this week\'s Canuckle+.'],
    after: ['Canuckle+ streak 15. No new badges.'],
    streaks: { plus: [14, 14] },
    expect: {
      before: ['plus.first', 'plus.streak4', 'plus.streak12', 'plus.total5', 'plus.total20', 'canuckle.first'],
      after: [],
    },
    build(id, played) {
      const P = (k) => env.at('plus', k * 7);
      const plus = [];
      for (let w = 25; w >= 1; w--) plus.push({ index: P(-w), win: w !== 15, guesses: 3 + (w % 3) });
      if (played) plus.push({ index: P(0), win: true, guesses: 4 });
      const daily = canuckleWins(env, [-3, -2, -1]);
      return [doc(['newUserData', id], newUser(env, { daily, plus, shape: '302' }))];
    },
  });

  add({
    code: 'L03', phase: 1, title: 'Canoku, all sizes',
    story: 'Canoku only (already on the new save format): 119 days solved, an 84-day run, a 35-day streak up to yesterday. Every 10th day all three sizes, and one 9×9 Expert.',
    before: ['Canoku: streak 35, best 84.', 'First Finish, On a Roll, Month Strong, Getting Going, Regular, Clean Sweep, Expert, Eh?'],
    steps: ['Open Canoku and solve today\'s 9×9, 6×6 and 4×4 boards (any level).'],
    after: ['Streak 36. No new badges; Clean Sweep shows one more.'],
    streaks: { canoku: [35, 84] },
    expect: {
      before: ['canoku.first', 'canoku.streak7', 'canoku.streak30', 'canoku.total10', 'canoku.total50', 'canoku.sweep', 'canoku.expert'],
      after: [],
    },
    build(id, played) {
      const days = [];
      for (let k = 120; k >= 1; k--) {
        if (k === 36) continue;
        const modes = k % 10 === 0 ? ['EASY', 'EASY6X6', 'EASY4X4'] : ['EASY'];
        if (k === 50) modes.push('VHARD');
        days.push({ index: env.at('canoku', -k), modes });
      }
      if (played) days.push({ index: env.at('canoku', 0), modes: ['MED', 'MED6X6', 'MED4X4'] });
      return canoku(env, id, { days });
    },
  });

  add({
    code: 'L04', phase: 1, title: 'Canoku 2.1.0 saves',
    story: 'A Canoku player still on the 2.1.0 save format: a board document per puzzle, no completedModes. A 20-day streak up to yesterday, all three sizes 3 days ago, and a 6×6 left unfinished yesterday.',
    before: ['Open the Arena first. Canoku: streak 20, Clean Sweep, On a Roll, Getting Going, First Finish.'],
    steps: ['Open Canoku (this moves the old saves; it reads about 1,100 days, so give it a minute).', 'Come back to the Arena and reload.', 'In Canoku, open yesterday from the archive: the unfinished 6×6 should be there to carry on.'],
    after: ['Same stats and badges as before. Nothing lost.', 'Firebase console: the doc now has savesVersion 2 and completedModes, and the old per-day subcollections are gone.'],
    streaks: { canoku: [20, 20] },
    expect: { before: ['canoku.first', 'canoku.streak7', 'canoku.total10', 'canoku.sweep'], after: [] },
    build(id) {
      const days = [];
      for (let k = 20; k >= 1; k--) days.push({ index: env.at('canoku', -k), modes: k === 3 ? ['EASY', 'EASY6X6', 'EASY4X4'] : ['EASY'] });
      return canoku(env, id, { days, legacy: true, unfinished: [{ index: env.at('canoku', -1), mode: 'EASY6X6' }] });
    },
  });

  add({
    code: 'L05', phase: 1, title: 'Old-format Canuckle games',
    story: 'A Canuckle 3.0.2 account whose first 8 games are in the very old stored format (guesses as rows). 15 games: a loss 10 days ago, then a 9-day streak.',
    before: ['Canuckle: 15 played, 14 won, streak 9.', 'First Finish, Star, Getting Going.'],
    steps: ['Open Canuckle and check the stats and the archive calendar show all 15 games.', 'Play and win today\'s Canuckle.', 'Play today\'s Duo too.'],
    after: ['Canuckle streak 10: Bronze Team. Duo First Finish, and Daily Double if Duo was won. Still 15 earlier games (none lost by the save).'],
    streaks: { canuckle: [9, 9] },
    expect: {
      before: ['canuckle.first', 'canuckle.streak5', 'canuckle.total10'],
      after: ['canuckle.streak10', 'duo.first', 'duo.dailydouble'],
    },
    build(id, played) {
      const daily = [];
      for (let k = 15; k >= 1; k--) daily.push({ index: T(-k), win: k !== 10, guesses: 3 + (k % 3), old: k > 7 });
      if (played) {
        daily.push({ index: T(0), win: true, guesses: 4 });
        return [doc(['newUserData', id], newUser(env, { daily, duo: [{ index: env.at('duo', 0), win: true, finishedOn: 5 }] }))];
      }
      return [doc(['newUserData', id], newUser(env, { daily, shape: '302' }))];
    },
  });

  add({
    code: 'L06', phase: 1, title: 'Broken streak',
    story: 'A 40-day Canuckle streak that ended with a loss 3 days ago, and nothing since.',
    before: ['Canuckle: current streak 0, best 40.', 'Ladder up to 40 Club, Getting Going.'],
    steps: ['Play and win today\'s Canuckle.'],
    after: ['Current streak 1, best still 40. No new badges.'],
    streaks: { canuckle: [0, 40] },
    expect: {
      before: ['canuckle.first', ...[5, 10, 20, 25, 30, 40].map((n) => `canuckle.streak${n}`), 'canuckle.total10'],
      after: [],
    },
    build(id, played) {
      const daily = canuckleWins(env, range(-43, -4));
      daily.push({ index: T(-3), win: false });
      if (played) daily.push({ index: T(0), win: true, guesses: 4 });
      return [doc(['newUserData', id], newUser(env, { daily, shape: '302' }))];
    },
  });

  add({
    code: 'L07', phase: 1, title: 'Canuckle and Canoku, both today',
    story: 'Plays Canuckle and Canoku every day and has already done both today: Canuckle streak 29, Canoku streak 31. Never played Duo.',
    before: ['Canuckle streak 29, Canoku streak 31. Badge Collector (exactly 10 badges). No Hat Trick (only two games).'],
    steps: ['Win today\'s Duo.'],
    after: ['New: Duo First Finish, Hat Trick (three daily games today), Daily Double (Canuckle and Duo won today).'],
    streaks: { canuckle: [29, 29], canoku: [31, 31] },
    expect: {
      before: ['canuckle.first', ...[5, 10, 20, 25].map((n) => `canuckle.streak${n}`), 'canuckle.total10',
        'canoku.first', 'canoku.streak7', 'canoku.streak30', 'canoku.total10', 'family.collector'],
      after: ['duo.first', 'family.hattrick', 'duo.dailydouble'],
    },
    build(id, played) {
      const daily = canuckleWins(env, range(-28, 0));
      const user = played
        ? newUser(env, { daily, duo: [{ index: env.at('duo', 0), win: true, finishedOn: 5 }] })
        : newUser(env, { daily, shape: '302' });
      return [doc(['newUserData', id], user), ...canoku(env, id, { days: canokuDays(env, range(-30, 0)) })];
    },
  });

  add({
    code: 'L08', phase: 1, title: 'Light player with an email',
    story: 'Three Canuckle games (win, loss, win) and a linked email address.',
    before: ['Canuckle: 3 played, streak 1. First Finish only.', 'Settings shows the linked email qa-<initials>@example.com.'],
    steps: ['Play today\'s Canuckle.', 'Check the email is still linked in Canuckle\'s settings and the Arena.'],
    after: ['Streak 2 if won. No new badges. Email unchanged.'],
    streaks: { canuckle: [1, 1] },
    expect: { before: ['canuckle.first'], after: [] },
    build(id, played) {
      const daily = [{ index: T(-3), win: true, guesses: 5 }, { index: T(-2), win: false }, { index: T(-1), win: true, guesses: 4 }];
      if (played) daily.push({ index: T(0), win: true, guesses: 4 });
      const tester = id.split('-')[1].toLowerCase();
      return [doc(['newUserData', id], newUser(env, { daily, shape: '302', email: `qa-${tester}@example.com` }))];
    },
  });

  add({
    code: 'L09', phase: 1, title: 'Returning Arena player',
    story: 'Already visited the Arena: it holds 5 Canuckle badges, including the retired On a Roll. Since then they\'ve played 10 days of Canoku, which the Arena hasn\'t seen yet.',
    before: ['No backfill summary. Three Canoku badges are announced one at a time: First Finish, On a Roll, Getting Going.', 'Canuckle\'s retired On a Roll still shows.'],
    steps: ['Dismiss the announcements, reload the Arena.'],
    after: ['Nothing announced again after the reload.'],
    streaks: { canuckle: [12, 12], canoku: [10, 10] },
    stored: ['canuckle.first', 'canuckle.streak5', 'canuckle.streak7', 'canuckle.streak10', 'canuckle.total10'],
    expect: {
      before: ['canuckle.first', 'canuckle.streak5', 'canuckle.streak7', 'canuckle.streak10', 'canuckle.total10',
        'canoku.first', 'canoku.streak7', 'canoku.total10'],
      after: [],
    },
    build(id) {
      const daily = canuckleWins(env, range(-12, -1));
      const seen = timeOn(env.todayEd - 12, 20);
      const badge = (k, on) => {
        const at = ts(timeOn(env.todayEd + k, 9));
        return { earnedAt: at, dated: true, announcedAt: ts(seen), ...(on ? { on } : {}) };
      };
      const arena = {
        badges: {
          'canuckle.first': badge(-12),
          'canuckle.streak5': badge(-8, [T(-8)]),
          'canuckle.streak7': badge(-6, [T(-6)]),
          'canuckle.streak10': badge(-3, [T(-3)]),
          'canuckle.total10': badge(-3),
        },
        createdAt: ts(timeOn(env.todayEd - 12, 20)),
        updatedAt: ts(timeOn(env.todayEd - 3, 20)),
      };
      return [
        doc(['newUserData', id], newUser(env, { daily, shape: '302' })),
        ...canoku(env, id, { days: canokuDays(env, range(-10, -1)) }),
        doc(['arenaUserData', id], arena),
      ];
    },
  });

  add({
    code: 'L10', phase: 1, title: 'Canuckle Immortal',
    story: 'A 1,000-day Canuckle streak running up to yesterday: every day since early 2024.',
    before: ['The backfill summary lists the whole streak ladder, from Star to Immortal (1,000).', 'Canuckle: current streak 1,000, best 1,000, 1,000 played.', 'Getting Going, Regular, Devoted, Badge Collector.'],
    steps: ['Play and win today\'s Canuckle.'],
    after: ['Current streak 1,001. No new badges.'],
    streaks: { canuckle: [1000, 1000] },
    expect: {
      before: ['canuckle.first',
        ...[5, 10, 20, 25, 30, 40, 50, 75, 100, 125, 150, 200, 250, 300, 350, 365, 400, 500, 600, 700, 750, 800, 900, 1000]
          .map((n) => `canuckle.streak${n}`),
        'canuckle.total10', 'canuckle.total50', 'canuckle.total250', 'family.collector'],
      after: [],
    },
    build(id, played) {
      const daily = [];
      for (let k = 1000; k >= 1; k--) daily.push({ index: T(-k), win: true, guesses: 3 + (k % 4) });
      if (played) daily.push({ index: T(0), win: true, guesses: 4 });
      return [doc(['newUserData', id], newUser(env, { daily, shape: '302' }))];
    },
  });

  // -- Phase 2: one play from a badge ------------------------------------------

  add({
    code: 'N01', phase: 2, title: 'Duo: four at once',
    story: 'Duo streak of 4 up to yesterday, with 9 Perfect Duos (solved by guess 4), the last one yesterday. Today\'s Canuckle is already won.',
    before: ['Duo: streak 4, 11 played. Perfect Duo, Getting Going, First Finish.'],
    steps: ['Win today\'s Duo by your 4th guess.'],
    after: ['New: Star (streak 5), Perfect Ten, Double Double (Perfect Duos two days running), Daily Double (Canuckle and Duo won today).'],
    streaks: { duo: [4, 4] },
    expect: {
      before: ['duo.first', 'duo.perfect', 'duo.total10', 'canuckle.first'],
      after: ['duo.streak5', 'duo.perfect10', 'duo.doubledouble', 'duo.dailydouble'],
    },
    build(id, played) {
      const duo = [
        ...[-20, -18, -16, -14, -12, -10, -8].map((k) => ({ index: env.at('duo', k), win: true, finishedOn: 4 })),
        { index: env.at('duo', -4), win: true, finishedOn: 6 },
        { index: env.at('duo', -3), win: true, finishedOn: 4 },
        { index: env.at('duo', -2), win: true, finishedOn: 5 },
        { index: env.at('duo', -1), win: true, finishedOn: 3 },
      ];
      if (played) duo.push({ index: env.at('duo', 0), win: true, finishedOn: 4 });
      return [doc(['newUserData', id], newUser(env, { daily: canuckleWins(env, [0], 3), duo }))];
    },
  });

  add({
    code: 'N02', phase: 2, title: 'Canagrams: streak and counts',
    story: 'Canagrams streak of 6 up to yesterday (16 solved). 24 puzzles solved without a hint, 45 bonus words and 9 Canuckle words found.',
    before: ['Canagrams: streak 6, 16 solved. First Finish, Getting Going.'],
    steps: ['Solve today\'s Canagrams with no hints, finding 5 or more bonus words and the Canuckle word.'],
    after: ['New: On a Roll, No Peeking (25), Bonus Hunter (50), Canuckle Connection (10). On a Sunday, also Full Week (Monday to Sunday).'],
    streaks: { canagrams: [6, 6] },
    expect: {
      before: ['canagrams.first', 'canagrams.total10'],
      after: ['canagrams.streak7', 'canagrams.nopeek25', 'canagrams.bonus50', 'canagrams.canuckle10'],
      afterSunday: ['canagrams.fullweek1'],
    },
    build(id, played) {
      const solves = [...range(-18, -14), ...range(-12, -8), ...range(-6, -1)].map((k) => ({ index: env.at('canagrams', k), hints: 0 }));
      const counts = { nh: 24, bf: 45, cw: 9 };
      if (played) {
        solves.push({ index: env.at('canagrams', 0), hints: 0 });
        Object.assign(counts, { nh: 25, bf: 50, cw: 10 });
      }
      return [doc(['newUserData', id], newUserStub(env.nowMs)), ...canagrams(env, id, solves, counts)];
    },
  });

  add({
    code: 'N03', phase: 2, title: 'Canominoes: Hard for the sweep',
    story: 'Canominoes Easy solved for the last 3 days, and today\'s Easy and Medium already solved. Never solved a Hard.',
    before: ['Canominoes: streak 4, 5 solved. First Finish only.'],
    steps: ['Solve today\'s Hard.'],
    after: ['New: Clean Sweep and Hard Case.'],
    streaks: { canominoes: [4, 4] },
    expect: { before: ['canominoes.first'], after: ['canominoes.sweep', 'canominoes.hard'] },
    build(id, played) {
      const solves = [-3, -2, -1].map((k) => ({ index: env.at('canominoes', k), tier: 'e' }));
      solves.push({ index: env.at('canominoes', 0), tier: 'e' }, { index: env.at('canominoes', 0), tier: 'm' });
      if (played) solves.push({ index: env.at('canominoes', 0), tier: 'h' });
      return [doc(['newUserData', id], newUserStub(env.nowMs)), ...canominoes(env, id, solves)];
    },
  });

  add({
    code: 'N04', phase: 2, title: 'Canoggle: main board for the sweep',
    story: 'Canoggle main board solved for the last 6 days (no Minis), and today\'s Mini already solved. 9 Canuckle words found.',
    before: ['Canoggle: streak 6. First Finish only.'],
    steps: ['Solve today\'s main board.'],
    after: ['New: On a Roll and Clean Sweep. Canuckle Connection too if the board had the Canuckle word and you found it.'],
    streaks: { canoggle: [6, 6] },
    expect: { before: ['canoggle.first'], after: ['canoggle.streak7', 'canoggle.sweep'] },
    build(id, played) {
      const boards = range(-6, -1).map((k) => ({ index: env.at('canoggle', k), kind: 'd' }));
      boards.push({ index: env.at('canoggle', 0), kind: 'm' });
      if (played) boards.push({ index: env.at('canoggle', 0), kind: 'd' });
      return [doc(['newUserData', id], newUserStub(env.nowMs)), ...canoggle(env, id, boards, { cw: 9 })];
    },
  });

  add({
    code: 'N05', phase: 2, title: 'Canolitaire: play, sweep, Draw 3',
    story: 'Canolitaire Draw 1 Easy won on each of the last 6 days. Never won a Draw 3 deal.',
    before: ['Canolitaire: streak 6 (days played). First Finish only.'],
    steps: ['Play any deal today (win or lose): On a Roll.', 'Win any Draw 3 deal: Three\'s Company.', 'If you can, win all three Draw 1 deals today: Clean Sweep.'],
    after: ['New: On a Roll, Three\'s Company, and Clean Sweep if you won all three Draw 1 deals.'],
    streaks: { canolitaire: [6, 6] },
    expect: { before: ['canolitaire.first'], after: ['canolitaire.streak7', 'canolitaire.draw3', 'canolitaire.sweep'] },
    build(id, played) {
      const deals = range(-6, -1).map((k) => ({ index: env.at('canolitaire', k), draw: 1, tier: 'e', won: true }));
      if (played) {
        const i = env.at('canolitaire', 0);
        deals.push(...['e', 'm', 'h'].map((tier) => ({ index: i, draw: 1, tier, won: true })), { index: i, draw: 3, tier: 'e', won: true });
      }
      return [doc(['newUserData', id], newUserStub(env.nowMs)), ...canolitaire(env, id, deals)];
    },
  });

  add({
    code: 'N06', phase: 2, title: 'Hat Trick Week',
    story: 'Canuckle, Canoku and Duo finished on each of the last 6 days (six Hat Tricks in a row). Today Canuckle and Canoku are done.',
    before: ['Hat Trick earned. Hat Trick Week shows 6 of 7.'],
    steps: ['Win today\'s Duo.'],
    after: ['New: Hat Trick Week. Hat Trick count goes up by one.'],
    streaks: { canuckle: [7, 7], canoku: [7, 7], duo: [6, 6] },
    expect: {
      before: ['canuckle.first', 'canuckle.streak5', 'canoku.first', 'canoku.streak7', 'duo.first', 'duo.streak5', 'duo.dailydouble', 'family.hattrick'],
      after: ['family.hattrickweek'],
    },
    build(id, played) {
      const duo = duoWins(env, played ? range(-6, 0) : range(-6, -1));
      return [
        doc(['newUserData', id], newUser(env, { daily: canuckleWins(env, range(-6, 0)), duo })),
        ...canoku(env, id, { days: canokuDays(env, range(-6, 0)) }),
      ];
    },
  });

  add({
    code: 'N07', phase: 2, title: 'True North',
    story: 'Canuckle streak 35 and Canoku streak 32, both up to yesterday. Duo streak 29 up to yesterday.',
    before: ['True North shows 2 of 3 games.'],
    steps: ['Win today\'s Duo.'],
    after: ['New: True North and Duo\'s 30 Club.'],
    streaks: { canuckle: [35, 35], canoku: [32, 32], duo: [29, 29] },
    expect: {
      before: ['canuckle.first', ...[5, 10, 20, 25, 30].map((n) => `canuckle.streak${n}`), 'canuckle.total10',
        'canoku.first', 'canoku.streak7', 'canoku.streak30', 'canoku.total10',
        'duo.first', ...[5, 10, 20, 25].map((n) => `duo.streak${n}`), 'duo.total10', 'duo.dailydouble',
        'family.hattrick', 'family.hattrickweek', 'family.collector'],
      after: ['duo.streak30', 'family.truenorth'],
    },
    build(id, played) {
      const duo = duoWins(env, played ? range(-29, 0) : range(-29, -1));
      return [
        doc(['newUserData', id], newUser(env, { daily: canuckleWins(env, range(-35, -1)), duo })),
        ...canoku(env, id, { days: canokuDays(env, range(-32, -1)) }),
      ];
    },
  });

  add({
    code: 'N08', phase: 2, title: 'Explorer and Full Slate',
    story: 'Has played every game except Canolitaire, and today finished all six other daily games. Canuckle+ played last week.',
    before: ['Explorer shows 7 of 8. Full Slate shows 6 of 7 today.'],
    steps: ['Play any Canolitaire deal today (win or lose).'],
    after: ['New: Canolitaire First Finish, Explorer, Full Slate, and Badge Collector (the 10th badge).'],
    streaks: {},
    expect: {
      before: ['canuckle.first', 'plus.first', 'canoku.first', 'duo.first', 'canagrams.first', 'canoggle.first', 'canominoes.first',
        'duo.dailydouble', 'family.hattrick'],
      after: ['canolitaire.first', 'family.explorer', 'family.fullslate', 'family.collector'],
    },
    build(id, played) {
      const plus = [{ index: env.at('plus', -7), win: true, guesses: 4 }];
      const out = [
        doc(['newUserData', id], newUser(env, { daily: canuckleWins(env, [0]), plus, duo: duoWins(env, [0]) })),
        ...canoku(env, id, { days: canokuDays(env, [0]) }),
        ...canagrams(env, id, [{ index: env.at('canagrams', 0), hints: 1 }]),
        ...canoggle(env, id, [{ index: env.at('canoggle', 0), kind: 'd' }]),
        ...canominoes(env, id, [{ index: env.at('canominoes', 0), tier: 'e' }]),
      ];
      if (played) out.push(...canolitaire(env, id, [{ index: env.at('canolitaire', 0), draw: 1, tier: 'e', won: false }]));
      return out;
    },
  });

  add({
    code: 'N09', phase: 2, title: 'Badge Collector',
    story: 'Exactly 9 badges: Canuckle (First Finish, Star, Bronze Team, Getting Going), Canoku (First Finish, On a Roll, Getting Going), Duo and Canagrams First Finish.',
    before: ['Badge Collector shows 9 of 10.'],
    steps: ['Finish any puzzle in a game not yet played, e.g. today\'s Canominoes Easy.'],
    after: ['New: that game\'s First Finish and Badge Collector.'],
    streaks: { canuckle: [0, 10], canoku: [10, 10] },
    expect: {
      before: ['canuckle.first', 'canuckle.streak5', 'canuckle.streak10', 'canuckle.total10',
        'canoku.first', 'canoku.streak7', 'canoku.total10', 'duo.first', 'canagrams.first'],
      after: ['canominoes.first', 'family.collector'],
    },
    build(id, played) {
      const out = [
        doc(['newUserData', id], newUser(env, { daily: canuckleWins(env, range(-20, -11), 4), duo: duoWins(env, [-25]) })),
        ...canoku(env, id, { days: canokuDays(env, range(-10, -1)) }),
        ...canagrams(env, id, [{ index: env.at('canagrams', -22), hints: 2 }]),
      ];
      if (played) out.push(...canominoes(env, id, [{ index: env.at('canominoes', 0), tier: 'e' }]));
      return out;
    },
  });

  add({
    code: 'N10', phase: 2, title: 'Brand new player',
    story: 'An empty account, as any of the new games creates on a first save.',
    before: ['Every game shows no progress. No badges.'],
    steps: ['Play one puzzle in each game you like.'],
    after: ['First Finish for each game finished. Three daily games today also gives Hat Trick.'],
    streaks: {},
    expect: { before: [], after: ['canuckle.first'] },
    build(id, played) {
      if (played) return [doc(['newUserData', id], newUser(env, { daily: canuckleWins(env, [0]) }))];
      return [doc(['newUserData', id], newUserStub(env.nowMs))];
    },
  });

  add({
    code: 'N11', phase: 2, title: 'Canominoes: archive fills the gap',
    story: 'Canominoes Easy solved on 6 days in a row, ending 2 days ago. Yesterday was missed.',
    before: ['Canominoes: streak 0, best 6.'],
    steps: ['Solve today\'s Easy: streak 1, no badge.', 'Then solve yesterday\'s Easy from the archive.'],
    after: ['Streak 8 (the archive solve fills the gap): On a Roll.'],
    streaks: { canominoes: [0, 6] },
    expect: { before: ['canominoes.first'], after: ['canominoes.streak7'] },
    build(id, played) {
      const solves = range(-7, -2).map((k) => ({ index: env.at('canominoes', k), tier: 'e' }));
      if (played) solves.push(...[0, -1].map((k) => ({ index: env.at('canominoes', k), tier: 'e' })));
      return [doc(['newUserData', id], newUserStub(env.nowMs)), ...canominoes(env, id, solves)];
    },
  });

  return list;
}

/**
 * Every account for [testers] (keys of TESTERS) and [phases], with today's
 * dates. [words]: {canuckle(i), plus(i), duo(i) -> [a, b]} give the real
 * answers (null when unknown). Returns {accounts, problems}; seed nothing
 * while problems lists anything (a puzzle missing or not yet launched).
 * Each account's docs are {path: [collection, id, ...], data}.
 */
export function buildAccounts({ todayEd, offsetWeeks, nowMs, words, testers = Object.keys(TESTERS), phases = [1, 2], played = false }) {
  const env = makeEnv({ todayEd, offsetWeeks, nowMs, words });
  const accounts = [];
  for (const tester of testers) {
    for (const def of definitions(env).filter((d) => phases.includes(d.phase))) {
      const id = seedId(tester, def.code);
      accounts.push({ ...def, id, tester, docs: def.build(id, played) });
    }
  }
  return { accounts, problems: [...new Set(env.problems)] };
}

/** Every QA account ID there can be, for deleting. */
export function allSeedIds() {
  const codes = definitions(makeEnv({ todayEd: 0, offsetWeeks: 0, nowMs: 0, words: {} })).map((d) => d.code);
  return Object.keys(TESTERS).flatMap((t) => codes.map((c) => seedId(t, c)));
}
