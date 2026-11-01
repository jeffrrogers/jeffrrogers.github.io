// Swapping the featured Canuckle word of a Canoggle or Canagrams board.
// Pure functions, unit-tested in admin/tests/run.mjs; the views run them,
// build the boards in genWorker.js and write the files with localFiles.js.
//
// Both games ship their calendar as 20-day shards inside the game
// (assets/data/dailies_NNN.json). A swap puts the chosen word on the chosen
// board and the board's old word where the chosen word was featured, building
// both boards again for their own day and difficulty with the game's own
// generator (compiled to JS: squaredleSourceCode / canagramsSourceCode
// tools/web_regen.dart). A word featured nowhere sends the old word to a new
// day at the end of the calendar instead. Only those shards are rewritten,
// with the day recorded in tools/data/featured_overrides.json so the command
// line's full regeneration keeps it.
//
// HOW EACH BOARD IS BUILT has to match tools/generate_dailies.dart exactly,
// or the next full regeneration would rebuild it differently:
//   * a forced board avoids the words that day ships on the boards before it
//     (Canoggle's Mini avoids the Daily's word; Canagrams has one board);
//   * a board drawn as usual (only on a new day) avoids the NATURAL words of
//     the boards before it -- what they draw with no override.

export const SWAP_GAMES = {
  canoggle: {
    id: 'canoggle',
    name: 'Canoggle',
    source: 'squaredleSourceCode',
    slug: 'canoggle',
    kinds: ['d', 'm'],
    kindNames: { d: 'Daily', m: 'Mini' },
  },
  canagrams: {
    id: 'canagrams',
    name: 'Canagrams',
    source: 'canagramsSourceCode',
    slug: 'canagrams',
    kinds: ['d'],
    kindNames: { d: 'Puzzle' },
  },
};

const keyOf = (day, kind) => `${day}${kind}`;

// THE FEATURED-WORD RULES, as each game's tools/gen/featured_rules.dart (Canoggle)
// and generate_dailies.dart (Canagrams) apply them -- change them together. A
// word is featured on at most one board of each kind, and a Canoggle Daily and
// Mini featuring the same word are more than FEATURED_GAP days apart.
export const FEATURED_GAP = 30;
const clash = (a, b) => a.kind === b.kind || Math.abs(a.day - b.day) <= FEATURED_GAP;

/** The words board {day, kind} must not feature, given every other board in [boards] ({day, kind, word}). */
export function featuredAvoid(boards, day, kind) {
  const out = new Set();
  for (const b of boards) {
    if (b.word && !(b.day === day && b.kind === kind) && clash(b, { day, kind })) out.add(b.word);
  }
  return [...out].sort();
}

/** A board's label: "#30 Daily", or "#30" in a one-board game. */
export function boardLabel(game, day, kind) {
  const g = SWAP_GAMES[game];
  return g.kinds.length > 1 ? `#${day} ${g.kindNames[kind]}` : `#${day}`;
}

/**
 * The calendar from the shipped files: {game, days, shardDays, boards:
 * Map<"<day><kind>", {day, kind, line, word}>}. [unpack] reads a line (the
 * admin's canoggle.js / canagrams.js) and must return {canuckle}.
 */
export function calendarOf(game, index, shards, unpack) {
  const boards = new Map();
  for (const s of shards) {
    for (const kind of SWAP_GAMES[game].kinds) {
      (s[kind] || []).forEach((line, i) => {
        const day = s.start + i;
        boards.set(keyOf(day, kind), { day, kind, line, word: unpack(line)?.canuckle || null });
      });
    }
  }
  return { game, days: index.days, shardDays: index.shard, boards };
}

/**
 * What putting [word] on board [target] ({day, kind}) would do.
 * @param opts.lockedThrough  highest day that can't change (dates.js
 *   swapLockedThrough), or null
 * @param opts.playedBefore   (word, day) -> whether Canuckle ran [word] before
 *   [day]'s date, so featuring it there spoils nothing
 * @param opts.source  key of the board to take [word] from, or 'append';
 *   default: a board of the same kind featuring it (the next later, else the
 *   nearest earlier), else one of the other kind too close to keep it, else
 *   'append' -- a Daily and a Mini more than FEATURED_GAP days apart may both
 *   feature it
 * @returns {changes: [{day, kind, forced, isNew, why}], occurrences:
 *   [{key, day, kind, locked}], source, errors[], warnings[]}
 */
export function planBoardSwap(cal, target, word, { lockedThrough = null, playedBefore = () => true, source } = {}) {
  const g = SWAP_GAMES[cal.game];
  const errors = [];
  const warnings = [];
  const locked = (day) => lockedThrough != null && day <= lockedThrough;
  const W = String(word || '').trim().toUpperCase();
  const t = cal.boards.get(keyOf(target.day, target.kind));
  const out = (changes = []) => ({ changes, occurrences, source: chosen?.key ?? (changes.length ? 'append' : null), errors, warnings });
  let chosen = null;
  const occurrences = [];
  if (!t) {
    errors.push(`There is no board ${boardLabel(cal.game, target.day, target.kind)}.`);
    return out();
  }
  const O = t.word;
  const here = boardLabel(cal.game, t.day, t.kind);
  if (!/^[A-Z]+$/.test(W)) {
    errors.push('Pick a Canuckle word.');
    return out();
  }
  if (W === O) {
    errors.push(`${W} is already featured on ${here}.`);
    return out();
  }
  if (locked(t.day)) errors.push(`${g.name} ${here} has been played or may be in play, so its word can't change.`);
  if (!playedBefore(W, t.day)) errors.push(`Canuckle hasn't run ${W} before ${g.name} ${here}, so featuring it would spoil Canuckle.`);
  if (!O) errors.push(`${here} has no featured word to move.`);

  for (const b of cal.boards.values()) {
    if (b.word === W && !(b.day === t.day && b.kind === t.kind)) {
      occurrences.push({ key: keyOf(b.day, b.kind), day: b.day, kind: b.kind, locked: locked(b.day) });
    }
  }
  occurrences.sort((a, b) => a.day - b.day || a.kind.localeCompare(b.kind));
  const open = occurrences.filter((o) => !o.locked);
  if (source && source !== 'append') {
    chosen = open.find((o) => o.key === source) || null;
    if (!chosen) errors.push('That board can no longer take the old word.');
  } else if (source !== 'append') {
    const pick = (list) => list.find((o) => o.day > t.day) || [...list].reverse().find((o) => o.day <= t.day) || null;
    chosen = pick(open.filter((o) => o.kind === t.kind)) || pick(open.filter((o) => clash(o, t)));
  }
  const left = occurrences.filter((o) => o !== chosen);
  if (left.some((o) => o.locked)) {
    warnings.push(`${W} is also featured on ${left.filter((o) => o.locked).map((o) => boardLabel(cal.game, o.day, o.kind)).join(', ')}, which has been played, so it stays there too.`);
  }
  if (occurrences.length > 1) {
    const others = occurrences.filter((o) => o !== chosen);
    if (chosen) warnings.push(`${W} is featured on ${occurrences.length} boards; only ${boardLabel(cal.game, chosen.day, chosen.kind)} takes ${O}, and ${others.map((o) => boardLabel(cal.game, o.day, o.kind)).join(', ')} keep${others.length === 1 ? 's' : ''} ${W}.`);
  }

  const changes = [{ day: t.day, kind: t.kind, forced: W, isNew: false, why: `Now features ${W} (was ${O}).` }];
  if (chosen) {
    changes.push({ day: chosen.day, kind: chosen.kind, forced: O, isNew: false, why: `Takes ${O} in place of ${W}.` });
    if (!playedBefore(O, chosen.day)) errors.push(`Canuckle hasn't run ${O} before ${g.name} ${boardLabel(cal.game, chosen.day, chosen.kind)}, so moving it there would spoil Canuckle.`);
  } else {
    const day = cal.days + 1;
    for (const kind of g.kinds) {
      changes.push(kind === t.kind
        ? { day, kind, forced: O, isNew: true, why: `New day at the end for ${O}, which ${W} replaced.` }
        : { day, kind, forced: null, isNew: true, why: 'New day at the end: built as the calendar always builds it.' });
    }
  }

  // Every word the plan places must keep the featured-word rules.
  const after = boardsAfter(cal, changes);
  for (const c of changes) {
    if (!c.forced) continue;
    for (const b of after) {
      if (b.word !== c.forced || (b.day === c.day && b.kind === c.kind) || !clash(b, c)) continue;
      const [x, y] = [c, b].sort((p, q) => p.day - q.day || g.kinds.indexOf(p.kind) - g.kinds.indexOf(q.kind));
      errors.push(`${c.forced} would be featured on ${boardLabel(cal.game, x.day, x.kind)} and ${boardLabel(cal.game, y.day, y.kind)}`
        + (x.kind === y.kind ? '; a word is featured once.' : `, ${y.day - x.day} days apart; a Daily and a Mini sharing a word need more than ${FEATURED_GAP}.`));
    }
  }
  const unique = [...new Set(errors)];
  errors.length = 0;
  errors.push(...unique);
  return out(changes);
}

/** Every board {day, kind, word} once [changes] are made; a new board drawn as usual has word null. */
function boardsAfter(cal, changes) {
  const out = new Map([...cal.boards].map(([k, b]) => [k, { day: b.day, kind: b.kind, word: b.word }]));
  for (const c of changes) out.set(keyOf(c.day, c.kind), { day: c.day, kind: c.kind, word: c.forced });
  return [...out.values()];
}

/**
 * Builds the boards a plan changes, as tools/generate_dailies.dart builds
 * them. [build] is genWorker's call:
 * ({day, kind, forced?, avoid?}) -> Promise<{line, word} | {error}>.
 *   * A board with a forced word depends only on the day and the word; it
 *     avoids the words the boards before it that day ship.
 *   * A board drawn as usual (only on a new day) avoids every word the
 *     featured-word rules keep off it, given the calendar after the swap --
 *     what the command line's extend run draws for a new last day.
 * @returns {built: Map<key, {day, kind, line, word}>, errors[]}
 */
export async function buildChanges(cal, changes, build) {
  const g = SWAP_GAMES[cal.game];
  const built = new Map();
  const errors = [];
  const after = boardsAfter(cal, changes);
  const days = [...new Set(changes.map((c) => c.day))].sort((a, b) => a - b);
  for (const day of days) {
    const shipped = [];
    for (const kind of g.kinds) {
      const c = changes.find((x) => x.day === day && x.kind === kind);
      const label = boardLabel(cal.game, day, kind);
      if (!c) {
        // Untouched board on an existing day: as shipped.
        const b = cal.boards.get(keyOf(day, kind));
        if (b?.word) shipped.push(b.word);
        continue;
      }
      const ship = c.forced
        ? await build({ day, kind, forced: c.forced, avoid: [...shipped] })
        : await build({ day, kind, avoid: featuredAvoid(after, day, kind) });
      if (ship.error) { errors.push(`${label}: ${ship.error}`); return { built, errors }; }
      if (!c.forced) after.find((b) => b.day === day && b.kind === kind).word = ship.word;
      if (shipped.includes(ship.word)) {
        errors.push(`${label} drew ${ship.word}, which another board that day features. Try a different word.`);
        return { built, errors };
      }
      shipped.push(ship.word);
      built.set(keyOf(day, kind), { day, kind, line: ship.line, word: ship.word });
    }
  }
  return { built, errors };
}

/**
 * The game's fact string for Canuckle fact runs (fact[], factUrls[]): the
 * `[words](https://...)` form the games draw, as their factFromRuns() makes it
 * (squaredleSourceCode/lib/data/facts_repository.dart). Null when blank.
 */
export function factFromRuns(fact, factUrls) {
  if (!Array.isArray(fact)) return null;
  const urls = Array.isArray(factUrls) ? factUrls : [];
  let out = '';
  fact.forEach((t, i) => {
    const text = String(t ?? '');
    const url = String(urls[i] ?? '').trim();
    const linkable = url.startsWith('https://') && !/[\s()]/.test(url) && text !== '' && !/[[\]]/.test(text);
    out += linkable ? `[${text}](${url})` : text;
  });
  return out.trim() ? out : null;
}

/**
 * What to do about featuring [word], given the generator's wordStatus for it
 * ({inDictionary, required, stoplisted, bonusOnly}):
 *   {block: why}         it can't be featured;
 *   {ask: question, add} featuring it needs a yes; add: it goes on
 *                        allowlist.txt (the always-required words) if so;
 *   {}                   nothing to ask.
 * "Required" is a word players are asked to find: Canoggle's required list,
 * or a word Canagrams may put on that day's grid. The allowlist never beats
 * the stoplist, so a stoplisted word can't be added.
 */
export function requiredCheck(game, word, s) {
  const g = SWAP_GAMES[game];
  if (!s.inDictionary) {
    return { block: `${word} isn't in ${g.name}'s dictionary, so it can't be featured. New Canuckle answers reach it when the dictionary is rebuilt (tools/extract_canuckle_words.dart, then tools/build_dictionary.dart).` };
  }
  if (s.bonusOnly) return { block: `${word} is blocklisted (kept only as a bonus word), so it can't be featured.` };
  if (s.required) return {};
  if (s.stoplisted) {
    const why = `${word} is on ${g.name}'s stoplist (tools/data/stoplist.txt), the words players are never asked to find`;
    // Canoggle won't build around a word that isn't required; Canagrams will.
    if (game === 'canoggle') return { block: `${why}, so it can't be featured. Take it off the stoplist first if that was a mistake.` };
    return { ask: `${why}, so it can't be added to the required words. Feature it anyway?`, add: false };
  }
  const rare = game === 'canoggle'
    ? `${word} isn't one of Canoggle's required words: the dictionary rates it too rare to ask players to find`
    : `${word} isn't one of Canagrams' required words for this day: the dictionary rates it too rare for this day's grid`;
  return {
    ask: `${rare}.\n\nFeature it anyway and add ${word} to the required words (tools/data/allowlist.txt)? The next full regeneration then also treats ${word} as required on any other board it turns up on.`,
    add: true,
  };
}

const ADDED_SECTION = '# --- featured words added in the Arena admin ---';

/** allowlist.txt's [text] with [word] added, under the admin's own section at the end. Unchanged if it's already there. */
export function withAllowed(text, word) {
  const w = String(word).trim().toLowerCase();
  const lines = String(text ?? '').replace(/\r\n/g, '\n').split('\n');
  if (lines.some((l) => l.trim().toLowerCase() === w)) return text;
  while (lines.length && lines[lines.length - 1].trim() === '') lines.pop();
  if (!lines.includes(ADDED_SECTION)) lines.push('', ADDED_SECTION);
  lines.push(w);
  return `${lines.join('\n')}\n`;
}

const shardName = (s) => `dailies_${String(s).padStart(3, '0')}.json`;

/**
 * The files a swap rewrites, as {name: text}, plus the new overrides. Only
 * the shards holding a changed board, the index when a day is added, and the
 * facts file when a featured word has no shipped fact yet.
 * @param files {index, shards: Map<shardNo, shard>, facts: {WORD: text}|null,
 *   overrides: {day: {kind: WORD}}}
 * @param built Map from buildChanges
 * @param changes the plan's changes (which boards were forced)
 * @param factFor WORD -> fact string for a word missing from the facts file, or null
 */
export function patchFiles(game, files, changes, built, factFor = () => null) {
  const g = SWAP_GAMES[game];
  const index = { ...files.index };
  const shards = new Map([...files.shards].map(([s, v]) => [s, structuredClone(v)]));
  const touched = new Set();
  let indexChanged = false;
  const sorted = [...built.values()].sort((a, b) => a.day - b.day || g.kinds.indexOf(a.kind) - g.kinds.indexOf(b.kind));
  for (const b of sorted) {
    const s = Math.floor((b.day - 1) / index.shard);
    if (b.day > index.days) {
      if (b.day !== index.days + 1) throw new Error(`Day ${b.day} would leave a gap after day ${index.days}.`);
      const missing = g.kinds.filter((k) => !built.has(keyOf(b.day, k)));
      if (missing.length) throw new Error(`New day ${b.day} needs every board.`);
      if (!shards.has(s)) {
        const fresh = { v: 1, start: s * index.shard + 1, days: 0 };
        for (const k of g.kinds) fresh[k] = [];
        shards.set(s, fresh);
      }
      const shard = shards.get(s);
      for (const k of g.kinds) shard[k].push(built.get(keyOf(b.day, k)).line);
      shard.days++;
      index.days++;
      indexChanged = true;
      touched.add(s);
      continue;
    }
    if (b.day < index.start || b.day > index.days) continue;
    if (!shards.has(s)) throw new Error(`Shard ${shardName(s)} wasn't loaded.`);
    const shard = shards.get(s);
    if (shard[b.kind]?.[b.day - shard.start] == null) throw new Error(`Day ${b.day} isn't in ${shardName(s)}.`);
    shard[b.kind][b.day - shard.start] = b.line;
    touched.add(s);
  }

  const written = {};
  for (const s of [...touched].sort((a, b) => a - b)) written[shardName(s)] = JSON.stringify(shards.get(s));
  if (indexChanged) written['dailies_index.json'] = JSON.stringify(index);

  if (files.facts) {
    const add = {};
    for (const b of built.values()) {
      if (!b.word || b.word in files.facts || b.word in add) continue;
      const f = factFor(b.word);
      if (f) add[b.word] = f;
    }
    if (Object.keys(add).length) {
      const all = { ...files.facts, ...add };
      const sortedFacts = {};
      for (const k of Object.keys(all).sort()) sortedFacts[k] = all[k];
      written['canuckle_facts.json'] = JSON.stringify(sortedFacts);
    }
  }

  const overrides = structuredClone(files.overrides || {});
  for (const c of changes) {
    if (!c.forced) continue;
    (overrides[c.day] ??= {})[c.kind] = c.forced;
  }
  const ordered = {};
  for (const d of Object.keys(overrides).map(Number).sort((a, b) => a - b)) ordered[d] = overrides[d];
  return { written, overrides: ordered, index };
}

/** featured_overrides.json as written: one day per line, so diffs read well. */
export function overridesText(overrides) {
  const days = Object.keys(overrides);
  if (!days.length) return '{}\n';
  return `{\n${days.map((d) => `  ${JSON.stringify(d)}: ${JSON.stringify(overrides[d])}`).join(',\n')}\n}\n`;
}

/**
 * Per-board Firestore facts that follow a moved word. [docs] is Map<day, doc>
 * of the game's day docs (canoggleGameData / canagramsGameData); [read] /
 * [write] get and set a board's own fact on a doc copy. Returns the docs to
 * store, {day: doc|null}, or {} when no fact moves.
 */
export function moveOwnFacts(cal, changes, docs, { read, write }) {
  const moves = [];
  for (const c of changes) {
    if (c.isNew || !c.forced) continue;
    const was = cal.boards.get(keyOf(c.day, c.kind))?.word;
    const f = read(docs.get(c.day), c.kind);
    if (!f || !was) continue;
    // The fact was written for [was]; it goes wherever [was] goes.
    const dest = changes.find((x) => x.forced === was && !(x.day === c.day && x.kind === c.kind));
    moves.push({ from: c, fact: f, to: dest || null });
  }
  if (!moves.length) return {};
  const next = new Map();
  const get = (day) => {
    if (!next.has(day)) next.set(day, structuredClone(docs.get(day) ?? null));
    return next.get(day);
  };
  for (const m of moves) next.set(m.from.day, write(get(m.from.day), m.from.day, m.from.kind, null));
  for (const m of moves) if (m.to) next.set(m.to.day, write(get(m.to.day), m.to.day, m.to.kind, m.fact));
  return Object.fromEntries(next);
}
