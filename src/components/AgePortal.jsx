import { useEffect, useRef, useState } from 'react';
import { Logo } from './Logo.jsx';

export function AgePortal({ visible, onEnter }) {
  const [declined, setDeclined] = useState(false);
  const enterRef = useRef(null);

  useEffect(() => {
    if (!visible) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => enterRef.current?.focus(), 60);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [visible, declined]);

  if (!visible) return null;

  return (
    <div className="age-portal" role="dialog" aria-modal="true" aria-labelledby="age-title">
      <div className="age-portal__scan" aria-hidden="true" />
      <div className="age-portal__grid" aria-hidden="true" />
      <div className="age-portal__ring age-portal__ring--one" aria-hidden="true" />
      <div className="age-portal__ring age-portal__ring--two" aria-hidden="true" />

      <section className="age-card">
        <div className="age-card__eyebrow">
          <span className="status-dot status-dot--pulse" /> Age requirement
        </div>
        <Logo />

        {!declined ? (
          <>
            <div className="age-card__copy">
              <p className="age-card__index">21+ ONLY</p>
              <h1 id="age-title">Are you 21 or older?</h1>
              <p>
                This demo is intended for adults 21 and older. It does not sell products or verify identity.
              </p>
            </div>
            <div className="age-card__actions">
              <button
                ref={enterRef}
                className="button button--primary button--wide"
                type="button"
                onClick={onEnter}
              >
                <span>Yes, I am 21 or older</span>
                <span aria-hidden="true">↗</span>
              </button>
              <button
                className="button button--ghost button--wide"
                type="button"
                onClick={() => setDeclined(true)}
              >
                No, leave this page
              </button>
            </div>
          </>
        ) : (
          <div className="age-card__copy age-card__copy--declined">
            <p className="age-card__index">21+ REQUIRED</p>
            <h1>Age requirement not met.</h1>
            <p>The shop content remains hidden.</p>
            <button
              ref={enterRef}
              className="button button--ghost button--wide"
              type="button"
              onClick={() => setDeclined(false)}
            >
              Return to age confirmation
            </button>
          </div>
        )}

        <p className="age-card__legal">
          In-store identification and all applicable laws still apply.
        </p>
      </section>
    </div>
  );
}
