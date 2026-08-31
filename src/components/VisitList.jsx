import { useEffect, useMemo, useRef, useState } from 'react';

export function VisitList({ open, onClose, itemIds, products, categories, onToggle, onClear, store }) {
  const [counterMode, setCounterMode] = useState(false);
  const closeRef = useRef(null);
  const categoryMap = useMemo(
    () => Object.fromEntries(categories.map((category) => [category.id, category.label])),
    [categories],
  );
  const items = useMemo(
    () => itemIds.map((id) => products.find((product) => product.id === id)).filter(Boolean),
    [itemIds, products],
  );

  useEffect(() => {
    if (!open) {
      setCounterMode(false);
      return undefined;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const timer = window.setTimeout(() => closeRef.current?.focus(), 40);
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={`drawer-layer visit-layer${counterMode ? ' is-counter-mode' : ''}`}
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <aside className="visit-drawer" role="dialog" aria-modal="true" aria-labelledby="visit-list-title">
        <div className="drawer-topline">
          <span>LOCAL // PRIVATE</span>
          <button ref={closeRef} className="drawer-close" type="button" onClick={onClose} aria-label="Close visit list">
            ×
          </button>
        </div>

        <div className="visit-drawer__heading">
          <p className="section-kicker">Visit list</p>
          <h2 id="visit-list-title">{counterMode ? 'Counter view.' : 'Your selected signals.'}</h2>
          <p>
            {counterMode
              ? 'Show this screen at the counter and ask the store team about comparable available items.'
              : 'This list stays in this browser. It is not an order, reservation, or inventory confirmation.'}
          </p>
        </div>

        {items.length ? (
          <ol className="visit-items">
            {items.map((item, index) => (
              <li key={item.id} style={{ '--product-accent': item.accent }}>
                <span className="visit-items__number">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <strong>{item.name}</strong>
                  <span>{categoryMap[item.category]}</span>
                </div>
                {!counterMode && (
                  <button type="button" onClick={() => onToggle(item.id)} aria-label={`Remove ${item.name}`}>
                    Remove
                  </button>
                )}
              </li>
            ))}
          </ol>
        ) : (
          <div className="visit-empty">
            <span aria-hidden="true">◎</span>
            <h3>No items selected yet.</h3>
            <p>Browse the digital shelf and add concept items you would like to ask about.</p>
          </div>
        )}

        <div className="visit-drawer__actions">
          {items.length > 0 && (
            <button className="button button--primary" type="button" onClick={() => setCounterMode((value) => !value)}>
              {counterMode ? 'Return to list' : 'Show counter view'}
            </button>
          )}
          <a className="button button--ghost" href={store.phone.href}>
            Call {store.phone.display}
          </a>
          {!counterMode && items.length > 0 && (
            <button className="text-action" type="button" onClick={onClear}>
              Clear list
            </button>
          )}
        </div>
      </aside>
    </div>
  );
}
