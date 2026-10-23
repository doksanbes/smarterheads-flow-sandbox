/**
 * URL slug generation.
 *
 * German umlauts and ß are transliterated to ae/oe/ue and ss. Canonically
 * equivalent inputs are normalized before transliteration. Characters
 * outside ASCII letters and digits become separators, with edge dashes trimmed.
 */

/**
 * @param {string} input
 * @returns {string}
 */
export function slugify(input) {
  const german = { ä: 'ae', ö: 'oe', ü: 'ue', ß: 'ss' };
  return input
    .normalize('NFC')
    .toLowerCase()
    .replace(/[äöüß]/g, (character) => german[character])
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
