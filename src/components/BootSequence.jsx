import { Logo } from './Logo.jsx';

export function BootSequence({ visible }) {
  if (!visible) return null;

  return (
    <div className="boot-sequence" role="status" aria-live="polite" aria-label="Loading the Montclair Smoke Shop demo">
      <div className="boot-sequence__ring" aria-hidden="true" />
      <Logo />
      <div className="boot-sequence__track">
        <span />
      </div>
      <p>Loading the shop demo</p>
    </div>
  );
}
