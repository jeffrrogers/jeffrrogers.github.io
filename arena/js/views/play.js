// Opening a puzzle: straight into the game, or via a difficulty picker for
// games with several puzzles per day.

import { h, openSheet, sheetHead, statusIcon } from '../ui.js?v=202610040105';
import { shortDate, weekdayName } from '../dates.js?v=202610040105';
import { track } from '../analytics.js?v=202610040105';

/** Short label for a puzzle relative to today: "Today", "Yesterday", "Wed". */
export function whenLabel(game, index, todayIdx) {
  const ed = game.edForIndex(index);
  if (game.cadence === 'weekly') {
    if (index === todayIdx) return 'This week';
    if (index === todayIdx - 1) return 'Last week';
    return `Week of ${shortDate(ed)}`;
  }
  if (index === todayIdx) return 'Today';
  if (index === todayIdx - 1) return 'Yesterday';
  return weekdayName(ed);
}

/** The calendar date line under a tile's label: "Sep 30". */
export function dateLabel(game, index) {
  return shortDate(game.edForIndex(index));
}

function trackPlay(game, index, tier, isToday) {
  track('arena_play', { game: game.id, index, tier: tier || '', today: isToday ? 1 : 0 });
}

/** Props for an <a> that opens [index]: a direct link, or the tier sheet. */
export function playProps(game, index, entry, todayIdx) {
  const isToday = index === todayIdx;
  if (!game.tiers.length) {
    return {
      href: game.link(index, null, isToday),
      onClick: () => trackPlay(game, index, null, isToday),
    };
  }
  return {
    href: game.link(index, null, isToday),
    onClick: (e) => {
      e.preventDefault();
      openTierSheet(game, index, entry, todayIdx);
    },
  };
}

export function openTierSheet(game, index, entry, todayIdx) {
  const isToday = index === todayIdx;
  const tiers = entry?.tiers || {};
  const groups = [...new Set(game.tiers.map((t) => t.group || ''))];
  let close;
  const body = h('div', {},
    sheetHead(`${game.name} ${game.label(index)} · ${whenLabel(game, index, todayIdx)}`, () => close(), game.logo),
    h('p', { class: 'muted', style: { margin: '0' }, text: 'Pick a puzzle to play.' }),
    groups.map((g) => h('div', { class: 'tier-group' },
      g ? h('h3', { text: g }) : null,
      h('div', { class: 'tier-list' },
        game.tiers.filter((t) => (t.group || '') === g).map((t) => h('a', {
          class: 'tier-btn',
          href: game.link(index, t.key, isToday),
          onClick: () => trackPlay(game, index, t.key, isToday),
        }, statusIcon(tiers[t.key]), t.label))))));
  close = openSheet(body, { label: `${game.name} puzzles` });
}
