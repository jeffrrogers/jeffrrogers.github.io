// Field shapes for QA seed accounts: one builder per kind of stored record,
// matching what each game writes (see the game sources named on each).
//
// Pure: no Firestore. A Firestore Timestamp is written as ts(millis); the
// Seed tab turns it into a real Timestamp, the tests into a stand-in.

const MS_PER_DAY = 86400000;

/** A Timestamp placeholder: the store writes Timestamp.fromMillis(ms). */
export function ts(ms) {
  return { __qaTs: ms };
}

export function isTs(v) {
  return v != null && typeof v === 'object' && typeof v.__qaTs === 'number';
}

/** {y, m, d} of an epoch day. */
function ymdOf(ed) {
  const dt = new Date(ed * MS_PER_DAY);
  return { y: dt.getUTCFullYear(), m: dt.getUTCMonth() + 1, d: dt.getUTCDate() };
}

/** Local midnight of an epoch day, in millis (Canuckle's startTimestamp). */
export function midnightOf(ed) {
  const { y, m, d } = ymdOf(ed);
  return new Date(y, m - 1, d).getTime();
}

/** Local time on an epoch day, in millis: [hour] defaults to mid-morning. */
export function timeOn(ed, hour = 10, minute = 0) {
  const { y, m, d } = ymdOf(ed);
  return new Date(y, m - 1, d, hour, minute).getTime();
}

/** Monday = 1 .. Sunday = 7 (day 0 was a Thursday), as Canagrams counts. */
export function weekdayOf(ed) {
  return ((ed + 3) % 7 + 7) % 7 + 1;
}

// ---- Canuckle, Canuckle+ and Duo (canuckleSourceCode/lib/object_models.dart) --

/**
 * Canuckle's result string for one guess: c correct, e elsewhere in the word,
 * n not in it, with repeated letters counted the way Wordle does.
 */
export function scoreGuess(guess, answer) {
  const g = guess.toUpperCase().split('');
  const a = answer.toUpperCase().split('');
  const out = g.map(() => 'n');
  const left = new Map();
  g.forEach((ch, i) => {
    if (ch === a[i]) out[i] = 'c';
    else left.set(a[i], (left.get(a[i]) || 0) + 1);
  });
  g.forEach((ch, i) => {
    if (out[i] === 'c') return;
    const n = left.get(ch) || 0;
    if (n > 0) {
      out[i] = 'e';
      left.set(ch, n - 1);
    }
  });
  return out.join('');
}

/** One Canuckle or Canuckle+ game, JSON-encoded as `games` / `plusGames` hold it. */
export function canuckleGame({ answer, index, guesses, archive = false, startMs, oldFormat = false }) {
  const word = answer.toUpperCase();
  const list = guesses.map((g) => g.toUpperCase());
  if (oldFormat) {
    // Before userGuesses: OldGame, with a GuessRowData per guess. Canuckle
    // still converts these on load (user.dart _convertOldGame).
    const card = { c: 'correct', e: 'exists', n: 'nonexistent' };
    return JSON.stringify({
      answer: word, startTimestamp: startMs, isFromArchive: archive,
      guesses: list.map((g) => ({
        guess: g,
        resultsIndices: g.split('').map((_, i) => i),
        resultsStrings: scoreGuess(g, word).split('').map((r) => card[r]),
      })),
      correctChars: [], existingChars: [], nonExistingChars: [], index,
    });
  }
  return JSON.stringify({
    answer: word, startTimestamp: startMs, isFromArchive: archive,
    userGuesses: list, results: list.map((g) => scoreGuess(g, word)), index,
  });
}

/** One Duo game, JSON-encoded as `duoGames` holds it (duo/duo_models.dart). */
export function duoGame({ answers, index, guesses, archive = false, startMs }) {
  return JSON.stringify({
    answers: answers.map((a) => a.toUpperCase()), index, startTimestamp: startMs,
    isFromArchive: archive, userGuesses: guesses.map((g) => g.toUpperCase()),
  });
}

const STAT_KEYS = ['oneGuessWins', 'twoGuessWins', 'threeGuessWins', 'fourGuessWins',
  'fiveGuessWins', 'sixGuessWins'];

/**
 * Canuckle's stats string (all seven keys: Stats.fromJson has no defaults)
 * from [results], a list of {won, guesses}.
 */
export function canuckleStats(results) {
  const o = Object.fromEntries(STAT_KEYS.map((k) => [k, 0]));
  o.losses = 0;
  for (const r of results) {
    if (r.won) o[STAT_KEYS[r.guesses - 1]]++;
    else o.losses++;
  }
  return JSON.stringify(o);
}

const DUO_KEYS = ['twos', 'threes', 'fours', 'fives', 'sixes', 'sevens'];

/** Duo's stats string from [results], a list of {won, finishedOn}. */
export function duoStats(results) {
  const o = Object.fromEntries(DUO_KEYS.map((k) => [k, 0]));
  o.losses = 0;
  for (const r of results) {
    if (r.won) o[DUO_KEYS[r.finishedOn - 2]]++;
    else o.losses++;
  }
  return JSON.stringify(o);
}

/**
 * The newUserData stub every newer game creates when it saves first
 * (e.g. solitaireSourceCode/lib/data/user.dart): `games` must be a list.
 */
export function newUserStub(nowMs) {
  return { games: [], gamesCount: 0, plusGames: [], plusGamesCount: 0, duoGames: [], duoGamesCount: 0, lastUpdated: nowMs };
}

// ---- Canoku (Canoku/lib/user.dart, game_objects.dart) ----------------------

export const CANOKU_STAT_FIELDS = {
  VEASY: 'vEasyStats', EASY: 'easyStats', MED: 'medStats', HARD: 'hardStats', VHARD: 'vHardStats',
  VEASY6X6: 'vEasy6x6Stats', EASY6X6: 'easy6x6Stats', MED6X6: 'med6x6Stats', HARD6X6: 'hard6x6Stats', VHARD6X6: 'vHard6x6Stats',
  VEASY4X4: 'vEasy4x4Stats', EASY4X4: 'easy4x4Stats', MED4X4: 'med4x4Stats', HARD4X4: 'hard4x4Stats', VHARD4X4: 'vHard4x4Stats',
};

/** Board size for a mode key: 9, 6 or 4. */
export function canokuSize(mode) {
  return mode.endsWith('4X4') ? 4 : mode.endsWith('6X6') ? 6 : 9;
}

/** Every per-mode stats field, zeroed, then filled from [solves] ({mode, sec, hints}). */
export function canokuStats(solves) {
  const out = {};
  for (const f of Object.values(CANOKU_STAT_FIELDS)) out[f] = { totalTime: 0, totalGames: 0, totalHints: 0 };
  for (const s of solves) {
    const st = out[CANOKU_STAT_FIELDS[s.mode]];
    st.totalTime += s.sec;
    st.totalGames++;
    st.totalHints += s.hints;
  }
  return out;
}

/** Canoku's settings fields, as a 2.1.0-era doc carries them. */
export function canokuSettings(nowMs) {
  return {
    email: '', gameModeString: 'EASY', isContrast: false, isDark: false, showIncorrect: true,
    highlightSection: true, showColour: true, showAnimations: true, viewedHowTo: true,
    latestDateTime: nowMs, currentDateTime: nowMs,
  };
}

const CANOKU_SIZE_KEY = { 9: 'original', 6: 'sixBySix', 4: 'fourByFour' };

/** The level key of a canokuNewData board for a mode key, as Canoku's CanokuGame reads it. */
function canokuLevelKey(mode) {
  if (mode.startsWith('VEASY')) return 'veryEasy';
  if (mode.startsWith('EASY')) return 'easy';
  if (mode.startsWith('VHARD')) return 'veryHard';
  if (mode.startsWith('HARD')) return 'hard';
  return 'medium';
}

/**
 * One mode's boards from a canokuNewData/{n} puzzle doc: {starting, answer},
 * each rows of numbers, -1 for an empty starting cell (CanokuGameBoards).
 * Null when the doc doesn't hold them.
 */
export function canokuPuzzleBoards(puzzleDoc, mode) {
  const boards = puzzleDoc?.[CANOKU_SIZE_KEY[canokuSize(mode)]]?.[canokuLevelKey(mode)];
  try {
    const starting = JSON.parse(boards.startingBoard);
    const answer = JSON.parse(boards.answerBoard);
    const n = canokuSize(mode);
    const square = (b) => b.length === n && b.every((row) => row.length === n);
    return square(starting) && square(answer) ? { starting, answer } : null;
  } catch {
    return null;
  }
}

/**
 * A 2.1.0 board (the {gameData} JSON of canokuUserData/{id}/{day}/{MODE}).
 * Solved: every cell holds a valid sudoku (Game.isValidSolution). Unfinished:
 * the givens and a few placed values, with undo history so it counts as
 * started (Game.hasMoves).
 *
 * With [puzzle] (that day's {starting, answer} for [mode], see
 * canokuPuzzleBoards) the givens are the real ones and every placed value is
 * right: Canoku checks each tile against the day's answer, and shows a wrong
 * one in red. Without it the board is a made-up valid sudoku, which is fine
 * only for a solved board (Canoku rebuilds those from the real answer).
 */
export function canokuBoard({ mode, day, dateMs, solved, time = 300, hints = 0, puzzle = null }) {
  const n = canokuSize(mode);
  const br = n === 9 ? 3 : 2;
  const bc = n === 4 ? 2 : 3;
  const value = puzzle
    ? (r, c) => puzzle.answer[r][c]
    : (r, c) => ((r * bc + Math.floor(r / br) + c) % n) + 1;
  const given = puzzle
    ? (r, c) => puzzle.starting[r][c] !== -1
    : (r, c) => (r + 2 * c) % 3 === 0;
  // The tiles the player has filled in on an unfinished board: the first three
  // that aren't given.
  const played = [];
  for (let r = 0; r < n && played.length < 3; r++) {
    for (let c = 0; c < n && played.length < 3; c++) {
      if (!given(r, c)) played.push({ row: r, column: c });
    }
  }
  const isPlayed = (r, c) => played.some((p) => p.row === r && p.column === c);
  const gameBoard = [];
  for (let r = 0; r < n; r++) {
    const row = [];
    for (let c = 0; c < n; c++) {
      const locked = given(r, c);
      const placed = solved || locked || isPlayed(r, c);
      row.push({
        row: r, column: c, undoValue: null, values: placed ? [value(r, c)] : [],
        noteChanges: [], isNote: false, isLocked: locked, usedHint: false,
      });
    }
    gameBoard.push(row);
  }
  return JSON.stringify({
    date: dateMs, index: day, gameBoard, mode, undoItems: played.slice(0, 1), redoItems: [],
    time, isPaused: false, hintCount: hints,
  });
}
