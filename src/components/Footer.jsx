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
        <span>Contact</span>
        <a href={store.phone.href}>{store.phone.display}</a>
        <a href={store.directionsUrl} target="_blank" rel="noreferrer">
          {store.address.formatted} ↗
        </a>
      </div>
      <div className="footer__legal">
        <span>For adults 21 and older</span>
        <span>No checkout, accounts, or tracking</span>
        <span>© {new Date().getFullYear()} Concept presentation</span>
      </div>
    </footer>
  );
}
