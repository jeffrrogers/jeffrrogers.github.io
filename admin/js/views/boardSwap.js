// The featured-word swap for Canoggle and Canagrams, shared by their tabs:
// the "Change featured word" dialog, and the card that connects the Arena
// folder and promotes swaps to production. See featuredSwap.js for what a swap
// does and swapFlow.js for the files it writes.

import { h, clear, modal, toast, issues } from '../ui.js?v=202611100036';
import { longDate, swapLockedThrough } from '../dates.js?v=202611100036';
import { launchEd } from '../launch.js?v=202611100036';
import { ctx } from '../context.js?v=202611100036';
import {
  SWAP_GAMES, boardLabel, planBoardSwap, buildChanges, factFromRuns, requiredCheck, withAllowed,
  planDayTrade, dayTradeCandidates,
} from '../featuredSwap.js?v=202611100036';
import { buildBoard, wordStatus } from '../gen.js?v=202611100036';
import { hasFolderAccess, arenaFolder, connectArenaFolder } from '../localFiles.js?v=202611100036';
import {
  loadLocal, applySwap, pendingSwaps, promote, swapPaths, readAllowlist, addToAllowlist,
} from '../swapFlow.js?v=202611100036';

// Production's dates: the lock and the spoiler check are about real players.
const startEd = (game) => launchEd(game, 0);
const edOf = (game, day) => startEd(game) + day - 1;

// Canuckle and Canuckle+ answers alike can be featured: a Canuckle+ word
// (six or seven letters, weekly) has run, and has a fact, just as a daily one.
const answerPuzzles = () => [...ctx.puzzles.canuckle.values(), ...ctx.puzzles.plus.values()];

/** WORD -> the earliest epoch day Canuckle or Canuckle+ ran it, from the loaded puzzles. */
function canuckleRuns() {
  const out = new Map();
  for (const p of answerPuzzles()) {
    if (!p.answer) continue;
    const prev = out.get(p.answer);
    if (prev == null || p.ed < prev) out.set(p.answer, p.ed);
  }
  return out;
}

/** The fact for WORD in the game's shipped form, from its latest run (Canuckle or Canuckle+) with one. */
function canuckleFactFor(word) {
  const runs = answerPuzzles()
    .filter((p) => p.answer === word && (p.fact || []).join('').trim())
    .sort((a, b) => b.ed - a.ed);
  return runs.length ? factFromRuns(runs[0].fact, runs[0].factUrls) : null;
}

/**
 * The card above a game's calendar: whether the Arena folder is connected
 * (needed to swap), and the swaps not yet in production with Promote.
 */
export function swapCard(game, onChange) {
  const g = SWAP_GAMES[game];
  const body = h('div');
  const card = h('div', { class: 'card' }, h('h3', {}, 'Featured-word swaps'), body);
  const paint = async () => {
    if (!hasFolderAccess()) {
      clear(body, h('p', { class: 'muted small' }, 'Swapping a featured word writes the game’s puzzle files on this computer, which needs Chrome or Edge.'));
      return;
    }
    const folder = await arenaFolder();
    if (!folder) {
      clear(body,
        h('p', { class: 'small' }, 'To change a board’s featured word, connect the Arena folder on this computer (the one holding gamesHub, ',
          g.source, ' and CanuckleIO). The calendar is then read from the game project, so swaps you haven’t pushed yet show here too.'),
        h('button', {
          class: 'btn',
          onclick: async () => {
            try {
              await connectArenaFolder();
              onChange();
            } catch (e) {
              if (e?.name !== 'AbortError') toast(e.message, { error: true });
            }
          },
        }, 'Connect Arena folder…'));
      return;
    }
    let pending = [];
    try {
      pending = await pendingSwaps(game);
    } catch (e) {
      clear(body, h('p', { class: 'err' }, `Couldn't read ${swapPaths(game).pending}: ${e.message}`));
      return;
    }
    const go = h('button', { class: 'btn primary', disabled: !pending.length }, 'Promote to production');
    go.addEventListener('click', async () => {
      if (!confirm(`Copy ${g.name}'s swapped puzzle files from the sandbox into canuckleSite? You then commit and push canuckleSite yourself.`)) return;
      go.disabled = true;
      try {
        const lock = swapLockedThrough(game);
        const files = await promote(game, (list) => {
          const live = list.flatMap((s) => s.days || []).filter((d) => lock != null && d <= lock);
          return live.length ? `Day ${live.join(', ')} went live since the swap; production must not change it now.` : null;
        });
        toast(`Promoted ${files.length} file${files.length === 1 ? '' : 's'} to canuckleSite. Commit and push it to publish.`);
        onChange();
      } catch (e) {
        toast(`Not promoted: ${e.message}`, { error: true });
        go.disabled = false;
      }
    });
    clear(body,
      h('p', { class: 'muted small' }, 'Calendar read from your Arena folder (', swapPaths(game).source, '). Swaps write there and to the sandbox site; push ',
        'CanuckleIO to put them on the sandbox.'),
      pending.length
        ? [h('p', {}, h('b', {}, `Not yet in production (${pending.length})`)),
          h('ul', { class: 'small' }, pending.map((s) => h('li', {}, s.note, h('span', { class: 'muted' }, ` · ${new Date(s.at).toLocaleString()}`))))]
        : h('p', { class: 'muted small' }, 'Every swap is in production (or none made yet).'),
      h('div', { class: 'actions left' }, go));
  };
  paint();
  return card;
}

/**
 * Opens the swap dialog for board [b] ({day, kind, word}).
 * @param opts.unpack   line -> puzzle (the tab's decoder)
 * @param opts.preview  puzzle -> nodes showing the board
 * @param opts.factsOf  {collection, read, write} for per-board Firestore facts
 * @returns true when a swap was written
 */
export async function openBoardSwap(game, b, { unpack, preview, factsOf }) {
  const g = SWAP_GAMES[game];
  if (!(await arenaFolder())) {
    toast('Connect the Arena folder first (the Featured-word swaps card).', { error: true });
    return false;
  }
  let local;
  try {
    local = await loadLocal(game, unpack);
  } catch (e) {
    toast(`Couldn't read ${g.name}'s files: ${e.message}`, { error: true });
    return false;
  }
  const runs = canuckleRuns();
  const playedBefore = (word, day) => (runs.get(word) ?? Infinity) < edOf(game, day);
  const lockedThrough = swapLockedThrough(game);
  const here = boardLabel(game, b.day, b.kind);
  // Trading whole puzzles with another day rebuilds nothing (featuredSwap.js
  // planDayTrade). Canagrams' puzzle and Canoggle's Daily are built for their
  // weekday, so they trade with the same weekday (any Saturday, whatever its
  // board size). The Mini is the same 3x3 every day, so it trades with any day.
  const canTrade = true;
  const anyDay = b.kind === 'm';
  const weekdayOf = anyDay ? () => 0 : (day) => new Date(edOf(game, day) * 86400000).getUTCDay();
  const tradeOpts = { weekdayOf, lockedThrough, playedBefore };
  const weekdayName = new Date(edOf(game, b.day) * 86400000).toLocaleDateString('en-CA', { weekday: 'long', timeZone: 'UTC' });
  const tradeWith = anyDay ? 'another day' : `another ${weekdayName}`;

  return modal(`Change featured word · ${g.name} ${here} · ${longDate(edOf(game, b.day))}`, (close) => {
    // Canuckle answers already run before this day, for the word box.
    const listId = `swap-words-${game}`;
    const options = h('datalist', { id: listId },
      [...runs.entries()].filter(([, ed]) => ed < edOf(game, b.day)).map(([w]) => w).sort().map((w) => h('option', { value: w })));
    const word = h('input', { type: 'search', list: listId, placeholder: 'New featured word', autocomplete: 'off' });
    const sourceSel = h('select');
    const sourceField = h('label', { class: 'field', hidden: true }, h('span', {}, 'Take it from'), sourceSel);
    const planBox = h('div');
    const previewBox = h('div');
    const build = h('button', { class: 'btn', disabled: true }, 'Build boards');
    const apply = h('button', { class: 'btn primary', disabled: true }, 'Apply');
    let plan = null;
    let built = null;
    // The allowlist the boards were built with, and the word to add to it on Apply (or null).
    let allow = null;
    // 'trade': swap whole puzzles with another day of the same weekday, nothing
    // rebuilt; 'word': feature any word, rebuilding the boards involved.
    let mode = canTrade ? 'trade' : 'word';
    let tradeDay = null;

    function showPlan(p, { after = (c) => c.forced || 'drawn as usual' } = {}) {
      clear(planBox,
        p.changes.length ? h('div', { class: 'table-wrap' },
          h('table', { class: 'grid' },
            h('thead', {}, h('tr', {}, ['Board', 'Date', 'Now', 'After', ''].map((x) => h('th', {}, x)))),
            h('tbody', {}, p.changes.map((c) => h('tr', {},
              h('td', { class: 'num' }, boardLabel(game, c.day, c.kind)),
              h('td', { class: 'nowrap' }, longDate(edOf(game, c.day))),
              h('td', { class: 'answer' }, c.isNew ? '(new day)' : local.cal.boards.get(`${c.day}${c.kind}`)?.word || '?'),
              h('td', { class: 'answer' }, after(c)),
              h('td', { class: 'small muted' }, c.why)))))) : null,
        issues(p));
    }

    function previews(list) {
      return list.map((x) => {
        const p = unpack(x.line);
        return h('div', { class: 'card' },
          h('h3', {}, `${boardLabel(game, x.day, x.kind)}: ${x.word}`),
          p ? preview(p) : h('p', { class: 'err' }, 'Unreadable board'));
      });
    }

    function replan() {
      built = null;
      allow = null;
      apply.disabled = true;
      clear(previewBox);
      if (mode === 'trade') {
        build.hidden = true;
        if (tradeDay == null) {
          clear(planBox);
          return;
        }
        plan = planDayTrade(local.cal, b, tradeDay, tradeOpts);
        showPlan(plan);
        if (!plan.errors.length) {
          built = plan.built;
          clear(previewBox, previews([...built.values()]));
          apply.disabled = false;
        }
        return;
      }
      build.hidden = false;
      const W = word.value.trim().toUpperCase();
      if (!W) {
        clear(planBox);
        build.disabled = true;
        return;
      }
      plan = planBoardSwap(local.cal, b, W, { lockedThrough, playedBefore, source: sourceSel.value || undefined });
      // Where the word could come from, when it is on more than one board.
      const open = plan.occurrences.filter((o) => !o.locked);
      sourceField.hidden = !open.length;
      if (open.length && sourceSel.dataset.word !== W) {
        sourceSel.dataset.word = W;
        clear(sourceSel,
          open.map((o) => h('option', { value: o.key, selected: o.key === plan.source }, `${boardLabel(game, o.day, o.kind)} · ${longDate(edOf(game, o.day))}`)),
          h('option', { value: 'append', selected: plan.source === 'append' }, 'Nowhere: give the old word a new day at the end'));
      }
      showPlan(plan);
      build.disabled = plan.errors.length > 0 || !plan.changes.length;
    }
    word.addEventListener('input', () => { sourceSel.dataset.word = ''; sourceSel.value = ''; replan(); });
    sourceSel.addEventListener('change', replan);

    // The same-weekday days to trade with: every unplayed one, and why a day can't, if it can't.
    const tradeList = canTrade ? h('div', { class: 'table-wrap' },
      h('table', { class: 'grid' },
        h('thead', {}, h('tr', {}, ['', 'Board', 'Date', 'Features', ''].map((x) => h('th', {}, x)))),
        h('tbody', {}, dayTradeCandidates(local.cal, b, tradeOpts).map((c) => {
          const radio = h('input', {
            type: 'radio', name: `trade-${game}`, disabled: !!c.why,
            onchange: () => { tradeDay = c.day; replan(); },
          });
          return h('tr', { class: c.why ? 'muted' : '' },
            h('td', {}, radio),
            h('td', { class: 'num' }, boardLabel(game, c.day, c.kind)),
            h('td', { class: 'nowrap' }, longDate(edOf(game, c.day))),
            h('td', { class: 'answer' }, c.word || '?'),
            h('td', { class: 'small muted' }, c.why || ''));
        })))) : null;
    const tradeSection = h('div', {},
      h('p', {}, anyDay
        ? `Trade ${here}'s whole puzzle with another day's Mini. Each moves to the other's day as it is: every Mini is the same size, so nothing is rebuilt.`
        : `Trade ${here}'s whole puzzle with another ${weekdayName}'s. Each puzzle moves to the other's day as it is: same difficulty, nothing rebuilt.`),
      tradeList);
    const wordSection = h('div', { hidden: mode !== 'word' });
    const modeSwitch = canTrade ? h('div', { class: 'row' }, [
      ['trade', `Trade with ${tradeWith}`],
      ['word', 'Feature a different word'],
    ].map(([v, l]) => h('label', {},
      h('input', {
        type: 'radio', name: `swap-mode-${game}`, checked: mode === v,
        onchange: () => {
          mode = v;
          tradeSection.hidden = v !== 'trade';
          wordSection.hidden = v !== 'word';
          replan();
        },
      }), ` ${l}`))) : null;

    build.addEventListener('click', async () => {
      build.disabled = true;
      word.disabled = true;
      clear(previewBox, h('p', { class: 'muted' }, 'Building boards… (the first takes a few seconds to load the dictionary)'));
      try {
        // Built with the Arena folder's allowlist, as the command line builds,
        // plus the new word if it has to be made required first.
        const W = plan.changes[0].forced;
        const text = await readAllowlist(game);
        let files = { 'allowlist.txt': text };
        const status = await wordStatus(game, { word: W, day: b.day }, files);
        if (status.error) throw new Error(status.error);
        const check = requiredCheck(game, W, status);
        if (check.block) {
          clear(previewBox, issues({ errors: [check.block] }));
          return;
        }
        if (check.ask && !confirm(check.ask)) {
          clear(previewBox);
          return;
        }
        if (check.add) files = { 'allowlist.txt': withAllowed(text, W) };
        allow = { text, word: check.add ? W : null };
        if (check.add) {
          clear(previewBox, h('p', { class: 'muted' }, `Building boards with ${W} as a required word…`));
        }
        const r = await buildChanges(local.cal, plan.changes, (req) => buildBoard(game, req, files));
        if (r.errors.length) {
          clear(previewBox, issues({ errors: r.errors }));
          return;
        }
        built = r.built;
        clear(previewBox,
          allow.word ? h('p', { class: 'warn small' }, `Apply also adds ${allow.word} to the required words (tools/data/allowlist.txt and the admin's copy).`) : null,
          previews([...built.values()]));
        apply.disabled = false;
      } catch (e) {
        clear(previewBox, issues({ errors: [`The generator didn't run: ${e.message}`] }));
      } finally {
        word.disabled = false;
        build.disabled = false;
      }
    });

    apply.addEventListener('click', async () => {
      apply.disabled = true;
      build.disabled = true;
      const t = plan.changes.find((c) => c.day === b.day && c.kind === b.kind);
      const note = mode === 'trade'
        ? `${g.name} ${here} ⇄ ${boardLabel(game, tradeDay, b.kind)}: traded puzzles (${b.word} ⇄ ${t.forced})`
        : `${g.name} ${here}: ${local.cal.boards.get(`${t.day}${t.kind}`)?.word} → ${t.forced}`
          + (allow?.word ? ` (${allow.word} added to allowlist.txt)` : '');
      let undoAllow = null;
      try {
        // The allowlist first: a recorded override the command line can't build is worse than a spare allowlist word.
        if (mode === 'trade') {
          // Nothing built, so no word lists involved.
        } else if (allow?.word) undoAllow = await addToAllowlist(game, allow.word, allow.text);
        else if ((await readAllowlist(game)) !== allow?.text) throw new Error(`${swapPaths(game).allowlist} changed since the boards were built. Build them again.`);
        const r = await applySwap(game, local, plan, built, {
          factFor: canuckleFactFor,
          factsOf,
          note,
        });
        toast(`Swapped. Wrote ${[...r.written, ...(allow?.word ? ['allowlist.txt'] : [])].join(', ')} to the game and the sandbox; push CanuckleIO to publish on the sandbox.`);
        close(true);
      } catch (e) {
        if (undoAllow) await undoAllow().catch(() => {});
        toast(`Not swapped: ${e.message}`, { error: true });
        apply.disabled = false;
        build.disabled = false;
      }
    });

    wordSection.append(
      h('p', {}, 'Pick the Canuckle word to feature instead -- any word, including one scheduled on another weekday. Its board takes ',
        h('b', {}, b.word || 'the old word'),
        ', and both boards are built again for their new day and difficulty. A word featured nowhere sends ',
        b.word || 'the old word', ' to a new day at the end of the calendar.'),
      g.kinds.length > 1 ? h('p', { class: 'muted small' }, 'The two boards on a day must feature different words.') : null,
      h('label', { class: 'field' }, h('span', {}, 'New featured word'), word), options,
      sourceField);
    if (mode !== 'trade') tradeSection.hidden = true;

    replan();
    return h('div', {},
      h('p', {}, `${here} features `, h('b', {}, b.word || '?'), '.'),
      modeSwitch,
      canTrade ? tradeSection : null,
      wordSection,
      planBox,
      previewBox,
      h('div', { class: 'actions' }, h('button', { class: 'btn', onclick: () => close(false) }, 'Cancel'), build, apply));
  }, { wide: true });
}

