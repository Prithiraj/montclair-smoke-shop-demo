import { PRODUCT_PHOTOGRAPHY_SPRITE, productImageTiles } from '../assets/productPhotography.js';

export function ProductPhoto({ product, size = 'card' }) {
  const tile = productImageTiles[product.id] ?? { x: '0%', y: '0%' };
  const label = product.imageAlt || `${product.name} product visual`;

  return (
    <span
      className={`product-photo product-photo--${size}`}
      role="img"
      aria-label={label}
      style={{
        '--photo-x': tile.x,
        '--photo-y': tile.y,
        backgroundImage: `url(${PRODUCT_PHOTOGRAPHY_SPRITE})`,
      }}
    />
  );
}
