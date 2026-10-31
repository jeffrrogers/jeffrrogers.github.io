// Player docs the Firestore rules would lock out. Every player collection's
// rules start with validId(id) and, on a write, emailOk()
// (firebase/firestore.rules). A doc whose ID fails validId can't even be read
// by its own player, and Canoku 2.1.0 hangs on load when that happens; one
// whose email isn't a string of at most 254 characters can't be saved again.
// Neither can happen under the open console rules, so this finds them before
// the rules are published.

import { PLAYER_COLLECTIONS } from './cleanup.js?v=202610311117';

/** The rules' validId(id): `id.matches('^[A-Za-z0-9_-]{1,64}$')`. Keep in step. */
export const VALID_ID = /^[A-Za-z0-9_-]{1,64}$/;

/** The rules' emailOk(): `email is string && email.size() <= 254`. */
export const MAX_EMAIL = 254;

/** Every collection keyed by player ID, Brain Health's included. */
export const ID_CHECK_COLLECTIONS = [...PLAYER_COLLECTIONS, 'brainokuUserData'];

/** What the rules would refuse about one player doc: [] when nothing. */
export function idProblems(id, data) {
  const out = [];
  if (!VALID_ID.test(id)) out.push('ID fails validId');
  if (data && 'email' in data) {
    const e = data.email;
    if (typeof e !== 'string') out.push(`email is ${e === null ? 'null' : typeof e}, not a string`);
    else if (e.length > MAX_EMAIL) out.push(`email is ${e.length} characters (max ${MAX_EMAIL})`);
  }
  return out;
}
