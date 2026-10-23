/**
 * Cart total calculation.
 *
 * Expected order: subtotal → discount → tax → round to cents.
 * Known bug (Issue #1): tax is applied BEFORE the discount and the result
 * is not rounded, so totals like 0.1 + 0.2 leak floating point noise.
 */

/**
 * @param {{ price: number, qty: number }[]} items
 * @param {{ discountPct?: number, taxPct?: number }} [opts]
 * @returns {number} total in currency units (2 decimals)
 */
export function calculateTotal(items, opts = {}) {
  const { discountPct = 0, taxPct = 0 } = opts;

  let subtotal = 0;
  for (const item of items) {
    subtotal += item.price * item.qty;
  }

  // BUG: tax before discount + no rounding
  const withTax = subtotal * (1 + taxPct / 100);
  const total = withTax * (1 - discountPct / 100);

  return total;
}
