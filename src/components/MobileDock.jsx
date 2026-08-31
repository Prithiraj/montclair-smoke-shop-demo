export function MobileDock({ store, visitCount, onOpenVisitList }) {
  return (
    <nav className="mobile-dock" aria-label="Mobile quick actions">
      <a href="#top">
        <span aria-hidden="true">⌂</span>
        Home
      </a>
      <a href="#explore">
        <span aria-hidden="true">◎</span>
        Explore
      </a>
      <button type="button" onClick={onOpenVisitList}>
        <span className="mobile-dock__count">{visitCount}</span>
        List
      </button>
      <a href={store.directionsUrl} target="_blank" rel="noreferrer">
        <span aria-hidden="true">↗</span>
        Directions
      </a>
      <a href={store.phone.href}>
        <span aria-hidden="true">◖</span>
        Call
      </a>
    </nav>
  );
}
