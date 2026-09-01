const TILE_LAYOUT = {
  'aurora-water-form': [0, 0],
  'prism-pocket-form': [1, 0],
  'orbit-rolling-station': [2, 0],
  'velocity-paper-vault': [3, 0],
  'nocturne-cigar-case': [0, 1],
  'reserve-humidor-tools': [1, 1],
  'halo-hookah-bowl': [2, 1],
  'vector-hose-kit': [3, 1],
  'pulse-device-sleeve': [0, 2],
  'relay-care-capsule': [1, 2],
  'meridian-utility-mill': [2, 2],
  'signal-cleaning-array': [3, 2],
};

export const PRODUCT_IMAGE_IDS = Object.freeze(Object.keys(TILE_LAYOUT));

function positionFor(index, count) {
  if (count <= 1) return '0%';
  return `${(index / (count - 1)) * 100}%`;
}

export function ProductPhoto({ product, size = 'card', className = '' }) {
  const tile = TILE_LAYOUT[product.id] ?? TILE_LAYOUT['aurora-water-form'];
  const spriteUrl = `${import.meta.env.BASE_URL}catalog/product-sprite.webp`;
  const classNames = ['product-photo', `product-photo--${size}`, className].filter(Boolean).join(' ');

  return (
    <span
      className={classNames}
      role="img"
      aria-label={product.imageAlt}
      style={{
        '--product-sprite': `url("${spriteUrl}")`,
        '--product-sprite-position': `${positionFor(tile[0], 4)} ${positionFor(tile[1], 3)}`,
      }}
    >
      <span className="product-photo__image" aria-hidden="true" />
      <span className="product-photo__light" aria-hidden="true" />
      <span className="product-photo__edge" aria-hidden="true" />
    </span>
  );
}
