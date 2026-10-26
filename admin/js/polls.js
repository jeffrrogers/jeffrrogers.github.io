// Fun fact polls for Canuckle and Canuckle+ (canuckleSourceCode/lib/polls.dart).
// A poll lives on the puzzle doc:
//   poll: {question, type: 'single' | 'multi', maxPicks?, options: [text, ...]}
// Answers are keyed by position, a-f, in the votes doc
// canucklePollVotes/{index} (canucklePlusPollVotes for Plus): {n, c: {a, b, ...}}.
// Once anyone has voted, the answer list, type and pick limit are locked so a
// key always means the same answer; the wording can still be fixed.

export const POLL_KEYS = ['a', 'b', 'c', 'd', 'e', 'f'];
export const MIN_ANSWERS = 2;
export const MAX_ANSWERS = POLL_KEYS.length;
const LONG_QUESTION = 120;
const LONG_ANSWER = 48;

export const VOTES_COLLECTION = { canuckle: 'canucklePollVotes', plus: 'canucklePlusPollVotes' };

/** The stored poll in the editor's shape, or null when the puzzle has none. */
export function pollOf(data) {
  const p = data?.poll;
  if (!p || typeof p !== 'object') return null;
  const multi = p.type === 'multi';
  return {
    question: typeof p.question === 'string' ? p.question : '',
    multi,
    maxPicks: multi && Number.isInteger(p.maxPicks) ? p.maxPicks : null,
    options: Array.isArray(p.options) ? p.options.map((o) => (typeof o === 'string' ? o : '')) : [],
  };
}

/** The votes doc in a usable shape: voters and picks per key. */
export function votesOf(data) {
  const c = data?.c && typeof data.c === 'object' ? data.c : {};
  return {
    voters: Number.isInteger(data?.n) ? data.n : 0,
    counts: Object.fromEntries(POLL_KEYS.map((k) => [k, Number.isInteger(c[k]) ? c[k] : 0])),
  };
}

/** "Loonie 70% (7) · Toonie 30% (3)", shares of voters as the game shows them. */
export function resultsLine(poll, votes) {
  if (!poll || !votes?.voters) return '';
  return poll.options.map((text, i) => {
    const n = votes.counts[POLL_KEYS[i]] || 0;
    return `${text || '?'} ${Math.round((n * 100) / votes.voters)}% (${n})`;
  }).join(' · ');
}

/** What to store for [poll] (editor shape), or null for no poll. */
export function pollToSave(poll) {
  if (!poll) return null;
  const options = poll.options.map((o) => o.trim());
  const out = { question: poll.question.trim(), type: poll.multi ? 'multi' : 'single', options };
  if (poll.multi && Number.isInteger(poll.maxPicks) && poll.maxPicks < options.length) out.maxPicks = poll.maxPicks;
  return out;
}

/**
 * Errors block saving; warnings are shown and can be saved past.
 * @param poll editor shape, or null for no poll
 * @param original the stored poll (editor shape) or null
 * @param voters how many players have voted so far
 */
export function validatePoll(poll, { original = null, voters = 0 } = {}) {
  const errors = [];
  const warnings = [];
  if (!poll) {
    if (original && voters > 0) errors.push(`${voters} ${voters === 1 ? 'player has' : 'players have'} voted, so the poll can't be removed.`);
    return { errors, warnings };
  }
  const question = poll.question.trim();
  const options = poll.options.map((o) => o.trim());
  if (!question) errors.push('The poll needs a question.');
  else if (question.length > LONG_QUESTION) warnings.push('Long questions wrap onto several lines on phones.');
  if (options.length < MIN_ANSWERS) errors.push(`A poll needs at least ${MIN_ANSWERS} answers.`);
  if (options.length > MAX_ANSWERS) errors.push(`A poll can have at most ${MAX_ANSWERS} answers.`);
  if (options.some((o) => !o)) errors.push('Every answer needs some text.');
  const seen = new Set();
  for (const o of options) {
    const key = o.toLowerCase();
    if (o && seen.has(key)) errors.push(`"${o}" is listed twice.`);
    seen.add(key);
  }
  if (options.some((o) => o.length > LONG_ANSWER)) warnings.push('Long answers wrap onto two lines on phones.');
  if (poll.multi && poll.maxPicks != null) {
    if (!Number.isInteger(poll.maxPicks) || poll.maxPicks < 1 || poll.maxPicks >= options.length) {
      errors.push(`"Pick up to" must be from 1 to ${Math.max(1, options.length - 1)}, or Any.`);
    } else if (poll.maxPicks === 1) {
      warnings.push('Pick up to 1 works like a single-choice poll.');
    }
  }
  if (original && voters > 0) {
    const locked = [];
    if (options.length !== original.options.length) locked.push('the number of answers');
    if (poll.multi !== original.multi) locked.push('the poll type');
    if ((poll.multi ? poll.maxPicks : null) !== (original.multi ? original.maxPicks : null)) locked.push('the pick limit');
    if (locked.length) errors.push(`Players have voted, so ${locked.join(', ')} can't change. Only the wording can.`);
  }
  return { errors, warnings };
}
