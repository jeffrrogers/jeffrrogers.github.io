// Days left tab: how far each daily game's puzzles run past today, and
// Canoku's puzzle pool (importing one and turning it on).

import { h, clear, modal, toast, issues } from '../ui.js?v=202611121733';
import { GAMES, longDate, todayEpochDay, todayIndex } from '../dates.js?v=202611121733';
import { DAILY_GAMES, dailyIndex, dailyEd, daysInFile } from '../runway.js?v=202611121733';
import { GAME_SITES } from '../config.js?v=202611121733';
import {
  loadCanokuCount, importCanokuPool, setCanokuPool, compareCanokuPool, updateCanokuPool,
  loadArenaSwitches, setArenaSwitch,
} from '../store.js?v=202611121733';
import { SANDBOX_ONLY, LAUNCH_DATE as ADMIN_LAUNCH_DATE } from '../launch.js?v=202611121733';
import { parsePool, hasPool, lastFreshDay, docIdFor, poolDocs, poolDocReached } from '../canokuPool.js?v=202611121733';
import { maxIndex } from '../context.js?v=202611121733';

const RUNWAY_WARN_DAYS = 30;

// Canoku and the Flutter games, loaded once per page visit (Refresh reloads):
// {[gameId]: {last, note?} | {error}}, null while loading.
let other = null;
let loading = false;
// Canoku's puzzleCount doc as last loaded (store.js loadCanokuCount)
let canokuDoc = null;

async function fetchFile(path) {
  let lastError = null;
  for (const site of GAME_SITES) {
    try {
      const res = await fetch(site + path, { cache: 'no-store' });
      if (!res.ok) {
        lastError = new Error(`${res.status} from ${site}`);
        continue;
      }
      const last = daysInFile(await res.json());
      return { last, note: site === GAME_SITES[0] ? null : `From ${site}` };
    } catch (e) {
      lastError = e;
    }
  }
  throw lastError || new Error('Not found');
}

async function loadCanoku() {
  const r = await loadCanokuCount();
  if (r.count == null) throw new Error('canokuNewData/puzzleCount is missing');
  canokuDoc = r;
  const notes = [];
  if (!r.lastExists) notes.push(`Puzzle ${r.count} is missing, though puzzleCount is ${r.count}.`);
  if (r.nextExists) notes.push(`Puzzle ${r.count + 1} exists: raise puzzleCount to let players have it.`);
  if (r.poolEndsExist === false) {
    notes.push(`The pool's first or last puzzle (#${poolDocs(r.src).join(', #')}) is missing.`);
  }
  if (hasPool(r.src) && r.src.start !== r.prod.start) {
    notes.push(`The sandbox plays the pool from #${r.src.start}${hasPool(r.prod) ? `, production from #${r.prod.start}` : ''}.`);
  }
  // Production's runway: the pool's last day once it's on there
  return { last: lastFreshDay(r.prod), note: notes.join(' ') || null };
}

// The arena's production switches (arenaConfig/games), loaded with the rest
let switches = null; // {data, onProduction} | {error}

function loadOther() {
  loadArenaSwitches()
    .then((v) => { switches = v; })
    .catch((e) => { switches = { error: e.message }; });
  const jobs = Object.entries(DAILY_GAMES).map(async ([id, g]) => {
    try {
      return [id, await (id === 'canoku' ? loadCanoku() : fetchFile(g.file))];
    } catch (e) {
      return [id, { error: e.message }];
    }
  });
  return Promise.all(jobs).then(Object.fromEntries);
}

/** One table row's numbers: {today, last, lastEd, ahead, label, unit, step}. */
function canuckleRow(gameId) {
  const g = GAMES[gameId];
  const max = maxIndex(gameId);
  return {
    name: g.name,
    href: `#${gameId}`,
    todayLabel: g.label(todayIndex(gameId)),
    lastLabel: max == null ? null : g.label(max),
    lastEd: max == null ? null : g.edForIndex(max),
    ahead: max == null ? null : max - todayIndex(gameId),
    step: g.step,
    afterEnd: `Players get no new ${g.name}.`,
  };
}

function dailyRow(gameId, loaded) {
  const g = DAILY_GAMES[gameId];
  const today = dailyIndex(gameId, todayEpochDay());
  const row = { name: g.name, todayLabel: today == null ? '—' : `#${today}`, step: 1, afterEnd: g.afterEnd };
  if (!loaded) return { ...row, loading: true };
  if (loaded.error) return { ...row, error: loaded.error };
  return {
    ...row,
    lastLabel: `#${loaded.last}`,
    lastEd: dailyEd(gameId, loaded.last),
    ahead: today == null ? loaded.last : loaded.last - today,
    note: loaded.note,
  };
}

function aheadText(r) {
  if (r.ahead < 0) return 'Out';
  const days = r.ahead * r.step;
  if (r.step === 7) return `${r.ahead} week${r.ahead === 1 ? '' : 's'}`;
  return `${days} day${days === 1 ? '' : 's'}`;
}

function status(r) {
  if (r.loading) return h('span', { class: 'muted' }, 'Loading…');
  if (r.error) return h('span', { class: 'err' }, `Couldn't load: ${r.error}`);
  if (r.ahead == null) return h('span', { class: 'flag err' }, 'No puzzles');
  if (r.ahead < 0) {
    return [h('span', { class: 'flag err' }, `Ran out ${longDate(r.lastEd + r.step)}`), ' ', h('span', { class: 'muted small' }, r.afterEnd)];
  }
  if (r.ahead * r.step < RUNWAY_WARN_DAYS) return [h('span', { class: 'flag' }, 'Running low'), ' ', h('span', { class: 'muted small' }, `Then: ${r.afterEnd}`)];
  return h('span', { class: 'ok-note' }, 'OK');
}

export function renderRunway(root, rerender) {
  if (!other && !loading) {
    loading = true;
    loadOther().then((v) => {
      other = v;
      loading = false;
      if (location.hash === '#runway') rerender();
    });
  }

  const rows = [
    ...['canuckle', 'plus', 'duo'].map(canuckleRow),
    ...Object.keys(DAILY_GAMES).map((id) => dailyRow(id, other?.[id])),
  ];
  // Fewest days first; still-loading and failed rows last.
  const order = (r) => (r.ahead == null ? (r.loading || r.error ? Infinity : -Infinity) : r.ahead * r.step);
  rows.sort((a, b) => order(a) - order(b));

  clear(root,
    h('div', { class: 'toolbar' },
      h('p', { class: 'muted small' }, `Puzzles after today (${longDate(todayEpochDay())}), fewest first. Canuckle+ counts weeks.`),
      h('span', { class: 'spacer' }),
      h('button', { class: 'btn', disabled: loading, onclick: () => { other = null; rerender(); } }, 'Refresh')),
    h('div', { class: 'table-wrap' },
      h('table', { class: 'grid compact' },
        h('thead', {}, h('tr', {}, ['Game', 'Today', 'Last puzzle', 'Left', 'Status'].map((t) => h('th', {}, t)))),
        h('tbody', {}, rows.map((r) => h('tr', {},
          h('td', { class: 'nowrap' }, r.href ? h('a', { href: r.href }, r.name) : r.name),
          h('td', { class: 'num' }, r.todayLabel),
          h('td', { class: 'nowrap' }, r.lastLabel ? `${r.lastLabel} · ${longDate(r.lastEd)}` : '—',
            r.note ? h('div', { class: 'muted small' }, r.note) : null),
          h('td', { class: 'num' }, r.ahead == null ? '—' : h('b', {}, aheadText(r))),
          h('td', {}, status(r))))))),
    h('p', { class: 'muted small' },
      'Canuckle, Canuckle+ and Duo count the puzzles saved in Firestore. Canoku uses canokuNewData/puzzleCount and its pool (below). ',
      'Canolitaire, Canominoes, Canoggle, Canagrams, Canatiles, Canundrum and Canamaze read the puzzle files built into each game; a new batch counts once that game is deployed.'),
    canokuSection(rerender),
    sandboxOnlySection(rerender));
}

// ---- Canoku pool ------------------------------------------------------------

function poolText(src) {
  if (!hasPool(src)) return `none: days after #${src.count} loop through #336–#535`;
  const [first, last] = poolDocs(src);
  const days = `#${src.start}–#${lastFreshDay(src)} (${src.freshCount} days), then it loops`;
  return src.start === first ? days : `${days}; plays puzzles #${first}–#${last}`;
}

function canokuSection(rerender) {
  const r = canokuDoc;
  const today = dailyIndex('canoku', todayEpochDay());
  return h('section', { class: 'card' },
    h('h3', {}, 'Canoku puzzle pool'),
    r
      ? h('ul', { class: 'small' },
        h('li', {}, 'Production: ', poolText(r.prod)),
        h('li', {}, 'Sandbox: ', poolText(r.src),
          r.data.freshStartSandbox != null ? ' (freshStartSandbox)' : ''),
        today != null
          ? h('li', {}, `Today (#${today}) uses puzzle #${docIdFor(today, r.prod)} on production and #${docIdFor(today, r.src)} on the sandbox.`)
          : null)
      : h('p', { class: 'muted small' }, 'Loading…'),
    h('p', { class: 'muted small' },
      'Pools come from Canoku/tools/puzzle_gen (see its README). Importing only adds days that don\'t exist yet; players get them once the pool settings name them.'),
    h('div', { class: 'actions' },
      h('button', { class: 'btn', onclick: () => openPoolImport(rerender) }, 'Import or update pool file…'),
      h('button', { class: 'btn', disabled: !r, onclick: () => openPoolSettings(rerender) }, 'Pool settings…')));
}

async function openPoolImport(rerender) {
  const result = await modal('Import or update a Canoku pool', (close) => {
    const file = h('input', { type: 'file', accept: '.json,application/json' });
    const report = h('div');
    const go = h('button', { class: 'btn primary', disabled: true }, 'Import');
    let docs = {};
    let plan = null; // {add: [ids], update: [ids]}

    file.addEventListener('change', async () => {
      clear(report, h('p', { class: 'small muted' }, 'Checking every board…'));
      go.disabled = true;
      plan = null;
      try {
        const text = await file.files[0].text();
        // Let the message paint before the check holds the page
        await new Promise((res) => setTimeout(res, 30));
        const parsed = parsePool(JSON.parse(text));
        docs = parsed.docs;
        const count = canokuDoc?.count ?? 535;
        const errors = [];
        if (parsed.first != null && parsed.first <= count) errors.push(`The pool must start after #${count}.`);
        errors.push(...parsed.errors.slice(0, 20));
        if (parsed.errors.length > 20) errors.push(`…and ${parsed.errors.length - 20} more`);
        if (errors.length || !Object.keys(docs).length) {
          clear(report, h('p', {}, `${Object.keys(docs).length} days, #${parsed.first}–#${parsed.last}.`), issues({ errors }));
          return;
        }

        const status = h('p', { class: 'small muted' }, 'Comparing with Firestore…');
        clear(report, status);
        const cmp = await compareCanokuPool(docs, (done, total) => { status.textContent = `Comparing with Firestore… ${done} of ${total}`; });
        const today = dailyIndex('canoku', todayEpochDay()) ?? 0;
        const prod = canokuDoc?.prod, sand = canokuDoc?.src;
        const reachedProd = prod ? cmp.differ.filter((id) => poolDocReached(Number(id), prod, today)) : [];
        const reachedSand = sand ? cmp.differ.filter((id) => poolDocReached(Number(id), sand, today)) : [];
        const update = cmp.differ.filter((id) => !reachedProd.includes(id));
        plan = { add: cmp.missing, update };
        const list = (ids) => `#${ids.slice(0, 12).join(', #')}${ids.length > 12 ? ` …(${ids.length})` : ''}`;
        clear(report,
          h('ul', {},
            h('li', {}, `${Object.keys(docs).length} days, #${parsed.first}–#${parsed.last}. Every board has exactly one solution, matching its answer.`),
            h('li', {}, `${cmp.missing.length} new days will be added.`),
            h('li', {}, `${cmp.same.length} days are already there, the same (left alone).`),
            update.length ? h('li', {}, h('b', {}, `${update.length} days are already there with different boards and will be updated: `), list(update), '.') : null,
            reachedProd.length
              ? h('li', { class: 'err' }, `${reachedProd.length} differing days production players have already had are left alone: ${list(reachedProd)}.`)
              : null,
            reachedSand.length
              ? h('li', { class: 'warn' }, `${reachedSand.length} of the updated days are ones the sandbox has already shown (freshStartSandbox); sandbox boards for them will change.`)
              : null));
        go.textContent = update.length
          ? `Add ${cmp.missing.length} and update ${update.length}`
          : `Add ${cmp.missing.length} new days`;
        go.disabled = !cmp.missing.length && !update.length;
      } catch (e) {
        clear(report, issues({ errors: [`Couldn't read that file: ${e.message}`] }));
      }
    });

    go.addEventListener('click', async () => {
      if (!plan) return;
      if (plan.update.length && !confirm(`Replace the boards of ${plan.update.length} Canoku days in Firestore? Each batch is logged and can be restored from the Log tab.`)) return;
      go.disabled = true;
      file.disabled = true;
      const progress = h('p', { class: 'small' });
      report.append(progress);
      try {
        let written = 0;
        if (plan.add.length) {
          const added = Object.fromEntries(plan.add.map((id) => [id, docs[id]]));
          const r = await importCanokuPool(added, (done, total) => { progress.textContent = `Added ${done} of ${total}…`; });
          written = r.written;
        }
        if (plan.update.length) {
          await updateCanokuPool(docs, plan.update, (done, total) => { progress.textContent = `Updated ${done} of ${total}…`; });
        }
        close({ written, updated: plan.update.length });
      } catch (e) {
        toast(`Stopped: ${e.message}`, { error: true });
        go.disabled = false;
        file.disabled = false;
      }
    });

    return h('div', {},
      h('p', {}, 'Choose a pool file from Canoku/tools/puzzle_gen/data (pool_<first>_<last>.json). New days are added. Days already there with different boards are updated, but never ones production players have already had.'),
      file, report,
      h('div', { class: 'actions' }, h('button', { class: 'btn', onclick: () => close() }, 'Cancel'), go));
  }, { wide: true });

  if (result) {
    toast(`Canoku pool: ${result.written} days added, ${result.updated} updated.`);
    other = null;
    rerender();
  }
}

async function openPoolSettings(rerender) {
  const data = canokuDoc.data;
  const changed = await modal('Canoku pool settings', (close) => {
    const field = (label, value, hint) => {
      const input = h('input', { type: 'number', min: '1', value: value ?? '' });
      return [input, h('p', { class: 'small' }, h('label', {}, h('b', {}, label), ' ', input), h('span', { class: 'muted' }, ` ${hint}`))];
    };
    const [start, startRow] = field('freshStart', data.freshStart,
      'The pool\'s first puzzle, and the day production starts on it. Empty turns the pool off.');
    const [count, countRow] = field('freshCount', data.freshCount, 'Days in the pool.');
    const [sandbox, sandboxRow] = field('freshStartSandbox', data.freshStartSandbox,
      'Sandbox only: the day it starts on the pool, from its first puzzle. Set it to a recent day to test the pool in the sandbox\'s archive. Empty = same as production.');
    const msg = h('div');
    const save = h('button', { class: 'btn primary' }, 'Save');
    const num = (el) => (el.value.trim() === '' ? null : Number(el.value));

    save.addEventListener('click', async () => {
      const fields = { freshStart: num(start), freshCount: num(count), freshStartSandbox: num(sandbox) };
      const errors = [];
      for (const [k, v] of Object.entries(fields)) if (v != null && !Number.isInteger(v)) errors.push(`${k} must be a whole number.`);
      if ((fields.freshStart != null || fields.freshStartSandbox != null) && !(fields.freshCount > 0)) errors.push('Set freshCount too.');
      if (fields.freshStartSandbox != null && fields.freshStart == null) errors.push('freshStartSandbox needs freshStart: the pool starts at that puzzle.');
      for (const k of ['freshStart', 'freshStartSandbox']) {
        if (fields[k] != null && fields[k] <= data.count) errors.push(`${k} must be after #${data.count}.`);
      }
      const today = dailyIndex('canoku', todayEpochDay());
      if (fields.freshStart != null && fields.freshStart !== (data.freshStart ?? null) && today != null && fields.freshStart <= today) {
        errors.push(`freshStart #${fields.freshStart} isn't in the future, so it would change puzzles players already have (today is #${today}).`);
      }
      // Once a pool has run out it loops, and a new freshCount would change
      // the days already looped. Extend it (next pool) before then.
      const end = Number.isInteger(data.freshStart) && Number.isInteger(data.freshCount)
        ? data.freshStart + data.freshCount : null;
      if (end != null && today != null && today >= end && fields.freshCount !== data.freshCount) {
        errors.push(`The pool ran out at #${end - 1} and has looped since #${end}, so a new freshCount would change puzzles players already had. Pools must be extended before they run out.`);
      }
      clear(msg, errors.length ? issues({ errors }) : null);
      if (errors.length) return;
      const ask = fields.freshStart !== (data.freshStart ?? null)
        ? `Production players will get the pool from #${fields.freshStart ?? '— (off)'}. Only Canoku 3.1.0 and later read it. Continue?`
        : 'Save the pool settings?';
      if (!confirm(ask)) return;
      save.disabled = true;
      try {
        await setCanokuPool(fields, data,
          `freshStart ${fields.freshStart ?? '—'}, freshCount ${fields.freshCount ?? '—'}, sandbox ${fields.freshStartSandbox ?? '—'}`);
        close(true);
      } catch (e) {
        clear(msg, issues({ errors: [e.message] }));
        save.disabled = false;
      }
    });

    return h('div', {},
      h('p', { class: 'small' },
        `Days up to puzzleCount (#${data.count}) keep their puzzles. Days from freshStart use the pool docs (named after their day) and loop through the pool after its last day. The days between loop through #336–#535 as before. Saved to canokuNewData/puzzleCount and restorable from the Log tab.`),
      startRow, countRow, sandboxRow, msg,
      h('div', { class: 'actions' }, h('button', { class: 'btn', onclick: () => close() }, 'Cancel'), save));
  });
  if (changed) {
    toast('Canoku pool settings saved.');
    other = null;
    rerender();
  }
}

// ---- Sandbox-only games -------------------------------------------------------

const PRODUCTION_SITE = 'https://www.canucklegame.ca/';

const isoOf = ([y, m, d]) => `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

/** Whether [gameId]'s puzzle file is served on canucklegame.ca (it's deployed). */
async function onProductionSite(gameId) {
  const file = DAILY_GAMES[gameId]?.file;
  if (!file) return false;
  try {
    const res = await fetch(PRODUCTION_SITE + file, { cache: 'no-store' });
    return res.ok;
  } catch {
    return false;
  }
}

function sandboxOnlySection(rerender) {
  const sw = switches;
  const rows = SANDBOX_ONLY.map((id) => {
    const name = DAILY_GAMES[id]?.name ?? id;
    const date = ADMIN_LAUNCH_DATE[id] ? isoOf(ADMIN_LAUNCH_DATE[id]) : '—';
    const on = sw?.onProduction?.[id] === true;
    return h('tr', {},
      h('td', { class: 'nowrap' }, name),
      h('td', { class: 'nowrap' }, date),
      h('td', {}, !sw || sw.error ? '—' : on ? h('span', { class: 'ok-note' }, 'On production') : h('span', { class: 'muted' }, 'Sandbox only')),
      h('td', {}, !sw || sw.error ? null : h('button', {
        class: 'btn small',
        onclick: () => (on ? takeOff(id, name, rerender) : putOn(id, name, date, rerender)),
      }, on ? 'Take off production…' : 'Put on production…')));
  });
  return h('section', { class: 'card' },
    h('h3', {}, 'Sandbox-only games'),
    h('p', { class: 'muted small' },
      'The sandbox shows every game. Production hides these until their switch is on (Firestore arenaConfig/games), ',
      'then shows each from its launch date, which only changes in code (the game numbers its puzzles from it). ',
      'Deploy the game to canucklegame.ca first: the switch checks it is there.'),
    sw?.error ? h('p', { class: 'err small' }, `Couldn't load the switches: ${sw.error}`) : null,
    !sw ? h('p', { class: 'muted small' }, 'Loading…') : null,
    h('div', { class: 'table-wrap' },
      h('table', { class: 'grid compact' },
        h('thead', {}, h('tr', {}, ['Game', 'Launch date', 'Production', ''].map((t) => h('th', {}, t)))),
        h('tbody', {}, rows))));
}

async function putOn(id, name, date, rerender) {
  if (!(await onProductionSite(id))) {
    toast(`${name} isn't on canucklegame.ca yet (no ${DAILY_GAMES[id].file}). Deploy it first.`, { error: true });
    return;
  }
  if (!confirm(`Show ${name} on production? It is deployed on canucklegame.ca. Players see it in the Arena from ${date}, its puzzle #1.`)) return;
  try {
    await setArenaSwitch(id, true, switches.data, `${name} on production`);
    toast(`${name} is on production (from ${date}).`);
  } catch (e) {
    toast(e.message, { error: true });
  }
  other = null;
  rerender();
}

async function takeOff(id, name, rerender) {
  if (!confirm(`Take ${name} off production? The Arena stops showing it there; players' saves and stats stay, and it can be switched back on.`)) return;
  try {
    await setArenaSwitch(id, false, switches.data, `${name} off production`);
    toast(`${name} is sandbox only again.`);
  } catch (e) {
    toast(e.message, { error: true });
  }
  other = null;
  rerender();
}

