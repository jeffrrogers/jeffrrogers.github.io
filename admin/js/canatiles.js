// Canatiles tab: pure helpers, unit-tested in admin/tests/run.mjs.
//
// Canatiles (mahjong solitaire, three puzzles a day) keeps its community
// numbers in canatilesDailyStats/{day}-{tier}, one doc per puzzle: n (players
// who cleared it on its day), sumPts (their points added up) and a 100-bucket
// histogram b (canatilesSourceCode/lib/data/community.dart). The tab reads
// those docs for a range of days and shows plays and the average score.

export const TIERS = [
  { key: 'e', label: 'Easy' },
  { key: 'm', label: 'Medium' },
  { key: 'h', label: 'Hard' },
];

/** The longest range the tab reads at once: 3 reads a day. */
export const MAX_SPAN = 60;
export const DEFAULT_SPAN = 14;

/** `17-e`: the community doc id of day [day]'s [tier] puzzle. */
export const statsDocId = (day, tier) => `${day}-${tier}`;

/**
 * Days [from, to], puzzle numbers, made sensible: whole numbers, from 1, to
 * no later than today, from <= to, at most MAX_SPAN days (keeping [to]).
 * Null when nothing has been played yet (today before day 1).
 */
export function clampRange(from, to, todayIdx) {
  if (!Number.isInteger(todayIdx) || todayIdx < 1) return null;
  let t = Number.isInteger(to) ? Math.min(Math.max(to, 1), todayIdx) : todayIdx;
  let f = Number.isInteger(from) ? Math.max(from, 1) : t - DEFAULT_SPAN + 1;
  if (f > t) [f, t] = [t, Math.min(f, todayIdx)];
  f = Math.max(f, 1, t - MAX_SPAN + 1);
  return { from: f, to: t };
}

/** The default range: the last DEFAULT_SPAN days, up to today. */
export const defaultRange = (todayIdx) => clampRange(null, null, todayIdx);

/** Every doc id the range needs, newest day first. */
export function statsDocIds({ from, to }) {
  const ids = [];
  for (let d = to; d >= from; d--) for (const t of TIERS) ids.push(statsDocId(d, t.key));
  return ids;
}

const count = (v) => (typeof v === 'number' && Number.isFinite(v) && v > 0 ? v : 0);

/** {n, sumPts, avg}: avg is the whole-point mean, or null when nobody played. */
function cell(n, sumPts) {
  return { n, sumPts, avg: n > 0 ? Math.round(sumPts / n) : null };
}

/**
 * The table for [range] from [docs] (Map of doc id -> doc data; a missing doc
 * is a puzzle nobody has cleared). One row per day, newest first, with a cell
 * per tier, and a totals row whose averages weigh each play equally.
 */
export function playsTable(docs, range) {
  const rows = [];
  const sums = Object.fromEntries(TIERS.map((t) => [t.key, { n: 0, sumPts: 0 }]));
  for (let day = range.to; day >= range.from; day--) {
    const tiers = {};
    let plays = 0;
    let pts = 0;
    for (const t of TIERS) {
      const d = docs.get(statsDocId(day, t.key)) || {};
      // Points without a play count are junk, not a score.
      const n = count(d.n);
      const c = cell(n, n ? count(d.sumPts) : 0);
      tiers[t.key] = c;
      sums[t.key].n += c.n;
      sums[t.key].sumPts += c.sumPts;
      plays += c.n;
      pts += c.sumPts;
    }
    rows.push({ day, tiers, all: cell(plays, pts) });
  }
  const totals = Object.fromEntries(TIERS.map((t) => [t.key, cell(sums[t.key].n, sums[t.key].sumPts)]));
  const n = TIERS.reduce((s, t) => s + sums[t.key].n, 0);
  const pts = TIERS.reduce((s, t) => s + sums[t.key].sumPts, 0);
  return { rows, totals, all: cell(n, pts) };
}
