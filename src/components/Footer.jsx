import { Logo } from './Logo.jsx';

export function Footer({ store }) {
  return (
    <footer className="footer">
      <div className="footer__brand">
        <Logo />
        <p>
          An independent concept presentation for {store.publicName}. This demo is not the business’s official website and does not accept orders.
        </p>
      </div>
      <div className="footer__contact">
        <span>Direct signal</span>
        <a href={store.phone.href}>{store.phone.display}</a>
        <a href={store.directionsUrl} target="_blank" rel="noreferrer">
          {store.address.formatted} ↗
        </a>
      </div>
      <div className="footer__legal">
        <span>21+ concept experience</span>
        <span>No checkout · No accounts · No tracking</span>
        <span>© {new Date().getFullYear()} Concept presentation</span>
      </div>
    </footer>
  );
}
