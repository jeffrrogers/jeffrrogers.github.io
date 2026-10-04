// Canoku: the daily sudoku with Canadian symbols, at /canoku/.
//
// Source: Canoku/lib/game_board.dart (startDate 2023-10-16, 15 GameModes)
// and user.dart. canokuUserData/{id} holds completedIndices (days with any
// mode solved), streaks and per-mode {totalTime,totalGames,totalHints}.
// Each day's boards live in the subcollection canokuUserData/{id}/{dayIndex},
// one document per mode, {gameData: <Game JSON string>}.

import { daily } from './common.js?v=202610040233';
import { duration } from '../dates.js?v=202610040233';
import {
  SOLVED, PROGRESS, emptyProgress, mark, currentStreak, longestStreak, intList, num,
} from '../status.js?v=202610040233';

const SIZES = [
  { suffix: '', label: '9×9', stat: '' },
  { suffix: '6X6', label: '6×6', stat: '6x6' },
  { suffix: '4X4', label: '4×4', stat: '4x4' },
];
const LEVELS = [
  { key: 'VEASY', label: 'Beginner', stat: 'vEasy' },
  { key: 'EASY', label: 'Easy', stat: 'easy' },
  { key: 'MED', label: 'Medium', stat: 'med' },
  { key: 'HARD', label: 'Hard', stat: 'hard' },
  { key: 'VHARD', label: 'Expert', stat: 'vHard' },
];

const TIERS = SIZES.flatMap((s) => LEVELS.map((l) => ({
  key: l.key + s.suffix,
  label: l.label,
  group: s.label,
  statKey: `${l.stat}${s.stat}Stats`,
})));

/** True when every cell holds exactly one placed (non-note) value. */
export function boardComplete(game) {
  const board = Array.isArray(game.gameBoard) ? game.gameBoard : [];
  if (board.length === 0) return false;
  return board.every((row) => Array.isArray(row) && row.every((cell) =>
    cell && !cell.isNote && Array.isArray(cell.values) && cell.values.length === 1 && cell.values[0] !== -1));
}

export const canoku = {
  id: 'canoku',
  name: 'Canoku',
  logo: 'images/canoku.svg',
  color: '#1F5E96',
  blurb: 'Daily sudoku with Canadian symbols, in three sizes.',
  card: { tint: ['#E1ECF7', '#17283A'], frame: ['#A9C6E3', '#2A4C6E'] },
  ...daily(2023, 10, 16),
  tiers: TIERS,
  resultLabel(entry) {
    const sizes = SIZES.filter((s) => TIERS.some((t) =>
      t.group === s.label && entry?.tiers?.[t.key] === SOLVED)).length;
    if (sizes === SIZES.length) return 'ALL 3 SIZES';
    if (sizes > 0) return `${sizes} OF 3 SIZES`;
    if (entry?.status === SOLVED) return 'SOLVED';
    if (entry?.status === PROGRESS) return 'IN PROGRESS';
    return null;
  },
  label: (i) => `#${i}`,

  // Always pass the day: Canoku remembers the last archive date it showed, so
  // a bare ?mode= could reopen an old puzzle instead of today's.
  link(index, tier) {
    const params = new URLSearchParams();
    params.set('day', String(index));
    if (tier) params.set('mode', tier);
    const q = params.toString();
    return `/canoku/${q ? '?' + q : ''}`;
  },

  async fetch({ uid, reader, recent }) {
    const doc = await reader.getDoc(['canokuUserData', uid]);
    if (!doc) return null;
    const days = {};
    await Promise.all(recent.map(async (i) => {
      try {
        const modes = await reader.listDocs(['canokuUserData', uid, String(i)]);
        days[i] = modes.map(({ id, data }) => {
          let game = {};
          try { game = JSON.parse(data.gameData || '{}'); } catch { /* skip */ }
          return { mode: game.mode || id, complete: boardComplete(game), time: num(game.time) };
        });
      } catch {
        // A day we can't read just shows its day-level status.
      }
    }));
    const stats = {};
    for (const t of TIERS) stats[t.key] = doc[t.statKey] || null;
    return {
      completed: intList(doc.completedIndices),
      streak: doc.streak,
      maxStreak: doc.maxStreak,
      stats,
      days,
    };
  },

  derive(raw, { todayIdx }) {
    const p = emptyProgress();
    if (!raw) return p;
    const done = new Set(raw.completed);
    for (const i of done) {
      mark(p, i, SOLVED);
      p.doneIdx.add(i);
    }
    let sweep = false;
    for (const [i, modes] of Object.entries(raw.days || {})) {
      const idx = Number(i);
      for (const m of modes) mark(p, idx, m.complete ? SOLVED : PROGRESS, m.mode);
      const sizesDone = new Set(modes.filter((m) => m.complete)
        .map((m) => TIERS.find((t) => t.key === m.mode)?.group));
      if (SIZES.every((s) => sizesDone.has(s.label))) sweep = true;
    }
    let solvedGames = 0;
    for (const t of TIERS) solvedGames += num(raw.stats?.[t.key]?.totalGames);
    p.played = done.size;
    p.solved = done.size;
    p.streak = currentStreak(done, todayIdx);
    p.maxStreak = Math.max(num(raw.maxStreak), longestStreak(done), p.streak);
    p.flags = {
      sweep,
      expert9: num(raw.stats?.VHARD?.totalGames) > 0,
      solvedGames,
    };
    p.stats = raw.stats || {};
    return p;
  },

  summary(p) {
    return {
      headline: { label: 'Boards solved', value: String(p.flags.solvedGames || 0) },
      winRate: null,
    };
  },

  detail(p) {
    return SIZES.map((s) => ({
      title: `${s.label} boards`,
      rows: LEVELS.map((l) => {
        const st = p.stats?.[l.key + s.suffix];
        const games = num(st?.totalGames);
        const avg = games ? duration(Math.round(num(st.totalTime) / games)) : '–';
        return [l.label, games ? `${games} solved · avg ${avg}` : '–'];
      }),
    })).concat([{
      title: 'Record',
      rows: [['Days with a solve', p.solved], ['Boards solved', p.flags.solvedGames || 0]],
    }]);
  },
};
