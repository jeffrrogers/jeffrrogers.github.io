// Every game the arena knows about, in display order.

import { isLive } from '../config.js?v=202610061550';
import { canuckle } from './canuckle.js?v=202610061550';
import { canucklePlus } from './canucklePlus.js?v=202610061550';
import { canoku } from './canoku.js?v=202610061550';
import { canolitaire } from './canolitaire.js?v=202610061550';
import { canominoes } from './canominoes.js?v=202610061550';
import { canoggle } from './canoggle.js?v=202610061550';

export const ALL_GAMES = [canuckle, canucklePlus, canoku, canolitaire, canominoes, canoggle];

export function liveGames() {
  return ALL_GAMES.filter((g) => isLive(g.id));
}

export function gameById(id) {
  return ALL_GAMES.find((g) => g.id === id) || null;
}
