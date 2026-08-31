import assert from 'node:assert/strict';
import { categories, products } from '../src/data/catalog.js';
import { store } from '../src/data/store.js';

assert.equal(store.phone.href, 'tel:+19738629684');
assert.equal(store.email, null, 'Do not invent an email address for the demo.');
assert.equal(store.website, null, 'Do not claim an official website before owner confirmation.');
assert.equal(categories.length, 6);
assert.ok(products.length >= 12);
assert.ok(products.every((product) => categories.some((category) => category.id === product.category)));
assert.ok(products.every((product) => product.description && product.details.length >= 3));
assert.ok(!products.some((product) => /buy now|checkout|ship/i.test(JSON.stringify(product))));

console.log('Content validation passed.');
