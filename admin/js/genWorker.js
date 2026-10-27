// Web Worker: runs a game's board generator, compiled from Dart (each game's
// tools/web_regen.dart, built into admin/gen/<game>/ by its
// tools/build_admin_gen.ps1), off the page's thread. A board takes a fraction
// of a second; the dictionary takes a moment to load, once per game.
//
// Message in:  {id, game: 'canoggle'|'canagrams', req: {day, kind?, forced?, avoid?}}
// Message out: {id, result: {line, word} | {error}}  or  {id, error}
//
// A classic worker (not a module) so importScripts can load the compiled
// generator, which sets canoggleGenInit/canoggleGenBuild (or canagrams…) on
// the worker's global object.

const FILES = {
  canoggle: ['dict.txt', 'dict_blocked.txt', 'dict_bonus_only.txt', 'stoplist.txt', 'allowlist.txt', 'canuckle_words.txt'],
  canagrams: ['dict.txt', 'dict_blocked.txt', 'dict_bonus_only.txt', 'stoplist.txt', 'allowlist.txt'],
};

const ready = {};

function init(game) {
  if (!FILES[game]) return Promise.reject(new Error(`No generator for ${game}`));
  ready[game] ??= (async () => {
    const base = new URL(`../gen/${game}/`, self.location.href);
    importScripts(new URL(`${game}_gen.js?v=${Date.now()}`, base).href);
    const files = {};
    await Promise.all(FILES[game].map(async (name) => {
      const res = await fetch(new URL(name, base), { cache: 'no-cache' });
      if (!res.ok) throw new Error(`${res.status} loading gen/${game}/${name}`);
      files[name] = await res.text();
    }));
    const r = JSON.parse(self[`${game}GenInit`](files));
    if (r.error) throw new Error(r.error);
  })();
  ready[game].catch(() => { delete ready[game]; });
  return ready[game];
}

self.onmessage = async ({ data: { id, game, req } }) => {
  try {
    await init(game);
    const result = JSON.parse(self[`${game}GenBuild`](JSON.stringify(req)));
    self.postMessage({ id, result });
  } catch (e) {
    self.postMessage({ id, error: e?.message || String(e) });
  }
};
