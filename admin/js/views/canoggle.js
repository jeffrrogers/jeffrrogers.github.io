// Canoggle tab: the shipped puzzle calendar, read back out of the game's own
// files, and each board's fun fact.
//
// Canoggle's puzzles are built offline and shipped inside the game
// (squaredleSourceCode/tools/generate_dailies.dart): to extend the calendar,
// regenerate it in the game project. A board's featured Canuckle word can be
// swapped here (views/boardSwap.js), which rebuilds the boards involved in
// the browser and rewrites their shards in the Arena folder. The fun fact
// can be edited too. Every day has two boards, the Daily and the Mini, each built around
// its own Canuckle word, and each shows the Canuckle fact for that word, copied
// from the recap without the date it ran -- so a fact like "Today is Election
// Day!" is wrong on Canoggle. Giving a board its own fact writes it into
// canoggleGameData/{day}'s `facts` map under the board's key (d or m); the game
// shows that instead, and the Canuckle fact otherwise.

import { h, clear, modal, toast, issues, safeHref, sortHead } from '../ui.js?v=202610311155';
import { nextSort, sortRows } from '../sort.js?v=202610311155';
import { GAME_SITES } from '../config.js?v=202610311155';
import { longDate, todayEpochDay, isSwapLocked } from '../dates.js?v=202610311155';
import { launchEd } from '../launch.js?v=202610311155';
import { unpackCanoggle, boardRows } from '../canoggle.js?v=202610311155';
import {
  segmentsToText, textToSegments, canoggleFactOf, canagramsFactToSave, looksDateBound,
} from '../facts.js?v=202610311155';
import {
  loadCanoggleFacts, saveCanoggleFact, CANOGGLE_BOARDS, CANOGGLE_FACTS, withCanoggleFact,
} from '../store.js?v=202610311155';
import { factCard, previewFrame } from '../preview.js?v=202610311155';
import { arenaFolder } from '../localFiles.js?v=202610311155';
import { loadLocal } from '../swapFlow.js?v=202610311155';
import { swapCard, openBoardSwap } from './boardSwap.js?v=202610311155';

const START_ED = launchEd('canoggle');
const DATA = 'canoggle/assets/assets/data/';
const PAGE = 14; // days, so 28 rows
const WARN_DAYS = 30;

/**
 * {site, days, boards: [{day, board, p}], facts, own, ownError} once loaded,
 * or {error}. facts: word -> the Canuckle fact shipped in the game. own: day
 * -> its canoggleGameData doc.
 */
let data = null;
let loading = false;
let from = null; // first day shown
let query = '';
let filter = 'all';
// A clicked column ({key, dir}, sort.js), or null for calendar order. While
// sorted, every matching day is listed, not just the page around today.
let sort = null;

const todayIdx = () => todayEpochDay() - START_ED + 1;

async function fetchJson(site, path) {
  const res = await fetch(site + DATA + path, { cache: 'no-store' });
  if (!res.ok) throw new Error(`${res.status} for ${path} on ${site}`);
  return res.json();
}

// The board list the tab shows, from the index and shards.
function boardsOf(shards) {
  const boards = [];
  for (const shard of shards) {
    for (let k = 0; k < shard.days; k++) {
      for (const board of Object.keys(CANOGGLE_BOARDS)) {
        const line = shard[board]?.[k];
        boards.push({ day: shard.start + k, board, p: line == null ? null : unpackCanoggle(line) });
      }
    }
  }
  return boards;
}

async function loadOwn() {
  try {
    return { own: await loadCanoggleFacts(), ownError: null };
  } catch (e) {
    return { own: new Map(), ownError: e.message };
  }
}

async function load() {
  // With the Arena folder connected, the game project's own files: what the
  // next swap edits, and swaps not pushed to any site yet.
  if (await arenaFolder()) {
    try {
      const local = await loadLocal('canoggle', unpackCanoggle);
      return {
        site: 'local',
        days: local.files.index.days,
        boards: boardsOf([...local.files.shards.values()]),
        facts: local.files.facts || {},
        ...(await loadOwn()),
      };
    } catch (e) {
      return { error: `Couldn't read squaredleSourceCode/assets/data: ${e.message}` };
    }
  }
  let lastError = null;
  for (const site of GAME_SITES) {
    try {
      const index = await fetchJson(site, 'dailies_index.json');
      const shardCount = Math.ceil(index.days / index.shard);
      const shards = await Promise.all(Array.from({ length: shardCount }, (_, s) =>
        fetchJson(site, `dailies_${String(s).padStart(3, '0')}.json`)));
      const boards = boardsOf(shards);
      let facts = {};
      try {
        facts = await fetchJson(site, 'canuckle_facts.json');
      } catch {
        // Facts are a nicety here.
      }
      return { site, days: index.days, boards, facts, ...(await loadOwn()) };
    } catch (e) {
      lastError = e;
    }
  }
  return { error: lastError?.message || 'Not found' };
}

function summary() {
  const t = todayIdx();
  const last = data.days;
  const left = last - t;
  const used = new Set(data.boards.map((b) => b.p?.canuckle).filter(Boolean));
  const broken = data.boards.filter((b) => !b.p).map((b) => `${b.day}${b.board}`);
  const own = data.boards.filter((b) => ownFact(b)).length;
  return h('div', { class: 'card' },
    h('h3', {}, 'Calendar'),
    h('p', {}, `${last} days shipped, a Daily and a Mini each: #1 ${longDate(START_ED)} to #${last} ${longDate(START_ED + last - 1)}.`),
    h('p', {}, h('b', {}, left < 0 ? 'Ran out' : `${left} days left`), ' after today (#', String(t), ').',
      left < WARN_DAYS ? [' ', h('span', { class: 'flag err' }, 'Regenerate soon')] : null),
    h('p', { class: 'muted small' }, `${used.size} distinct Canuckle words · ${own} board${own === 1 ? '' : 's'} with a Canoggle fact.`),
    broken.length ? h('p', { class: 'err' }, `Unreadable boards: ${broken.join(', ')}`) : null,
    h('p', { class: 'muted small' }, `Read from ${data.site === 'local' ? 'squaredleSourceCode in your Arena folder' : data.site === '/' ? 'this site' : data.site}. `,
      'Extend with tools/generate_dailies.dart in squaredleSourceCode, then deploy the game.'));
}

/** A fact with its `[words](https://...)` links as real links (game: lib/ui/fact_text.dart). */
function factNodes(fact) {
  const out = [];
  let at = 0;
  for (const m of fact.matchAll(/\[([^\[\]]+)\]\((https:\/\/[^\s()]+)\)/g)) {
    if (m.index > at) out.push(fact.slice(at, m.index));
    const href = safeHref(m[2]);
    out.push(href ? h('a', { href, target: '_blank', rel: 'noopener' }, m[1]) : m[1]);
    at = m.index + m[0].length;
  }
  out.push(fact.slice(at));
  return out;
}

/** Board [b]'s own fact, or null when it shows the Canuckle fact. */
function ownFact(b) {
  return canoggleFactOf(data.own.get(b.day), b.board);
}

/** Boards still showing a Canuckle fact that reads as tied to the day it ran. */
function datedUnfixed(b) {
  return !!b.p?.canuckle && !ownFact(b) && looksDateBound(data.facts[b.p.canuckle] || '');
}

/** Problems with edited fact text: links must be https, as the game draws only those. */
function factIssues(text) {
  const errors = [];
  const warnings = [];
  const f = textToSegments(text);
  for (const u of f.factUrls) {
    if (u && !/^https:\/\/\S+$/i.test(u)) errors.push(`The game only links https:// addresses: ${u}`);
  }
  if (text.trim() && looksDateBound(text)) warnings.push('This still reads as tied to a date ("today", "happy …").');
  return { errors, warnings };
}

/** A board's letters and word lists. */
function boardPreview(p) {
  return [
    h('pre', { class: 'mono', style: 'line-height:1.25;font-size:15px' }, boardRows(p).join('\n')),
    h('p', {}, h('b', {}, `Required (${p.required.length}): `), p.required.join(', ')),
    h('p', { class: 'muted small' }, h('b', {}, `Bonus (${p.bonus.length}): `), p.bonus.join(', ')),
  ];
}

async function openBoard(b, rerender) {
  const p = b.p;
  const label = CANOGGLE_BOARDS[b.board];
  const canuckleText = data.facts[p.canuckle] || '';
  const own = ownFact(b);

  const saved = await modal(`Canoggle #${b.day} ${label} · ${longDate(START_ED + b.day - 1)}`, (close) => {
    const area = h('textarea', { rows: 6, spellcheck: true });
    area.value = own ? segmentsToText(own.fact, own.factUrls) : canuckleText;
    const status = h('span', { class: 'muted small' });
    const reset = h('button', { type: 'button', class: 'btn small' }, 'Reset to Canuckle fact');
    const problems = h('div');
    const save = h('button', { class: 'btn primary' }, 'Save');

    const pv = previewFrame(() => {
      const shown = area.value.trim() ? textToSegments(area.value) : textToSegments(canuckleText);
      return h('div', { class: 'pv-stack' },
        h('div', { class: 'pv-caption' }, 'Fun fact when the Canuckle word is found and at the end'),
        factCard({ kind: 'canuckle', answer: p.canuckle, ...shown }));
    });

    function update() {
      const next = canagramsFactToSave(area.value, canuckleText);
      status.textContent = next ? 'Canoggle version, differs from Canuckle'
        : area.value.trim() ? 'Using the Canuckle fact' : 'Empty, so the Canuckle fact shows';
      reset.disabled = !next;
      const r = factIssues(area.value);
      clear(problems, issues(r));
      // Nothing to write when the board already stores what the box says.
      const unchanged = segmentsToText(next?.fact, next?.factUrls)
        === segmentsToText(own?.fact, own?.factUrls);
      save.disabled = r.errors.length > 0 || unchanged;
      pv.refresh();
    }
    area.addEventListener('input', update);
    reset.addEventListener('click', () => { area.value = canuckleText; update(); });
    save.addEventListener('click', async () => {
      save.disabled = true;
      try {
        await saveCanoggleFact(b.day, b.board, canagramsFactToSave(area.value, canuckleText));
        close(true);
      } catch (e) {
        toast(`Not saved: ${e.message}`, { error: true });
        update();
      }
    });
    update();

    return [
      h('p', { class: 'muted' }, `${label} · ${p.width}×${p.height} · Canuckle word `, h('b', {}, p.canuckle)),
      h('div', { class: 'editor' },
        h('div', { class: 'editor-form' },
          h('label', { class: 'field' }, h('span', {}, `Fun fact: ${p.canuckle}`), area),
          h('div', { class: 'row' }, status, reset),
          h('p', { class: 'muted small' },
            `This board shows the Canuckle fact for its word unless you give it its own; the day's other board `
            + 'keeps its own setting. Rewrite facts that mention the day they first ran ("Today is…", "Happy…"). '
            + 'Links are written [link text](https://…). Saving a blank box, or the Canuckle text, goes back to the Canuckle fact.'),
          data.ownError ? h('p', { class: 'err' }, `Couldn't read saved Canoggle facts: ${data.ownError}`) : null,
          problems,
          h('div', { class: 'actions' },
            h('button', {
              class: 'btn',
              disabled: isSwapLocked('canoggle', b.day),
              title: isSwapLocked('canoggle', b.day) ? 'This day has been played or may be in play.' : 'Feature a different Canuckle word on this board',
              onclick: () => close('swap'),
            }, 'Change featured word\u2026'),
            h('span', { class: 'spacer' }),
            h('button', { class: 'btn', onclick: () => close(false) }, 'Cancel'), save)),
        pv.el),
      boardPreview(p),
      canuckleText ? h('p', { class: 'muted small' }, h('b', {}, 'Canuckle fact: '), factNodes(canuckleText)) : null,
    ];
  }, { wide: true });

  if (saved === 'swap') {
    const swapped = await openBoardSwap('canoggle', { day: b.day, kind: b.board, word: p.canuckle }, {
      unpack: unpackCanoggle,
      preview: boardPreview,
      factsOf: {
        collection: CANOGGLE_FACTS,
        read: (doc, kind) => canoggleFactOf(doc, kind),
        write: (doc, day, kind, f) => withCanoggleFact(doc, day, kind, f),
      },
    });
    if (swapped) {
      data = null;
      rerender();
    }
    return;
  }
  if (saved) {
    toast(`Canoggle #${b.day} ${label} fact saved.`);
    try {
      data.own = await loadCanoggleFacts();
    } catch (e) {
      data.ownError = e.message;
    }
    rerender();
  }
}

function table(rerender) {
  const t = todayIdx();
  const q = query.trim().toUpperCase();
  const keep = (b) => (filter === 'own' ? !!ownFact(b) : filter === 'dated' ? datedUnfixed(b) : true);
  const matching = q || filter !== 'all' || sort
    ? data.boards.filter((b) => (b.p || !(q || filter !== 'all')) && keep(b)
      && (!q || b.p.canuckle?.includes(q) || b.p.required.includes(q) || String(b.day) === q))
    : data.boards.filter((b) => b.day >= from && b.day < from + PAGE);
  const rows = sortRows(matching, (b, key) => {
    switch (key) {
      case 'day':
      case 'date': return b.day + (b.board === 'm' ? 0.5 : 0);
      case 'board': return CANOGGLE_BOARDS[b.board];
      case 'size': return b.p ? b.p.width * b.p.height : null;
      case 'word': return b.p?.canuckle;
      case 'required': return b.p?.required.length;
      case 'bonus': return b.p?.bonus.length;
      case 'fact': return ownFact(b) ? 2 : datedUnfixed(b) ? 1 : 0;
      default: return null;
    }
  }, sort);
  const usable = (b) => !!b.p?.canuckle;
  return h('div', { class: 'table-wrap' },
    h('table', { class: 'grid' },
      sortHead([
        { label: '#', key: 'day' }, { label: 'Date', key: 'date' }, { label: 'Board', key: 'board' },
        { label: 'Size', key: 'size' }, { label: 'Canuckle word', key: 'word' }, { label: 'Required', key: 'required' },
        { label: 'Bonus', key: 'bonus' }, { label: 'Fact', key: 'fact' },
      ], sort, (key) => { sort = nextSort(sort, key); rerender(); }),
      h('tbody', {}, rows.map((b) => h('tr', {
        class: b.day === t ? 'today' : b.day > t ? 'future' : '',
        tabIndex: 0,
        onclick: () => usable(b) && openBoard(b, rerender),
        onkeydown: (e) => { if (e.key === 'Enter' && usable(b)) openBoard(b, rerender); },
      },
      h('td', { class: 'num' }, String(b.day)),
      h('td', { class: 'nowrap' }, longDate(START_ED + b.day - 1)),
      h('td', {}, CANOGGLE_BOARDS[b.board]),
      h('td', {}, b.p ? `${b.p.width}×${b.p.height}` : '—'),
      h('td', { class: 'answer' }, b.p ? h('b', {}, b.p.canuckle || '—') : h('span', { class: 'err' }, 'unreadable')),
      h('td', { class: 'num' }, b.p ? String(b.p.required.length) : ''),
      h('td', { class: 'num' }, b.p ? String(b.p.bonus.length) : ''),
      h('td', { class: 'nowrap' },
        ownFact(b) ? h('span', { class: 'pill' }, 'Canoggle fact') : null,
        datedUnfixed(b) ? h('span', { class: 'flag', title: data.facts[b.p.canuckle] }, 'Date-bound?') : null))))));
}

export function renderCanoggle(root, rerender) {
  if (!data && !loading) {
    loading = true;
    load().then((v) => {
      data = v;
      loading = false;
      if (location.hash === '#canoggle') rerender();
    });
  }
  if (!data) {
    clear(root, h('p', { class: 'muted' }, 'Loading Canoggle puzzles…'));
    return;
  }
  if (data.error) {
    clear(root, h('p', { class: 'err' }, `Couldn't load the Canoggle puzzle files: ${data.error}`),
      h('button', { class: 'btn', onclick: () => { data = null; rerender(); } }, 'Retry'));
    return;
  }
  if (from == null) from = Math.max(1, todayIdx() - 3);

  const search = h('input', {
    type: 'search', placeholder: 'Find a Canuckle word, required word or puzzle number', value: query,
    oninput: (e) => {
      query = e.target.value;
      rerender();
      const el = root.querySelector('input[type="search"]');
      el?.focus();
      el?.setSelectionRange(query.length, query.length);
    },
  });
  const paged = !query && filter === 'all' && !sort;
  const dated = data.boards.filter(datedUnfixed).length;
  clear(root,
    summary(),
    swapCard('canoggle', () => { data = null; rerender(); }),
    dated ? h('div', { class: 'banner warn' },
      `${dated} board${dated === 1 ? '' : 's'} still show a Canuckle fact that reads as tied to the day it first ran. `,
      h('a', { href: '#canoggle', onclick: (e) => { e.preventDefault(); filter = 'dated'; rerender(); } }, 'Show them')) : null,
    h('div', { class: 'toolbar' },
      search,
      h('select', { onchange: (e) => { filter = e.target.value; rerender(); } },
        [['all', 'All days'], ['dated', 'Date-bound fact, not yet fixed'], ['own', 'Has a Canoggle fact']]
          .map(([v, l]) => h('option', { value: v, selected: filter === v }, l))),
      h('button', { class: 'btn small', disabled: !paged || from <= 1, onclick: () => { from = Math.max(1, from - PAGE); rerender(); } }, '‹ Earlier'),
      h('button', { class: 'btn small', disabled: !paged, onclick: () => { from = Math.max(1, todayIdx() - 3); rerender(); } }, 'Today'),
      h('button', { class: 'btn small', disabled: !paged || from + PAGE > data.days, onclick: () => { from += PAGE; rerender(); } }, 'Later ›'),
      sort ? h('button', { class: 'btn small', onclick: () => { sort = null; rerender(); } }, 'Default order') : null,
      h('button', { class: 'btn small', onclick: () => { data = null; rerender(); } }, 'Refresh')),
    table(rerender),
    h('p', { class: 'muted small' }, 'Tap a board to see it and edit its fun fact. Future days are greyed. Click a column heading to sort by it, again to reverse. Answers here are spoilers for players, not for you.'));
}
