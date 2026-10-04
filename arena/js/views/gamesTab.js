// The Games tab: one row per game with today's puzzle, the previous seven,
// and a way into the archive.

import { h, ICONS, statusIcon, tierMarks } from '../ui.js?v=202610040159';
import { longDate, weekdayName } from '../dates.js?v=202610040159';
import { recentIndices } from '../games/common.js?v=202610040159';
import { isDone, PROGRESS } from '../status.js?v=202610040159';
import { playProps, whenLabel, dateLabel } from './play.js?v=202610040159';

function puzzleTile(game, index, entry, todayIdx) {
  const isToday = index === todayIdx;
  const status = entry?.status || null;
  const when = whenLabel(game, index, todayIdx);
  const weekly = game.cadence === 'weekly';
  const label = `${game.name} ${game.label(index)}, ${when}`;
  // Weekly labels already carry the date; past daily tiles get a date line.
  const top = h('span', { class: 'top' },
    h('div', { class: 'when', text: when }),
    weekly || isToday ? null : h('div', { class: 'num', text: dateLabel(game, index) }),
    h('div', { class: 'num', text: game.label(index) }));
  if (isToday) {
    const cta = isDone(status) ? null : status === PROGRESS ? 'Continue' : 'Play';
    return h('a', { class: 'ptile today', 'aria-label': `${label}${cta ? ', ' + cta : ''}`, ...playProps(game, index, entry, todayIdx) },
      top,
      h('span', { class: 'foot' },
        cta ? h('span', { class: 'cta', text: cta }) : statusIcon(status, true),
        tierMarks(game, entry, { always: true })));
  }
  return h('a', { class: 'ptile', 'aria-label': label, ...playProps(game, index, entry, todayIdx) },
    top,
    h('span', { class: 'foot' }, statusIcon(status), tierMarks(game, entry, { always: true })));
}

export function streakChip(game, progress) {
  const n = progress?.streak || 0;
  const unit = game.cadence === 'weekly' ? 'week' : 'day';
  return h('span', {
    class: `streak-chip${n ? '' : ' zero'}`,
    title: `Current streak: ${n} ${unit}${n === 1 ? '' : 's'}`,
    'aria-label': `Current streak ${n} ${unit}${n === 1 ? '' : 's'}`,
  }, h('span', { html: ICONS.flame }), String(n));
}

function gameRow(game, progress, todayEd) {
  const todayIdx = game.todayIndex(todayEd);
  const indices = recentIndices(game, todayEd);
  return h('section', { class: 'game-row', style: { '--game': game.color }, 'aria-label': game.name },
    h('div', { class: 'row-head' },
      h('img', { src: game.logo, alt: '' }),
      h('div', { class: 'grow' }, h('h2', { text: game.name }), h('p', { class: 'muted', text: game.blurb })),
      streakChip(game, progress)),
    h('div', { class: 'strip' },
      indices.map((i) => puzzleTile(game, i, progress?.days.get(i), todayIdx)),
      h('a', { class: 'ptile archive', href: `#archive/${game.id}` },
        h('span', { html: ICONS.calendar }), 'Archive')));
}

export function renderGames(app) {
  const { games, todayEd, progress, uid } = app;
  const daily = games.filter((g) => g.cadence === 'daily');
  const doneToday = daily.filter((g) => {
    const p = progress[g.id]?.progress;
    return p && isDone(p.days.get(g.todayIndex(todayEd))?.status);
  }).length;

  return h('div', { class: 'wrap' },
    h('div', { class: 'today-line' },
      h('h1', { text: `${weekdayName(todayEd)}, ${longDate(todayEd)}` }),
      h('span', { class: 'muted', text: uid ? `${doneToday} of ${daily.length} daily games finished today` : '' })),
    uid ? null : h('div', { class: 'notice' },
      'Welcome! Pick any game to start. Your streaks, archive and badges show up here once you have played.'),
    games.map((g) => gameRow(g, progress[g.id]?.progress, todayEd)));
}
