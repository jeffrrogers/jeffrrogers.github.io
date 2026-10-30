// Every game the arena knows about, in display order: the order they were
// released.

import { isLive } from '../config.js?v=202610301436';
import { canuckle } from './canuckle.js?v=202610301436';
import { canucklePlus } from './canucklePlus.js?v=202610301436';
import { canuckleDuo } from './canuckleDuo.js?v=202610301436';
import { canoku } from './canoku.js?v=202610301436';
import { canolitaire } from './canolitaire.js?v=202610301436';
import { canominoes } from './canominoes.js?v=202610301436';
import { canoggle } from './canoggle.js?v=202610301436';
import { canagrams } from './canagrams.js?v=202610301436';

export const ALL_GAMES = [canuckle, canoku, canucklePlus, canuckleDuo, canagrams, canolitaire, canoggle, canominoes];

export function liveGames() {
  return ALL_GAMES.filter((g) => isLive(g.id));
}

export function gameById(id) {
  return ALL_GAMES.find((g) => g.id === id) || null;
}
