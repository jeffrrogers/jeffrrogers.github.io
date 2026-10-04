// Boot, routing and the shared app state.

import { IS_SANDBOX, IS_DEMO } from './config.js?v=202610040159';
import { demoRaw } from './demo.js?v=202610040159';
import { initAnalytics, track } from './analytics.js?v=202610040159';
import { todayEpochDay } from './dates.js?v=202610040159';
import { playerId, readPref, arenaGet, arenaSet } from './local.js?v=202610040159';
import { liveGames, gameById } from './games/registry.js?v=202610040159';
import { loadProgress } from './progress.js?v=202610040159';
import { evaluateBadges } from './badges/rules.js?v=202610040159';
import { loadStoredBadges, planSync, applySync, markAnnounced, markShared } from './badges/store.js?v=202610040159';
import { h, ICONS, closeSheet } from './ui.js?v=202610040159';
import { renderGames } from './views/gamesTab.js?v=202610040159';
import { renderArchive } from './views/archive.js?v=202610040159';
import { renderStats, renderStatsDetail } from './views/statsTab.js?v=202610040159';
import { renderBadgesPage, announce } from './views/badgesView.js?v=202610040159';

const app = {
  uid: IS_DEMO ? 'DEMO' : playerId(),
  todayEd: todayEpochDay(),
  games: liveGames(),
  progress: {},
  badges: { results: [], stored: {}, synced: false },
  syncing: true,
  syncError: false,
  onShared(id) {
    if (!app.uid || IS_DEMO) return;
    markShared(app.uid, id).catch(() => {});
  },
};

// ---- Theme ----------------------------------------------------------------

function initialTheme() {
  const saved = arenaGet('theme');
  if (saved === 'light' || saved === 'dark') return saved;
  const canuckleDark = readPref('isDarkMode');
  if (typeof canuckleDark === 'boolean') return canuckleDark ? 'dark' : 'light';
  return window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  const btn = document.querySelector('.theme-toggle');
  if (btn) {
    btn.innerHTML = theme === 'dark' ? ICONS.sun : ICONS.moon;
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

if (readPref('isHighContrast') === true) document.documentElement.dataset.contrast = 'high';

// ---- Header ---------------------------------------------------------------

// Scattered background tiles: [logo, left %, top px, size px, rotation, wide-only].
const SCATTER = [
  ['canuckle', -2.3, -30, 96, -18, false],
  ['canuckle-plus', -3.2, 112, 70, 10, true],
  ['canoku', 10.1, 116, 72, 14, false],
  ['canolitaire', 19.6, -22, 66, 22, true],
  ['canominoes', 31.6, 128, 84, -10, false],
  ['canolitaire', 46.4, -44, 60, -14, true],
  ['canoku', 57, 146, 58, -6, true],
  ['canoggle', 68.6, -36, 92, 16, false],
  ['canuckle-plus', 80.2, 108, 72, -22, false],
  ['canuckle', 91.4, 14, 82, 12, false],
];

function renderHeader() {
  let theme = initialTheme();
  const toggle = h('button', {
    class: 'theme-toggle',
    onClick: () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      arenaSet('theme', theme);
      applyTheme(theme);
    },
  });
  const banner = h('header', { class: 'banner' },
    SCATTER.map(([logo, left, top, size, rot, wideOnly]) => h('img', {
      class: `tile${wideOnly ? ' wide-only' : ''}`,
      src: `images/${logo}.svg`,
      alt: '',
      style: { left: `${left}%`, top: `${top}px`, '--s': String(size), '--r': String(rot) },
    })),
    h('a', { class: 'lockup', href: '#games', 'aria-label': 'Canuckle Games Arena home' },
      h('img', { src: 'images/arena.svg', alt: '' }),
      h('span', { class: 'wordmark' },
        h('span', { class: 'wm-name', text: 'Canuckle' }),
        ' ',
        h('span', { class: 'wm-sub', text: 'Games Arena' }))),
    IS_SANDBOX ? h('span', { class: 'sandbox-ribbon', text: 'SANDBOX' }) : null,
    toggle);
  document.getElementById('header').replaceChildren(banner);
  applyTheme(theme);
}

// ---- Routing --------------------------------------------------------------

function route() {
  const [name, arg] = (location.hash.replace(/^#/, '') || 'games').split('/');
  return { name, arg };
}

function renderTabs(r) {
  const isStats = r.name === 'stats' || r.name === 'badges';
  const note = app.uid
    ? app.syncing ? 'Syncing…' : app.syncError ? 'Showing saved progress' : ''
    : '';
  document.getElementById('tabs').replaceChildren(h('nav', { class: 'tabs', 'aria-label': 'Arena sections' },
    h('div', { class: 'wrap' },
      h('a', { class: 'tab', href: '#games', 'aria-current': isStats ? null : 'page', text: 'Games' }),
      h('a', { class: 'tab', href: '#stats', 'aria-current': isStats ? 'page' : null, text: 'Stats' }),
      h('span', { class: 'sync-note', role: 'status', text: note }))));
}

let lastRouteKey = '';

function render() {
  const r = route();
  renderTabs(r);
  const game = r.arg ? gameById(r.arg) : null;
  let view;
  if (r.name === 'archive' && game && app.games.includes(game)) view = renderArchive(app, game);
  else if (r.name === 'stats' && game && app.games.includes(game)) view = renderStatsDetail(app, game);
  else if (r.name === 'stats') view = renderStats(app);
  else if (r.name === 'badges') view = renderBadgesPage(app);
  else view = renderGames(app);

  const main = document.getElementById('view');
  // Keep scroll position on data refreshes; reset it on navigation.
  const key = location.hash;
  const sameRoute = key === lastRouteKey;
  const scroll = window.scrollY;
  main.replaceChildren(view);
  if (sameRoute) window.scrollTo(0, scroll);
  else if (lastRouteKey) window.scrollTo(0, 0);
  lastRouteKey = key;
}

// Archive pages grow as you scroll; a data refresh there would collapse them,
// so they only re-render on navigation.
function refresh() {
  if (route().name === 'archive') {
    renderTabs(route());
    return;
  }
  render();
}

// ---- Badges ---------------------------------------------------------------

function evaluate() {
  app.badges.results = evaluateBadges(app.games, app.progress, new Set(Object.keys(app.badges.stored)));
}

async function syncBadges() {
  evaluate();
  if (!app.uid) return;
  if (IS_DEMO) {
    // ?demo&unlock previews the unlock announcement with one badge; nothing is saved.
    if (!new URLSearchParams(location.search).has('unlock')) return;
    const sample = app.badges.results.find((b) => b.earned && b.tier === 'gold')
      || app.badges.results.find((b) => b.earned);
    if (sample) announce(app, [sample], () => {});
    return;
  }
  try {
    const stored = await loadStoredBadges(app.uid);
    app.badges.stored = stored.badges;
    evaluate();
    const plan = planSync(app.badges.results, stored);
    app.badges.stored = await applySync(app.uid, plan, stored);
    app.badges.synced = true;
    evaluate();
    refresh();
    const toAnnounce = plan.announce
      .map((id) => app.badges.results.find((b) => b.id === id))
      .filter(Boolean);
    if (toAnnounce.length) {
      announce(app, toAnnounce, (id) => {
        if (app.badges.stored[id]) app.badges.stored[id].announcedAt = Date.now();
        markAnnounced(app.uid, id).catch(() => {});
      });
    }
  } catch (e) {
    console.warn('arena: badge sync failed', e);
  }
}

// ---- Boot -----------------------------------------------------------------

async function boot() {
  initAnalytics();
  renderHeader();
  window.addEventListener('hashchange', () => {
    closeSheet();
    render();
  });

  let firstPaint = true;
  const state = await loadProgress(app.games, {
    uid: app.uid,
    todayEd: app.todayEd,
    demo: IS_DEMO ? demoRaw : null,
    onUpdate(next) {
      app.progress = next;
      evaluate();
      if (firstPaint) {
        firstPaint = false;
        render();
      } else {
        refresh();
      }
    },
  });
  app.syncing = false;
  app.syncError = Object.values(state).some((s) => s.status === 'error');
  refresh();
  track('arena_open', { returning: app.uid ? 1 : 0 });

  // Only sync badges once every game has loaded fresh: evaluating against a
  // half-loaded state could record a badge late or announce one twice.
  if (!app.syncError) await syncBadges();

  // A tab left open past midnight rolls over to the new day.
  setInterval(() => {
    if (todayEpochDay() !== app.todayEd) location.reload();
  }, 60000);
}

boot();
