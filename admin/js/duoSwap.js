// Changing the words on a Duo day without losing any. Pure functions,
// unit-tested in admin/tests/run.mjs.
//
// Each word taken off the day goes where the word replacing it was going to
// be used: if the incoming Canuckle puzzle is on a later Duo day, the
// outgoing one takes its place there. An outgoing word with no such day is
// "displaced" and gets a new day at the end of the schedule: two displaced
// words make one day, and a lone one is paired with a fresh Canuckle puzzle
// (never on any Duo day, at least DUO_RECENT_GAP days old -- the rule
// canuckleSourceCode/tool/generate_duo_schedule.dart picks pairs by).
//
// A word's Duo version of its fact (facts[<index>]) moves with it. Badges
// stay on their day but are flagged, since they were written for the pair.

import { GAMES, isSwapLocked } from './dates.js?v=202610311155';
import { validateDuo, DUO_RECENT_GAP } from './validate.js?v=202610311155';

const g = GAMES.duo;

// Every Canuckle index -> the Duo days using it, for a Map<index, {puzzles}>.
function usesOf(days) {
  const out = new Map();
  for (const [index, d] of days) {
    for (const i of d.puzzles) out.set(i, [...(out.get(i) || []), index]);
  }
  for (const list of out.values()) list.sort((a, b) => a - b);
  return out;
}

function copyDay(d) {
  return {
    index: d.index,
    puzzles: [...d.puzzles],
    badge: d.badge || null,
    facts: { ...(d.facts || {}) },
  };
}

/**
 * A fresh Canuckle puzzle for new Duo day [dayIndex]: played at least
 * DUO_RECENT_GAP days before it, on no Duo day, and not in [exclude]. Null
 * when there is none.
 */
export function freshPuzzle(canuckle, uses, dayIndex, exclude, rng = Math.random) {
  const dayEd = g.edForIndex(dayIndex);
  const pool = [];
  for (const p of canuckle.values()) {
    if (!p.answer || uses.has(p.index) || exclude.has(p.index)) continue;
    if (dayEd - GAMES.canuckle.edForIndex(p.index) <= DUO_RECENT_GAP) continue;
    pool.push(p.index);
  }
  if (!pool.length) return null;
  pool.sort((a, b) => a - b);
  return pool[Math.floor(rng() * pool.length)];
}

/**
 * What changing Duo day [day] to the Canuckle puzzles [next] (two indexes)
 * would do.
 * @param duo Map<index, {index, puzzles, badge, facts}>
 * @param canuckle Map<index, {index, answer, fact, factUrls}>
 * @returns {changes: [{index, before|null, after, why}], errors[], warnings[]}
 *   before/after are {index, puzzles, badge, facts}; before is null for a new
 *   day. Nothing should be written while errors is non-empty.
 */
export function planDuoSwap(duo, canuckle, day, next, { now = new Date(), rng = Math.random } = {}) {
  const errors = [];
  const warnings = [];
  const cur = duo.get(day);
  const fail = (msg) => ({ changes: [], errors: [msg], warnings: [] });
  if (!cur) return fail(`Duo ${g.label(day)} doesn't exist.`);
  if (!Array.isArray(next) || next.length !== 2 || !next.every(Number.isInteger)) return fail('Pick two Canuckle puzzles.');
  if (next[0] === next[1]) return fail('The two puzzles must be different.');
  if (isSwapLocked('duo', day, now)) return fail(`Duo ${g.label(day)} has been played or may be in play, so its words can't change.`);

  const outgoing = cur.puzzles.filter((i) => !next.includes(i));
  const incoming = next.filter((i) => !cur.puzzles.includes(i));
  if (!incoming.length) return fail('Those are already the words on this day.');

  // The planned schedule, edited in place; only touched days are reported
  const plan = new Map([...duo].map(([i, d]) => [i, d]));
  const touched = new Map();
  const why = new Map();
  const edit = (index) => {
    if (!touched.has(index)) {
      touched.set(index, copyDay(plan.get(index)));
      plan.set(index, touched.get(index));
    }
    return touched.get(index);
  };
  const uses = usesOf(duo);
  const target = edit(day);
  why.set(day, 'The day you changed.');

  // Keep a word that stays in its slot; incoming words fill the others in order
  const slots = cur.puzzles.map((i) => (next.includes(i) ? i : null));
  for (const n of incoming) slots[slots.indexOf(null)] = n;
  target.puzzles = slots;

  const displaced = [];
  incoming.forEach((n, k) => {
    const o = outgoing[k];
    const fact = cur.facts?.[String(o)];
    delete target.facts[String(o)];
    const others = (uses.get(n) || []).filter((x) => x !== day);
    const past = others.filter((x) => x < day);
    const future = others.filter((x) => x > day);
    if (past.length) warnings.push(`Canuckle #${n} was already used on Duo ${past.map(g.label).join(', ')}.`);
    if (future.length > 1) warnings.push(`Canuckle #${n} is on several later days (${future.map(g.label).join(', ')}); only ${g.label(future[0])} takes the word it replaces.`);
    if (!future.length) {
      displaced.push({ o, fact });
      return;
    }
    const f = future[0];
    if (isSwapLocked('duo', f, now)) {
      errors.push(`Canuckle #${n} is on Duo ${g.label(f)}, which has been played or may be in play, so it can't take #${o} instead.`);
      return;
    }
    const src = edit(f);
    const ownFact = src.facts[String(n)];
    src.puzzles = src.puzzles.map((i) => (i === n ? o : i));
    delete src.facts[String(n)];
    if (fact) src.facts[String(o)] = fact;
    if (ownFact) target.facts[String(n)] = ownFact;
    why.set(f, `Takes #${o} in place of #${n}.`);
  });

  if (displaced.length) {
    let max = null;
    for (const i of duo.keys()) if (max == null || i > max) max = i;
    const index = max == null ? g.firstIndex : max + 1;
    const puzzles = displaced.map((x) => x.o);
    if (puzzles.length === 1) {
      const planned = usesOf(plan);
      const fresh = freshPuzzle(canuckle, planned, index, new Set(puzzles), rng);
      if (fresh == null) errors.push(`No unused Canuckle puzzle is old enough to pair with #${puzzles[0]} on a new day.`);
      else puzzles.push(fresh);
    }
    if (puzzles.length === 2) {
      const facts = {};
      for (const x of displaced) if (x.fact) facts[String(x.o)] = x.fact;
      const added = { index, puzzles, badge: null, facts };
      plan.set(index, added);
      touched.set(index, added);
      why.set(index, puzzles.length === displaced.length
        ? `New day at the end for #${puzzles.join(' and #')}, which no later day used.`
        : `New day at the end for #${puzzles[0]}, which no later day used, with fresh #${puzzles[1]}.`);
    }
  }

  const planned = usesOf(plan);
  const changes = [...touched.values()].sort((a, b) => a.index - b.index).map((after) => {
    const was = duo.get(after.index);
    const before = was ? copyDay(was) : null;
    if (before?.badge && before.puzzles.join() !== after.puzzles.join()) {
      warnings.push(`Duo ${g.label(after.index)} has the badge "${before.badge.label}", written for its old words. Check it still fits.`);
    }
    const r = validateDuo({ ...after, docId: String(after.index) }, { canuckle, duoUses: planned });
    for (const e of r.errors) errors.push(`Duo ${g.label(after.index)}: ${e}`);
    for (const w of r.warnings) warnings.push(`Duo ${g.label(after.index)}: ${w}`);
    return { index: after.index, before, after, why: why.get(after.index) || '' };
  });
  return { changes, errors: [...new Set(errors)], warnings: [...new Set(warnings)] };
}

/**
 * The doc to store for a planned day, over what is stored now ([stored], null
 * for a new day). A new day's results start at 1 each, as the schedule
 * generator writes them, so the first players see sensible percentages.
 */
export function duoDocFor(change, stored) {
  const { after } = change;
  const doc = { ...(stored || {}), index: after.index, puzzles: after.puzzles };
  if (after.badge) doc.badge = after.badge; else delete doc.badge;
  if (Object.keys(after.facts).length) doc.facts = after.facts; else delete doc.facts;
  if (!stored) doc.distribution = Object.fromEntries(g.distKeys.map((k) => [k, 1]));
  return doc;
}
