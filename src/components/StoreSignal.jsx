export function StoreSignal({ store, status }) {
  return (
    <aside className="store-signal glass-panel" aria-label="Store status and contact information">
      <div className="store-signal__status">
        <span className={`status-dot${status.isOpen ? ' status-dot--open status-dot--pulse' : ''}`} />
        <div>
          <span className="store-signal__label">Today</span>
          <strong>{status.label}</strong>
        </div>
        <span className="store-signal__detail">{status.detail}</span>
      </div>
      <div className="store-signal__location">
        <span className="store-signal__label">Address</span>
        <strong>{store.address.street}</strong>
        <span>
          {store.address.city}, {store.address.state}
        </span>
      </div>
      <div className="store-signal__links">
        <a href={store.phone.href}>Call {store.phone.display}</a>
        <a href={store.directionsUrl} target="_blank" rel="noreferrer">
          Directions ↗
        </a>
      </div>
    </aside>
  );
}
