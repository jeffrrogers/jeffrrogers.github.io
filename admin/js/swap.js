// The content that moves when two puzzles trade places. `index` stays with the
// doc; everything that belongs to the word goes with it, including the
// distribution of results players already posted for that word. A fun fact
// poll goes with its fact; its votes are kept by puzzle number, so the Swap
// dialog refuses puzzles whose poll players can already see.

export const SWAP_FIELDS = ['answer', 'fact', 'factUrls', 'distribution', 'poll'];

/** The two docs after the swap, from the two docs before it. */
export function swapPayload(a, b) {
  const nextA = { ...a };
  const nextB = { ...b };
  for (const f of SWAP_FIELDS) {
    if (f in b) nextA[f] = b[f];
    else delete nextA[f];
    if (f in a) nextB[f] = a[f];
    else delete nextB[f];
  }
  return [nextA, nextB];
}
