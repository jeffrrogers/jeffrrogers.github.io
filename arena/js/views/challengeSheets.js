// The challenge sheets: New challenge, an invite to accept, and results.
// Only loaded while featureOn('challenges') (through challengesTab.js).

import { h, openSheet, sheetHead, toast, statusIcon, ICONS } from '../ui.js?v=202611151427';
import { call, reasonText } from '../social/api.js?v=202611151427';
import {
  canChallenge, puzzleFor, fromPuzzle, puzzleTitle, startedHere, WINNER_RULE,
} from '../social/puzzles.js?v=202611151427';
import { gameById } from '../games/registry.js?v=202611151427';
import { barFractions, legendItems, rankColour } from '../social/bars.js?v=202611151427';
import { trackPlay } from './play.js?v=202611151427';
import { track } from '../analytics.js?v=202611151427';

const MAX_FRIENDS = 9;
const when = (ms) => new Date(ms).toLocaleString('en-CA', { weekday: 'long', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });

function timeLeft(ms, now = Date.now()) {
  const mins = Math.max(0, Math.round((ms - now) / 60000));
  if (mins < 60) return `${mins} min left`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} h left`;
  const days = Math.floor(hours / 24);
  return `${days} d ${hours % 24} h left`;
}

/** Goes into the game on puzzle [index] / [tier], as the Games tab does. */
export function launch(app, game, index, tier) {
  const isToday = index === game.todayIndex(app.todayEd);
  trackPlay(game, index, tier, isToday);
  location.href = game.link(index, tier, isToday);
}

// ---- New challenge -----------------------------------------------------------------

/**
 * Opens New challenge. [gameId]: start on that game; [friendPub]: tick that
 * friend. Challenges are for today's puzzle (this week's for Canuckle+), and
 * only one the player hasn't started.
 */
export function openCreate(app, { gameId = null, friendPub = null, onSent } = {}) {
  const social = app.social;
  const friends = Object.entries(social?.friends ?? {}).sort(([, a], [, b]) => a.gamerId.localeCompare(b.gamerId));
  if (!friends.length) {
    toast('Add a friend first, from Challenges → Friends.');
    return;
  }
  const games = app.games.filter((g) => canChallenge(g.id) && g.todayIndex(app.todayEd) != null);
  const state = {
    game: games.find((g) => g.id === gameId) ?? null,
    tier: null,
    // The friend it was started from; with only one friend, them.
    picked: new Set(friendPub && social.friends[friendPub] ? [friendPub] : friends.length === 1 ? [friends[0][0]] : []),
    sending: false,
  };
  let close;
  const body = h('div', { class: 'soc-step' });

  const entryFor = (game) => app.progress[game.id]?.progress?.days?.get(game.todayIndex(app.todayEd));
  const firstOpenTier = (game) => game.tiers.find((t) => !startedHere(game, entryFor(game), t.key))?.key ?? null;

  function pickGame(game) {
    state.game = game;
    state.tier = game.tiers.length ? firstOpenTier(game) : null;
    draw();
  }

  function gameList() {
    return h('div', { class: 'soc-game-grid' }, games.map((g) => h('button', {
      class: 'soc-game-btn', type: 'button', onClick: () => pickGame(g),
    }, h('img', { src: g.logo, alt: '' }), h('span', { text: g.name }))));
  }

  function puzzlePart() {
    const g = state.game;
    const index = g.todayIndex(app.todayEd);
    const entry = entryFor(g);
    const weekly = g.cadence === 'weekly';
    const head = h('div', { class: 'soc-picked-game' },
      h('img', { src: g.logo, alt: '' }),
      h('span', { class: 'soc-who' },
        h('strong', { text: `${g.name} ${g.label(index)}` }),
        h('span', { class: 'muted', text: weekly ? 'This week' : 'Today' })),
      games.length > 1 ? h('button', { class: 'text-btn', type: 'button', text: 'Change', onClick: () => { state.game = null; draw(); } }) : null);
    if (!g.tiers.length) {
      const started = startedHere(g, entry, null);
      return [head, started ? h('p', { class: 'soc-error', text: `You’ve already played ${weekly ? 'this week’s' : 'today’s'} ${g.name}. Challenges are for a puzzle you haven’t started.` }) : null];
    }
    const groups = [...new Set(g.tiers.map((t) => t.group || ''))];
    return [head, groups.map((grp) => h('div', { class: 'tier-group' },
      grp ? h('h3', { text: grp }) : null,
      h('div', { class: 'tier-list' }, g.tiers.filter((t) => (t.group || '') === grp).map((t) => {
        const played = startedHere(g, entry, t.key);
        return h('button', {
          class: `tier-btn${state.tier === t.key ? ' picked' : ''}`, type: 'button', disabled: played,
          'aria-pressed': state.tier === t.key ? 'true' : 'false',
          onClick: () => { state.tier = t.key; draw(); },
        }, played ? statusIcon(entry?.tiers?.[t.key]) : null, t.label, played ? h('span', { class: 'soc-played', text: 'Played' }) : null);
      })))),
    h('p', { class: 'soc-hint' }, h('span', { class: 'soc-inline-icon', html: ICONS.lock }),
      'You can only challenge on a puzzle you haven’t started.')];
  }

  function friendsPart() {
    return h('div', { class: 'soc-stack' },
      h('div', { class: 'soc-between' },
        h('h3', { text: friends.length === 1 ? 'Your friend to challenge' : 'Pick the friends to challenge' }),
        h('span', { class: 'muted', text: `${state.picked.size} of ${Math.min(MAX_FRIENDS, friends.length)} picked` })),
      h('div', { class: 'soc-list soc-checks' }, friends.map(([pub, f]) => {
        const box = h('input', { type: 'checkbox', checked: state.picked.has(pub) });
        box.addEventListener('change', () => {
          if (box.checked && state.picked.size >= MAX_FRIENDS) {
            box.checked = false;
            toast(`A challenge can include up to ${MAX_FRIENDS} friends.`);
            return;
          }
          if (box.checked) state.picked.add(pub);
          else state.picked.delete(pub);
          draw();
        });
        return h('label', { class: 'soc-row-item soc-check' },
          h('span', { class: 'soc-who' }, h('strong', { text: f.gamerId })), box);
      })));
  }

  async function send() {
    const g = state.game;
    const index = g.todayIndex(app.todayEd);
    state.sending = true;
    draw();
    try {
      const { cid } = await call('createChallenge', {
        game: g.id, puzzle: puzzleFor(g, index, state.tier), friends: [...state.picked],
      });
      track('challenge_create', { target_game: g.id, friends: state.picked.size });
      close();
      if (onSent) onSent();
      sentSheet(app, g, index, state.tier, cid, [...state.picked].map((p) => social.friends[p].gamerId));
    } catch (e) {
      state.sending = false;
      draw();
      toast(e.reason === 'already-started'
        ? `You’ve already started that ${g.name} puzzle. Pick one you haven’t.`
        : reasonText(e.reason));
    }
  }

  function draw() {
    const g = state.game;
    const ready = g && (!g.tiers.length ? !startedHere(g, entryFor(g), null) : !!state.tier) && state.picked.size > 0;
    const label = state.sending ? 'Sending…'
      : !g ? 'Pick a game'
        : !state.picked.size ? 'Pick a friend to challenge'
          : 'Send & Play';
    // replaceChildren() doesn't unpack lists (it would print them as text),
    // so flatten the parts and drop the empty ones first.
    body.replaceChildren(...[
      sheetHead('New challenge', () => close()),
      g ? puzzlePart() : gameList(),
      g ? friendsPart() : null,
      g ? h('p', { class: 'soc-hint soc-center' }, h('span', { class: 'soc-inline-icon', html: ICONS.clock }),
        `Open for 3 days. ${WINNER_RULE[g.id]}`) : null,
      h('button', { class: 'btn soc-wide', type: 'button', disabled: !ready || state.sending, text: label, onClick: send }),
    ].flat(Infinity).filter(Boolean));
  }

  if (state.game) state.tier = state.game.tiers.length ? firstOpenTier(state.game) : null;
  draw();
  close = openSheet(body, { label: 'New challenge', className: 'soc-sheet tall', scrollHint: true });
}

/** After sending: play now, or share the news first. */
function sentSheet(app, game, index, tier, cid, names) {
  let close;
  const title = puzzleTitle(game, index, tier);
  const who = names.length <= 2 ? names.join(' and ') : `${names.slice(0, -1).join(', ')} and ${names.at(-1)}`;
  const share = async () => {
    const url = `${location.origin}${location.pathname}?challenge=${cid}`;
    const text = `I challenged you to ${title} on the Canuckle Games Arena!`;
    try {
      if (navigator.share && matchMedia('(pointer: coarse)').matches) return await navigator.share({ title: 'Canuckle challenge', text, url });
      await navigator.clipboard.writeText(`${text} ${url}`);
      toast('Link copied.');
    } catch {
      // Cancelled.
    }
    return undefined;
  };
  close = openSheet(h('div', { class: 'soc-step' },
    sheetHead('Challenge sent', () => close(), game.logo),
    h('p', {}, `${who} ${names.length === 1 ? 'has' : 'have'} 3 days to play `, h('strong', { text: title }), '. They’ll see it in their Challenges tab.'),
    h('div', { class: 'actions' },
      h('button', { class: 'btn secondary', type: 'button', onClick: share }, h('span', { html: ICONS.share }), 'Tell them'),
      h('button', { class: 'btn', type: 'button', text: 'Play now', onClick: () => { close(); launch(app, game, index, tier); } }))),
  { label: 'Challenge sent' });
}

// ---- An invite --------------------------------------------------------------------

/** The players as a short line of chips: who has played (✓) and who hasn't. */
export function playerChips(view, myPub) {
  return h('div', { class: 'soc-chips' }, view.players.map((p) => h('span', {
    class: `soc-chip ${p.state === 'done' ? 'done' : p.state}`,
  },
  p.state === 'done' ? h('span', { html: ICONS.check }) : ['invited', 'accepted'].includes(p.state) ? h('span', { html: ICONS.clock }) : null,
  p.pub === myPub ? 'You' : p.gamerId)));
}

/** Opens challenge [cid] for the player: accept an invite, play, or see results. */
export function openChallenge(app, cid) {
  const view = app.social?.challenges?.[cid];
  if (!view) {
    toast('That challenge isn’t in your list. It may have ended, or be for another player.');
    return;
  }
  if (view.status === 'final' || ['done', 'declined', 'expired', 'ineligible'].includes(view.me)) {
    openResults(app, cid);
    return;
  }
  const game = gameById(view.game);
  const { index, tier } = fromPuzzle(view.game, view.puzzle);
  const title = game ? puzzleTitle(game, index, tier) : view.game;
  let close;
  const respond = async (accept) => {
    try {
      await call('respondChallenge', { cid, accept });
      track(accept ? 'challenge_accept' : 'challenge_decline', { target_game: view.game });
      close();
      if (accept && game) launch(app, game, index, tier);
      else (await import('./challengesTab.js?v=202611151427')).refreshSocial();
    } catch (e) {
      toast(reasonText(e.reason));
    }
  };
  const invited = view.me === 'invited';
  close = openSheet(h('div', { class: 'soc-step' },
    sheetHead(invited ? `${view.from} challenged you` : 'Your challenge', () => close(), game?.logo),
    h('div', { class: 'soc-picked-game' },
      game ? h('img', { src: game.logo, alt: '' }) : null,
      h('span', { class: 'soc-who' }, h('strong', { text: title }), h('span', { class: 'muted', text: game ? game.blurb : '' }))),
    h('dl', { class: 'soc-facts' },
      h('dt', { text: 'Players' }), h('dd', {}, playerChips(view, app.social.pub)),
      h('dt', { text: 'Ends' }), h('dd', {}, when(view.expiresAt), h('span', { class: 'muted', text: ` · ${timeLeft(view.expiresAt)}` })),
      h('dt', { text: 'Winner' }), h('dd', { text: WINNER_RULE[view.game] ?? '' })),
    h('p', { class: 'soc-note' }, h('span', { class: 'soc-inline-icon', html: ICONS.lock }),
      'Everyone’s results stay hidden until you finish.'),
    invited
      ? h('div', { class: 'soc-stack' },
        h('button', { class: 'btn soc-wide', type: 'button', text: 'Accept & Play', onClick: () => respond(true) }),
        h('div', { class: 'actions' },
          h('button', { class: 'btn secondary', type: 'button', text: 'Decline', onClick: () => respond(false) }),
          h('button', { class: 'text-btn', type: 'button', text: 'Not now', onClick: () => close() })))
      : h('button', { class: 'btn soc-wide', type: 'button', text: 'Play now', onClick: () => { close(); if (game) launch(app, game, index, tier); } })),
  { label: title });
}

// ---- Results --------------------------------------------------------------------

const ORD = ['th', 'st', 'nd', 'rd'];
const ordinal = (n) => `${n}${(n % 100 >= 11 && n % 100 <= 13) ? 'th' : ORD[n % 10] ?? 'th'}`;

/** "1st of 3", "Tie for 1st", "Didn't play", "Declined" for the player's line. */
export function placeText(view, myPub) {
  const me = view.players.find((p) => p.pub === myPub);
  if (!me) return '';
  if (me.state === 'declined') return 'Declined';
  if (me.state === 'ineligible') return 'Didn’t count';
  if (me.state === 'expired') return 'Didn’t play';
  if (me.rank == null) return view.status === 'final' ? '' : 'Played';
  const ranked = view.players.filter((p) => p.rank != null);
  const tied = ranked.filter((p) => p.rank === me.rank).length > 1;
  return tied ? `Tie for ${ordinal(me.rank)}` : `${ordinal(me.rank)} of ${ranked.length}`;
}

function stateText(p) {
  if (p.score) return p.score;
  return {
    invited: 'Hasn’t played yet', accepted: 'Hasn’t played yet', declined: 'Declined',
    expired: 'Didn’t play', ineligible: 'Played on other terms', done: 'Played',
  }[p.state] ?? '';
}

/**
 * The players' results as bars: the best result full width, the rest scaled
 * to it, coloured by rank, with a trophy beside 1st place and a legend.
 */
export function resultChart(view, me) {
  const fractions = barFractions(view.players, view.better);
  const rows = view.players.map((p, i) => {
    const f = fractions[i];
    const name = p.pub === me ? 'You' : p.gamerId;
    return h('li', { class: `soc-bar-row${p.pub === me ? ' me' : ''}` },
      h('span', { class: 'soc-bar-name' },
        p.rank === 1 ? h('span', { class: 'soc-trophy', title: '1st place', html: ICONS.trophy }) : null,
        h('strong', { text: name }),
        p.already ? h('span', { class: 'muted', text: ' · already played' }) : null),
      h('span', { class: 'soc-bar-track' },
        f == null
          ? h('span', { class: 'soc-bar-empty', text: stateText(p) })
          : h('span', {
            class: 'soc-bar-fill',
            style: { width: `${Math.round(f * 100)}%`, background: p.rank ? rankColour(p.rank) : 'var(--muted)' },
          })),
      h('span', { class: 'soc-bar-score', text: f == null ? '' : stateText(p) }));
  });
  const legend = legendItems(view.players);
  return h('div', { class: 'soc-chart' },
    h('ol', { class: 'soc-bars', 'aria-label': 'Results' }, rows),
    legend.length ? h('ul', { class: 'soc-legend', 'aria-label': 'Legend' }, legend.map((it) => h('li', {},
      h('span', { class: `soc-swatch${it.colour ? '' : ' empty'}`, style: it.colour ? { background: it.colour } : null }),
      it.label))) : null);
}

export function openResults(app, cid) {
  const view = app.social?.challenges?.[cid];
  if (!view) return;
  const game = gameById(view.game);
  const { index, tier } = fromPuzzle(view.game, view.puzzle);
  const title = game ? puzzleTitle(game, index, tier) : view.game;
  const me = app.social.pub;
  const final = view.status === 'final';
  const place = placeText(view, me);
  const myRank = view.players.find((p) => p.pub === me)?.rank;
  const won = final && /^1st of/.test(place);
  const heading = won ? null
    : final ? place
      : myRank != null ? `You’re ${ordinal(myRank)} so far`
        : 'Results so far';
  const waiting = view.players.filter((p) => ['invited', 'accepted'].includes(p.state));
  let close;
  close = openSheet(h('div', { class: 'soc-step' },
    sheetHead(final ? `${title} · Final` : title, () => close(), game?.logo),
    won ? h('div', { class: 'soc-win' }, h('span', { html: ICONS.trophy }), h('h2', { text: 'You won!' })) : null,
    heading ? h('h2', { class: 'soc-title', text: heading }) : null,
    resultChart(view, me),
    h('p', { class: 'soc-hint', text: WINNER_RULE[view.game] ?? '' }),
    !final && waiting.length ? h('p', { class: 'muted', text: `Final results come in when everyone has played, or when the challenge ends on ${when(view.expiresAt)}.` }) : null),
  { label: title });
}
