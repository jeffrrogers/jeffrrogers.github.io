// Challenge puzzles: the Arena's way of naming a puzzle (a game, an index and
// a tier key from js/games/*) to and from the server's (firebase/functions
// src/games.js GAMES[id].puzzle), plus how each game picks a winner.

import { SOLVED, FAILED, PLAYED, PROGRESS } from '../status.js?v=202611151427';

/**
 * Games that can be challenged. Canoggle waits for its game update: a
 * challenge locks the challenger's time limit, which Canoggle must accept
 * from the start link (&limit=) first. Sandbox-only games aren't supported
 * by the server yet.
 */
export const CHALLENGE_GAMES = ['canuckle', 'plus', 'duo', 'canoku', 'canolitaire', 'canominoes', 'canagrams'];

export const canChallenge = (gameId) => CHALLENGE_GAMES.includes(gameId);

/** The server's puzzle for [game] puzzle [index], tier [tierKey]. */
export function puzzleFor(game, index, tierKey) {
  switch (game.id) {
    case 'canuckle':
    case 'plus':
    case 'duo':
      return { index };
    case 'canoku':
      return { day: index, mode: tierKey };
    case 'canolitaire':
      return { day: index, draw: Number(tierKey[0]), tier: tierKey.slice(1) };
    case 'canominoes':
      return { day: index, tier: tierKey };
    case 'canagrams':
      return { day: index };
    default:
      throw new Error(`can't challenge ${game.id}`);
  }
}

/** The Arena's {index, tier} for a server puzzle of game [gameId]. */
export function fromPuzzle(gameId, p) {
  switch (gameId) {
    case 'canuckle':
    case 'plus':
    case 'duo':
      return { index: p.index, tier: null };
    case 'canoku':
      return { index: p.day, tier: p.mode };
    case 'canolitaire':
      return { index: p.day, tier: `${p.draw}${p.tier}` };
    case 'canominoes':
      return { index: p.day, tier: p.tier };
    case 'canagrams':
      return { index: p.day, tier: null };
    default:
      return { index: p?.day ?? p?.index ?? null, tier: null };
  }
}

/** "Hard 9×9", "Draw 3 · Medium", "Easy", or '' for a game with one puzzle a day. */
export function tierLabel(game, tierKey) {
  const t = game.tiers.find((x) => x.key === tierKey);
  if (!t) return '';
  if (!t.group) return t.label;
  return game.id === 'canoku' ? `${t.label} ${t.group}` : `${t.group} · ${t.label}`;
}

/** "Canoku #1126 · Hard 9×9" */
export function puzzleTitle(game, index, tierKey) {
  const tier = tierLabel(game, tierKey);
  return `${game.name} ${game.label(index)}${tier ? ` · ${tier}` : ''}`;
}

/**
 * Whether this browser's progress shows the puzzle touched (in progress or
 * finished). The server checks the game's own data too; this also catches
 * today's unfinished boards, which only live in the browser.
 */
export function startedHere(game, entry, tierKey) {
  const touched = (s) => [PROGRESS, SOLVED, FAILED, PLAYED].includes(s);
  if (game.tiers.length) return touched(entry?.tiers?.[tierKey]);
  return touched(entry?.status);
}

/** How the winner is decided, as players see it (mirrors the server's compare). */
export const WINNER_RULE = {
  canuckle: 'Fewest guesses wins.',
  plus: 'Fewest guesses wins.',
  duo: 'Fewest guesses to find both words wins.',
  canoku: 'Fastest solve wins. Each hint adds 30 seconds.',
  canolitaire: 'Fastest win wins. Fewer moves breaks a tie.',
  canominoes: 'Fewest hints wins, then the fastest time.',
  canagrams: 'Most points wins. A faster time breaks a tie.',
};
