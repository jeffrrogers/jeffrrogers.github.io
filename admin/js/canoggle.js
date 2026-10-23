// Reading Canoggle's shipped puzzles, for the Canoggle tab. Pure functions,
// unit-tested in admin/tests/run.mjs.
//
// A port of the READ half of squaredleSourceCode/lib/model/puzzle_codec.dart,
// which is the format's only definition -- if it changes, this changes with it:
//
//     W,H~LETTERS~BLOB
//
// LETTERS is W*H characters, row-major, '.' for a hole. BLOB deciphers to
// REQUIRED|BONUS|CANUCKLEWORD, both lists front-coded. Each shard holds two
// boards a day, under the PuzzleKind keys: `d` (the Daily) and `m` (the Mini).

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789,|';
const SALT = 0x5A9D1E;

function decipher(text, key) {
  let state = SALT;
  for (let i = 0; i < key.length; i++) state = (state * 31 + key.charCodeAt(i)) & 0x7FFFFFFF;
  if (state === 0) state = 0x9E3779B9 & 0x7FFFFFFF;
  let out = '';
  for (let i = 0; i < text.length; i++) {
    // The Dart is 63-bit integers masked to 31 bits; keep every step in range.
    state ^= Number((BigInt(state) << 13n) & 0x7FFFFFFFn);
    state ^= state >>> 17;
    state ^= Number((BigInt(state) << 5n) & 0x7FFFFFFFn);
    const shift = state % 38;
    const index = ALPHABET.indexOf(text[i]);
    out += index < 0 ? text[i] : ALPHABET[(index - shift + 76) % 38];
  }
  return out;
}

function frontDecode(field) {
  if (!field) return [];
  const out = [];
  let previous = '';
  for (const entry of field.split(',')) {
    if (!entry) return null;
    const shared = parseInt(entry[0], 36);
    if (Number.isNaN(shared) || shared > previous.length) return null;
    const word = previous.slice(0, shared) + entry.slice(1);
    if (!word) return null;
    out.push(word);
    previous = word;
  }
  return out;
}

const byLengthThenAlpha = (a, b) => a.length - b.length || (a < b ? -1 : a > b ? 1 : 0);

/**
 * One packed line as {width, height, letters, required, bonus, canuckle}, or
 * null if it does not read. Word lists come back in display order (length,
 * then alphabetical), as the game shows them. canuckle is null on a board
 * built without one.
 */
export function unpackCanoggle(line) {
  const parts = String(line).split('~');
  if (parts.length !== 3) return null;
  const [dims, letters, blob] = parts;
  const d = dims.split(',');
  if (d.length !== 2) return null;
  const width = Number(d[0]);
  const height = Number(d[1]);
  if (!(width > 0) || !(height > 0) || letters.length !== width * height) return null;
  const fields = decipher(blob, letters).split('|');
  if (fields.length !== 3) return null;
  const required = frontDecode(fields[0]);
  const bonus = frontDecode(fields[1]);
  if (!required || !bonus) return null;
  required.sort(byLengthThenAlpha);
  bonus.sort(byLengthThenAlpha);
  return { width, height, letters, required, bonus, canuckle: fields[2] || null };
}

/** The board as rows of text, '·' for a hole. */
export function boardRows(p) {
  const rows = [];
  for (let r = 0; r < p.height; r++) {
    rows.push(p.letters.slice(r * p.width, (r + 1) * p.width).replaceAll('.', '·').split('').join(' '));
  }
  return rows;
}
