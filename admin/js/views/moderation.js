// Moderation tab: friends & challenges. Look a player up, force a rename,
// clear an under-14 age result on request, delete a player's social data,
// work through reports, and keep the banned-names list.
//
// Everything goes through the arenaAdmin Cloud Function
// (firebase/functions/src/admin.js), which reuses the players' own code: a
// rename here reaches friends' lists and open challenges, and a delete is the
// same erasure as the Arena's "Delete my social data".

import { h, clear, toast, fmtTime } from '../ui.js?v=202611182251';
import { callAdmin } from '../firebase.js?v=202611182251';

const state = {
  query: '',
  looking: false,
  player: undefined, // undefined: nothing looked up; null: not found
  reports: null, // null until loaded
  reportsAll: false,
  bans: null,
  recent: null,
  recentLimit: 50,
  busy: false,
  error: '',
};

const REASONS = {
  'not-admin': "This account isn't the admin.",
  'bad-query': 'Type a gamer ID, public handle or private ID.',
  'no-player': 'No player with social data has that ID.',
  'no-gamer-id': "That player hasn't set a gamer ID.",
  invalid: 'Gamer IDs are 3 to 16 letters, digits or underscores, with at least one letter.',
  reserved: 'That name is reserved (it looks official).',
  'not-allowed': 'That name is banned or blocked by the word filter.',
  taken: 'Someone else has that gamer ID, or one that looks just like it.',
  'not-under': "That player's age result isn't under 14.",
  'bad-name': 'Names are up to 16 letters, digits or underscores.',
  'age-check': "That player hasn't passed the age check.",
  'no-placeholder': "Couldn't find a free PlayerNNNN name. Type one instead.",
};
const reasonText = (e) => REASONS[e?.reason] ?? `${e?.message || e} (${e?.reason ?? 'error'})`;

const AGE = { ok: '14 or older', under: 'Under 14 (blocked)' };
const OUTCOMES = { dismissed: 'Dismissed', renamed: 'Renamed', banned: 'Name banned' };

let loadedOnce = false;

export function renderModeration(root, rerender) {
  if (!loadedOnce) {
    loadedOnce = true;
    loadReports(rerender);
    loadBans(rerender);
    loadRecent(rerender);
  }
  clear(root,
    h('p', { class: 'muted small' },
      'Friends & challenges. Changes take effect at once for players everywhere, sandbox and production alike (they share one Firebase project).'),
    lookupCard(rerender),
    state.player ? playerCard(state.player, rerender) : null,
    reportsCard(rerender),
    recentCard(rerender),
    bansCard(rerender));
}

// ---- Newest gamer IDs ----------------------------------------------------------------
//
// The word filter can't catch everything, and nothing else is seen until a
// friend reports it. Skimming the newest names every few days catches the
// rest. "New" is anything claimed since this browser last marked them seen.

const SEEN_KEY = 'admin.gamerIdsSeenAt';

function seenAt() {
  try {
    return Number(localStorage.getItem(SEEN_KEY)) || 0;
  } catch {
    return 0;
  }
}

function markSeen(at) {
  try {
    localStorage.setItem(SEEN_KEY, String(at));
  } catch {
    // fine: everything just stays "new"
  }
}

async function loadRecent(rerender) {
  try {
    state.recent = (await callAdmin('recentGamerIds', { limit: state.recentLimit })).gamerIds;
  } catch (e) {
    state.recent = { error: reasonText(e) };
  }
  rerender();
}

function recentCard(rerender) {
  const r = state.recent;
  const seen = seenAt();
  const fresh = Array.isArray(r) ? r.filter((g) => g.at > seen) : [];
  let body;
  if (r === null) body = h('p', { class: 'muted' }, 'Loading…');
  else if (r.error) body = h('p', { class: 'err' }, r.error);
  else if (!r.length) body = h('p', { class: 'muted' }, 'No gamer IDs yet.');
  else {
    body = h('div', { class: 'table-wrap' }, h('table', { class: 'grid compact' },
      h('thead', {}, h('tr', {}, ['Gamer ID', 'Claimed or renamed', ''].map((t) => h('th', {}, t)))),
      h('tbody', {}, r.map((g) => h('tr', {},
        h('td', {}, g.at > seen ? h('b', {}, g.name) : g.name, g.at > seen ? h('span', { class: 'pill' }, ' new') : null),
        h('td', { class: 'nowrap' }, g.at ? fmtTime(g.at) : 'before Nov 16'),
        h('td', {}, h('button', {
          class: 'btn small', onclick: () => { lookup(rerender, g.pub); window.scrollTo({ top: 0, behavior: 'smooth' }); },
        }, 'Look up')))))));
  }
  return h('div', { class: 'card' },
    h('h3', {}, `Newest gamer IDs${fresh.length ? ` (${fresh.length} new)` : ''}`),
    h('p', { class: 'small muted' },
      'The latest claims and renames, newest first. Skim for anything the word filter missed, then mark them seen. One Firestore read per name listed.'),
    h('div', { class: 'actions left' },
      h('button', {
        class: 'btn small', disabled: !fresh.length,
        onclick: () => { markSeen(Math.max(...r.map((g) => g.at || 0))); rerender(); },
      }, 'Mark all seen'),
      h('button', { class: 'btn small', onclick: () => { state.recent = null; rerender(); loadRecent(rerender); } }, 'Refresh'),
      Array.isArray(r) && r.length >= state.recentLimit && state.recentLimit < 100
        ? h('button', { class: 'btn small ghost', onclick: () => { state.recentLimit = 100; state.recent = null; rerender(); loadRecent(rerender); } }, 'Show 100')
        : null),
    body);
}

// ---- Calls ------------------------------------------------------------------------

/** Runs [op], toasts [done] on success, and re-renders. Returns the result, or null on failure. */
async function run(rerender, op, data, done) {
  state.busy = true;
  rerender();
  try {
    const r = await callAdmin(op, data);
    if (done) toast(typeof done === 'function' ? done(r) : done);
    return r;
  } catch (e) {
    toast(reasonText(e), { error: true });
    return null;
  } finally {
    state.busy = false;
    rerender();
  }
}

async function lookup(rerender, query = state.query) {
  state.query = query.trim();
  if (!state.query) return;
  state.looking = true;
  state.error = '';
  rerender();
  try {
    state.player = (await callAdmin('lookup', { query: state.query })).player;
  } catch (e) {
    state.player = undefined;
    state.error = reasonText(e);
  }
  state.looking = false;
  rerender();
}

async function loadReports(rerender) {
  try {
    state.reports = (await callAdmin('listReports', { all: state.reportsAll })).reports;
  } catch (e) {
    state.reports = { error: reasonText(e) };
  }
  rerender();
}

async function loadBans(rerender) {
  try {
    state.bans = (await callAdmin('listBans')).bans;
  } catch (e) {
    state.bans = { error: reasonText(e) };
  }
  rerender();
}

/** Closes every open report against the player on screen with [outcome]. */
async function closeReportsFor(player, outcome) {
  const open = player.reports.filter((r) => r.open);
  await Promise.all(open.map((r) => callAdmin('closeReport', { id: r.id, outcome })));
  return open.length;
}

// ---- Look up -----------------------------------------------------------------------

function lookupCard(rerender) {
  const input = h('input', {
    type: 'search', id: 'mod-query', value: state.query, autocomplete: 'off', spellcheck: false,
    placeholder: 'Gamer ID, public handle (p…) or private ID',
    style: { minWidth: '18rem' },
    onkeydown: (e) => { if (e.key === 'Enter') lookup(rerender, input.value); },
  });
  return h('div', { class: 'card' },
    h('h3', {}, 'Find a player'),
    h('div', { class: 'actions left' }, input,
      h('button', { class: 'btn primary', disabled: state.looking, onclick: () => lookup(rerender, input.value) },
        state.looking ? 'Looking…' : 'Find')),
    state.error ? h('p', { class: 'err' }, state.error) : null,
    state.player === null ? h('p', { class: 'muted' }, `No player with social data matches “${state.query}”.`) : null);
}

function names(list) {
  if (!list.length) return h('span', { class: 'muted' }, 'none');
  return h('details', {}, h('summary', {}, String(list.length)),
    h('ul', {}, list.map((f) => h('li', {}, f.gamerId, ' ', h('span', { class: 'mono muted small' }, f.pub)))));
}

function playerCard(p, rerender) {
  const rows = [
    ['Gamer ID', p.gamerId ? h('b', {}, p.gamerId) : h('span', { class: 'muted' }, 'not set')],
    ['Private ID', h('span', { class: 'mono' }, p.pid)],
    ['Public handle', p.pub ? h('span', { class: 'mono' }, p.pub) : '—'],
    ['Age check', `${AGE[p.challengeAge] ?? p.challengeAge ?? '—'}${p.ageAt ? ` · ${fmtTime(p.ageAt)}` : ''}`],
    ['Gamer ID last changed', p.gamerIdChangedAt ? fmtTime(p.gamerIdChangedAt) : '—'],
    ['Friends', names(p.friends)],
    ['Requests in / out', h('span', {}, names(p.requestsIn), ' / ', names(p.requestsOut))],
    ['Blocked', names(p.blocked)],
    ['Challenges', `${p.openChallenges} open, ${p.challenges} kept`],
    ['Record', p.overall ? `${p.overall.w}-${p.overall.l}-${p.overall.t}` : '—'],
  ];

  const reports = p.reports.length
    ? h('table', { class: 'grid compact' },
      h('thead', {}, h('tr', {}, h('th', {}, 'When'), h('th', {}, 'Name then'), h('th', {}, 'Reason'), h('th', {}, 'Status'))),
      h('tbody', {}, p.reports.map((r) => h('tr', {},
        h('td', { class: 'nowrap' }, fmtTime(r.at)), h('td', {}, r.gamerId), h('td', {}, r.reason || '—'),
        h('td', {}, r.open ? h('span', { class: 'flag err' }, 'Open') : OUTCOMES[r.outcome] ?? 'Closed')))))
    : h('p', { class: 'muted' }, 'No reports.');

  const busy = state.busy;
  const newName = h('input', { id: 'mod-rename', placeholder: 'New gamer ID (blank: PlayerNNNN)', autocomplete: 'off', spellcheck: false });

  const doRename = async ({ banFirst }) => {
    const name = newName.value.trim();
    const what = banFirst
      ? `Ban “${p.gamerId}” and rename this player to ${name || 'a PlayerNNNN name'}?`
      : `Rename “${p.gamerId}” to ${name || 'a PlayerNNNN name'}?`;
    if (!confirm(`${what}\n\nTheir friends see the new name at once, and the player can't choose another for 30 days.`)) return;
    if (banFirst && !(await run(rerender, 'ban', { name: p.gamerId, note: `banned from ${p.pub}` }))) return;
    const r = await run(rerender, 'rename', { pid: p.pid, name });
    if (!r) return;
    const closed = await closeReportsFor(p, banFirst ? 'banned' : 'renamed').catch(() => 0);
    toast(`Renamed ${r.from} → ${r.gamerId}${closed ? `; ${closed} report${closed === 1 ? '' : 's'} closed` : ''}.`);
    await Promise.all([lookup(rerender, p.pid), loadReports(rerender), banFirst ? loadBans(rerender) : null]);
  };

  const actions = [];
  if (p.gamerId) {
    actions.push(h('div', { class: 'card' },
      h('h4', {}, 'Rename'),
      h('p', { class: 'small muted' }, 'Skips the 30-day wait. The new name starts a new 30-day wait, so they can’t switch straight back to something bad.'),
      h('div', { class: 'actions left' }, newName,
        h('button', { class: 'btn', disabled: busy, onclick: () => doRename({ banFirst: false }) }, 'Rename'),
        h('button', { class: 'btn danger', disabled: busy, onclick: () => doRename({ banFirst: true }) }, `Ban “${p.gamerId}” and rename`))));
  }
  if (p.challengeAge === 'under') {
    actions.push(h('div', { class: 'card' },
      h('h4', {}, 'Under-14 result'),
      h('p', { class: 'small muted' }, 'Only on request (for example an email to info@ from someone who answered wrongly). Clearing it lets this ID take the age check again.'),
      h('button', {
        class: 'btn', disabled: busy,
        onclick: async () => {
          if (!confirm('Clear the under-14 result for this ID? The age check will ask again.')) return;
          if (await run(rerender, 'clearAge', { pid: p.pid }, 'Age result cleared.')) await lookup(rerender, p.pid);
        },
      }, 'Clear age result')));
  }
  const keepAge = h('input', { type: 'checkbox', id: 'mod-drop-age' });
  const phrase = p.gamerId ? `DELETE ${p.gamerId}` : 'DELETE';
  const confirmBox = h('input', { id: 'mod-delete-confirm', placeholder: phrase, autocomplete: 'off' });
  const delBtn = h('button', { class: 'btn danger', disabled: true }, 'Delete social data');
  confirmBox.addEventListener('input', () => { delBtn.disabled = busy || confirmBox.value.trim() !== phrase; });
  delBtn.addEventListener('click', async () => {
    const r = await run(rerender, 'deleteSocial', { pid: p.pid, age: keepAge.checked }, 'Social data deleted.');
    if (r) {
      await lookup(rerender, p.pid);
      loadReports(rerender);
    }
  });
  actions.push(h('div', { class: 'card' },
    h('h4', {}, 'Delete social data'),
    h('p', { class: 'small muted' },
      'The same as the player’s own “Delete my social data”: frees the gamer ID, removes them from friends’ lists, and leaves their open challenges as “Former player”. Game progress is untouched.'),
    p.challengeAge === 'under' || p.challengeAge === 'ok'
      ? h('label', { class: 'check' }, keepAge, ' Also forget the age result (an under-14 result is otherwise kept)')
      : null,
    h('div', { class: 'actions left' }, confirmBox, delBtn)));

  return h('div', { class: 'card' },
    h('h3', {}, p.gamerId ?? p.pid),
    h('table', { class: 'mini' }, rows.map(([k, v]) => h('tr', {}, h('th', {}, k), h('td', {}, v)))),
    h('h4', {}, 'Reports about them'),
    reports,
    h('div', { class: 'two-col' }, actions));
}

// ---- Reports -----------------------------------------------------------------------

function reportsCard(rerender) {
  const r = state.reports;
  const toggle = h('label', { class: 'check' },
    h('input', {
      type: 'checkbox', id: 'mod-reports-all', checked: state.reportsAll,
      onchange: (e) => { state.reportsAll = e.target.checked; state.reports = null; rerender(); loadReports(rerender); },
    }), ' Show closed reports too');
  let body;
  if (r === null) body = h('p', { class: 'muted' }, 'Loading…');
  else if (r.error) body = h('p', { class: 'err' }, r.error);
  else if (!r.length) body = h('p', { class: 'ok-note' }, state.reportsAll ? 'No reports yet.' : 'No open reports.');
  else {
    body = h('div', { class: 'table-wrap' }, h('table', { class: 'grid compact' },
      h('thead', {}, h('tr', {},
        ['When', 'Reported', 'Name now', 'By', 'Reason', 'Status', ''].map((t) => h('th', {}, t)))),
      h('tbody', {}, r.map((x) => h('tr', {},
        h('td', { class: 'nowrap' }, fmtTime(x.at)),
        h('td', {}, h('b', {}, x.gamerId)),
        h('td', {}, x.nowGamerId ?? h('span', { class: 'muted' }, 'gone')),
        h('td', {}, x.byGamerId ?? h('span', { class: 'muted' }, 'gone')),
        h('td', {}, x.reason || '—'),
        h('td', {}, x.open ? h('span', { class: 'flag err' }, 'Open') : `${OUTCOMES[x.outcome] ?? 'Closed'}${x.closedAt ? ` · ${fmtTime(x.closedAt)}` : ''}`),
        h('td', { class: 'nowrap' },
          x.nowGamerId ? h('button', {
            class: 'btn small', onclick: () => { lookup(rerender, x.pub); window.scrollTo({ top: 0, behavior: 'smooth' }); },
          }, 'Look up') : null,
          x.open ? h('button', {
            class: 'btn small ghost', disabled: state.busy,
            onclick: async () => {
              if (await run(rerender, 'closeReport', { id: x.id, outcome: 'dismissed' }, 'Report dismissed.')) loadReports(rerender);
            },
          }, 'Dismiss') : null))))));
  }
  return h('div', { class: 'card' },
    h('h3', {}, `Reports${Array.isArray(r) && !state.reportsAll ? ` (${r.length} open)` : ''}`),
    h('p', { class: 'small muted' }, 'Players report a gamer ID from a friend’s menu in the Arena. Renaming or banning from the player card closes their open reports.'),
    h('div', { class: 'actions left' }, toggle,
      h('button', { class: 'btn small', onclick: () => { state.reports = null; rerender(); loadReports(rerender); } }, 'Refresh')),
    body);
}

// ---- Banned names ------------------------------------------------------------------

function bansCard(rerender) {
  const b = state.bans;
  const name = h('input', { id: 'mod-ban-name', placeholder: 'Gamer ID to ban', autocomplete: 'off', spellcheck: false });
  const note = h('input', { id: 'mod-ban-note', placeholder: 'Note (optional)', autocomplete: 'off' });
  const add = async () => {
    const r = await run(rerender, 'ban', { name: name.value.trim(), note: note.value.trim() });
    if (!r) return;
    loadBans(rerender);
    if (r.heldBy) {
      toast(`Banned. ${r.heldBy.gamerId} still has it: look them up to rename them.`);
      lookup(rerender, r.heldBy.pid);
    } else {
      toast('Banned. Nobody can take that gamer ID now.');
    }
  };
  let body;
  if (b === null) body = h('p', { class: 'muted' }, 'Loading…');
  else if (b.error) body = h('p', { class: 'err' }, b.error);
  else if (!b.length) body = h('p', { class: 'muted' }, 'No banned names.');
  else {
    body = h('div', { class: 'table-wrap' }, h('table', { class: 'grid compact' },
      h('thead', {}, h('tr', {}, ['Name', 'Note', 'Banned', ''].map((t) => h('th', {}, t)))),
      h('tbody', {}, b.map((x) => h('tr', {},
        h('td', {}, x.name ?? x.key),
        h('td', {}, x.note || '—'),
        h('td', { class: 'nowrap' }, x.at ? fmtTime(x.at) : '—'),
        h('td', {}, h('button', {
          class: 'btn small ghost', disabled: state.busy,
          onclick: async () => {
            if (!confirm(`Unban “${x.name ?? x.key}”? Anyone could then claim it.`)) return;
            if (await run(rerender, 'unban', { name: x.key }, 'Unbanned.')) loadBans(rerender);
          },
        }, 'Unban')))))));
  }
  return h('div', { class: 'card' },
    h('h3', {}, 'Banned names'),
    h('p', { class: 'small muted' },
      'On top of the built-in word filter (functions/src/rules.js). Matched ignoring capitals, and look-alikes too (RudeName also bans RudeNarne and Rude_Name). A banned name can’t be claimed or renamed to; someone who already has it keeps it until renamed.'),
    h('div', { class: 'actions left' }, name, note,
      h('button', { class: 'btn', disabled: state.busy, onclick: add }, 'Ban')),
    body);
}
