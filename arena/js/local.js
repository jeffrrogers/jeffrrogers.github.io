// Read-only access to the games' shared_preferences, plus the arena's own
// per-browser conveniences.
//
// Flutter web's shared_preferences stores every key in localStorage as
// "flutter.<key>" with a JSON-encoded value (strings are quoted, string lists
// are JSON arrays). The arena lives on the same origin as the games, so it can
// read them directly. Storage can be unavailable (private mode, blocked site
// data), so every access is guarded.

export function readPref(key) {
  let raw;
  try {
    raw = localStorage.getItem('flutter.' + key);
  } catch {
    return null;
  }
  if (raw == null) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

/** The anonymous player id every game shares, or null for a new player. */
export function playerId() {
  const id = readPref('FirestoreUsername');
  return typeof id === 'string' && id.length > 0 ? id : null;
}

export function arenaGet(key, fallback = null) {
  try {
    const raw = localStorage.getItem('arena.' + key);
    return raw == null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function arenaSet(key, value) {
  try {
    localStorage.setItem('arena.' + key, JSON.stringify(value));
  } catch {
    // Storage full or blocked: the arena works without its cache.
  }
}
