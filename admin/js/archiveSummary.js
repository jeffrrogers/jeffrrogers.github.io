// Canuckle's archive summary docs (firebase/COST_PLAN.md, item 3).
//
// Canuckle's archive calendars, practice and the Duo archive need only a little
// from every puzzle, so instead of reading every puzzle doc they read these:
// one doc per 1,000 puzzle indices, "<first>-<last>" (canuckleArchive/0-999
// holds #1-#999, canucklePlusArchive/60000-60999 every Canuckle+ so far,
// canuckleDuoArchive/120000-120999 Duo #1-#999).
//
//   canuckleArchive, canucklePlusArchive   {answers: {"<index>": "<answer as stored>"}}
//   canuckleDuoArchive                     {puzzles: {"<index>": [<Daily index>, <Daily index>]}}
//
// The answer stays encoded exactly as on the puzzle doc. Facts, polls and
// everyone's results stay on the puzzle docs, which Canuckle reads only for
// the puzzle opened. A puzzle is filed under its `index` field, else its doc
// id, the same as Canuckle (GameData.fromJson / DuoData.fromJson).
//
// The admin keeps them up to date in the same transaction as every puzzle
// write (admin/js/store.js writeWithLog), and the nightly dailyCleanup
// repairs any that drift (firebase/functions/src/archive.js).
//
// This file is in two places, byte for byte: admin/js/archiveSummary.js and
// firebase/functions/src/archiveSummary.js (the functions deploy on their own,
// so they can't import the admin's copy). firebase/functions/test/archive.test.js
// checks they match and build the same docs. Change both together.

export const CHUNK_SIZE = 1000;

/** Puzzle collection -> its summary collection and the map field it fills. */
export const ARCHIVES = {
  canuckleGameData: { archive: 'canuckleArchive', field: 'answers', name: 'Canuckle' },
  canucklePlusGameData: { archive: 'canucklePlusArchive', field: 'answers', name: 'Canuckle+' },
  canuckleDuoGameData: { archive: 'canuckleDuoArchive', field: 'puzzles', name: 'Canuckle Duo' },
};

/** The summary doc id holding puzzle [index]: "1000-1999" for 1645. */
export function chunkIdFor(index) {
  const first = Math.floor(index / CHUNK_SIZE) * CHUNK_SIZE;
  return `${first}-${first + CHUNK_SIZE - 1}`;
}

/** Sorts chunk ids by their first index. */
export function byChunkStart(a, b) {
  return parseInt(a, 10) - parseInt(b, 10);
}

/** The index a puzzle doc is filed under, or null when it has none. */
export function summaryIndex(docId, data) {
  const index = Number.isInteger(data?.index) ? data.index : Number(docId);
  return Number.isInteger(index) && index > 0 ? index : null;
}

/** What the summary keeps for one puzzle doc of [collection]. */
export function summaryValue(collection, data) {
  if (ARCHIVES[collection].field === 'puzzles') {
    return Array.isArray(data?.puzzles) ? data.puzzles.filter((p) => Number.isInteger(p)) : [];
  }
  return typeof data?.answer === 'string' ? data.answer : '';
}

/** {index, chunk, value} for one puzzle doc, or null when it can't be filed. */
export function summaryEntry(collection, docId, data) {
  if (!data) return null;
  const index = summaryIndex(docId, data);
  if (index == null) return null;
  return { index, chunk: chunkIdFor(index), value: summaryValue(collection, data) };
}

const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const NONE = Object.freeze({});

// A summary doc's entries map, or an empty one when it's missing or malformed
function entriesOf(chunk, field) {
  const v = chunk?.[field];
  return v && typeof v === 'object' && !Array.isArray(v) ? v : NONE;
}

/**
 * Every summary doc for a whole puzzle collection, from [docs] (an iterable of
 * [docId, data]): {chunkId: {[field]: {index: value}}}.
 */
export function buildChunks(collection, docs) {
  const { field } = ARCHIVES[collection];
  const out = {};
  for (const [id, data] of docs) {
    const e = summaryEntry(collection, id, data);
    if (!e) continue;
    (out[e.chunk] ??= { [field]: {} })[field][String(e.index)] = e.value;
  }
  return out;
}

/**
 * The summary entries a write changes, from the docs before it and after it
 * ({docId: data | null}; undefined in [after] means not written):
 * {chunkId: {index: value, or null to remove it}}. Unchanged entries are left out.
 */
export function chunkChanges(collection, before, after) {
  const out = {};
  const put = (chunk, index, value) => { (out[chunk] ??= {})[String(index)] = value; };
  const pairs = [];
  for (const [id, next] of Object.entries(after ?? {})) {
    if (next === undefined) continue;
    pairs.push([summaryEntry(collection, id, before?.[id] ?? null), summaryEntry(collection, id, next)]);
  }
  // Removals first, so a write that moves an index between docs keeps it
  for (const [was, now] of pairs) {
    if (was && (!now || now.index !== was.index)) put(was.chunk, was.index, null);
  }
  for (const [was, now] of pairs) {
    if (now && (!was || was.index !== now.index || !same(was.value, now.value))) put(now.chunk, now.index, now.value);
  }
  return out;
}

/** Summary doc [chunk] (as stored) with [changes] applied, or null when nothing changes. */
export function patchChunk(collection, chunk, changes) {
  const { field } = ARCHIVES[collection];
  const entries = { ...entriesOf(chunk, field) };
  let changed = false;
  for (const [index, value] of Object.entries(changes)) {
    if (value === null) {
      if (index in entries) {
        delete entries[index];
        changed = true;
      }
    } else if (!(index in entries) || !same(entries[index], value)) {
      entries[index] = value;
      changed = true;
    }
  }
  return changed ? { ...(chunk ?? {}), [field]: entries } : null;
}

/**
 * How stored summary doc [stored] differs from [expected] (either may be
 * null): {same, added, changed, removed}, the last three lists of indices.
 */
export function chunkDiff(collection, stored, expected) {
  const { field } = ARCHIVES[collection];
  const have = entriesOf(stored, field);
  const want = entriesOf(expected, field);
  const added = [];
  const changed = [];
  const removed = [];
  for (const [i, v] of Object.entries(want)) {
    if (!(i in have)) added.push(Number(i));
    else if (!same(have[i], v)) changed.push(Number(i));
  }
  for (const i of Object.keys(have)) if (!(i in want)) removed.push(Number(i));
  // A doc that should exist but doesn't (or the reverse) differs even when empty
  const presence = (stored == null) !== (expected == null);
  // Stray fields, or a malformed field, are rewritten too
  const shape = stored != null && expected != null && !same(Object.keys(stored).sort(), Object.keys(expected).sort());
  const malformed = stored != null && stored[field] !== entriesOf(stored, field);
  return {
    same: !presence && !shape && !malformed && !added.length && !changed.length && !removed.length,
    added, changed, removed,
  };
}
