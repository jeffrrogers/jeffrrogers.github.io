// The page's side of genWorker.js: build one board, as a promise.

let worker = null;
let nextId = 1;
const pending = new Map();

function start() {
  worker = new Worker(new URL('./genWorker.js?v=202610311155', import.meta.url));
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

/**
 * Builds a board with [game]'s generator: {day, kind?, forced?, avoid?} ->
 * {line, word} or {error} (no fitting board). Rejects only when the
 * generator itself couldn't run.
 */
export function buildBoard(game, req) {
  if (!worker) start();
  const id = nextId++;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    worker.postMessage({ id, game, req });
  });
}
