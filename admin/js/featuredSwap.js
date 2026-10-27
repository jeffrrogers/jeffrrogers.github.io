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
 *   default: the next later board featuring it, else the nearest earlier one
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
    chosen = open.find((o) => o.day > t.day) || [...open].reverse().find((o) => o.day <= t.day) || null;
  }
  if (!chosen && occurrences.length && source !== 'append') {
    warnings.push(`${W} is also featured on ${occurrences.map((o) => boardLabel(cal.game, o.day, o.kind)).join(', ')}, which has been played, so it stays there too.`);
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

  // The other boards on each changed day must keep a different word (Canoggle).
  const after = (day, kind) => changes.find((c) => c.day === day && c.kind === kind && !c.isNew)?.forced
    ?? cal.boards.get(keyOf(day, kind))?.word;
  for (const c of changes) {
    if (c.isNew || !c.forced) continue;
    for (const kind of g.kinds) {
      if (kind !== c.kind && after(c.day, kind) === c.forced) {
        errors.push(`${boardLabel(cal.game, c.day, kind)} already features ${c.forced}; a day's two boards need different words.`);
      }
    }
  }
  return out(changes);
}

/**
 * Builds the boards a plan changes, in the order and with the avoid lists
 * tools/generate_dailies.dart uses. [build] is genWorker's call:
 * ({day, kind, forced?, avoid?}) -> Promise<{line, word} | {error}>.
 * @returns {built: Map<key, {day, kind, line, word}>, errors[]}
 */
export async function buildChanges(cal, changes, build) {
  const g = SWAP_GAMES[cal.game];
  const built = new Map();
  const errors = [];
  const days = [...new Set(changes.map((c) => c.day))].sort((a, b) => a - b);
  for (const day of days) {
    const natural = [];
    const shipped = [];
    for (const kind of g.kinds) {
      const c = changes.find((x) => x.day === day && x.kind === kind);
      const label = boardLabel(cal.game, day, kind);
      let ship = null;
      if (!c) {
        // Untouched board on an existing day: as shipped, which is also its natural draw.
        const b = cal.boards.get(keyOf(day, kind));
        if (b?.word) natural.push(b.word);
        if (b?.word) shipped.push(b.word);
        continue;
      }
      if (c.isNew) {
        // A new day draws every board, forced or not, so later boards can avoid it.
        const later = g.kinds.slice(g.kinds.indexOf(kind) + 1);
        const needNatural = !c.forced || later.some((k) => !changes.find((x) => x.day === day && x.kind === k)?.forced);
        let drawn = null;
        if (needNatural) {
          drawn = await build({ day, kind, avoid: [...natural] });
          if (drawn.error) { errors.push(`${label}: ${drawn.error}`); return { built, errors }; }
          natural.push(drawn.word);
        }
        ship = c.forced ? await build({ day, kind, forced: c.forced, avoid: [...shipped] }) : drawn;
      } else {
        // Existing day: the boards before it ship as they will after the swap.
        ship = await build({ day, kind, forced: c.forced, avoid: [...shipped] });
        const was = cal.boards.get(keyOf(day, kind));
        if (was?.word) natural.push(was.word);
      }
      if (ship.error) { errors.push(`${label}: ${ship.error}`); return { built, errors }; }
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
