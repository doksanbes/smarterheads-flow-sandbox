import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculateTotal } from '../src/cart.js';

test('sums items without options', () => {
  assert.equal(calculateTotal([{ price: 10, qty: 2 }, { price: 5, qty: 1 }]), 25);
});

test('rounds to cents (Issue #1)', () => {
  assert.equal(calculateTotal([{ price: 0.1, qty: 1 }, { price: 0.2, qty: 1 }]), 0.3);
});

test('applies discount before tax and rounds (Issue #1)', () => {
  // 100 → -10% = 90 → +19% = 107.1
  assert.equal(calculateTotal([{ price: 100, qty: 1 }], { discountPct: 10, taxPct: 19 }), 107.1);
  // 19.99 * 3 = 59.97 → -15% = 50.9745 → +7% = 54.542715 → 54.54
  assert.equal(calculateTotal([{ price: 19.99, qty: 3 }], { discountPct: 15, taxPct: 7 }), 54.54);
});
