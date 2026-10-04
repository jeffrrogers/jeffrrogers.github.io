// Records badges in arenaUserData/{id}, the arena's only Firestore write.
//
//   arenaUserData/{id} = {
//     badges: { <badgeId>: { earnedAt, announcedAt?, sharedAt?, backfill? } },
//     createdAt, updatedAt
//   }
//
// The first visit records everything already earned quietly (backfill), so a
// returning player isn't buried in announcements for history. After that, a
// newly earned badge is written once and queued for an unlock announcement;
// announcedAt is set when the player dismisses it. Badges are never removed.

import { getDocData, setMerge, SERVER_TIME, toMillis } from '../firebase.js?v=202610040159';

function normalize(doc) {
  const out = {};
  for (const [id, b] of Object.entries(doc?.badges || {})) {
    out[id] = {
      earnedAt: toMillis(b.earnedAt) ?? Date.now(),
      announcedAt: toMillis(b.announcedAt),
      sharedAt: toMillis(b.sharedAt),
      backfill: b.backfill === true,
    };
  }
  return out;
}

export async function loadStoredBadges(uid) {
  const doc = await getDocData(['arenaUserData', uid]);
  return { exists: doc != null, badges: normalize(doc) };
}

/**
 * Pure: which badges to write and which to announce, given evaluation
 * results and what is stored.
 */
export function planSync(results, stored) {
  const earnedIds = results.filter((b) => b.earned).map((b) => b.id);
  const newIds = earnedIds.filter((id) => !stored.badges[id]);
  if (!stored.exists) {
    return { write: newIds, backfill: true, announce: [] };
  }
  const unannounced = Object.entries(stored.badges)
    .filter(([, b]) => !b.announcedAt && !b.backfill)
    .map(([id]) => id);
  return { write: newIds, backfill: false, announce: [...new Set([...unannounced, ...newIds])] };
}

/** Applies a plan. Returns the stored map as it now stands (locally). */
export async function applySync(uid, plan, stored) {
  const now = Date.now();
  const merged = { ...stored.badges };
  if (plan.write.length === 0 && stored.exists) return merged;

  const badges = {};
  for (const id of plan.write) {
    badges[id] = plan.backfill
      ? { earnedAt: SERVER_TIME, announcedAt: SERVER_TIME, backfill: true }
      : { earnedAt: SERVER_TIME };
    merged[id] = { earnedAt: now, announcedAt: plan.backfill ? now : null, backfill: plan.backfill };
  }
  const data = { badges, updatedAt: SERVER_TIME };
  if (!stored.exists) data.createdAt = SERVER_TIME;
  await setMerge(['arenaUserData', uid], data);
  return merged;
}

export async function markAnnounced(uid, id) {
  await setMerge(['arenaUserData', uid], { badges: { [id]: { announcedAt: SERVER_TIME } }, updatedAt: SERVER_TIME });
}

export async function markShared(uid, id) {
  await setMerge(['arenaUserData', uid], { badges: { [id]: { sharedAt: SERVER_TIME } }, updatedAt: SERVER_TIME });
}
