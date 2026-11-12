// Canoku's puzzle pools, for the Days left tab and the Seed tab.
//
// canokuNewData/puzzleCount = {count, freshStart?, freshCount?, freshStartSandbox?}.
// Which doc a day uses is the same as Canoku/lib/puzzle_source.dart
// (PuzzleSource.docIdFor), which every Canoku build from 3.1.0 follows:
//   day <= count                     -> doc `day` (the originals, 1..535)
//   day >= start (pool set)          -> freshStart + (day - start) % freshCount
//   otherwise (536..start-1)         -> the old loop, ((day - 336) % 200) + 336
// Pool docs are freshStart..freshStart+freshCount-1, stored under the days
// production plays them on (1130..1859 for the first). `start` is freshStart,
// or off production freshStartSandbox: the day the sandbox starts on the
// pool, from its first doc, so it can test the pool on days it can open.
//
// A pool file is what Canoku/tools/puzzle_gen/generate.py writes:
// {"<day>": {index, original, sixBySix, fourByFour}}, each size {veryEasy,
// easy, medium, hard, veryHard} of {startingBoard, answerBoard} as Dart's
// List.toString() with -1 for a blank cell.

export const LOOP_START = 336;
export const LOOP_LENGTH = 200;
export const SIZES = { original: 9, sixBySix: 6, fourByFour: 4 };
export const LEVELS = ['veryEasy', 'easy', 'medium', 'hard', 'veryHard'];
const BOX = { 9: [3, 3], 6: [2, 3], 4: [2, 2] };

/**
 * The pool fields of a puzzleCount doc: {count, freshStart, freshCount,
 * start}. [production] false lets freshStartSandbox set `start`.
 */
export function puzzleSource(data, { production = true } = {}) {
  const int = (v) => (Number.isInteger(v) ? v : null);
  const count = int(data?.count) ?? 535;
  const freshStart = int(data?.freshStart);
  const sandbox = production ? null : int(data?.freshStartSandbox);
  return { count, freshStart, freshCount: int(data?.freshCount), start: sandbox ?? freshStart };
}

export function hasPool(src) {
  return src.freshStart != null && src.freshCount != null && src.start != null &&
    src.freshCount > 0 && src.freshStart > src.count && src.start > src.count;
}

/** The canokuNewData doc id of [day]'s puzzles under [src] (puzzleSource). */
export function docIdFor(day, src) {
  if (day <= src.count) return day;
  if (hasPool(src) && day >= src.start) return src.freshStart + ((day - src.start) % src.freshCount);
  return ((day - LOOP_START) % LOOP_LENGTH) + LOOP_START;
}

/** The last day before puzzles repeat (the pool's last, or count without one). */
export function lastFreshDay(src) {
  return hasPool(src) ? src.start + src.freshCount - 1 : src.count;
}

/**
 * Whether players under [src] have had pool doc [id] by day [today]: from
 * the start day they play the pool's docs in order, then loop. Changing such
 * a doc would change a puzzle they already had.
 */
export function poolDocReached(id, src, today) {
  if (!hasPool(src) || today < src.start) return false;
  const played = today - src.start + 1;
  if (played >= src.freshCount) return true;
  return id < src.freshStart + played;
}

/** Whether two pool docs hold the same index and boards. */
export function samePoolDoc(a, b) {
  if (!a || !b || a.index !== b.index) return false;
  for (const size of Object.keys(SIZES)) {
    for (const lv of LEVELS) {
      const x = a[size]?.[lv], y = b[size]?.[lv];
      if (x?.startingBoard !== y?.startingBoard || x?.answerBoard !== y?.answerBoard) return false;
    }
  }
  return true;
}

/** The pool's first and last doc ids, or null without a pool. */
export function poolDocs(src) {
  return hasPool(src) ? [src.freshStart, src.freshStart + src.freshCount - 1] : null;
}

/** "[[1, -1], [2, 3]]" -> rows of ints, 0 for blank; null if malformed. */
export function parseBoard(s, n) {
  if (typeof s !== 'string') return null;
  const nums = (s.match(/-?\d+/g) || []).map(Number);
  if (nums.length !== n * n) return null;
  const rows = [];
  for (let r = 0; r < n; r++) rows.push(nums.slice(r * n, r * n + n).map((v) => (v === -1 ? 0 : v)));
  return rows;
}

function peersOf(n) {
  const [br, bc] = BOX[n];
  const peers = [];
  for (let i = 0; i < n * n; i++) {
    const r = Math.floor(i / n), c = i % n, set = new Set();
    for (let k = 0; k < n; k++) { set.add(r * n + k); set.add(k * n + c); }
    const r0 = r - (r % br), c0 = c - (c % bc);
    for (let a = 0; a < br; a++) for (let b = 0; b < bc; b++) set.add((r0 + a) * n + c0 + b);
    set.delete(i);
    peers.push([...set]);
  }
  return peers;
}
const PEERS = { 4: peersOf(4), 6: peersOf(6), 9: peersOf(9) };

/** Solutions of a flat board (0 blank), counting up to [limit]. */
export function countSolutions(cells, n, limit = 2) {
  const peers = PEERS[n];
  const grid = cells.slice();
  let count = 0;
  const search = () => {
    let best = -1, bestMask = 0, bestCount = 99;
    for (let i = 0; i < n * n; i++) {
      if (grid[i]) continue;
      let mask = (1 << n) - 1;
      for (const p of peers[i]) if (grid[p]) mask &= ~(1 << (grid[p] - 1));
      let c = 0;
      for (let m = mask; m; m &= m - 1) c++;
      if (!c) return;
      if (c < bestCount) { best = i; bestMask = mask; bestCount = c; if (c === 1) break; }
    }
    if (best < 0) { count++; return; }
    for (let v = 1; v <= n; v++) {
      if (!(bestMask & (1 << (v - 1)))) continue;
      grid[best] = v;
      search();
      if (count >= limit) break;
    }
    grid[best] = 0;
  };
  // A given that clashes with a peer has no solution
  for (let i = 0; i < n * n; i++) {
    if (grid[i] && peers[i].some((p) => grid[p] === grid[i])) return 0;
  }
  search();
  return count;
}

/** Problems with one board ({startingBoard, answerBoard}), [] when it's good. */
export function boardProblems(board, n) {
  const start = parseBoard(board?.startingBoard, n);
  const answer = parseBoard(board?.answerBoard, n);
  if (!start || !answer) return ['not a ' + n + 'x' + n + ' board'];
  const s = start.flat(), a = answer.flat();
  const out = [];
  if (a.some((v) => v < 1 || v > n) || countSolutions(a, n) !== 1) out.push('answer is not a finished grid');
  if (s.some((v, i) => v && v !== a[i])) out.push("givens don't match the answer");
  if (s.some((v) => v < 0 || v > n)) out.push('bad given');
  if (!out.length && countSolutions(s, n) !== 1) out.push('has more than one solution');
  return out;
}

/**
 * Checks a pool file. {docs: {id: doc}, first, last, errors: [...]}; the days
 * must run without gaps, each doc's index must be its id, and every board
 * must have exactly one solution matching its answer.
 */
export function parsePool(json, { checkBoards = true } = {}) {
  const errors = [];
  const ids = Object.keys(json || {}).map(Number).sort((x, y) => x - y);
  if (!ids.length || ids.some((i) => !Number.isInteger(i))) {
    return { docs: {}, first: null, last: null, errors: ['No days in the file.'] };
  }
  const first = ids[0], last = ids[ids.length - 1];
  if (last - first + 1 !== ids.length) errors.push(`Days ${first}–${last} have gaps.`);
  const docs = {};
  for (const id of ids) {
    const d = json[String(id)];
    if (d?.index !== id) errors.push(`#${id}: index is ${d?.index}.`);
    const doc = { index: id };
    for (const [size, n] of Object.entries(SIZES)) {
      doc[size] = {};
      for (const lv of LEVELS) {
        const b = d?.[size]?.[lv];
        const problems = checkBoards ? boardProblems(b, n) : [];
        if (problems.length) errors.push(`#${id} ${size} ${lv}: ${problems.join(', ')}.`);
        doc[size][lv] = { startingBoard: b?.startingBoard, answerBoard: b?.answerBoard };
      }
    }
    docs[String(id)] = doc;
  }
  return { docs, first, last, errors };
}
