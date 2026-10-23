import { test } from 'node:test';
import assert from 'node:assert/strict';
import { daysBetween } from '../src/dateRange.js';

test('same day counts as 1 (Issue #3)', () => {
  assert.equal(daysBetween('2026-01-01', '2026-01-01'), 1);
});

test('inclusive range (Issue #3)', () => {
  assert.equal(daysBetween('2026-01-01', '2026-01-03'), 3);
});

test('across DST change (Issue #3)', () => {
  // EU DST starts 2026-03-29
  assert.equal(daysBetween('2026-03-28', '2026-03-30'), 3);
});
