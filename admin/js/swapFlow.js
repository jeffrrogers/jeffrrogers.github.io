// Doing a featured-word swap for Canoggle or Canagrams: reading the game's
// shipped files from the Arena folder on this computer, writing the rewritten
// ones back (game source + sandbox site), and promoting them to production.
// The decisions are featuredSwap.js; this file is the reading and writing.
//
// Where the files go, per game (SWAP_GAMES in featuredSwap.js):
//   <source>/assets/data/                  the game project: what the next
//                                          build ships, and the source of truth
//   <sandbox>/<slug>/assets/assets/data/   the sandbox site: live there once
//                                          that checkout is pushed
//   <prod>/<slug>/assets/assets/data/      production, only by Promote
//   <source>/tools/data/featured_overrides.json   the hand-picked words, so
//                                          generate_dailies.dart keeps them
//   <source>/tools/data/swap_backups/<stamp>/     every file a swap replaced
//   <source>/tools/data/pending_promotion.json    swaps not yet in production
//
// No rebuild is needed anywhere: the game fetches its shards over HTTP when it
// needs them, and the deployed service worker caches nothing.

import { SWAP_GAMES, calendarOf, patchFiles, overridesText, moveOwnFacts } from './featuredSwap.js?v=202610311155';
import { readText, writeText, sha256, folderExists, SANDBOX_SITE, PROD_SITE } from './localFiles.js?v=202610311155';
import { writeWithLog } from './store.js?v=202610311155';

const paths = (game) => {
  const g = SWAP_GAMES[game];
  return {
    source: `${g.source}/assets/data`,
    sandbox: `${SANDBOX_SITE}/${g.slug}/assets/assets/data`,
    prod: `${PROD_SITE}/${g.slug}/assets/assets/data`,
    prodRoot: `${PROD_SITE}/${g.slug}`,
    overrides: `${g.source}/tools/data/featured_overrides.json`,
    backups: `${g.source}/tools/data/swap_backups`,
    pending: `${g.source}/tools/data/pending_promotion.json`,
  };
};

export const swapPaths = paths;

const shardName = (s) => `dailies_${String(s).padStart(3, '0')}.json`;

/**
 * The game's calendar from its source folder: {files, cal, texts}. texts:
 * file name -> text as read, to check nothing changed before writing.
 */
export async function loadLocal(game, unpack) {
  const p = paths(game);
  const texts = {};
  const read = async (name) => {
    const t = await readText(`${p.source}/${name}`);
    if (t == null) throw new Error(`Missing ${p.source}/${name}`);
    texts[name] = t;
    return JSON.parse(t);
  };
  const index = await read('dailies_index.json');
  const count = Math.ceil(index.days / index.shard);
  const list = await Promise.all(Array.from({ length: count }, (_, s) => read(shardName(s))));
  const shards = new Map(list.map((s, i) => [i, s]));
  let facts = null;
  try {
    facts = await read('canuckle_facts.json');
  } catch {
    facts = null;
  }
  const overridesRaw = await readText(p.overrides);
  const overrides = overridesRaw ? JSON.parse(overridesRaw) : {};
  return {
    files: { index, shards, facts, overrides },
    cal: calendarOf(game, index, list, unpack),
    texts,
    overridesText: overridesRaw,
  };
}

const stamp = () => new Date().toISOString().replace(/[:.]/g, '-');

/**
 * Writes a built swap. Checks first that the source files are still the
 * ones the plan was made from, and that the sandbox copy of each file matches
 * the source (so a partial write can't mix calendars); then backs the old
 * files up, writes source + sandbox, records the swap for promotion and moves
 * any per-board Firestore facts with their words.
 * @param local   loadLocal's result the plan was made from
 * @param factsOf {collection, docs: Map<day, doc>, read, write} for moveOwnFacts
 * @returns {written: [name], backup}
 */
export async function applySwap(game, local, plan, built, { factFor, factsOf, note }) {
  const p = paths(game);
  const { written, overrides } = patchFiles(game, local.files, plan.changes, built, factFor);
  const names = Object.keys(written);

  // 1. Nothing changed under us.
  const before = {};
  for (const name of names) {
    const now = await readText(`${p.source}/${name}`);
    if (name in local.texts && now !== local.texts[name]) {
      throw new Error(`${p.source}/${name} changed since the calendar was loaded. Refresh and try again.`);
    }
    if (!(name in local.texts) && now != null) throw new Error(`${p.source}/${name} appeared since the calendar was loaded. Refresh and try again.`);
    before[name] = now;
  }
  if ((await readText(p.overrides)) !== local.overridesText) {
    throw new Error(`${p.overrides} changed since the calendar was loaded. Refresh and try again.`);
  }

  // 2. The sandbox holds the same calendar.
  if (!(await folderExists(`${SANDBOX_SITE}/${SWAP_GAMES[game].slug}`))) {
    throw new Error(`${SANDBOX_SITE}/${SWAP_GAMES[game].slug} isn't there. Deploy the game to the sandbox first.`);
  }
  for (const name of names) {
    const sb = await readText(`${p.sandbox}/${name}`);
    if (sb !== before[name]) {
      throw new Error(`The sandbox's ${name} isn't the game project's. Deploy ${SWAP_GAMES[game].name} to the sandbox (deploy_to_io.ps1) so they match, then swap.`);
    }
  }

  // 3. Back up, then write.
  const backup = `${p.backups}/${stamp()}`;
  for (const name of names) if (before[name] != null) await writeText(`${backup}/${name}`, before[name]);
  if (local.overridesText != null) await writeText(`${backup}/featured_overrides.json`, local.overridesText);
  await writeText(`${backup}/swap.json`, `${JSON.stringify({ note, changes: plan.changes }, null, 2)}\n`);

  for (const name of names) {
    await writeText(`${p.source}/${name}`, written[name]);
    await writeText(`${p.sandbox}/${name}`, written[name]);
  }
  await writeText(p.overrides, overridesText(overrides));

  // 4. Remember it for Promote: the file as production had it before (the
  //    source before this swap) and as it is now.
  const pending = JSON.parse((await readText(p.pending)) || '[]');
  const files = {};
  for (const name of names) files[name] = { before: await sha256(before[name]), after: await sha256(written[name]) };
  const days = [...new Set(plan.changes.map((c) => c.day))].sort((a, b) => a - b);
  pending.push({ at: new Date().toISOString(), note, days, backup, files });
  await writeText(p.pending, `${JSON.stringify(pending, null, 2)}\n`);

  // 5. Per-board facts follow their words, and the swap is logged.
  const { collection, read, write } = factsOf;
  const ids = [...new Set(plan.changes.map((c) => String(c.day)))];
  await writeWithLog(collection, ids, (docs) => {
    const map = new Map(Object.entries(docs).map(([d, v]) => [Number(d), v]));
    const out = moveOwnFacts(local.cal, plan.changes, map, { read, write });
    return Object.fromEntries(Object.entries(out).map(([d, v]) => [String(d), v]));
  }, { action: 'board-swap', note: `${note} · files: ${names.join(', ')} · backup ${backup}` });

  return { written: names, backup };
}

/** Swaps written to source + sandbox but not yet promoted: [{at, note, days, backup, files}]. */
export async function pendingSwaps(game) {
  return JSON.parse((await readText(paths(game).pending)) || '[]');
}

/**
 * Copies every pending swap's files from the sandbox into production, after
 * checking production still has the files the first swap replaced (nothing
 * else changed them) and the sandbox still has what the last swap wrote.
 * Reads the copies back to confirm them, then clears the pending list.
 * @param recheck (pending) -> error string or null: the caller's last look,
 *   e.g. that no swapped day has gone live since
 */
export async function promote(game, recheck = () => null) {
  const p = paths(game);
  const g = SWAP_GAMES[game];
  if (!(await folderExists(p.prodRoot))) throw new Error(`${g.name} isn't deployed to production yet (no ${p.prodRoot}).`);
  const pending = await pendingSwaps(game);
  if (!pending.length) throw new Error('Nothing to promote.');
  const problem = recheck(pending);
  if (problem) throw new Error(problem);

  const first = {};
  const last = {};
  for (const swap of pending) {
    for (const [name, h] of Object.entries(swap.files)) {
      if (!(name in first)) first[name] = h.before;
      last[name] = h.after;
    }
  }
  const texts = {};
  for (const name of Object.keys(last)) {
    const sb = await readText(`${p.sandbox}/${name}`);
    if ((await sha256(sb)) !== last[name]) throw new Error(`The sandbox's ${name} changed after the swap. Check it before promoting.`);
    const prod = await readText(`${p.prod}/${name}`);
    if ((await sha256(prod)) !== first[name]) {
      throw new Error(`Production's ${name} isn't the one the swap replaced (it changed since, or production is on a different calendar). Deploy the game to production instead.`);
    }
    texts[name] = sb;
  }
  for (const [name, text] of Object.entries(texts)) await writeText(`${p.prod}/${name}`, text);
  for (const [name, text] of Object.entries(texts)) {
    if ((await readText(`${p.prod}/${name}`)) !== text) throw new Error(`Production's ${name} didn't write correctly. Check ${p.prod}.`);
  }
  await writeText(p.pending, '[]\n');
  await writeWithLog('adminLog', [], () => ({}), {
    action: 'board-promote',
    note: `${g.name}: ${pending.map((s) => s.note).join('; ')} · files: ${Object.keys(texts).join(', ')}`,
  });
  return Object.keys(texts);
}
