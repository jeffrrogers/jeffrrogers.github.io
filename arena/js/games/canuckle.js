// Canuckle: the daily five-letter word game, at the site root.
//
// Source: canuckleSourceCode/lib/words.dart (todayIndex) and user.dart.
// Progress lives in newUserData/{id}: `games` is a list of JSON strings
// {answer, index, userGuesses, results, isFromArchive}; older entries use
// {guesses: [{guess}]} instead of userGuesses.

import { epochDay } from '../dates.js?v=202610040159';
import { parseJsonList, pct } from './common.js?v=202610040159';
import {
  SOLVED, FAILED, PROGRESS, emptyProgress, mark, currentStreak, longestStreak, num,
} from '../status.js?v=202610040159';

const ORIGINAL_START = epochDay(2022, 2, 10); // games #1-#142
const ORIGINAL_END = epochDay(2022, 7, 1);
const START = epochDay(2022, 10, 4);          // game #143 onward

export const MAX_GUESSES = 6;

/** Guesses and outcome for one stored Canuckle game (daily or Plus). */
export function readGame(g) {
  const guesses = Array.isArray(g.userGuesses)
    ? g.userGuesses
    : Array.isArray(g.guesses) ? g.guesses.map((x) => (x && x.guess) || '') : [];
  const answer = String(g.answer || '').toUpperCase();
  const last = String(guesses[guesses.length - 1] || '').toUpperCase();
  const won = guesses.length > 0 && answer !== '' && last === answer;
  let status = null;
  if (won) status = SOLVED;
  else if (guesses.length >= MAX_GUESSES) status = FAILED;
  else if (guesses.length > 0) status = PROGRESS;
  return { index: num(g.index), status, guesses: guesses.length, archive: g.isFromArchive === true };
}

function parseStats(s) {
  try {
    const o = typeof s === 'string' ? JSON.parse(s) : s;
    return o && typeof o === 'object' ? o : null;
  } catch {
    return null;
  }
}

const DIST_KEYS = ['oneGuessWins', 'twoGuessWins', 'threeGuessWins', 'fourGuessWins',
  'fiveGuessWins', 'sixGuessWins'];

export function distribution(...statsStrings) {
  const dist = [0, 0, 0, 0, 0, 0];
  let losses = 0;
  for (const s of statsStrings) {
    const o = parseStats(s);
    if (!o) continue;
    DIST_KEYS.forEach((k, i) => { dist[i] += num(o[k]); });
    losses += num(o.losses);
  }
  return { dist, losses };
}

export const canuckle = {
  id: 'canuckle',
  name: 'Canuckle',
  logo: 'images/canuckle.svg',
  color: '#D52B1E',
  blurb: 'Daily five-letter word',
  cadence: 'daily',
  step: 1,
  firstEd: ORIGINAL_START,
  tiers: [],

  indexForEd(ed) {
    if (ed < ORIGINAL_START) return null;
    if (ed <= ORIGINAL_END) return ed - ORIGINAL_START + 1;
    if (ed < START) return null;
    return ed - START + 143;
  },
  edForIndex(i) {
    return i <= 142 ? ORIGINAL_START + i - 1 : START + i - 143;
  },
  todayIndex(todayEd) {
    return this.indexForEd(todayEd);
  },
  label: (i) => `#${i}`,

  link(index, _tier, isToday) {
    return isToday ? '/' : `/?game=${index}`;
  },

  async fetch({ uid, reader }) {
    const doc = await reader.getDoc(['newUserData', uid]);
    if (!doc) return null;
    return {
      games: doc.games || [],
      streak: doc.streak,
      maxStreak: doc.maxStreak,
      normalStats: doc.normalStats,
      hardModeStats: doc.hardModeStats,
    };
  },

  derive(raw, { todayIdx }) {
    const p = emptyProgress();
    if (!raw) return p;
    const winDays = new Set();
    let archive = 0;
    let quickWin = false;
    for (const g of parseJsonList(raw.games).map(readGame)) {
      if (!g.index || g.index > 50000 || !g.status) continue;
      mark(p, g.index, g.status);
      if (g.status !== PROGRESS) {
        p.played++;
        p.doneIdx.add(g.index);
      }
      if (g.status === SOLVED) {
        p.solved++;
        if (!g.archive) winDays.add(g.index);
        if (g.guesses <= 2) quickWin = true;
      }
      if (g.archive && g.status !== PROGRESS) archive++;
    }
    const { dist, losses } = distribution(raw.normalStats, raw.hardModeStats);
    p.streak = currentStreak(winDays, todayIdx);
    p.maxStreak = Math.max(num(raw.maxStreak), longestStreak(winDays), p.streak);
    p.flags = { quickWin: quickWin || dist[0] + dist[1] > 0, archive };
    p.dist = dist;
    p.losses = losses;
    return p;
  },

  summary(p) {
    const wins = p.dist ? p.dist.reduce((a, b) => a + b, 0) : 0;
    const total = wins > 0 ? p.dist.reduce((a, n, i) => a + n * (i + 1), 0) : 0;
    return {
      headline: { label: 'Avg guesses', value: wins ? (total / wins).toFixed(1) : '–' },
      winRate: pct(p.solved, p.played),
    };
  },

  detail(p) {
    const dist = p.dist || [0, 0, 0, 0, 0, 0];
    return [
      {
        title: 'Guess distribution',
        bars: [...dist.map((v, i) => ({ label: String(i + 1), value: v })),
          { label: 'X', value: p.losses || 0 }],
      },
      {
        title: 'Record',
        rows: [
          ['Games finished', p.played],
          ['Wins', p.solved],
          ['Win rate', `${pct(p.solved, p.played)}%`],
          ['Archive games', p.flags.archive || 0],
        ],
      },
    ];
  },
};
