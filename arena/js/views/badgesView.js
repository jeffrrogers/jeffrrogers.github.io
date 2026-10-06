// Badge medals, the badge detail sheet, the full badge page, and the unlock
// announcement.

import { h, ICONS, openSheet, sheetHead, toast } from '../ui.js?v=202610061503';
import { longDate, todayEpochDay } from '../dates.js?v=202610061503';
import { medalSvg, LEAF_PATH } from '../badges/icons.js?v=202610061503';
import { shareBadge, shareShelf } from '../badges/share.js?v=202610061503';
import { gameById } from '../games/registry.js?v=202610061503';
import { track } from '../analytics.js?v=202610061503';

const FAMILY_COLOR = '#D52B1E';

export function badgeColor(badge) {
  return badge.game ? gameById(badge.game)?.color || FAMILY_COLOR : FAMILY_COLOR;
}

function earnedText(app, badge) {
  const rec = app.badges.stored[badge.id];
  if (!rec) return 'Earned';
  const ed = todayEpochDay(new Date(rec.earnedAt));
  return rec.dated ? `Earned ${longDate(ed)}` : `Earned by ${longDate(ed)}`;
}

async function doShare(app, badge) {
  const game = badge.game ? gameById(badge.game) : null;
  const result = await shareBadge(badge, badgeColor(badge), game?.name);
  if (result === 'copied') toast('Copied to clipboard');
  if (result !== 'cancelled') {
    track('badge_share', { badge: badge.id });
    app.onShared(badge.id);
  }
}

export function medalButton(app, badge) {
  const sub = badge.earned ? (badge.game ? gameById(badge.game)?.name : 'Games Arena') : `${badge.have}/${badge.need}`;
  return h('button', {
    class: 'badge-btn',
    'aria-label': `${badge.name}${badge.earned ? ', earned' : `, locked, ${badge.have} of ${badge.need}`}`,
    onClick: () => openBadgeSheet(app, badge),
  }, h('span', { html: medalSvg(badge, badgeColor(badge), 64) }), badge.name, h('span', { class: 'sub', text: sub }));
}

export function openBadgeSheet(app, badge) {
  let close;
  const game = badge.game ? gameById(badge.game) : null;
  const body = h('div', { class: 'badge-sheet' },
    sheetHead(game ? game.name : 'Games Arena badge', () => close()),
    h('span', { html: medalSvg(badge, badgeColor(badge), 140) }),
    h('h2', { text: badge.name }),
    h('p', { class: 'muted', text: badge.desc }),
    badge.earned
      ? h('div', {},
        h('p', { text: earnedText(app, badge) }),
        h('div', { class: 'actions' },
          h('button', { class: 'btn', onClick: () => doShare(app, badge) }, h('span', { html: ICONS.share }), 'Share')))
      : h('div', {},
        h('div', { class: 'progress-bar', role: 'progressbar', 'aria-valuemin': '0', 'aria-valuemax': String(badge.need), 'aria-valuenow': String(badge.have) },
          h('div', { style: { width: `${Math.round((badge.have / badge.need) * 100)}%` } })),
        h('p', { class: 'muted', text: `${badge.have} of ${badge.need}` })));
  close = openSheet(body, { label: badge.name });
}

function leafBurst() {
  const leaves = [];
  for (let k = 0; k < 12; k++) {
    const angle = (k / 12) * Math.PI * 2;
    const dist = 120 + (k % 3) * 30;
    leaves.push(h('span', {
      html: `<svg viewBox="0 0 100 100" style="--dx:${Math.round(Math.cos(angle) * dist)}px;--dy:${Math.round(Math.sin(angle) * dist)}px;--rot:${k * 47}deg;animation-delay:${(k % 4) * 60}ms"><path d="${LEAF_PATH}" fill="currentColor"/></svg>`,
    }));
  }
  return h('div', { class: 'leaf-burst', 'aria-hidden': 'true' }, leaves);
}

/** Shows unlock announcements one at a time; onDone(id) after each. */
export function announce(app, badges, onDone) {
  const queue = [...badges];
  const next = () => {
    const badge = queue.shift();
    if (!badge) return;
    track('badge_unlock', { badge: badge.id });
    let close;
    const body = h('div', { class: 'badge-sheet unlock' },
      leafBurst(),
      h('h3', { text: 'Badge unlocked' }),
      h('span', { html: medalSvg(badge, badgeColor(badge), 150) }),
      h('h2', { text: badge.name }),
      h('p', { class: 'muted', text: badge.desc }),
      h('div', { class: 'actions' },
        h('button', { class: 'btn secondary', onClick: () => doShare(app, badge) }, h('span', { html: ICONS.share }), 'Share'),
        h('button', { class: 'btn', text: queue.length ? 'Next' : 'Nice!', onClick: () => close() })));
    close = openSheet(body, {
      label: `Badge unlocked: ${badge.name}`,
      onClose: () => {
        onDone(badge.id);
        setTimeout(next, 250);
      },
    });
  };
  next();
}

export function renderBadgesPage(app) {
  const all = app.badges.results;
  const earned = all.filter((b) => b.earned).length;
  const sections = [
    { title: 'Games Arena', logo: 'images/arena.svg', list: all.filter((b) => !b.game) },
    ...app.games.map((g) => ({ title: g.name, logo: g.logo, list: all.filter((b) => b.game === g.id) })),
  ];
  return h('div', { class: 'wrap' },
    h('div', { class: 'page-head' },
      h('a', { class: 'icon-btn', href: '#stats', 'aria-label': 'Back to stats', html: ICONS.back }),
      h('div', { class: 'grow' }, h('h1', { text: 'Badges' }),
        h('span', { class: 'muted', text: `${earned} of ${all.length} earned` })),
      h('button', {
        class: 'btn secondary',
        onClick: async () => { if (await shareShelf(earned, all.length) === 'copied') toast('Copied to clipboard'); },
      }, h('span', { html: ICONS.share }), 'Share')),
    sections.filter((s) => s.list.length).map((s) => h('section', { class: 'card', style: { marginBottom: '12px' } },
      h('div', { class: 'row-head', style: { padding: '0 0 10px' } },
        s.logo ? h('img', { src: s.logo, alt: '', style: { width: '28px', height: '28px' } }) : null,
        h('h2', { text: s.title })),
      h('div', { class: 'badge-grid' }, s.list.map((b) => medalButton(app, b))))));
}
