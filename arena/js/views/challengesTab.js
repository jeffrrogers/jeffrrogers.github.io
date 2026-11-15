// The Challenges tab: #challenges (Active), #challenges/record and
// #challenges/friends. Only loaded while featureOn('challenges').
//
// Everything shown comes from the player's social doc (app.social), which
// only the server writes. Actions call the server, then re-read the doc.

import { h, openSheet, sheetHead, toast, ICONS } from '../ui.js?v=202611150743';
import { call, loadSocial, reasonText, waitingCount, hasStartedSocial } from '../social/api.js?v=202611150743';
import { setUpChallenges, gamerIdStep } from '../social/onboarding.js?v=202611150743';
import { arenaGet, arenaSet, playerId } from '../local.js?v=202611150743';
import { track } from '../analytics.js?v=202611150743';

// ---- Shared state -------------------------------------------------------------

let app = null;
let loadingSocial = null;

/** Wires the tab to the app (app.js calls this once). */
export function initChallenges(theApp) {
  app = theApp;
}

/** Re-reads the social doc and repaints. Resolves with it. */
export function refreshSocial() {
  if (loadingSocial) return loadingSocial;
  loadingSocial = loadSocial(app.uid)
    .then((doc) => {
      app.social = doc;
      app.socialError = false;
      return doc;
    })
    .catch(() => {
      app.socialError = true;
      return app.social;
    })
    .finally(() => {
      loadingSocial = null;
      app.socialLoaded = true;
      app.refresh();
    });
  return loadingSocial;
}

/** The count on the Challenges tab. */
export const badgeCount = () => waitingCount(app?.social);

/** Runs server op [op], then re-reads the doc. Shows a toast on failure. Resolves with the result or null. */
async function act(op, data, done) {
  try {
    const result = await call(op, data);
    await refreshSocial();
    if (done) toast(typeof done === 'function' ? done(result) : done);
    return result;
  } catch (e) {
    toast(reasonText(e.reason));
    return null;
  }
}

async function setUp() {
  const social = await setUpChallenges();
  // Setup makes a player ID for someone who had none
  app.uid = app.uid || playerId();
  if (social) app.social = social;
  else if (app.uid) await refreshSocial();
  app.socialLoaded = true;
  app.refresh();
  return social;
}

/** At boot: read the social doc only for players who have started setting up challenges. */
export function bootSocial() {
  if (app.uid && hasStartedSocial()) refreshSocial();
  else app.socialLoaded = !app.uid ? true : app.socialLoaded;
}

/** Settings → Delete my social data. */
export function deleteMySocialData() {
  confirmSheet('Delete your social data?',
    'This removes your gamer ID, your friends and friend requests, and your challenge history, and takes you out of open challenges. Your games, stats and badges stay.',
    'Delete', () => act('deleteSocialData', {}, 'Your social data is deleted.'));
}

// ---- Small pieces ---------------------------------------------------------------

const AVATAR_COLOURS = ['#1F5E96', '#6B3FA0', '#0E7C7B', '#7B4A22', '#1E5A3C', '#B3241A', '#2A2A33'];

function avatar(pub, gamerId, size = 'md') {
  let n = 0;
  for (const c of pub || gamerId || '') n = (n * 31 + c.charCodeAt(0)) >>> 0;
  const caps = (gamerId || '?').replace(/[^A-Z]/g, '');
  const initials = (caps.length >= 2 ? caps.slice(0, 2) : (gamerId || '?').slice(0, 2)).toUpperCase();
  return h('span', {
    class: `soc-avatar ${size}`, 'aria-hidden': 'true', text: initials,
    style: { background: AVATAR_COLOURS[n % AVATAR_COLOURS.length] },
  });
}

const shortDay = (ms) => new Date(ms).toLocaleDateString('en-CA', { weekday: 'short', month: 'short', day: 'numeric' });

const record = (r) => `${r?.w ?? 0}–${r?.l ?? 0}–${r?.t ?? 0}`;

function segment(current) {
  const seg = (id, href, label) => h('a', {
    class: 'soc-seg-btn', href, 'aria-current': current === id ? 'page' : null, text: label,
  });
  return h('nav', { class: 'soc-seg', 'aria-label': 'Challenges sections' },
    seg('active', '#challenges', 'Active'),
    seg('record', '#challenges/record', 'Record'),
    seg('friends', '#challenges/friends', 'Friends'));
}

function sectionHead(title, count) {
  return h('h2', { class: 'soc-h2' }, title, count ? h('span', { class: 'muted', text: ` · ${count}` }) : null);
}

function confirmSheet(title, text, yes, onYes) {
  let close;
  const go = h('button', { class: 'btn', type: 'button', text: yes });
  go.addEventListener('click', async () => {
    go.disabled = true;
    await onYes();
    close();
  });
  close = openSheet(h('div', { class: 'soc-step' },
    sheetHead(title, () => close()),
    h('p', { class: 'muted', text }),
    h('div', { class: 'actions' },
      h('button', { class: 'btn secondary', type: 'button', text: 'Cancel', onClick: () => close() }),
      go)), { label: title });
}

// ---- Not set up yet -------------------------------------------------------------

function intro() {
  return h('div', { class: 'card soc-intro' },
    h('span', { class: 'soc-intro-icon', html: ICONS.trophy }),
    h('h2', { text: 'Challenge your friends' }),
    h('p', { class: 'muted', text: 'Send friends the same puzzle, play whenever you like, and see who did best. Pick a gamer ID to get started. Only friends you accept see your challenges and results.' }),
    h('button', { class: 'btn', type: 'button', text: 'Set up challenges', onClick: () => setUp() }));
}

function under() {
  return h('div', { class: 'card soc-intro' },
    h('h2', { text: 'Challenges are for players 14 and up' }),
    h('p', { class: 'muted', text: 'You can still play every game, track your stats and earn badges right here in the Arena.' }));
}

// ---- Friend requests (shown on Active and Friends) ----------------------------------

function requestRows(social) {
  const incoming = Object.entries(social.requestsIn ?? {}).sort(([, a], [, b]) => (b.at ?? 0) - (a.at ?? 0));
  const outgoing = Object.entries(social.requestsOut ?? {}).sort(([, a], [, b]) => (b.at ?? 0) - (a.at ?? 0));
  const rows = [
    ...incoming.map(([pub, r]) => h('div', { class: 'soc-row-item' },
      avatar(pub, r.gamerId),
      h('span', { class: 'soc-who' }, h('strong', { text: r.gamerId }), h('span', { class: 'muted', text: 'Wants to be friends' })),
      h('button', {
        class: 'btn small', type: 'button', text: 'Accept',
        onClick: () => act('respondFriendRequest', { pub, accept: true }, `You and ${r.gamerId} are friends.`),
      }),
      h('button', {
        class: 'icon-btn', type: 'button', 'aria-label': `Deny ${r.gamerId}`, html: ICONS.close,
        onClick: () => act('respondFriendRequest', { pub, accept: false }),
      }))),
    ...outgoing.map(([pub, r]) => h('div', { class: 'soc-row-item' },
      avatar(pub, r.gamerId),
      h('span', { class: 'soc-who' }, h('strong', { text: r.gamerId }), h('span', { class: 'muted', text: `You asked · ${shortDay(r.at)}` })),
      h('button', {
        class: 'text-btn', type: 'button', text: 'Cancel',
        onClick: () => act('cancelFriendRequest', { pub }),
      }))),
  ];
  return { rows, incoming: incoming.length, outgoing: outgoing.length };
}

// ---- Active ---------------------------------------------------------------------

/** Friends who joined through this player's invite link since they last looked. */
function newLinkJoins(social) {
  const seen = arenaGet('linkJoinsSeen', 0) || 0;
  return Object.entries(social.friends ?? {})
    .filter(([, f]) => f.via === 'link' && (f.since ?? 0) > seen)
    .map(([pub, f]) => ({ pub, ...f }));
}

function markLinkJoinsSeen() {
  try {
    arenaSet('linkJoinsSeen', Date.now());
  } catch {
    // No storage: shown again next time.
  }
}

/**
 * The friend to suggest challenging: the one played least against, then the
 * newest friend. Among equals it changes day to day ([dayNumber]), so the
 * same name isn't always first.
 */
export function suggestFriend(friends, dayNumber = Math.floor(Date.now() / 86400000)) {
  const list = Object.entries(friends ?? {}).map(([pub, f]) => ({
    pub, ...f, played: (f.record?.w ?? 0) + (f.record?.l ?? 0) + (f.record?.t ?? 0),
  }));
  if (!list.length) return null;
  const fewest = Math.min(...list.map((f) => f.played));
  const tied = list.filter((f) => f.played === fewest)
    .sort((a, b) => (b.since ?? 0) - (a.since ?? 0) || a.gamerId.localeCompare(b.gamerId));
  return tied[dayNumber % tied.length];
}

/** Has friends, no challenges yet: suggest one by name. */
function suggestionCard(social) {
  const f = suggestFriend(social.friends);
  const others = Object.keys(social.friends).length - 1;
  return h('div', { class: 'card soc-suggestion' },
    avatar(f.pub, f.gamerId, 'lg'),
    h('div', { class: 'soc-who' },
      h('strong', { text: `Challenge ${f.gamerId}` }),
      h('span', { class: 'muted', text: f.played
        ? `You’ve played ${f.played} ${f.played === 1 ? 'challenge' : 'challenges'} together (${record(f.record)}).`
        : 'You haven’t played a challenge together yet.' })),
    h('button', {
      class: 'btn small', type: 'button', text: 'Challenge',
      // Starting a challenge arrives in 4b, from here and the Games tab.
      onClick: () => toast(`Challenging ${f.gamerId} arrives in the next update.`),
    }),
    others > 0 ? h('a', { class: 'text-btn soc-suggestion-more', href: '#challenges/friends', text: `or one of your ${others} other ${others === 1 ? 'friend' : 'friends'}` }) : null);
}

function activeView(social) {
  const { rows, incoming } = requestRows(social);
  const joins = newLinkJoins(social);
  if (joins.length) setTimeout(markLinkJoinsSeen, 0);
  return h('div', { class: 'soc-stack' },
    joins.length ? h('div', { class: 'card soc-notice', role: 'status' },
      joins.map((f) => h('p', {}, h('strong', { text: f.gamerId }), ' joined through your invite link. You’re friends now.'))) : null,
    incoming ? h('section', { class: 'soc-stack' },
      sectionHead('Waiting for you', incoming),
      h('div', { class: 'card soc-list' }, rows.slice(0, incoming))) : null,
    h('section', { class: 'soc-stack' },
      sectionHead('Challenges'),
      Object.keys(social.friends ?? {}).length
        ? suggestionCard(social)
        : h('div', { class: 'card soc-empty soc-cta' },
          h('span', { class: 'soc-intro-icon', html: ICONS.people }),
          h('p', {}, h('strong', { text: 'Add friends to start challenging.' }),
            ' Send a request by gamer ID, or share your invite link with family and friends.'),
          h('a', { class: 'btn', href: '#challenges/friends', text: 'Add friends' }))));
}

// ---- Record -------------------------------------------------------------------------

function recordView(social) {
  const o = social.overall ?? {};
  const friends = Object.entries(social.friends ?? {});
  return h('div', { class: 'soc-stack' },
    h('div', { class: 'card soc-record' },
      h('span', { class: 'soc-kicker', text: 'Against everyone' }),
      h('div', { class: 'soc-big' }, h('strong', { text: record(o) }), h('span', { class: 'muted', text: 'won · lost · tied' }))),
    friends.length ? h('section', { class: 'soc-stack' },
      sectionHead('Head-to-head'),
      h('div', { class: 'card soc-list' }, friends.map(([pub, f]) => h('div', { class: 'soc-row-item' },
        avatar(pub, f.gamerId),
        h('span', { class: 'soc-who' }, h('strong', { text: f.gamerId })),
        h('span', { class: 'soc-score', text: record(f.record) }))))) : null);
}

// ---- Friends ------------------------------------------------------------------------

async function shareInvite(reset = false) {
  const result = await act('getInviteLink', reset ? { reset: true } : {});
  if (!result?.code) return;
  const url = `${location.origin}${location.pathname}?friend=${result.code}`;
  const until = shortDay(result.expiresAt);
  const text = `Be my friend on the Canuckle Games Arena, and let's challenge each other! This link works until ${until}.`;
  track('challenge_invite_share', { reset: reset ? 1 : 0 });
  try {
    if (navigator.share && matchMedia('(pointer: coarse)').matches) {
      await navigator.share({ title: 'Canuckle Games Arena', text, url });
      return;
    }
  } catch {
    // Cancelled or unsupported: fall back to copying.
  }
  try {
    await navigator.clipboard.writeText(`${text} ${url}`);
    toast(`Invite link copied. It works until ${until}.`);
  } catch {
    toast(url);
  }
}

function friendMenu(pub, f) {
  let close;
  const item = (label, onClick, danger) => h('button', {
    class: `set-row link-row${danger ? ' danger' : ''}`, type: 'button', onClick: () => { close(); onClick(); },
  }, h('span', { class: 'set-text' }, h('span', { class: 'set-label', text: label })));
  close = openSheet(h('div', { class: 'soc-step' },
    sheetHead(f.gamerId, () => close()),
    h('p', { class: 'muted', text: `Friends since ${shortDay(f.since)} · ${record(f.record)} against each other` }),
    h('div', { class: 'set-card' },
      item('Remove friend', () => confirmSheet('Remove friend?', `${f.gamerId} won’t see your gamer ID or challenges any more. Your open challenges carry on.`, 'Remove',
        () => act('removeFriend', { pub }, `${f.gamerId} removed.`))),
      item('Block', () => confirmSheet(`Block ${f.gamerId}?`, 'They’re removed from your friends and can’t send you requests. They aren’t told.', 'Block',
        () => act('blockPlayer', { pub }, `${f.gamerId} blocked.`)), true),
      item('Report gamer ID', () => confirmSheet('Report this gamer ID?', `Tell us ${f.gamerId} is offensive or impersonating someone. We’ll take a look.`, 'Report',
        () => act('reportGamerId', { pub }, 'Thanks, we’ll take a look.')), true))), { label: f.gamerId });
}

function friendsView(social) {
  const { rows, incoming, outgoing } = requestRows(social);
  const friends = Object.entries(social.friends ?? {}).sort(([, a], [, b]) => a.gamerId.localeCompare(b.gamerId));
  const blocked = Object.entries(social.blocked ?? {});

  const input = h('input', {
    id: 'soc-add', type: 'text', placeholder: 'e.g. MapleMoose', maxlength: '16',
    autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false',
  });
  const send = h('button', { class: 'btn small', type: 'submit', text: 'Send' });
  const form = h('form', { class: 'inline-form' }, input, send);
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const gamerId = input.value.trim();
    if (!gamerId) return;
    send.disabled = true;
    const r = await act('sendFriendRequest', { gamerId }, (res) => (res.status === 'friends'
      ? `You and ${gamerId} are friends.` : `Request sent to ${gamerId}.`));
    send.disabled = false;
    if (r) input.value = '';
  });

  return h('div', { class: 'soc-stack' },
    h('div', { class: 'card soc-me' },
      h('div', { class: 'soc-me-row' },
        h('span', { class: 'soc-who' },
          h('span', { class: 'soc-kicker', text: 'Your gamer ID' }),
          h('strong', { class: 'soc-gid', text: social.gamerId })),
        h('button', {
          class: 'btn secondary small', type: 'button', text: 'Change',
          onClick: async () => { if (await gamerIdStep({ current: social.gamerId })) refreshSocial(); },
        })),
      h('p', { class: 'soc-hint' }, h('span', { class: 'soc-inline-icon', html: ICONS.lock }),
        'Anyone who knows your gamer ID can send you a friend request. Only friends you accept see your challenges and results. Your private User ID is never shown.')),

    incoming + outgoing ? h('section', { class: 'soc-stack' },
      sectionHead('Requests', incoming + outgoing),
      h('div', { class: 'card soc-list' }, rows)) : null,

    h('section', { class: 'soc-stack' },
      sectionHead('Add a friend'),
      h('div', { class: 'card soc-add' },
        h('label', { for: 'soc-add', class: 'set-label', text: 'Their gamer ID' }),
        form,
        h('div', { class: 'soc-or' }, h('span', { text: 'or' })),
        h('button', {
          class: 'btn secondary soc-wide', type: 'button', onClick: () => shareInvite(false),
        }, h('span', { html: ICONS.share }), 'Share my invite link'),
        h('p', { class: 'soc-hint' }, 'Anyone who opens your link becomes your friend straight away. It works for 3 days. ',
          h('button', { class: 'text-btn', type: 'button', text: 'Make a new link', onClick: () => shareInvite(true) }),
          ' if you shared it somewhere you shouldn’t have.'))),

    h('section', { class: 'soc-stack' },
      sectionHead('Friends', friends.length),
      friends.length
        ? h('div', { class: 'card soc-list' }, friends.map(([pub, f]) => h('div', { class: 'soc-row-item' },
          avatar(pub, f.gamerId),
          h('span', { class: 'soc-who' }, h('strong', { text: f.gamerId }), h('span', { class: 'muted', text: `${record(f.record)} against each other` })),
          h('button', {
            class: 'icon-btn', type: 'button', 'aria-label': `More for ${f.gamerId}`, html: ICONS.more,
            onClick: () => friendMenu(pub, f),
          }))))
        : h('div', { class: 'card soc-empty' }, h('p', { class: 'muted', text: 'No friends yet. Add one by gamer ID, or share your invite link.' }))),

    blocked.length ? h('section', { class: 'soc-stack' },
      sectionHead('Blocked', blocked.length),
      h('div', { class: 'card soc-list' }, blocked.map(([pub, b]) => h('div', { class: 'soc-row-item' },
        avatar(pub, b.gamerId),
        h('span', { class: 'soc-who' }, h('strong', { text: b.gamerId })),
        h('button', {
          class: 'text-btn', type: 'button', text: 'Unblock',
          onClick: () => act('unblockPlayer', { pub }, `${b.gamerId} unblocked.`),
        }))))) : null);
}

// ---- The tab ------------------------------------------------------------------------

/** Renders the tab for route arg [sub] ('' | 'record' | 'friends'). */
export function renderChallenges(sub = '') {
  const social = app.social;
  if (!app.socialLoaded && !loadingSocial && app.uid) refreshSocial();
  const page = h('div', { class: 'wrap soc-page' });

  if (!app.socialLoaded && app.uid) {
    page.append(h('p', { class: 'muted', text: 'Loading…' }));
    return page;
  }
  if (app.socialError && !social) {
    page.append(h('div', { class: 'card soc-empty' },
      h('p', { class: 'muted', text: 'Couldn’t load your challenges.' }),
      h('button', { class: 'btn secondary small', type: 'button', text: 'Try again', onClick: () => refreshSocial() })));
    return page;
  }
  if (social?.challengeAge === 'under') {
    page.append(under());
    return page;
  }
  if (!social?.gamerId) {
    page.append(intro());
    return page;
  }

  const current = sub === 'record' || sub === 'friends' ? sub : 'active';
  page.append(
    h('div', { class: 'soc-top' },
      h('div', {},
        h('h1', { class: 'soc-h1', text: 'Challenges' }),
        h('p', { class: 'muted' }, 'Playing as ', h('strong', { text: social.gamerId })))),
    segment(current),
    current === 'record' ? recordView(social) : current === 'friends' ? friendsView(social) : activeView(social));
  return page;
}

// ---- Links -------------------------------------------------------------------------

/**
 * /arena/?friend=CODE: someone's invite link. Takes the visitor through setup
 * if needed (making them a player ID if they've never played), then makes
 * them friends. Strips the code from the address first, so a reload doesn't
 * repeat it.
 */
export async function openFriendLink(code) {
  history.replaceState(null, '', `${location.pathname}#challenges/friends`);
  const social = app.social?.gamerId ? app.social : await setUp();
  if (!social?.gamerId) return;
  track('challenge_invite_open');
  await act('sendFriendRequest', { code }, (res) => (res.status === 'friends'
    ? 'You’re friends now. Challenge them from the Games tab soon!' : 'Request sent.'));
  location.hash = '#challenges/friends';
}
