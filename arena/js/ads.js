// The Yolla ad tag. The slots themselves are static markup in index.html
// (the same classes and sizes as the games' pages); the tag finds them by
// their ympb_target class and fills them.
//
// One tag for the whole family, the same one every game injects. As in the
// games' flutter_bootstrap.js, it goes in a little after the page is up so it
// doesn't compete with the first paint, and never on localhost or in ?demo.

import { IS_DEMO } from './config.js?v=202610061503';

const AD_TAG_URL =
  'https://portal.cdn.yollamedia.com/storage/tag/ps6d46b18362b4075b4074ad02399f36e91e9d429e.js';
const AD_INJECT_DELAY_MS = 2000;

const host = typeof location === 'undefined' ? '' : location.hostname;
const IS_LOCAL_DEV = host === 'localhost' || host === '127.0.0.1' || host === '::1' || host === '[::1]' || host === '';

let injected = false;

export function loadAds() {
  if (injected || IS_LOCAL_DEV || IS_DEMO) return;
  injected = true;
  setTimeout(() => {
    const s = document.createElement('script');
    s.async = true;
    s.src = AD_TAG_URL;
    document.head.appendChild(s);
  }, AD_INJECT_DELAY_MS);
}
