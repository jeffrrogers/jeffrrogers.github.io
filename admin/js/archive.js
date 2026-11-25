// Which idle Canuckle accounts may be archived (firebase/COST_PLAN.md item 6).
// Pure functions, unit-tested in admin/tests/run.mjs; the Firestore side is in
// store.js (findArchivable, archiveAccounts).
//
// Archiving moves newUserData/{id} to archivedUserData/{id}, unchanged except
// for archivedAt. Canuckle and the Arena move it back by themselves (the
// `restoreAccount` op, functions/src/restore.js) when the player returns, so
// nothing is lost; only the player's other games' docs stay where they are.
//
// The rule: not updated for ARCHIVE_IDLE_DAYS (9 months), and already in the
// packed format (formatVersion 2). Always kept:
//  - QA seed accounts (testers play them on the sandbox)
//  - an account with an open challenge: the challenge reads its Canuckle
//    result straight from newUserData (functions/src/games.js)
//  - anything with a missing or unreadable lastUpdated

import { FORMAT_VERSION } from './packedGames.js?v=202611251019';
import { isSeedId } from './seed/accounts.js?v=202611251019';

// Firestore is shared by production and the sandbox, so archiving a real
// account from the sandbox admin archives it for production players too.
// Until the restore path (Canuckle's account_restore.dart and the Arena's
// getCanuckleDoc) is live in production, only QA seed accounts can be
// archived, as a test (the real accounts can still be scanned). Turn this on
// only once both are deployed there.
export const RESTORE_IN_PRODUCTION = false;

export const ARCHIVE_COLLECTION = 'archivedUserData';
export const ARCHIVE_IDLE_DAYS = 274;
export const DAY_MS = 86400000;
/** Accounts per transaction: 2 writes each, plus the log entry, well under 500. */
export const ARCHIVE_BATCH = 50;

const isNum = (v) => typeof v === 'number' && Number.isFinite(v);

/** The cutoff the Firestore query uses: only docs updated before it can qualify. */
export function archiveCutoff(nowMs) {
  return nowMs - ARCHIVE_IDLE_DAYS * DAY_MS;
}

/** Whether a social doc holds any challenge that's still open. */
export function hasOpenChallenge(social) {
  const all = social?.challenges;
  if (!all || typeof all !== 'object') return false;
  return Object.values(all).some((v) => v?.status === 'open');
}

/**
 * The decision for one account.
 * @param user newUserData/{id}'s data (null when missing)
 * @param social social/{id}'s data, null when missing, or undefined when it
 *   wasn't read (which keeps the account)
 * @param seedTest the test run: only QA seed accounts qualify, idle or not
 * @returns {{eligible: boolean, reason: string, idleDays: number|null}}
 */
export function archiveVerdict(id, user, social, nowMs, { seedTest = false } = {}) {
  if (!user) return { eligible: false, reason: 'no account', idleDays: null };
  const last = user.lastUpdated;
  const idleDays = isNum(last) && last > 0 ? Math.floor((nowMs - last) / DAY_MS) : null;
  const keep = (reason) => ({ eligible: false, reason, idleDays });
  if (idleDays === null) return keep('no lastUpdated');
  if (seedTest) {
    if (!isSeedId(id)) return keep('not seed');
  } else {
    if (last >= archiveCutoff(nowMs)) return keep('recent');
    if (isSeedId(id)) return keep('seed');
  }
  if (user.formatVersion !== FORMAT_VERSION) return keep('not packed');
  if (social === undefined) return keep('social unread');
  if (hasOpenChallenge(social)) return keep('open challenge');
  return { eligible: true, reason: 'archive', idleDays };
}

/** The doc written to archivedUserData: the live doc as it is, plus archivedAt. */
export function archivedDoc(user, nowMs) {
  return { ...user, archivedAt: nowMs };
}

/**
 * What the transaction does for one account, given what it reads now:
 * 'archive', or why it's skipped. A player who came back since the scan
 * (lastUpdated moved, or the doc is gone) is left alone, and so is an ID that
 * somehow already has an archive doc (restore.js would merge them; this
 * mustn't overwrite one).
 */
export function archiveStep(scannedLastUpdated, live, archived) {
  if (!live) return 'gone';
  if (live.lastUpdated !== scannedLastUpdated) return 'changed';
  if (live.formatVersion !== FORMAT_VERSION) return 'changed';
  if (archived) return 'already archived';
  return 'archive';
}

export function chunk(list, size) {
  const out = [];
  for (let i = 0; i < list.length; i += size) out.push(list.slice(i, i + size));
  return out;
}

/** Counts for the dry-run summary: by reason, and the archivable ones by idle months. */
export function summarizeArchive(verdicts) {
  const byReason = {};
  const byMonths = {};
  for (const v of verdicts) {
    byReason[v.reason] = (byReason[v.reason] || 0) + 1;
    if (v.eligible) {
      const m = Math.floor(v.idleDays / 30.44);
      byMonths[m] = (byMonths[m] || 0) + 1;
    }
  }
  return { byReason, byMonths };
}
