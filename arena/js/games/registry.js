// Every game the arena knows about, in display order: the order they were
// released.

import { isLive } from '../config.js?v=202611040217';
import { canuckle } from './canuckle.js?v=202611040217';
import { canucklePlus } from './canucklePlus.js?v=202611040217';
import { canuckleDuo } from './canuckleDuo.js?v=202611040217';
import { canoku } from './canoku.js?v=202611040217';
import { canolitaire } from './canolitaire.js?v=202611040217';
import { canominoes } from './canominoes.js?v=202611040217';
import { canoggle } from './canoggle.js?v=202611040217';
import { canagrams } from './canagrams.js?v=202611040217';
import { canatiles } from './canatiles.js?v=202611040217';

export const ALL_GAMES = [canuckle, canoku, canucklePlus, canuckleDuo, canagrams, canolitaire, canoggle, canominoes, canatiles];

export function liveGames() {
  return ALL_GAMES.filter((g) => isLive(g.id));
}

export function gameById(id) {
  return ALL_GAMES.find((g) => g.id === id) || null;
}
