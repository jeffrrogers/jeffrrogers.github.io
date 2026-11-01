// Web Worker: runs a game's board generator, compiled from Dart (each game's
// tools/web_regen.dart, built into admin/gen/<game>/ by its
// tools/build_admin_gen.ps1), off the page's thread. A board takes a fraction
// of a second; the dictionary takes a moment to load, once per game (and again
// whenever the page sends different word lists).
//
// Message in:  {id, game: 'canoggle'|'canagrams', op: 'build'|'status',
//               req: {day, kind?, forced?, avoid?} | {word, day?},
//               files?: {basename: text}}
//   files: word lists to use instead of the deployed copies, e.g. the Arena
//   folder's allowlist.txt with a featured word about to be added to it.
// Message out: {id, result: {line, word} | {inDictionary, required, ...} | {error}}
//              or {id, error}
//
// A classic worker (not a module) so importScripts can load the compiled
// generator, which sets canoggleGen* (or canagramsGen*) on the worker's global
// object.

const FILES = {
  canoggle: ['dict.txt', 'dict_blocked.txt', 'dict_bonus_only.txt', 'stoplist.txt', 'allowlist.txt', 'canuckle_words.txt'],
  canagrams: ['dict.txt', 'dict_blocked.txt', 'dict_bonus_only.txt', 'stoplist.txt', 'allowlist.txt'],
};

const loaded = {};   // game -> Promise of the deployed files, fetched once
const ready = {};    // game -> {key, promise}: the generator built from those files + overrides

function deployed(game) {
  loaded[game] ??= (async () => {
    const base = new URL(`../gen/${game}/`, self.location.href);
    importScripts(new URL(`${game}_gen.js?v=${Date.now()}`, base).href);
    const files = {};
    await Promise.all(FILES[game].map(async (name) => {
      const res = await fetch(new URL(name, base), { cache: 'no-cache' });
      if (!res.ok) throw new Error(`${res.status} loading gen/${game}/${name}`);
      files[name] = await res.text();
    }));
    return files;
  })();
  loaded[game].catch(() => { delete loaded[game]; });
  return loaded[game];
}

function init(game, overrides = {}) {
  if (!FILES[game]) return Promise.reject(new Error(`No generator for ${game}`));
  const key = JSON.stringify(Object.entries(overrides).sort());
  if (ready[game]?.key !== key) {
    const promise = (async () => {
      const files = { ...(await deployed(game)), ...overrides };
      const r = JSON.parse(self[`${game}GenInit`](files));
      if (r.error) throw new Error(r.error);
    })();
    ready[game] = { key, promise };
    promise.catch(() => { if (ready[game]?.promise === promise) delete ready[game]; });
  }
  return ready[game].promise;
}

self.onmessage = async ({ data: { id, game, op = 'build', req, files } }) => {
  try {
    await init(game, files);
    const fn = op === 'status' ? 'GenWordStatus' : 'GenBuild';
    const result = JSON.parse(self[`${game}${fn}`](JSON.stringify(req)));
    self.postMessage({ id, result });
  } catch (e) {
    self.postMessage({ id, error: e?.message || String(e) });
  }
};
