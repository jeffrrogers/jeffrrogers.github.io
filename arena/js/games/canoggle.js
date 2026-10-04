// Canoggle: the daily word hunt, a main board plus a 3x3 Mini.
//
// Source: squaredleSourceCode/lib/model/daily.dart (day 1 = 2026-09-03,
// fixed at launch) and data/{stats,user,prefs_keys}.dart. chainUserData/{id}
// is {ms, mn, mr, wf, bf, cw, bc, st, mx, ld, sd}; sd lists days whose MAIN
// board was solved on merit. games/{day}.{d|m} holds {day, kind, req, bonus,
// solved} (solved false = answers revealed). In-progress boards are local.

import { daily, pct } from './common.js?v=202610040159';
import { readPref } from '../local.js?v=202610040159';
import {
  SOLVED, FAILED, PROGRESS, emptyProgress, mark, storedStreak, intList, num,
} from '../status.js?v=202610040159';

const KINDS = [
  { key: 'd', label: 'Daily' },
  { key: 'm', label: 'Mini' },
];

export const canoggle = {
  id: 'canoggle',
  name: 'Canoggle',
  logo: 'images/canoggle.svg',
  color: '#D35F1B',
  blurb: 'Daily word hunt + Mini',
  ...daily(2026, 9, 3),
  tiers: KINDS,
  label: (i) => `#${i}`,

  link(index, tier, isToday) {
    const params = new URLSearchParams();
    if (!isToday) params.set('day', String(index));
    if (tier) params.set('tier', tier);
    const q = params.toString();
    return `/canoggle/${q ? '?' + q : ''}`;
  },

  async fetch({ uid, reader, recent }) {
    const doc = await reader.getDoc(['chainUserData', uid]);
    if (!doc) return null;
    let games = [];
    if (recent.length) {
      try {
        const docs = await reader.queryAtLeast(['chainUserData', uid, 'games'], 'day', Math.min(...recent));
        games = docs.map(({ data }) => ({ day: num(data.day), kind: data.kind, solved: data.solved === true }));
      } catch {
        // Fall back to day-level status.
      }
    }
    const { ms, mn, mr, wf, bf, cw, bc, st, mx, ld } = doc;
    return { ms, mn, mr, wf, bf, cw, bc, st, mx, ld, sd: intList(doc.sd), games };
  },

  derive(raw, { todayIdx, recent = [] }) {
    const p = emptyProgress();
    if (!raw) return p;
    for (const i of raw.sd) {
      mark(p, i, SOLVED, 'd');
      mark(p, i, SOLVED);
      p.doneIdx.add(i);
    }
    for (const id of readPref('chnPlayedGames') || []) {
      const [day, kind] = String(id).split('.');
      if (Number(day) >= todayIdx - 7) mark(p, Number(day), PROGRESS, kind);
    }
    for (const i of recent) {
      for (const k of KINDS) {
        if (readPref(`chnGame_${i}_${k.key}`) != null) mark(p, i, PROGRESS, k.key);
      }
    }
    const fullDays = new Map();
    for (const g of raw.games || []) {
      if (!g.day) continue;
      const status = g.solved ? SOLVED : FAILED;
      mark(p, g.day, status, g.kind);
      if (g.kind === 'd') mark(p, g.day, status);
      if (g.solved) {
        if (!fullDays.has(g.day)) fullDays.set(g.day, new Set());
        fullDays.get(g.day).add(g.kind);
      }
    }
    p.played = num(raw.ms) + num(raw.mr);
    p.solved = num(raw.ms);
    p.streak = storedStreak(num(raw.st), num(raw.ld), todayIdx);
    p.maxStreak = Math.max(num(raw.mx), p.streak);
    p.flags = {
      sweep: [...fullDays.values()].some((s) => s.has('d') && s.has('m')),
      canuckleWords: num(raw.cw),
    };
    p.counts = raw;
    return p;
  },

  summary(p) {
    return {
      headline: { label: 'Words found', value: String(num(p.counts?.wf)) },
      winRate: pct(p.solved, p.played),
    };
  },

  detail(p) {
    const c = p.counts || {};
    return [
      {
        title: 'Boards',
        rows: [
          ['Daily boards solved', num(c.ms)],
          ['Answers revealed', num(c.mr)],
          ['Minis solved', num(c.mn)],
        ],
      },
      {
        title: 'Words',
        rows: [
          ['Words found', num(c.wf)],
          ['Bonus words', num(c.bf)],
          ['Canuckle words found', num(c.cw)],
          ['Most bonus words on one board', num(c.bc)],
        ],
      },
    ];
  },
};
