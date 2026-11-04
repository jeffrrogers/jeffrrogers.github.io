// Every game the arena knows about, in display order: the order they were
// released.

import { isLive } from '../config.js?v=202611041302';
import { canuckle } from './canuckle.js?v=202611041302';
import { canucklePlus } from './canucklePlus.js?v=202611041302';
import { canuckleDuo } from './canuckleDuo.js?v=202611041302';
import { canoku } from './canoku.js?v=202611041302';
import { canolitaire } from './canolitaire.js?v=202611041302';
import { canominoes } from './canominoes.js?v=202611041302';
import { canoggle } from './canoggle.js?v=202611041302';
import { canagrams } from './canagrams.js?v=202611041302';
import { canatiles } from './canatiles.js?v=202611041302';
import { canundrum } from './canundrum.js?v=202611041302';
import { canamaze } from './canamaze.js?v=202611041302';
import { canadrift } from './canadrift.js?v=202611041302';

export const ALL_GAMES = [canuckle, canoku, canucklePlus, canuckleDuo, canagrams, canolitaire, canoggle, canominoes, canatiles, canundrum, canamaze, canadrift];

export function liveGames() {
  return ALL_GAMES.filter((g) => isLive(g.id));
}

export function gameById(id) {
  return ALL_GAMES.find((g) => g.id === id) || null;
}
