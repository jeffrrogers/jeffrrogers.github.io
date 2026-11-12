// The page's side of genWorker.js: build one board, or ask about one word, as
// a promise.

let worker = null;
let nextId = 1;
const pending = new Map();

function start() {
  worker = new Worker(new URL('./genWorker.js?v=202611121452', import.meta.url));
  worker.onmessage = ({ data }) => {
    const p = pending.get(data.id);
    if (!p) return;
    pending.delete(data.id);
    if (data.error) p.reject(new Error(data.error));
    else p.resolve(data.result);
  };
  worker.onerror = (e) => {
    for (const p of pending.values()) p.reject(new Error(e.message || 'The generator stopped.'));
    pending.clear();
    worker = null;
  };
}

function call(game, op, req, files) {
  if (!worker) start();
  const id = nextId++;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    worker.postMessage({ id, game, op, req, files });
  });
}

/**
 * Builds a board with [game]'s generator: {day, kind?, forced?, avoid?} ->
 * {line, word} or {error} (no fitting board). Rejects only when the
 * generator itself couldn't run. [files] replaces deployed word lists
 * ({'allowlist.txt': text}).
 */
export function buildBoard(game, req, files) {
  return call(game, 'build', req, files);
}

/**
 * What [game]'s generator makes of a word: {word, day?} -> {inDictionary,
 * required, stoplisted, bonusOnly}. Canagrams needs the day: how common a
 * grid word must be depends on it.
 */
export function wordStatus(game, req, files) {
  return call(game, 'status', req, files);
}
