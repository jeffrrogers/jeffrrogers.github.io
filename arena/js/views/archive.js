// A game's archive: a month calendar for daily games, a week list for
// Canuckle+. Months render in batches as the player scrolls back.

import { h, ICONS, statusIcon, tierMarks } from '../ui.js?v=202610040209';
import { ymd, epochDay, monthTitle, daysInMonth, shortDate } from '../dates.js?v=202610040209';
import { SOLVED, FAILED, PLAYED, PROGRESS, STATUS_LABEL, isDone } from '../status.js?v=202610040209';
import { playProps } from './play.js?v=202610040209';
import { streakChip } from './gamesTab.js?v=202610040209';

const BATCH = 4;
const DOW = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function legend(game) {
  const items = [[SOLVED], [PROGRESS], [null]];
  if (game.id === 'canuckle' || game.id === 'plus' || game.id === 'canoggle') items.splice(1, 0, [FAILED]);
  if (game.id === 'canolitaire') items.splice(1, 0, [PLAYED]);
  return h('div', { class: 'legend' },
    items.map(([s]) => h('span', {}, statusIcon(s), s ? STATUS_LABEL[s] : 'Not played')));
}

function monthEl(game, progress, y, m, todayEd, todayIdx) {
  const first = epochDay(y, m, 1);
  const lead = ymd(first).weekday;
  const cells = [];
  for (let k = 0; k < lead; k++) cells.push(h('span', { class: 'day blank', 'aria-hidden': 'true' }));
  for (let d = 1; d <= daysInMonth(y, m); d++) {
    const ed = first + d - 1;
    if (ed > todayEd) {
      cells.push(h('span', { class: 'day future', 'aria-hidden': 'true' }, String(d)));
      continue;
    }
    const index = game.indexForEd(ed);
    if (index == null) {
      cells.push(h('span', { class: 'day none', 'aria-hidden': 'true' }, String(d)));
      continue;
    }
    const entry = progress?.days.get(index);
    const status = entry?.status || '';
    cells.push(h('a', {
      class: `day ${status}${ed === todayEd ? ' is-today' : ''}`,
      'aria-label': `${shortDate(ed)}, ${game.name} ${game.label(index)}, ${STATUS_LABEL[status] || 'Not played'}`,
      ...playProps(game, index, entry, todayIdx),
    }, String(d), tierMarks(game, entry)));
  }
  return h('section', { class: 'month' },
    h('h2', { text: monthTitle(y, m) }),
    h('div', { class: 'cal' },
      DOW.map((d) => h('span', { class: 'dow', 'aria-hidden': 'true', text: d })),
      cells));
}

function weekEl(game, progress, index, todayIdx) {
  const entry = progress?.days.get(index);
  const status = entry?.status || null;
  return h('a', { class: 'week-row', ...playProps(game, index, entry, todayIdx) },
    statusIcon(status),
    h('span', { class: 'grow' },
      h('b', { text: `${game.label(index)}` }),
      h('span', { class: 'muted', text: ` · week of ${shortDate(game.edForIndex(index))}` })),
    h('span', { class: 'muted', text: index === todayIdx ? 'This week' : STATUS_LABEL[status] || '' }));
}

export function renderArchive(app, game) {
  const { todayEd } = app;
  const progress = app.progress[game.id]?.progress;
  const todayIdx = game.todayIndex(todayEd);
  const firstIdx = game.indexForEd(game.firstEd);
  const total = todayIdx - firstIdx + 1;
  const finished = progress ? [...progress.days.values()].filter((d) => isDone(d.status)).length : 0;

  const list = h('div', { class: game.cadence === 'weekly' ? 'week-list' : 'months' });
  const more = h('div', { class: 'load-more' });

  // Cursor walks backwards from today: months for daily, weeks for weekly.
  let { y, m } = ymd(todayEd);
  let weekIdx = todayIdx;
  const firstYm = ymd(game.firstEd);
  const exhausted = () => (game.cadence === 'weekly'
    ? weekIdx < firstIdx
    : y < firstYm.y || (y === firstYm.y && m < firstYm.m));

  const addBatch = () => {
    for (let k = 0; k < (game.cadence === 'weekly' ? BATCH * 4 : BATCH) && !exhausted(); k++) {
      if (game.cadence === 'weekly') {
        list.append(weekEl(game, progress, weekIdx, todayIdx));
        weekIdx--;
      } else {
        list.append(monthEl(game, progress, y, m, todayEd, todayIdx));
        m--;
        if (m === 0) { m = 12; y--; }
      }
    }
    more.replaceChildren(exhausted() ? h('span', { class: 'muted', text: 'That’s the very first puzzle.' })
      : h('button', { class: 'btn secondary', onClick: addBatch, text: 'Show earlier' }));
  };
  addBatch();

  // Load further batches automatically as the bottom comes into view.
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting) && !exhausted()) addBatch();
      if (exhausted()) io.disconnect();
    }, { rootMargin: '400px' });
    io.observe(more);
  }

  return h('div', { class: 'wrap', style: { '--game': game.color } },
    h('div', { class: 'page-head' },
      h('a', { class: 'icon-btn', href: '#games', 'aria-label': 'Back to games', html: ICONS.back }),
      h('img', { src: game.logo, alt: '' }),
      h('div', { class: 'grow' },
        h('h1', { text: `${game.name} archive` }),
        h('span', { class: 'muted', text: `${finished} of ${total} ${game.cadence === 'weekly' ? 'weeks' : 'puzzles'} finished` })),
      streakChip(game, progress)),
    legend(game),
    list,
    more);
}
