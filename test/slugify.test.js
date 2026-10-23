import { test } from 'node:test';
import assert from 'node:assert/strict';
import { slugify } from '../src/slugify.js';

test('basic slug', () => {
  assert.equal(slugify('Hello World'), 'hello-world');
});

test('transliterates umlauts and ß (Issue #2)', () => {
  assert.equal(slugify('Über Größe'), 'ueber-groesse');
  assert.equal(slugify('Ärger mit Öl'), 'aerger-mit-oel');
});

test('trims leading/trailing dashes (Issue #2)', () => {
  assert.equal(slugify('  --Hello, World!--  '), 'hello-world');
});

test('transliterates German letters in both cases', () => {
  assert.equal(slugify('ä ö ü ß Ä Ö Ü ẞ'), 'ae-oe-ue-ss-ae-oe-ue-ss');
});

test('normalizes decomposed umlauts before transliteration', () => {
  assert.equal(slugify('Über Größe'.normalize('NFD')), 'ueber-groesse');
  assert.equal(slugify('Ä Ö Ü ä ö ü'.normalize('NFD')), 'ae-oe-ue-ae-oe-ue');
});

test('returns an empty slug for empty input or only separators', () => {
  for (const input of ['', ' \t\n ', '---', '!?_', '😀']) {
    assert.equal(slugify(input), '', JSON.stringify(input));
  }
});

test('preserves ASCII slugs and collapses other characters to separators', () => {
  assert.equal(slugify('already-a-slug-123'), 'already-a-slug-123');
  assert.equal(slugify('Hello__World...42---test'), 'hello-world-42-test');
  assert.equal(slugify('café noir & tea_123'), 'caf-noir-tea-123');
  assert.equal(slugify('ab中文cd'), 'ab-cd');
});
