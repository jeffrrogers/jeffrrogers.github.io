// Every game the arena knows about, in display order.

import { isLive } from '../config.js?v=202610040215';
import { canuckle } from './canuckle.js?v=202610040215';
import { canucklePlus } from './canucklePlus.js?v=202610040215';
import { canoku } from './canoku.js?v=202610040215';
import { canolitaire } from './canolitaire.js?v=202610040215';
import { canominoes } from './canominoes.js?v=202610040215';
import { canoggle } from './canoggle.js?v=202610040215';

export const ALL_GAMES = [canuckle, canucklePlus, canoku, canolitaire, canominoes, canoggle];

export function liveGames() {
  return ALL_GAMES.filter((g) => isLive(g.id));
}

export function gameById(id) {
  return ALL_GAMES.find((g) => g.id === id) || null;
}
