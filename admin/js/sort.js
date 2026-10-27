// Sorting a table by a clicked column. Pure functions, unit-tested in
// admin/tests/run.mjs; ui.js sortHead() draws the clickable headers.
//
// A sort is {key, dir: 'asc'|'desc'}, or null for the table's own order.
// Clicking a column sorts by it ascending; clicking it again flips it.

/** The sort after clicking column [key]. */
export function nextSort(sort, key) {
  if (sort?.key === key) return { key, dir: sort.dir === 'asc' ? 'desc' : 'asc' };
  return { key, dir: 'asc' };
}

function compareValues(a, b) {
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' });
}

/**
 * [rows] sorted by [value](row) for [sort], as a new array. Stable: equal
 * values keep the table's own order. Rows with no value (null, undefined or
 * '') go last either way, so a missing answer never tops the list.
 */
export function sortRows(rows, value, sort) {
  if (!sort) return rows.slice();
  const sign = sort.dir === 'desc' ? -1 : 1;
  return rows
    .map((row, i) => ({ row, i, v: value(row, sort.key) }))
    .sort((x, y) => {
      const xe = x.v == null || x.v === '';
      const ye = y.v == null || y.v === '';
      if (xe || ye) return xe === ye ? x.i - y.i : xe ? 1 : -1;
      return sign * compareValues(x.v, y.v) || x.i - y.i;
    })
    .map((x) => x.row);
}
