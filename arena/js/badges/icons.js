// Badge medal artwork, as SVG markup built from constants only.

export const LEAF_PATH = 'M50 5L57 19L64 15L61 38L72 27L75 34L86 32L82 45L90 49L70 64L73 73L53 70L53 92L47 92L47 70L27 73L30 64L10 49L18 45L14 32L25 34L28 27L39 38L36 15L43 19Z';

// Glyphs drawn in a 100x100 box, white on the medal.
const GLYPHS = {
  leaf: `<path d="${LEAF_PATH}" transform="translate(22 20) scale(.56)" fill="#fff"/>`,
  flame: '<path d="M50 20c6 13 20 19 18 36-1 13-9 22-18 22s-18-9-18-21c0-10 7-14 9-23 4 6 7 8 9 14 3-9 2-18 0-28z" fill="#fff"/>',
  stack: '<g fill="#fff"><rect x="28" y="58" width="44" height="12" rx="4"/><rect x="31" y="43" width="38" height="12" rx="4" opacity=".85"/><rect x="34" y="28" width="32" height="12" rx="4" opacity=".7"/></g>',
  sweep: '<path d="M24 52l12 12 26-28M44 64l6 6 26-28" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>',
  star: '<path d="M50 22l8.2 17.6 19.3 2.3-14.2 13.2 3.7 19.1L50 64.8 33 74.2l3.7-19.1-14.2-13.2 19.3-2.3z" fill="#fff"/>',
  clock: '<g fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"><circle cx="50" cy="50" r="24"/><path d="M50 36v15l10 6"/></g>',
  compass: '<circle cx="50" cy="50" r="25" fill="none" stroke="#fff" stroke-width="6"/><path d="M50 30l7 20-7 20-7-20z" fill="#fff"/>',
  toque: '<g fill="#fff"><circle cx="50" cy="26" r="7"/><path d="M28 62c0-16 10-29 22-29s22 13 22 29z"/><rect x="25" y="62" width="50" height="12" rx="4"/></g>',
  slate: '<g fill="#fff"><rect x="27" y="30" width="13" height="13" rx="3"/><rect x="44" y="30" width="13" height="13" rx="3"/><rect x="61" y="30" width="13" height="13" rx="3"/><rect x="27" y="47" width="13" height="13" rx="3"/><rect x="44" y="47" width="13" height="13" rx="3"/><rect x="61" y="47" width="13" height="13" rx="3"/><rect x="36" y="64" width="28" height="8" rx="3"/></g>',
  north: '<path d="M50 22l18 48-18-10-18 10z" fill="#fff"/>',
  trophy: '<g fill="#fff"><path d="M34 26h32v12c0 11-7 19-16 19s-16-8-16-19z"/><rect x="46" y="56" width="8" height="10"/><rect x="36" y="66" width="28" height="8" rx="3"/></g><path d="M34 32h-8c0 8 4 12 10 13M66 32h8c0 8-4 12-10 13" fill="none" stroke="#fff" stroke-width="4"/>',
};

const RING = { bronze: '#C07A3E', silver: '#B9BCC2', gold: '#E2B23B' };

/** Medal SVG markup for a badge. [color] is the owning game's colour. */
export function medalSvg(badge, color, size = 72) {
  const earned = badge.earned;
  const fill = earned ? color : 'var(--locked)';
  const ring = badge.tier ? RING[badge.tier] : 'rgba(255,255,255,.55)';
  const ringStroke = earned ? ring : 'var(--locked-ring)';
  const glyph = GLYPHS[badge.glyph] || GLYPHS.leaf;
  return `<svg class="medal${earned ? '' : ' locked'}" viewBox="0 0 100 100" width="${size}" height="${size}" aria-hidden="true">`
    + `<circle cx="50" cy="50" r="47" fill="${ringStroke}"/>`
    + `<circle cx="50" cy="50" r="40" fill="${fill}"/>`
    + `<circle cx="50" cy="50" r="35" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="1.5"/>`
    + `<g opacity="${earned ? 1 : 0.75}">${glyph}</g></svg>`;
}

/** Same medal with literal colours, for drawing onto a canvas (no CSS vars). */
export function medalSvgStandalone(badge, color) {
  return medalSvg({ ...badge, earned: true }, color, 400)
    .replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
}
