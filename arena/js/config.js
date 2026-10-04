// Environment detection and site-wide constants.
//
// The arena ships the same files to the sandbox (jeffrrogers.github.io) and to
// production (canucklegame.ca). All game links are root-relative, so the only
// thing that differs is which games are visible and whether analytics runs.

const host = typeof location === 'undefined' ? '' : location.hostname;

export const IS_SANDBOX =
  host.endsWith('github.io') || host === 'localhost' || host === '127.0.0.1' || host === '';

// ?demo on the sandbox fills the arena with sample progress and never touches
// Firestore, for previewing layouts.
export const IS_DEMO =
  IS_SANDBOX && typeof location !== 'undefined' && new URLSearchParams(location.search).has('demo');

export const GA_ID = 'G-51PE0HTHXT';

// Canuckle's web app in the shared canuckle-c2157 project. Swap appId for a
// dedicated "arena" web app once one is registered in the Firebase console.
export const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyCKMCGkDrYFUIAe67sgg1lw0CbkTH02F9A',
  authDomain: 'canuckle-c2157.firebaseapp.com',
  projectId: 'canuckle-c2157',
  storageBucket: 'canuckle-c2157.appspot.com',
  messagingSenderId: '696912074479',
  appId: '1:696912074479:web:c1a785ef5bcd76c58c6d1a',
};

export const FIREBASE_SDK = 'https://www.gstatic.com/firebasejs/11.0.2';

// Which games production shows. The sandbox always shows everything.
const LIVE_IN_PRODUCTION = {
  canuckle: true,
  plus: true,
  canoku: true,
  canolitaire: false,
  canominoes: false,
  canoggle: false,
};

export function isLive(gameId) {
  return IS_SANDBOX || LIVE_IN_PRODUCTION[gameId] === true;
}

export const ARENA_URL = 'https://www.canucklegame.ca/arena/';
