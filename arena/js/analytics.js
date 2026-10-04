// Google Analytics, production only.

import { GA_ID, IS_SANDBOX } from './config.js?v=202610041808';

export function initAnalytics() {
  if (IS_SANDBOX) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { page_title: 'Games Arena' });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.append(s);
}

export function track(event, params = {}) {
  if (typeof window.gtag === 'function') window.gtag('event', event, params);
}
