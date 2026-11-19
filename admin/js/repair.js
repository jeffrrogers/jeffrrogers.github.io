// Accounts holding games Canuckle would strip. When Canuckle uploads an
// account it drops games with a blank answer and Duo games it can't read
// (canuckleSourceCode/lib/user.dart uploadPrefsToFirestore). Removing them
// here first means no save ever has to shrink a list. It matters most for
// accounts with 5+ in one list: the Firestore rules reject a save that drops
// more than 4, so those can't be saved again until an admin removes them.
//
// These functions mirror exactly what Canuckle strips and nothing more:
// anything else odd in a list (an old-format game, an entry that isn't JSON)
// is left alone.

import { PACKED_FIELDS, isPacked, unpackGame, unpackDuo } from './packedGames.js?v=202611190140';

export const MAX_DROP = 4;

// Canuckle's own blank-game stripping was certainly live by this date (it
// entered canuckleSourceCode in 884d89f, 2026-05-26), so every account saved
// since has already been cleaned by the game. The Repair scan never looks at
// accounts updated after it.
export const REPAIR_LATEST = '2026-06-01';

/**
 * The "last updated before" date the scan uses: the date picked, but never
 * later than REPAIR_LATEST (an empty or later pick means REPAIR_LATEST).
 * Dates are YYYY-MM-DD; the cutoff is local midnight at the start of it.
 */
export function repairCutoff(picked) {
  const day = /^\d{4}-\d{2}-\d{2}$/.test(picked || '') && picked < REPAIR_LATEST ? picked : REPAIR_LATEST;
  return { day, ms: new Date(`${day}T00:00:00`).getTime() };
}

function parse(s) {
  try {
    const v = JSON.parse(s);
    return v && typeof v === 'object' && !Array.isArray(v) ? v : null;
  } catch {
    return null;
  }
}

/** A Canuckle or Canuckle+ entry Canuckle would strip: it reads, and its answer is ''. */
export function isBlankGame(s) {
  const g = typeof s === 'string' ? parse(s) : null;
  return !!g && g.answer === '';
}

const isNum = (v) => typeof v === 'number' && Number.isFinite(v);
const strings = (v) => v == null || (Array.isArray(v) && v.every((x) => typeof x === 'string'));

/**
 * A Duo entry Canuckle can't read (DuoGame.decode in lib/duo/duo_models.dart
 * returns null): not a JSON object, a field of the wrong type, or not
 * exactly two answers.
 */
export function isUnreadableDuo(s) {
  const g = typeof s === 'string' ? parse(s) : null;
  if (!g) return true;
  if (!strings(g.answers) || !strings(g.userGuesses)) return true;
  if (g.index != null && !isNum(g.index)) return true;
  if (g.startTimestamp != null && !isNum(g.startTimestamp)) return true;
  if (g.isFromArchive != null && typeof g.isFromArchive !== 'boolean') return true;
  return (g.answers || []).length !== 2;
}

const list = (v) => (Array.isArray(v) ? v : []);

// A converted doc (formatVersion 2) holds packedGames / packedPlusGames /
// packedDuoGames instead (packedGames.js); the same two checks apply to its
// entries, and a repair rewrites the packed field.
const isBlankPacked = (s) => unpackGame(s)?.answer === '';
const isUnreadablePackedDuo = (s) => unpackDuo(s) === null;

/** The field [field] lives in on [doc], and how to spot an entry Canuckle would strip there. */
function view(doc, field) {
  const packed = isPacked(doc, field);
  const duo = field === 'duoGames';
  return {
    key: packed ? PACKED_FIELDS[field] : field,
    entries: list(doc[packed ? PACKED_FIELDS[field] : field]),
    strip: duo ? (packed ? isUnreadablePackedDuo : isUnreadableDuo) : (packed ? isBlankPacked : isBlankGame),
  };
}

/** What Canuckle would strip from one newUserData doc, in either form. */
export function analyzeAccount(doc) {
  const count = (field) => { const v = view(doc, field); return v.entries.filter(v.strip).length; };
  const blankGames = count('games');
  const blankPlus = count('plusGames');
  const badDuo = count('duoGames');
  return {
    blankGames,
    blankPlus,
    badDuo,
    any: blankGames + blankPlus + badDuo > 0,
    stuck: blankGames > MAX_DROP || blankPlus > MAX_DROP || badDuo > MAX_DROP,
  };
}

/**
 * The doc with those entries removed and its counts brought in line, the way
 * Canuckle's own upload does it; plus what was removed, for the log.
 */
export function repairAccount(doc) {
  const g = view(doc, 'games');
  const p = view(doc, 'plusGames');
  const d = view(doc, 'duoGames');
  const removed = {
    games: g.entries.filter(g.strip),
    plusGames: p.entries.filter(p.strip),
    duoGames: d.entries.filter(d.strip),
  };
  const next = { ...doc };
  if (removed.games.length) {
    next[g.key] = g.entries.filter((s) => !g.strip(s));
    const count = typeof doc.gamesCount === 'number' ? doc.gamesCount : g.entries.length;
    next.gamesCount = Math.max(0, count - removed.games.length);
  }
  if (removed.plusGames.length) {
    next[p.key] = p.entries.filter((s) => !p.strip(s));
    next.plusGamesCount = next[p.key].length;
  }
  if (removed.duoGames.length) {
    next[d.key] = d.entries.filter((s) => !d.strip(s));
    next.duoGamesCount = next[d.key].length;
  }
  return { doc: next, removed };
}
