// Friends & challenges for the games: what window.arenaChallenge does on a
// game's page. nextUp.js (which every game loads) sets up window.arenaChallenge
// only where featureOn('challenges'), and loads this module on first use.
//
// The games pass a puzzle in the server's own shape (firebase/functions
// src/games.js: Canagrams {day}, Canoku {day, mode}, ...) and get back plain
// JSON strings, which keeps the Dart side simple
// (canuckleSharedCode/lib/challenge/challenge_bridge.dart).
//
// It works from this browser's copy of the player's social doc (written by
// the Arena), re-reading it (one Firestore read) only when that copy is a few
// minutes old.

import { call, cachedSocial, loadSocialViaServer, reasonText } from './api.js?v=202611151415';
import { WINNER_RULE } from './puzzles.js?v=202611151415';
import { arenaGet, playerId } from '../local.js?v=202611151415';

const FRESH_MS = 3 * 60000;
const atKey = () => `socialAt.${playerId()}`;

/**
 * The player's social doc, re-read if this browser's copy is a few minutes
 * old. Asked of the server: a game's page never loads the Firestore SDK.
 */
async function social({ fresh = false } = {}) {
  const at = arenaGet(atKey(), 0) || 0;
  if (!fresh && Date.now() - at < FRESH_MS) return cachedSocial();
  try {
    return await loadSocialViaServer();
  } catch (e) {
    console.warn('arena: challenge list unavailable', e?.reason ?? e);
    return cachedSocial();
  }
}

const sameJson = (a, b) => JSON.stringify(Object.keys(a ?? {}).sort().map((k) => [k, a[k]]))
  === JSON.stringify(Object.keys(b ?? {}).sort().map((k) => [k, b[k]]));

/** [cid, view] of the open challenge on this exact puzzle, or null. */
function challengeOn(doc, gameId, puzzle, { open = true } = {}) {
  const hit = Object.entries(doc?.challenges ?? {})
    .find(([, v]) => v.game === gameId && sameJson(v.puzzle, puzzle) && (!open || v.status === 'open'));
  return hit ?? null;
}

const parse = (json) => {
  try {
    return typeof json === 'string' ? JSON.parse(json) : json;
  } catch {
    return null;
  }
};

/**
 * What the game's pre-start cover shows for this untouched puzzle:
 * {invite: {cid, from, players: [{name, state}], expiresAt, rule} | null}.
 */
export async function cover(gameId, puzzleJson) {
  const doc = await social();
  if (!doc?.gamerId || doc.challengeAge !== 'ok') return JSON.stringify({ show: false });
  const hit = challengeOn(doc, gameId, parse(puzzleJson));
  const invite = hit && hit[1].me === 'invited' ? {
    cid: hit[0],
    from: hit[1].from,
    players: hit[1].players.map((p) => ({ name: p.pub === doc.pub ? 'You' : p.gamerId, state: p.state })),
    expiresAt: hit[1].expiresAt,
    rule: WINNER_RULE[gameId] ?? '',
  } : null;
  // An accepted challenge on this puzzle needs no cover: just play it.
  const accepted = hit && hit[1].me === 'accepted';
  return JSON.stringify({
    show: !accepted,
    invite,
    canChallenge: Object.keys(doc.friends ?? {}).length > 0,
  });
}

/** Accepts (true) or declines (false) challenge [cid]. Resolves true when it worked. */
export async function respond(cid, accept) {
  try {
    await call('respondChallenge', { cid, accept });
    await social({ fresh: true });
    return true;
  } catch (e) {
    toast(reasonText(e.reason));
    return false;
  }
}

/**
 * Once the game has saved a finished puzzle: has the server record it, and
 * returns the challenge's standings as JSON, or null when this puzzle isn't
 * in a challenge. [attempt] lets the game ask again a little later when the
 * result wasn't in yet ({recorded: false}).
 */
export async function finished(gameId, puzzleJson) {
  const puzzle = parse(puzzleJson);
  let doc = cachedSocial();
  if (!challengeOn(doc, gameId, puzzle, { open: false })) doc = await social({ fresh: true });
  const hit = challengeOn(doc, gameId, puzzle, { open: false });
  if (!hit) return null;
  if (hit[1].status === 'open' && ['invited', 'accepted'].includes(hit[1].me)) {
    try {
      await call('collectResult', { cid: hit[0] });
    } catch {
      // Offline: the Arena collects later.
    }
    doc = await social({ fresh: true });
  }
  const [cid, v] = challengeOn(doc, gameId, puzzle, { open: false }) ?? hit;
  const me = v.players.find((p) => p.pub === doc.pub);
  return JSON.stringify({
    cid,
    status: v.status,
    recorded: v.me === 'done',
    from: v.from,
    rule: WINNER_RULE[gameId] ?? '',
    expiresAt: v.expiresAt,
    myRank: me?.rank ?? null,
    players: v.players.map((p) => ({
      name: p.pub === doc.pub ? 'You' : p.gamerId,
      me: p.pub === doc.pub,
      state: p.state,
      rank: p.rank ?? null,
      score: p.score ?? null,
      already: !!p.already,
    })),
  });
}

// ---- The friend picker: a small overlay of its own --------------------------------
//
// Game pages don't load the Arena's stylesheet, so this brings its own.

const STYLE = `
.ac-back{position:fixed;inset:0;z-index:2147483000;background:rgba(15,15,18,.55);display:flex;align-items:flex-end;justify-content:center;font:16px/1.4 system-ui,-apple-system,'Segoe UI',sans-serif}
.ac-sheet{background:#fff;color:#17171a;width:100%;max-width:480px;max-height:88vh;overflow:auto;border-radius:22px 22px 0 0;padding:18px 18px 22px;box-sizing:border-box;display:flex;flex-direction:column;gap:14px}
@media(min-width:600px){.ac-back{align-items:center}.ac-sheet{border-radius:22px}}
@media(prefers-color-scheme:dark){.ac-sheet{background:#1c1c1f;color:#f4f2ef}.ac-row{border-color:#34343a!important}.ac-muted{color:#a8a49e!important}.ac-sec{background:#26262a!important;color:#f4f2ef!important}}
.ac-head{display:flex;align-items:center;justify-content:space-between;gap:12px}
.ac-head h2{margin:0;font-size:20px;font-weight:800}
.ac-x{width:40px;height:40px;border-radius:50%;border:0;background:rgba(127,127,127,.15);color:inherit;font-size:20px;cursor:pointer}
.ac-muted{color:#5e5b57;font-size:14px;margin:0}
.ac-prompt{margin:0;font-weight:700}
.ac-list{display:flex;flex-direction:column}
.ac-row{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:52px;border-bottom:1px solid #e6e1da;cursor:pointer;font-weight:600}
.ac-row:last-child{border-bottom:0}
.ac-row input{width:22px;height:22px}
.ac-btn{min-height:48px;border:0;border-radius:999px;background:#d52b1e;color:#fff;font:700 16px system-ui,sans-serif;cursor:pointer}
.ac-btn:disabled{opacity:.5;cursor:default}
.ac-sec{background:#f4f0ea;color:#17171a}
.ac-err{color:#b3241a;font-weight:600;margin:0}
.ac-toast{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:2147483001;background:#17171a;color:#fff;padding:12px 18px;border-radius:999px;font:700 15px system-ui,sans-serif}
`;

function ensureStyle() {
  if (document.getElementById('arena-challenge-style')) return;
  const s = document.createElement('style');
  s.id = 'arena-challenge-style';
  s.textContent = STYLE;
  document.head.append(s);
}

function el(tag, props = {}, ...kids) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (v == null || v === false) continue;
    if (k === 'class') e.className = v;
    else if (k === 'text') e.textContent = v;
    else if (k.startsWith('on')) e.addEventListener(k.slice(2).toLowerCase(), v);
    else e.setAttribute(k, v === true ? '' : v);
  }
  for (const c of kids.flat()) if (c != null) e.append(c);
  return e;
}

function toast(message) {
  ensureStyle();
  const t = el('div', { class: 'ac-toast', role: 'status', text: message });
  document.body.append(t);
  setTimeout(() => t.remove(), 2600);
}

/**
 * The friend picker for a challenge on this puzzle. Resolves with the new
 * challenge's ID once it's sent, or null when the player closes it. Keys
 * typed here never reach the game (the overlay stops them).
 */
export async function pick(gameId, puzzleJson, title = '') {
  const doc = await social();
  const friends = Object.entries(doc?.friends ?? {}).sort(([, a], [, b]) => a.gamerId.localeCompare(b.gamerId));
  ensureStyle();
  return new Promise((resolve) => {
    const picked = new Set();
    let done = false;
    const finish = (value) => {
      if (done) return;
      done = true;
      back.remove();
      document.removeEventListener('keydown', onKey, true);
      resolve(value);
    };
    const onKey = (e) => {
      e.stopPropagation();
      if (e.key === 'Escape') finish(null);
    };
    const err = el('p', { class: 'ac-err' });
    err.hidden = true;
    const send = el('button', { class: 'ac-btn', type: 'button' });
    // The button says what's missing until a friend is picked.
    const update = () => {
      send.disabled = picked.size === 0;
      send.textContent = picked.size ? 'Send & Play' : 'Pick a friend to challenge';
    };
    // Only one friend: they're who it's for.
    if (friends.length === 1) picked.add(friends[0][0]);
    const rows = friends.map(([pub, f]) => {
      const box = el('input', { type: 'checkbox', checked: picked.has(pub) });
      box.addEventListener('change', () => {
        if (box.checked && picked.size >= 9) {
          box.checked = false;
          toast('A challenge can include up to 9 friends.');
          return;
        }
        if (box.checked) picked.add(pub);
        else picked.delete(pub);
        update();
      });
      return el('label', { class: 'ac-row' }, el('span', { text: f.gamerId }), box);
    });
    update();
    send.addEventListener('click', async () => {
      send.disabled = true;
      send.textContent = 'Sending…';
      err.hidden = true;
      try {
        const { cid } = await call('createChallenge', { game: gameId, puzzle: parse(puzzleJson), friends: [...picked] });
        await social({ fresh: true });
        finish(cid);
      } catch (e) {
        err.textContent = e.reason === 'already-started'
          ? 'You’ve already started this puzzle, so it can’t be a challenge.'
          : reasonText(e.reason);
        err.hidden = false;
        update();
      }
    });
    const sheet = el('div', { class: 'ac-sheet', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Challenge friends' },
      el('div', { class: 'ac-head' },
        el('h2', { text: 'Challenge friends' }),
        el('button', { class: 'ac-x', type: 'button', 'aria-label': 'Close', text: '×', onClick: () => finish(null) })),
      title ? el('p', { class: 'ac-muted', text: title }) : null,
      friends.length
        ? el('p', { class: 'ac-prompt', text: friends.length === 1 ? 'Your friend to challenge:' : 'Pick the friends to challenge (up to 9):' })
        : null,
      friends.length
        ? el('div', { class: 'ac-list' }, rows)
        : el('p', { class: 'ac-muted', text: 'Add friends in the Arena’s Challenges tab first.' }),
      el('p', { class: 'ac-muted', text: `Open for 3 days. ${WINNER_RULE[gameId] ?? ''}` }),
      err,
      send);
    const back = el('div', { class: 'ac-back' }, sheet);
    back.addEventListener('click', (e) => { if (e.target === back) finish(null); });
    // Stop every key here first, so typing in the picker never plays a letter.
    document.addEventListener('keydown', onKey, true);
    document.body.append(back);
    (rows[0]?.querySelector('input') ?? send).focus();
  });
}
