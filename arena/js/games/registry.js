// Every game the arena knows about, in display order.

import { isLive } from '../config.js?v=202610151655';
import { canuckle } from './canuckle.js?v=202610151655';
import { canucklePlus } from './canucklePlus.js?v=202610151655';
import { canuckleDuo } from './canuckleDuo.js?v=202610151655';
import { canoku } from './canoku.js?v=202610151655';
import { canolitaire } from './canolitaire.js?v=202610151655';
import { canominoes } from './canominoes.js?v=202610151655';
import { canoggle } from './canoggle.js?v=202610151655';
import { canagrams } from './canagrams.js?v=202610151655';

export const ALL_GAMES = [canuckle, canucklePlus, canuckleDuo, canoku, canolitaire, canominoes, canoggle, canagrams];

export function liveGames() {
  return ALL_GAMES.filter((g) => isLive(g.id));
}

export function gameById(id) {
  return ALL_GAMES.find((g) => g.id === id) || null;
}
