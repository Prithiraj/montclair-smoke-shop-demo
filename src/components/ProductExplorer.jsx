import { useEffect, useMemo, useRef, useState } from 'react';
import { ProductGlyph } from './ProductGlyph.jsx';

function ProductCard({ product, categoryLabel, selected, onToggle, onOpen }) {
  const cardRef = useRef(null);

  const handlePointerMove = (event) => {
    const card = cardRef.current;
    if (!card) return;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    card.style.setProperty('--tilt-x', `${(0.5 - y) * 7}deg`);
    card.style.setProperty('--tilt-y', `${(x - 0.5) * 8}deg`);
    card.style.setProperty('--glow-x', `${x * 100}%`);
    card.style.setProperty('--glow-y', `${y * 100}%`);
  };

  const resetPointer = () => {
    cardRef.current?.style.setProperty('--tilt-x', '0deg');
    cardRef.current?.style.setProperty('--tilt-y', '0deg');
  };

  return (
    <article
      ref={cardRef}
      className="product-card"
      style={{ '--product-accent': product.accent }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <button className="product-card__open" type="button" onClick={() => onOpen(product)}>
        <span className="product-card__beam" aria-hidden="true" />
        <span className="product-card__meta">
          <span>{product.code}</span>
          <span>{categoryLabel}</span>
        </span>
        <span className="product-card__visual">
          <span className="product-card__orbit" aria-hidden="true" />
          <ProductGlyph product={product} />
        </span>
        <span className="product-card__copy">
          <strong>{product.name}</strong>
          <span>{product.tagline}</span>
        </span>
      </button>
      <div className="product-card__footer">
        <span>Demo item</span>
        <button
          className={`mini-action${selected ? ' is-selected' : ''}`}
          type="button"
          onClick={() => onToggle(product.id)}
          aria-pressed={selected}
        >
          {selected ? 'Added ✓' : 'Add to visit list +'}
        </button>
      </div>
    </article>
  );
}

function ProductDrawer({ product, categoryLabel, selected, onToggle, onClose, store }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!product) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    const timer = window.setTimeout(() => closeRef.current?.focus(), 40);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      className="drawer-layer"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <aside
        className="product-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-drawer-title"
        style={{ '--product-accent': product.accent }}
      >
        <div className="drawer-topline">
          <span>{product.code}</span>
          <button ref={closeRef} className="drawer-close" type="button" onClick={onClose} aria-label="Close product details">
            ×
          </button>
        </div>

        <div className="product-drawer__visual">
          <div className="product-drawer__halo" aria-hidden="true" />
          <ProductGlyph product={product} large />
        </div>

        <div className="product-drawer__content">
          <p className="section-kicker">{categoryLabel} // Concept item</p>
          <h3 id="product-drawer-title">{product.name}</h3>
          <p className="product-drawer__tagline">{product.tagline}</p>
          <p>{product.description}</p>
          <ul className="detail-list">
            {product.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
          <div className="product-drawer__notice">
            This catalog is a design demonstration. Price, inventory, variants, and availability are not represented.
          </div>
          <div className="product-drawer__actions">
            <button className="button button--primary" type="button" onClick={() => onToggle(product.id)}>
              {selected ? 'Remove from visit list' : 'Add to visit list'}
            </button>
            <a className="button button--ghost" href={store.phone.href}>
              Call to confirm
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}

export function ProductExplorer({
  products,
  categories,
  activeCategory,
  onCategoryChange,
  visitList,
  onToggleVisit,
  store,
}) {
  const [query, setQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categoryMap = useMemo(
    () => Object.fromEntries(categories.map((category) => [category.id, category])),
    [categories],
  );

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return products.filter((product) => {
      const inCategory = activeCategory === 'all' || product.category === activeCategory;
      const inSearch =
        !normalizedQuery ||
        [product.name, product.tagline, product.code, categoryMap[product.category]?.label]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery);
      return inCategory && inSearch;
    });
  }, [activeCategory, categoryMap, products, query]);

  return (
    <section className="section section--explore" id="explore" aria-labelledby="explore-title">
      <div className="section-heading reveal">
        <div>
          <p className="section-kicker">03 // Digital shelf</p>
          <h2 id="explore-title">Explore the collection.</h2>
        </div>
        <p>
          Search and filter a mock catalog, then create a private Visit List to show at the counter. No checkout is enabled.
        </p>
      </div>

      <div className="catalog-console glass-panel reveal">
        <label className="command-search">
          <span className="command-search__prefix" aria-hidden="true">/</span>
          <span className="sr-only">Search concept catalog</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search the collection"
          />
          <span className="command-search__hint">LOCAL DATA</span>
        </label>

        <div className="channel-filter" role="group" aria-label="Filter by category">
          <button
            type="button"
            className={activeCategory === 'all' ? 'is-active' : ''}
            onClick={() => onCategoryChange('all')}
            aria-pressed={activeCategory === 'all'}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              className={activeCategory === category.id ? 'is-active' : ''}
              style={{ '--chip-accent': category.accent }}
              onClick={() => onCategoryChange(category.id)}
              aria-pressed={activeCategory === category.id}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="catalog-console__readout">
          <span>{String(filteredProducts.length).padStart(2, '0')} signals found</span>
          <span>{visitList.length} saved locally</span>
        </div>
      </div>

      {filteredProducts.length ? (
        <div className="product-grid reveal">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              categoryLabel={categoryMap[product.category]?.label ?? product.category}
              selected={visitList.includes(product.id)}
              onToggle={onToggleVisit}
              onOpen={setSelectedProduct}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state glass-panel reveal">
          <span>NO SIGNAL</span>
          <h3>No concept items match that search.</h3>
          <button
            className="button button--ghost"
            type="button"
            onClick={() => {
              setQuery('');
              onCategoryChange('all');
            }}
          >
            Reset filters
          </button>
        </div>
      )}

      <ProductDrawer
        product={selectedProduct}
        categoryLabel={selectedProduct ? categoryMap[selectedProduct.category]?.label : ''}
        selected={selectedProduct ? visitList.includes(selectedProduct.id) : false}
        onToggle={onToggleVisit}
        onClose={() => setSelectedProduct(null)}
        store={store}
      />
    </section>
  );
}
