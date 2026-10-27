// Canagrams tab: the shipped puzzle calendar, read back out of the game's own
// files, each day's fun fact, and an optional summary of every player's stats.
//
// Canagrams' puzzles are built offline and shipped inside the game
// (canagramsSourceCode/tools/generate_dailies.dart): to extend the calendar,
// regenerate it in the game project. A day's featured Canuckle word can be
// swapped here (views/boardSwap.js), which rebuilds the days involved in the
// browser and rewrites their shards in the Arena folder. The fun fact can be
// edited too. Each day shows the Canuckle fact for its Canuckle word, copied from
// the recap without the date it ran, so a fact like "Today is Election Day!" is
// wrong on Canagrams. Giving a day its own fact writes canagramsGameData/{day};
// the game shows that instead, and the Canuckle fact otherwise.

import { h, clear, modal, toast, issues, safeHref, sortHead } from '../ui.js?v=202610262100';
import { nextSort, sortRows } from '../sort.js?v=202610262100';
import { GAME_SITES } from '../config.js?v=202610262100';
import { longDate, todayEpochDay, isSwapLocked } from '../dates.js?v=202610262100';
import { sdk } from '../firebase.js?v=202610262100';
import { launchEd } from '../launch.js?v=202610262100';
import {
  RUNGS, unpackCanagrams, gridRows, rungOf, summarizePlayers,
} from '../canagrams.js?v=202610262100';
import {
  segmentsToText, textToSegments, canagramsFactOf, canagramsFactToSave, looksDateBound,
} from '../facts.js?v=202610262100';
import {
  loadCanagramsFacts, saveCanagramsFact, CANAGRAMS_FACTS, withCanagramsFact,
} from '../store.js?v=202610262100';
import { factCard, previewFrame } from '../preview.js?v=202610262100';
import { arenaFolder } from '../localFiles.js?v=202610262100';
import { loadLocal } from '../swapFlow.js?v=202610262100';
import { swapCard, openBoardSwap } from './boardSwap.js?v=202610262100';

const START_ED = launchEd('canagrams');
const DATA = 'canagrams/assets/assets/data/';
const PAGE = 28;
const WARN_DAYS = 30;

/**
 * {site, days: [{day, p}], facts, own, ownError} once loaded, or {error}.
 * facts: word -> the Canuckle fact shipped in the game. own: day -> its
 * canagramsGameData doc.
 */
let data = null;
let loading = false;
let players = null; // summarizePlayers(...) once loaded
let playersLoading = false;
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

// The day list the tab shows, from the shards.
function daysOf(shards) {
  const days = [];
  for (const shard of shards) {
    (shard.d || []).forEach((line, k) => days.push({ day: shard.start + k, p: unpackCanagrams(line) }));
  }
  return days;
}

async function loadOwn() {
  try {
    return { own: await loadCanagramsFacts(), ownError: null };
  } catch (e) {
    return { own: new Map(), ownError: e.message };
  }
}

async function load() {
  // With the Arena folder connected, the game project's own files: what the
  // next swap edits, and swaps not pushed to any site yet.
  if (await arenaFolder()) {
    try {
      const local = await loadLocal('canagrams', unpackCanagrams);
      return {
        site: 'local',
        days: daysOf([...local.files.shards.values()]),
        facts: local.files.facts || {},
        ...(await loadOwn()),
      };
    } catch (e) {
      return { error: `Couldn't read canagramsSourceCode/assets/data: ${e.message}` };
    }
  }
  let lastError = null;
  for (const site of GAME_SITES) {
    try {
      const index = await fetchJson(site, 'dailies_index.json');
      const shardCount = Math.ceil(index.days / index.shard);
      const shards = await Promise.all(Array.from({ length: shardCount }, (_, s) =>
        fetchJson(site, `dailies_${String(s).padStart(3, '0')}.json`)));
      const days = daysOf(shards);
      let facts = {};
      try {
        facts = await fetchJson(site, 'canuckle_facts.json');
      } catch {
        // Facts are a nicety here.
      }
      return { site, days, facts, ...(await loadOwn()) };
    } catch (e) {
      lastError = e;
    }
  }
  return { error: lastError?.message || 'Not found' };
}

async function loadPlayers() {
  const { fs, db } = await sdk();
  const docs = [];
  let last = null;
  for (;;) {
    const parts = [fs.collection(db, 'anagramUserData'), fs.orderBy(fs.documentId()), fs.limit(300)];
    const snap = await fs.getDocs(last ? fs.query(...parts, fs.startAfter(last)) : fs.query(...parts));
    snap.docs.forEach((d) => docs.push(d.data()));
    if (snap.size < 300) break;
    last = snap.docs[snap.docs.length - 1];
  }
  return summarizePlayers(docs, todayIdx());
}

function summary(root) {
  const t = todayIdx();
  const last = data.days.length;
  const left = last - t;
  const used = new Set(data.days.map((d) => d.p?.canuckle).filter(Boolean));
  const shapes = {};
  for (const d of data.days) {
    if (rungOf(d.day) === 5 && d.p) shapes[d.p.shape] = (shapes[d.p.shape] || 0) + 1;
  }
  const broken = data.days.filter((d) => !d.p).map((d) => d.day);
  return h('div', { class: 'two-col' },
    h('div', { class: 'card' },
      h('h3', {}, 'Calendar'),
      h('p', {}, `${last} puzzles shipped: #1 ${longDate(START_ED)} to #${last} ${longDate(START_ED + last - 1)}.`),
      h('p', {}, h('b', {}, left < 0 ? 'Ran out' : `${left} days left`), ' after today (#', String(t), ').',
        left < WARN_DAYS ? [' ', h('span', { class: 'flag err' }, 'Regenerate soon')] : null),
      h('p', { class: 'muted small' }, `${used.size} distinct Canuckle words. Saturdays: `,
        Object.entries(shapes).map(([k, v]) => `${k} ${v}`).join(' · '), '.'),
      broken.length ? h('p', { class: 'err' }, `Unreadable days: ${broken.join(', ')}`) : null,
      h('p', { class: 'muted small' }, `Read from ${data.site === 'local' ? 'canagramsSourceCode in your Arena folder' : data.site === '/' ? 'this site' : data.site}. `,
        'Extend with tools/generate_dailies.dart in canagramsSourceCode, then deploy the game.')),
    h('div', { class: 'card' },
      h('h3', {}, 'Players'),
      players
        ? [
          h('p', {}, `${players.players} players · ${players.solved} solves · ${players.activeToday} solved today · ${players.activeWeek} in the last 7 days.`),
          h('p', { class: 'muted small' },
            `Average score ${players.solved ? Math.round(players.points / players.solved) : 0} · best ${players.best} · `
            + `no-hint solves ${players.noHint} · Canuckle words spelled ${players.canuckleWords} · `
            + `bonus words ${players.bonusWords} · longest streak ${players.longestStreak}.`),
        ]
        : [
          h('p', { class: 'muted small' }, 'Reads every anagramUserData document once (one read per player).'),
          h('button', {
            class: 'btn', disabled: playersLoading,
            onclick: async () => {
              playersLoading = true;
              root.rerender();
              try {
                players = await loadPlayers();
              } catch (e) {
                toast(`Couldn't load players: ${e.message}`, { error: true });
              }
              playersLoading = false;
              root.rerender();
            },
          }, playersLoading ? 'Loading…' : 'Load player summary'),
        ]));
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

/** Day [day]'s own fact, or null when it shows the Canuckle fact. */
function ownFact(day) {
  return canagramsFactOf(data.own.get(day));
}

/** Days still showing a Canuckle fact that reads as tied to the day it ran. */
function datedUnfixed(d) {
  return !!d.p && !ownFact(d.day) && looksDateBound(data.facts[d.p.canuckle] || '');
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

/** A day's crossword, wheel words and bonus words. */
function dayPreview(p) {
  return [
    h('p', { class: 'muted small' }, `${p.shape} · wheel `, h('b', { class: 'mono' }, p.letters.split('').join(' '))),
    h('pre', { class: 'mono', style: 'line-height:1.25;font-size:15px' }, gridRows(p).join('\n')),
    h('p', {}, h('b', {}, `Grid (${p.slots.length}): `), p.slots.map((s) => s.word).join(', ')),
    h('p', { class: 'muted small' }, h('b', {}, `Bonus (${p.bonus.length}): `), p.bonus.join(', ')),
  ];
}

async function openDay(d, rerender) {
  const p = d.p;
  const canuckleText = data.facts[p.canuckle] || '';
  const own = ownFact(d.day);

  const saved = await modal(`Canagrams #${d.day} · ${longDate(START_ED + d.day - 1)}`, (close) => {
    const area = h('textarea', { rows: 6, spellcheck: true });
    area.value = own ? segmentsToText(own.fact, own.factUrls) : canuckleText;
    const status = h('span', { class: 'muted small' });
    const reset = h('button', { type: 'button', class: 'btn small' }, 'Reset to Canuckle fact');
    const problems = h('div');
    const save = h('button', { class: 'btn primary' }, 'Save');

    const pv = previewFrame(() => {
      const shown = area.value.trim() ? textToSegments(area.value) : textToSegments(canuckleText);
      return h('div', { class: 'pv-stack' },
        h('div', { class: 'pv-caption' }, 'Fun fact on the Canuckle word and at the end'),
        factCard({ kind: 'canuckle', answer: p.canuckle, ...shown }));
    });

    function update() {
      const next = canagramsFactToSave(area.value, canuckleText);
      status.textContent = next ? 'Canagrams version, differs from Canuckle'
        : area.value.trim() ? 'Using the Canuckle fact' : 'Empty, so the Canuckle fact shows';
      reset.disabled = !next;
      const r = factIssues(area.value);
      clear(problems, issues(r));
      // Nothing to write when the day already stores what the box says.
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
        await saveCanagramsFact(d.day, canagramsFactToSave(area.value, canuckleText));
        close(true);
      } catch (e) {
        toast(`Not saved: ${e.message}`, { error: true });
        update();
      }
    });
    update();

    return [
      h('p', { class: 'muted' }, `${RUNGS[rungOf(d.day)]} · ${p.shape} · wheel `,
        h('b', { class: 'mono' }, p.letters.split('').join(' ')), ' · Canuckle word ', h('b', {}, p.canuckle)),
      h('div', { class: 'editor' },
        h('div', { class: 'editor-form' },
          h('label', { class: 'field' }, h('span', {}, `Fun fact: ${p.canuckle}`), area),
          h('div', { class: 'row' }, status, reset),
          h('p', { class: 'muted small' },
            'This day shows the Canuckle fact for its word unless you give it its own. Rewrite facts that '
            + 'mention the day they first ran ("Today is…", "Happy…"). Links are written [link text](https://…). '
            + 'Saving a blank box, or the Canuckle text, goes back to the Canuckle fact.'),
          data.ownError ? h('p', { class: 'err' }, `Couldn't read saved Canagrams facts: ${data.ownError}`) : null,
          problems,
          h('div', { class: 'actions' },
            h('button', {
              class: 'btn',
              disabled: isSwapLocked('canagrams', d.day),
              title: isSwapLocked('canagrams', d.day) ? 'This day has been played or may be in play.' : 'Feature a different Canuckle word on this day',
              onclick: () => close('swap'),
            }, 'Change featured word\u2026'),
            h('span', { class: 'spacer' }),
            h('button', { class: 'btn', onclick: () => close(false) }, 'Cancel'), save)),
        pv.el),
      dayPreview(p),
      canuckleText ? h('p', { class: 'muted small' }, h('b', {}, 'Canuckle fact: '), factNodes(canuckleText)) : null,
    ];
  }, { wide: true });

  if (saved === 'swap') {
    const swapped = await openBoardSwap('canagrams', { day: d.day, kind: 'd', word: p.canuckle }, {
      unpack: unpackCanagrams,
      preview: dayPreview,
      factsOf: {
        collection: CANAGRAMS_FACTS,
        read: (doc) => canagramsFactOf(doc),
        write: (doc, day, kind, f) => withCanagramsFact(doc, day, f),
      },
    });
    if (swapped) {
      data = null;
      rerender();
    }
    return;
  }
  if (saved) {
    toast(`Canagrams #${d.day} fact saved.`);
    try {
      data.own = await loadCanagramsFacts();
    } catch (e) {
      data.ownError = e.message;
    }
    rerender();
  }
}

function table(rerender) {
  const t = todayIdx();
  const q = query.trim().toUpperCase();
  const keep = (d) => (filter === 'own' ? !!ownFact(d.day) : filter === 'dated' ? datedUnfixed(d) : true);
  const matching = q || filter !== 'all' || sort
    ? data.days.filter((d) => (d.p || !(q || filter !== 'all')) && keep(d)
      && (!q || d.p.canuckle.includes(q) || d.p.slots.some((s) => s.word === q) || String(d.day) === q))
    : data.days.slice(Math.max(0, from - 1), from - 1 + PAGE);
  const rows = sortRows(matching, (d, key) => {
    switch (key) {
      case 'day':
      case 'date': return d.day;
      case 'rung': return rungOf(d.day);
      case 'shape': return d.p?.shape;
      case 'word': return d.p?.canuckle;
      case 'wheel': return d.p?.letters;
      case 'words': return d.p?.slots.length;
      case 'bonus': return d.p?.bonus.length;
      case 'fact': return ownFact(d.day) ? 2 : datedUnfixed(d) ? 1 : 0;
      case 'solved': return players ? players.byDay.get(d.day) || 0 : null;
      default: return null;
    }
  }, sort);
  return h('div', { class: 'table-wrap' },
    h('table', { class: 'grid' },
      sortHead([
        { label: '#', key: 'day' }, { label: 'Date', key: 'date' }, { label: 'Day', key: 'rung' },
        { label: 'Shape', key: 'shape' }, { label: 'Canuckle word', key: 'word' }, { label: 'Wheel', key: 'wheel' },
        { label: 'Words', key: 'words' }, { label: 'Bonus', key: 'bonus' }, { label: 'Fact', key: 'fact' },
        players ? { label: 'Solved by', key: 'solved' } : null,
      ].filter(Boolean), sort, (key) => { sort = nextSort(sort, key); rerender(); }),
      h('tbody', {}, rows.map((d) => h('tr', {
        class: d.day === t ? 'today' : d.day > t ? 'future' : '',
        tabIndex: 0,
        onclick: () => d.p && openDay(d, rerender),
        onkeydown: (e) => { if (e.key === 'Enter' && d.p) openDay(d, rerender); },
      },
      h('td', { class: 'num' }, String(d.day)),
      h('td', { class: 'nowrap' }, longDate(START_ED + d.day - 1)),
      h('td', {}, RUNGS[rungOf(d.day)]),
      h('td', {}, d.p?.shape || '—'),
      h('td', { class: 'answer' }, d.p ? h('b', {}, d.p.canuckle) : h('span', { class: 'err' }, 'unreadable')),
      h('td', { class: 'mono' }, d.p?.letters || ''),
      h('td', { class: 'num' }, d.p ? String(d.p.slots.length) : ''),
      h('td', { class: 'num' }, d.p ? String(d.p.bonus.length) : ''),
      h('td', { class: 'nowrap' },
        ownFact(d.day) ? h('span', { class: 'pill' }, 'Canagrams fact') : null,
        datedUnfixed(d) ? h('span', { class: 'flag', title: data.facts[d.p.canuckle] }, 'Date-bound?') : null),
      players ? h('td', { class: 'num' }, String(players.byDay.get(d.day) || 0)) : null)))));
}

export function renderCanagrams(root, rerender) {
  root.rerender = rerender;
  if (!data && !loading) {
    loading = true;
    load().then((v) => {
      data = v;
      loading = false;
      if (location.hash === '#canagrams') rerender();
    });
  }
  if (!data) {
    clear(root, h('p', { class: 'muted' }, 'Loading Canagrams puzzles…'));
    return;
  }
  if (data.error) {
    clear(root, h('p', { class: 'err' }, `Couldn't load the Canagrams puzzle files: ${data.error}`),
      h('button', { class: 'btn', onclick: () => { data = null; rerender(); } }, 'Retry'));
    return;
  }
  if (from == null) from = Math.max(1, todayIdx() - 7);

  const search = h('input', {
    type: 'search', placeholder: 'Find a Canuckle word, grid word or puzzle number', value: query,
    oninput: (e) => {
      query = e.target.value;
      rerender();
      const el = root.querySelector('input[type="search"]');
      el?.focus();
      el?.setSelectionRange(query.length, query.length);
    },
  });
  const paged = !query && filter === 'all' && !sort;
  const dated = data.days.filter(datedUnfixed).length;
  clear(root,
    summary(root),
    swapCard('canagrams', () => { data = null; rerender(); }),
    dated ? h('div', { class: 'banner warn' },
      `${dated} day${dated === 1 ? '' : 's'} still show a Canuckle fact that reads as tied to the day it first ran. `,
      h('a', { href: '#canagrams', onclick: (e) => { e.preventDefault(); filter = 'dated'; rerender(); } }, 'Show them')) : null,
    h('div', { class: 'toolbar' },
      search,
      h('select', { onchange: (e) => { filter = e.target.value; rerender(); } },
        [['all', 'All days'], ['dated', 'Date-bound fact, not yet fixed'], ['own', 'Has a Canagrams fact']]
          .map(([v, l]) => h('option', { value: v, selected: filter === v }, l))),
      h('button', { class: 'btn small', disabled: !paged || from <= 1, onclick: () => { from = Math.max(1, from - PAGE); rerender(); } }, '‹ Earlier'),
      h('button', { class: 'btn small', disabled: !paged, onclick: () => { from = Math.max(1, todayIdx() - 7); rerender(); } }, 'Today'),
      h('button', { class: 'btn small', disabled: !paged || from + PAGE > data.days.length, onclick: () => { from += PAGE; rerender(); } }, 'Later ›'),
      sort ? h('button', { class: 'btn small', onclick: () => { sort = null; rerender(); } }, 'Default order') : null,
      h('button', { class: 'btn small', onclick: () => { data = null; players = null; rerender(); } }, 'Refresh')),
    table(rerender),
    h('p', { class: 'muted small' }, 'Tap a day to see its board and edit its fun fact. Future days are greyed. Click a column heading to sort by it, again to reverse. Answers here are spoilers for players, not for you.'));
}
