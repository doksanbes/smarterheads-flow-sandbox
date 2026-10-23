/**
 * Date range helpers.
 *
 * Known bug (Issue #3): `daysBetween` should count BOTH the start and end day
 * (inclusive), e.g. 2026-01-01 → 2026-01-03 = 3 days. It currently returns 2,
 * and it is also sensitive to DST because it uses local time.
 */

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * @param {string} startIso  YYYY-MM-DD
 * @param {string} endIso    YYYY-MM-DD
 * @returns {number} number of days, inclusive
 */
export function daysBetween(startIso, endIso) {
  const start = new Date(startIso + 'T00:00:00');
  const end = new Date(endIso + 'T00:00:00');
  // BUG: exclusive count + local time (DST)
  return Math.round((end.getTime() - start.getTime()) / MS_PER_DAY);
}
