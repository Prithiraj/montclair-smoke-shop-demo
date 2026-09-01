import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { categories, products } from '../src/data/catalog.js';
import { store } from '../src/data/store.js';

assert.equal(store.phone.href, 'tel:+19738629684');
assert.equal(store.email, null, 'Do not invent an email address for the demo.');
assert.equal(store.website, null, 'Do not claim an official website before owner confirmation.');
assert.equal(categories.length, 6);
assert.ok(products.length >= 12);
assert.ok(products.every((product) => categories.some((category) => category.id === product.category)));
assert.ok(products.every((product) => product.description && product.details.length >= 3));
assert.ok(products.every((product) => product.imageAlt?.trim()), 'Every product requires useful image alt text.');
assert.ok(!products.some((product) => /buy now|checkout|ship/i.test(JSON.stringify(product))));

const spritePath = new URL('../public/catalog/product-sprite.webp', import.meta.url);
assert.ok(existsSync(spritePath), 'Catalog photography sprite is missing.');
assert.ok(statSync(spritePath).size > 50_000, 'Catalog photography sprite is unexpectedly small.');

const photoComponent = readFileSync(
  new URL('../src/components/ProductPhoto.jsx', import.meta.url),
  'utf8',
);
for (const product of products) {
  assert.ok(photoComponent.includes(`'${product.id}'`), `No photography tile is assigned to ${product.id}.`);
}

const productExplorerSource = readFileSync(
  new URL('../src/components/ProductExplorer.jsx', import.meta.url),
  'utf8',
);
assert.ok(!productExplorerSource.includes('ProductGlyph'), 'Catalog cards must use photography, not glyph placeholders.');

const customerFacingSources = [
  'index.html',
  'src/App.jsx',
  'src/components/AgePortal.jsx',
  'src/components/BootSequence.jsx',
  'src/components/CategoryOrbit.jsx',
  'src/components/CommunitySignal.jsx',
  'src/components/ProductExplorer.jsx',
  'src/components/StoreSignal.jsx',
  'src/components/VisitList.jsx',
  'src/components/VisitSection.jsx',
].map((path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8'));

const combinedCopy = customerFacingSources.join('\n');
const rejectedPhrases = [
  'Find the shop, not a placeholder',
  'A cinematic preview of your local shop',
  'A cinematic, browse-only concept experience',
  'assemble a private visit list',
  'navigate directly to Valley Road',
  'Choose a frequency',
  'Digital shelf',
  'Calibrating local signal',
  'Your selected signals',
];

for (const phrase of rejectedPhrases) {
  assert.ok(!combinedCopy.toLowerCase().includes(phrase.toLowerCase()), `Remove vague phrase: ${phrase}`);
}

console.log('Content validation passed.');
