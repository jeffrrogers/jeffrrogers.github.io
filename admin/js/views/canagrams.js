// Canagrams tab: the shipped puzzle calendar, read back out of the game's own
// files, each day's fun fact, and an optional summary of every player's stats.
//
// Canagrams' puzzles are built offline and shipped inside the game
// (canagramsSourceCode/tools/generate_dailies.dart): to change or extend the
// calendar, regenerate it in the game project. What CAN be edited here is the
// fun fact. Each day shows the Canuckle fact for its Canuckle word, copied from
// the recap without the date it ran, so a fact like "Today is Election Day!" is
// wrong on Canagrams. Giving a day its own fact writes canagramsGameData/{day};
// the game shows that instead, and the Canuckle fact otherwise.

import { h, clear, modal, toast, issues, safeHref } from '../ui.js?v=202610222250';
import { GAME_SITES } from '../config.js?v=202610222250';
import { longDate, todayEpochDay } from '../dates.js?v=202610222250';
import { sdk } from '../firebase.js?v=202610222250';
import { launchEd } from '../launch.js?v=202610222250';
import {
  RUNGS, unpackCanagrams, gridRows, rungOf, summarizePlayers,
} from '../canagrams.js?v=202610222250';
import {
  segmentsToText, textToSegments, canagramsFactOf, canagramsFactToSave, looksDateBound,
} from '../facts.js?v=202610222250';
import { loadCanagramsFacts, saveCanagramsFact } from '../store.js?v=202610222250';
import { factCard, previewFrame } from '../preview.js?v=202610222250';

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

const todayIdx = () => todayEpochDay() - START_ED + 1;

async function fetchJson(site, path) {
  const res = await fetch(site + DATA + path, { cache: 'no-store' });
  if (!res.ok) throw new Error(`${res.status} for ${path} on ${site}`);
  return res.json();
}

async function load() {
  let lastError = null;
  for (const site of GAME_SITES) {
    try {
      const index = await fetchJson(site, 'dailies_index.json');
      const shardCount = Math.ceil(index.days / index.shard);
      const shards = await Promise.all(Array.from({ length: shardCount }, (_, s) =>
        fetchJson(site, `dailies_${String(s).padStart(3, '0')}.json`)));
      const days = [];
      for (const shard of shards) {
        (shard.d || []).forEach((line, k) => days.push({ day: shard.start + k, p: unpackCanagrams(line) }));
      }
      let facts = {};
      try {
        facts = await fetchJson(site, 'canuckle_facts.json');
      } catch {
        // Facts are a nicety here.
      }
      let own = new Map();
      let ownError = null;
      try {
        own = await loadCanagramsFacts();
      } catch (e) {
        ownError = e.message;
      }
      return { site, days, facts, own, ownError };
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
      h('p', { class: 'muted small' }, `Read from ${data.site === '/' ? 'this site' : data.site}. `,
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
          h('div', { class: 'actions' }, h('button', { class: 'btn', onclick: () => close(false) }, 'Cancel'), save)),
        pv.el),
      h('pre', { class: 'mono', style: 'line-height:1.25;font-size:15px' }, gridRows(p).join('\n')),
      h('p', {}, h('b', {}, `Grid (${p.slots.length}): `), p.slots.map((s) => s.word).join(', ')),
      h('p', { class: 'muted small' }, h('b', {}, `Bonus (${p.bonus.length}): `), p.bonus.join(', ')),
      canuckleText ? h('p', { class: 'muted small' }, h('b', {}, 'Canuckle fact: '), factNodes(canuckleText)) : null,
    ];
  }, { wide: true });

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
  const rows = q || filter !== 'all'
    ? data.days.filter((d) => d.p && keep(d)
      && (!q || d.p.canuckle.includes(q) || d.p.slots.some((s) => s.word === q) || String(d.day) === q))
    : data.days.slice(Math.max(0, from - 1), from - 1 + PAGE);
  return h('div', { class: 'table-wrap' },
    h('table', { class: 'grid' },
      h('thead', {}, h('tr', {}, ['#', 'Date', 'Day', 'Shape', 'Canuckle word', 'Wheel', 'Words', 'Bonus', 'Fact', players ? 'Solved by' : null]
        .filter(Boolean).map((x) => h('th', {}, x)))),
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
  const paged = !query && filter === 'all';
  const dated = data.days.filter(datedUnfixed).length;
  clear(root,
    summary(root),
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
      h('button', { class: 'btn small', onclick: () => { data = null; players = null; rerender(); } }, 'Refresh')),
    table(rerender),
    h('p', { class: 'muted small' }, 'Tap a day to see its board and edit its fun fact. Future days are greyed. Answers here are spoilers for players, not for you.'));
}
