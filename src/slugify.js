/**
 * URL slug generation.
 *
 * Known bug (Issue #2): German umlauts and ß are dropped instead of being
 * transliterated ("Über Größe" → "ber-gre" instead of "ueber-groesse"), and
 * leading/trailing dashes are not trimmed.
 *
 * This issue is intentionally open-ended: there are several valid fixes
 * (manual map vs. Unicode normalize), so two experts can propose different
 * patches and we can test consolidation.
 */

/**
 * @param {string} input
 * @returns {string}
 */
export function slugify(input) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-');
}
