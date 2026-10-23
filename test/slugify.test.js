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
