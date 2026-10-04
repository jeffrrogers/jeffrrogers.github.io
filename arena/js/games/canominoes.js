// Canominoes: three daily domino puzzles (Easy / Medium / Hard).
//
// Source: pipsSourceCode/lib/model/daily.dart (day 1 = 2026-09-02, fixed at
// launch) and data/{stats,user,prefs_keys}.dart. dominoUserData/{id} is the
// stats blob {e,m,h: {p,w,bs,fm,ts}, st, ms, ld, sd}; games/{day}.{tier}
// holds {day, tier, sec, mc, solved} and is only written on a solve, so
// in-progress boards come from this browser's domGame_{day}_{tier} saves.

import { daily, pct } from './common.js?v=202610040233';
import { duration } from '../dates.js?v=202610040233';
import { readPref } from '../local.js?v=202610040233';
import {
  SOLVED, PROGRESS, emptyProgress, mark, storedStreak, intList, num,
} from '../status.js?v=202610040233';

const LEVELS = [
  { key: 'e', label: 'Easy' },
  { key: 'm', label: 'Medium' },
  { key: 'h', label: 'Hard' },
];

export const canominoes = {
  id: 'canominoes',
  name: 'Canominoes',
  logo: 'images/canominoes.svg',
  color: '#2A2A33',
  blurb: 'Fill the board with dominoes, three puzzles a day.',
  card: { tint: ['#E9E9EE', '#24242B'], frame: ['#C4C4CF', '#3A3A45'] },
  ...daily(2026, 9, 2),
  tiers: LEVELS,
  resultLabel(entry) {
    const solved = Object.values(entry?.tiers || {}).filter((s) => s === SOLVED).length;
    if (solved > 0) return `${solved} OF 3 SOLVED`;
    if (entry?.status === SOLVED) return 'SOLVED';
    if (entry?.status === PROGRESS) return 'IN PROGRESS';
    return null;
  },
  label: (i) => `#${i}`,

  link(index, tier, isToday) {
    const params = new URLSearchParams();
    if (!isToday) params.set('day', String(index));
    if (tier) params.set('tier', tier);
    const q = params.toString();
    return `/canominoes/${q ? '?' + q : ''}`;
  },

  async fetch({ uid, reader, recent }) {
    const doc = await reader.getDoc(['dominoUserData', uid]);
    if (!doc) return null;
    let games = [];
    if (recent.length) {
      try {
        const docs = await reader.queryAtLeast(['dominoUserData', uid, 'games'], 'day', Math.min(...recent));
        games = docs.map(({ data }) => ({ day: num(data.day), tier: data.tier, solved: data.solved === true }));
      } catch {
        // Fall back to day-level status.
      }
    }
    const tiers = {};
    for (const l of LEVELS) tiers[l.key] = doc[l.key] || {};
    return { tiers, st: doc.st, ms: doc.ms, ld: doc.ld, sd: intList(doc.sd), games };
  },

  derive(raw, { todayIdx, recent = [] }) {
    const p = emptyProgress();
    if (!raw) return p;
    for (const i of raw.sd) {
      mark(p, i, SOLVED);
      p.doneIdx.add(i);
    }
    // Boards started on this device, then server-confirmed solves on top.
    for (const id of readPref('domPlayedGames') || []) {
      const [day, tier] = String(id).split('.');
      if (Number(day) >= todayIdx - 7) mark(p, Number(day), PROGRESS, tier);
    }
    for (const i of recent) {
      for (const l of LEVELS) {
        if (readPref(`domGame_${i}_${l.key}`) != null) mark(p, i, PROGRESS, l.key);
      }
    }
    const solvedTiers = new Map();
    for (const g of raw.games || []) {
      if (!g.day || !g.solved) continue;
      mark(p, g.day, SOLVED, g.tier);
      if (!solvedTiers.has(g.day)) solvedTiers.set(g.day, new Set());
      solvedTiers.get(g.day).add(g.tier);
    }
    let played = 0;
    let solved = 0;
    for (const l of LEVELS) {
      played += num(raw.tiers[l.key]?.p);
      solved += num(raw.tiers[l.key]?.w);
    }
    p.played = played;
    p.solved = solved;
    p.streak = storedStreak(num(raw.st), num(raw.ld), todayIdx);
    p.maxStreak = Math.max(num(raw.ms), p.streak);
    p.flags = {
      sweep: [...solvedTiers.values()].some((s) => LEVELS.every((l) => s.has(l.key))),
      hardSolved: num(raw.tiers.h?.w) > 0,
      daysSolved: raw.sd.length,
    };
    p.tierStats = raw.tiers;
    return p;
  },

  summary(p) {
    return {
      headline: { label: 'Puzzles solved', value: String(p.solved) },
      winRate: pct(p.solved, p.played),
    };
  },

  detail(p) {
    return LEVELS.map((l) => {
      const t = p.tierStats?.[l.key] || {};
      return {
        title: l.label,
        rows: [
          ['Solved', `${num(t.w)} of ${num(t.p)}`],
          ['Best time', t.bs ? duration(t.bs) : '–'],
          ['Average time', t.w ? duration(Math.round(num(t.ts) / num(t.w))) : '–'],
          ['Fewest moves', t.fm || '–'],
        ],
      };
    });
  },
};
