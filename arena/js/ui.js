// Small DOM helpers, icons, sheets and toasts.

import { SOLVED, FAILED, PLAYED, PROGRESS, STATUS_LABEL } from './status.js?v=202610041808';

/**
 * Creates an element. props: class, text, html (trusted constant markup
 * only), style, on<Event> handlers, anything else becomes an attribute.
 */
export function h(tag, props = {}, ...children) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(props || {})) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k === 'text') el.textContent = v;
    else if (k === 'html') el.innerHTML = v;
    else if (k === 'style' && typeof v === 'object') {
      for (const [prop, val] of Object.entries(v)) {
        if (prop.startsWith('--')) el.style.setProperty(prop, val);
        else el.style[prop] = val;
      }
    }
    else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2).toLowerCase(), v);
    else el.setAttribute(k, v === true ? '' : v);
  }
  for (const c of children.flat()) {
    if (c == null || c === false) continue;
    el.append(c instanceof Node ? c : document.createTextNode(String(c)));
  }
  return el;
}

const SVG = (body, cls = 'icon', vb = '0 0 24 24') =>
  `<svg class="${cls}" viewBox="${vb}" aria-hidden="true">${body}</svg>`;

export const ICONS = {
  flame: SVG('<path d="M12 2c1.5 3.2 5 4.8 4.5 9-.3 3.2-2.3 5.5-4.5 5.5S7.5 14.2 7.5 11.3c0-2.5 1.7-3.5 2.3-5.8 1 1.5 1.7 2 2.2 3.5.8-2.3.6-4.5 0-7z" fill="currentColor"/><path d="M6 17.5c1.3 2.6 3.5 4 6 4s4.7-1.4 6-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'),
  calendar: SVG('<rect x="3.5" y="5" width="17" height="15.5" rx="3" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3.5 10h17M8 3v4M16 3v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'),
  back: SVG('<path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>', 'icon', '0 0 24 24'),
  close: SVG('<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>'),
  sun: SVG('<circle cx="12" cy="12" r="4.5" fill="currentColor"/><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'),
  moon: SVG('<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" fill="currentColor"/>'),
  share: SVG('<path d="M12 3v12M7 8l5-5 5 5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>'),
};

/** A status glyph. On a coloured "today" tile pass light=true. */
export function statusIcon(status, light = false) {
  const c = (v) => (light ? '#fff' : `var(--${v})`);
  const ink = light ? 'var(--game)' : '#fff';
  let body;
  switch (status) {
    case SOLVED:
      body = `<circle cx="12" cy="12" r="11" fill="${c('solved')}"/><path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="${ink}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`;
      break;
    case FAILED:
      body = `<circle cx="12" cy="12" r="11" fill="${c('failed')}"/><path d="M8.5 8.5l7 7M15.5 8.5l-7 7" stroke="${ink}" stroke-width="2.6" stroke-linecap="round"/>`;
      break;
    case PLAYED:
      body = `<circle cx="12" cy="12" r="11" fill="${c('played')}"/><circle cx="12" cy="12" r="3.5" fill="${ink}"/>`;
      break;
    case PROGRESS:
      body = `<circle cx="12" cy="12" r="10" fill="none" stroke="${c('progress')}" stroke-width="2.4"/><path d="M12 2a10 10 0 0 1 0 20z" fill="${c('progress')}"/>`;
      break;
    default:
      body = `<circle cx="12" cy="12" r="10" fill="none" stroke="${light ? 'rgba(255,255,255,.7)' : 'var(--border)'}" stroke-width="2.4"/>`;
  }
  const label = STATUS_LABEL[status] || 'Not played';
  return h('span', { class: 'status-wrap', title: label },
    h('span', { html: SVG(body, 'status-icon') }),
    h('span', { class: 'visually-hidden', text: label }));
}

/**
 * Tier marks for a day. Games whose tiers have groups (Canoku sizes,
 * Canolitaire draws) show one mark per group; others one per tier.
 */
export function tierMarks(game, entry, { always = false } = {}) {
  if (!game.tiers.length) return null;
  const tiers = entry?.tiers || {};
  // Per-difficulty detail is only fetched for recent days; older days show
  // just the day's status rather than misleadingly empty marks.
  if (!always && Object.keys(tiers).length === 0) return null;
  const groups = [...new Set(game.tiers.map((t) => t.group).filter(Boolean))];
  const marks = groups.length
    ? groups.map((g) => {
      const keys = game.tiers.filter((t) => t.group === g).map((t) => t.key);
      const statuses = keys.map((k) => tiers[k]).filter(Boolean);
      const best = statuses.includes(SOLVED) ? SOLVED
        : statuses.includes(FAILED) ? FAILED
          : statuses.includes(PLAYED) ? PLAYED
            : statuses.length ? PROGRESS : '';
      return { label: g, status: best };
    })
    : game.tiers.map((t) => ({ label: t.label, status: tiers[t.key] || '' }));
  return h('span', { class: 'pips', 'aria-hidden': 'true' },
    marks.map((m) => h('span', { class: `pip ${m.status}`, title: m.label })));
}

let openSheetEl = null;

/** Opens a modal bottom sheet. Returns a close() function. */
export function openSheet(content, { label = 'Dialog', onClose, className = '' } = {}) {
  closeSheet();
  const previous = document.activeElement;
  const sheet = h('div', { class: `sheet ${className}`, role: 'dialog', 'aria-modal': 'true', 'aria-label': label });
  const backdrop = h('div', { class: 'sheet-backdrop' }, sheet);
  sheet.append(content);

  const close = () => {
    if (!backdrop.isConnected) return;
    backdrop.remove();
    document.removeEventListener('keydown', onKey);
    openSheetEl = null;
    if (previous && previous.focus) previous.focus();
    if (onClose) onClose();
  };
  const onKey = (e) => {
    if (e.key === 'Escape') close();
  };
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) close();
  });
  document.addEventListener('keydown', onKey);
  document.body.append(backdrop);
  openSheetEl = { close };
  const focusable = sheet.querySelector('a, button');
  if (focusable) focusable.focus();
  return close;
}

export function closeSheet() {
  if (openSheetEl) openSheetEl.close();
}

export function sheetHead(title, close, logo) {
  return h('div', { class: 'sheet-head' },
    logo ? h('img', { src: logo, alt: '' }) : null,
    h('h2', { text: title }),
    h('button', { class: 'icon-btn', 'aria-label': 'Close', html: ICONS.close, onClick: () => close() }));
}

export function toast(message) {
  const el = h('div', { class: 'toast', role: 'status', text: message });
  document.body.append(el);
  setTimeout(() => el.remove(), 2600);
}
