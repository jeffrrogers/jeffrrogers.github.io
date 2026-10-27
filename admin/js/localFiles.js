// The Arena folder on this computer, for the featured-word swap: the admin
// reads and rewrites the game projects' shipped puzzle files there, and the
// sandbox and production site checkouts beside them.
//
// Uses the browser's File System Access API (Chrome and Edge). You pick the
// Arena folder once; the handle is kept in IndexedDB, and the browser asks
// again for permission on a later visit. Paths are relative to the Arena
// folder, with forward slashes ('squaredleSourceCode/assets/data/dailies_000.json').

const DB = 'admin-local-files';
const STORE = 'handles';
const KEY = 'arena';

export const SANDBOX_SITE = 'CanuckleIO/jeffrrogers.github.io';
export const PROD_SITE = 'canuckleSite';

export const hasFolderAccess = () => typeof window !== 'undefined' && 'showDirectoryPicker' in window;

function idb(mode, fn) {
  return new Promise((resolve, reject) => {
    const open = indexedDB.open(DB, 1);
    open.onupgradeneeded = () => open.result.createObjectStore(STORE);
    open.onerror = () => reject(open.error);
    open.onsuccess = () => {
      const tx = open.result.transaction(STORE, mode);
      const req = fn(tx.objectStore(STORE));
      tx.oncomplete = () => resolve(req?.result);
      tx.onerror = () => reject(tx.error);
    };
  });
}

let root = null;

/** The remembered Arena folder, if this browser may still use it without asking. */
export async function arenaFolder() {
  if (root) return root;
  try {
    const saved = await idb('readonly', (s) => s.get(KEY));
    if (saved && (await saved.queryPermission({ mode: 'readwrite' })) === 'granted') root = saved;
  } catch {
    // No IndexedDB (private window): pick the folder again.
  }
  return root;
}

/**
 * Asks for the Arena folder: the remembered one if there is one (one click to
 * allow), else a folder picker. Must run from a click. Checks it looks like
 * the Arena folder.
 */
export async function connectArenaFolder() {
  let handle = null;
  try {
    handle = await idb('readonly', (s) => s.get(KEY));
  } catch {
    handle = null;
  }
  if (!handle || (await handle.requestPermission({ mode: 'readwrite' })) !== 'granted') {
    handle = await window.showDirectoryPicker({ id: 'arena', mode: 'readwrite' });
  }
  for (const dir of ['gamesHub', 'squaredleSourceCode', 'canagramsSourceCode']) {
    try {
      await handle.getDirectoryHandle(dir);
    } catch {
      throw new Error(`That doesn't look like the Arena folder: it has no ${dir} folder.`);
    }
  }
  try {
    await idb('readwrite', (s) => s.put(handle, KEY));
  } catch {
    // Remembered for this page only.
  }
  root = handle;
  return handle;
}

async function dirOf(path, create) {
  const parts = path.split('/').filter(Boolean);
  const name = parts.pop();
  let dir = root;
  if (!dir) throw new Error('The Arena folder is not connected.');
  for (const p of parts) dir = await dir.getDirectoryHandle(p, { create });
  return { dir, name };
}

/** Whether a folder exists (e.g. canuckleSite/canoggle). */
export async function folderExists(path) {
  try {
    const { dir, name } = await dirOf(path, false);
    await dir.getDirectoryHandle(name);
    return true;
  } catch {
    return false;
  }
}

/** A file's text, or null when it doesn't exist. */
export async function readText(path) {
  try {
    const { dir, name } = await dirOf(path, false);
    const file = await (await dir.getFileHandle(name)).getFile();
    return await file.text();
  } catch (e) {
    if (e?.name === 'NotFoundError' || e?.name === 'TypeMismatchError') return null;
    throw e;
  }
}

/** Writes [text] (UTF-8, no BOM), making folders as needed. */
export async function writeText(path, text) {
  const { dir, name } = await dirOf(path, true);
  const writable = await (await dir.getFileHandle(name, { create: true })).createWritable();
  await writable.write(new Blob([text], { type: 'text/plain' }));
  await writable.close();
}

/** Hex SHA-256 of [text] as UTF-8, or null for a missing file. */
export async function sha256(text) {
  if (text == null) return null;
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
