// Every game the arena knows about, in display order: the order they were
// released.

import { isLive } from '../config.js?v=202611181159';
import { canuckle } from './canuckle.js?v=202611181159';
import { canucklePlus } from './canucklePlus.js?v=202611181159';
import { canuckleDuo } from './canuckleDuo.js?v=202611181159';
import { canoku } from './canoku.js?v=202611181159';
import { canolitaire } from './canolitaire.js?v=202611181159';
import { canominoes } from './canominoes.js?v=202611181159';
import { canoggle } from './canoggle.js?v=202611181159';
import { canagrams } from './canagrams.js?v=202611181159';
import { canatiles } from './canatiles.js?v=202611181159';
import { canundrum } from './canundrum.js?v=202611181159';
import { canamaze } from './canamaze.js?v=202611181159';

export const ALL_GAMES = [canuckle, canoku, canucklePlus, canuckleDuo, canagrams, canolitaire, canoggle, canominoes, canatiles, canundrum, canamaze];

export function liveGames() {
  return ALL_GAMES.filter((g) => isLive(g.id));
}

export function gameById(id) {
  return ALL_GAMES.find((g) => g.id === id) || null;
}
