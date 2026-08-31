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
          <span className="status-dot status-dot--pulse" /> Adult access protocol
        </div>
        <Logo />

        {!declined ? (
          <>
            <div className="age-card__copy">
              <p className="age-card__index">ENTRY // 21+</p>
              <h1 id="age-title">Confirm adult access.</h1>
              <p>
                This independent concept experience is intended for adults 21 and older. It does not process purchases or verify identity.
              </p>
            </div>
            <div className="age-card__actions">
              <button
                ref={enterRef}
                className="button button--primary button--wide"
                type="button"
                onClick={onEnter}
              >
                <span>I am 21+ — enter</span>
                <span aria-hidden="true">↗</span>
              </button>
              <button
                className="button button--ghost button--wide"
                type="button"
                onClick={() => setDeclined(true)}
              >
                Exit experience
              </button>
            </div>
          </>
        ) : (
          <div className="age-card__copy age-card__copy--declined">
            <p className="age-card__index">ACCESS // PAUSED</p>
            <h1>Experience closed.</h1>
            <p>No store content has been unlocked on this device.</p>
            <button
              ref={enterRef}
              className="button button--ghost button--wide"
              type="button"
              onClick={() => setDeclined(false)}
            >
              Return to confirmation
            </button>
          </div>
        )}

        <p className="age-card__legal">
          Concept presentation only. In-store age verification and all applicable laws still apply.
        </p>
      </section>
    </div>
  );
}
