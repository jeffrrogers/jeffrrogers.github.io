// The featured-word swap for Canoggle and Canagrams, shared by their tabs:
// the "Change featured word" dialog, and the card that connects the Arena
// folder and promotes swaps to production. See featuredSwap.js for what a swap
// does and swapFlow.js for the files it writes.

import { h, clear, modal, toast, issues } from '../ui.js?v=202610262044';
import { longDate, swapLockedThrough } from '../dates.js?v=202610262044';
import { launchEd } from '../launch.js?v=202610262044';
import { ctx } from '../context.js?v=202610262044';
import {
  SWAP_GAMES, boardLabel, planBoardSwap, buildChanges, factFromRuns,
} from '../featuredSwap.js?v=202610262044';
import { buildBoard } from '../gen.js?v=202610262044';
import { hasFolderAccess, arenaFolder, connectArenaFolder } from '../localFiles.js?v=202610262044';
import { loadLocal, applySwap, pendingSwaps, promote, swapPaths } from '../swapFlow.js?v=202610262044';

// Production's dates: the lock and the spoiler check are about real players.
const startEd = (game) => launchEd(game, 0);
const edOf = (game, day) => startEd(game) + day - 1;

/** WORD -> the earliest epoch day Canuckle ran it, from the loaded Canuckle puzzles. */
function canuckleRuns() {
  const out = new Map();
  for (const p of ctx.puzzles.canuckle.values()) {
    if (!p.answer) continue;
    const prev = out.get(p.answer);
    if (prev == null || p.ed < prev) out.set(p.answer, p.ed);
  }
  return out;
}

/** Canuckle's fact for WORD in the game's shipped form, from its latest run with one. */
function canuckleFactFor(word) {
  const runs = [...ctx.puzzles.canuckle.values()]
    .filter((p) => p.answer === word && (p.fact || []).join('').trim())
    .sort((a, b) => b.index - a.index);
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

    function replan() {
      built = null;
      apply.disabled = true;
      clear(previewBox);
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
      clear(planBox,
        plan.changes.length ? h('div', { class: 'table-wrap' },
          h('table', { class: 'grid' },
            h('thead', {}, h('tr', {}, ['Board', 'Date', 'Now', 'After', ''].map((x) => h('th', {}, x)))),
            h('tbody', {}, plan.changes.map((c) => h('tr', {},
              h('td', { class: 'num' }, boardLabel(game, c.day, c.kind)),
              h('td', { class: 'nowrap' }, longDate(edOf(game, c.day))),
              h('td', { class: 'answer' }, c.isNew ? '(new day)' : local.cal.boards.get(`${c.day}${c.kind}`)?.word || '?'),
              h('td', { class: 'answer' }, c.forced || 'drawn as usual'),
              h('td', { class: 'small muted' }, c.why)))))) : null,
        issues(plan));
      build.disabled = plan.errors.length > 0 || !plan.changes.length;
    }
    word.addEventListener('input', () => { sourceSel.dataset.word = ''; sourceSel.value = ''; replan(); });
    sourceSel.addEventListener('change', replan);

    build.addEventListener('click', async () => {
      build.disabled = true;
      word.disabled = true;
      clear(previewBox, h('p', { class: 'muted' }, 'Building boards… (the first takes a few seconds to load the dictionary)'));
      try {
        const r = await buildChanges(local.cal, plan.changes, (req) => buildBoard(game, req));
        if (r.errors.length) {
          clear(previewBox, issues({ errors: r.errors }));
          return;
        }
        built = r.built;
        clear(previewBox, [...built.values()].map((x) => {
          const p = unpack(x.line);
          return h('div', { class: 'card' },
            h('h3', {}, `${boardLabel(game, x.day, x.kind)}: ${x.word}`),
            p ? preview(p) : h('p', { class: 'err' }, 'Unreadable board'));
        }));
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
      const t = plan.changes[0];
      const note = `${g.name} ${here}: ${local.cal.boards.get(`${t.day}${t.kind}`)?.word} → ${t.forced}`;
      try {
        const r = await applySwap(game, local, plan, built, {
          factFor: canuckleFactFor,
          factsOf,
          note,
        });
        toast(`Swapped. Wrote ${r.written.join(', ')} to the game and the sandbox; push CanuckleIO to publish on the sandbox.`);
        close(true);
      } catch (e) {
        toast(`Not swapped: ${e.message}`, { error: true });
        apply.disabled = false;
        build.disabled = false;
      }
    });

    replan();
    return h('div', {},
      h('p', {}, `${here} features `, h('b', {}, b.word || '?'),
        '. Pick the Canuckle word to feature instead. Its board takes ', h('b', {}, b.word || 'the old word'),
        ', and both boards are built again for their own day and difficulty. A word featured nowhere sends ',
        b.word || 'the old word', ' to a new day at the end of the calendar.'),
      g.kinds.length > 1 ? h('p', { class: 'muted small' }, 'The two boards on a day must feature different words.') : null,
      h('label', { class: 'field' }, h('span', {}, 'New featured word'), word), options,
      sourceField,
      planBox,
      previewBox,
      h('div', { class: 'actions' }, h('button', { class: 'btn', onclick: () => close(false) }, 'Cancel'), build, apply));
  }, { wide: true });
}

