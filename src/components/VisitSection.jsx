import { getHoursRows } from '../lib/storeStatus.js';

export function VisitSection({ store, status }) {
  const hours = getHoursRows(store);

  return (
    <section className="section section--visit" id="visit" aria-labelledby="visit-title">
      <div className="section-heading reveal">
        <div>
          <p className="section-kicker">05 // Navigate to Montclair</p>
          <h2 id="visit-title">Follow the signal home.</h2>
        </div>
        <p>
          The experience resolves into a practical destination: today’s status, direct calling, weekly hours, and turn-by-turn directions.
        </p>
      </div>

      <div className="visit-console glass-panel reveal">
        <div className="route-map" aria-hidden="true">
          <div className="route-map__grid" />
          <div className="route-map__scan" />
          <svg viewBox="0 0 760 520" preserveAspectRatio="none">
            <path className="route-map__road" d="M-40 430C110 390 120 265 270 272s144-126 286-117 132-106 244-82" />
            <path className="route-map__road route-map__road--secondary" d="M78 540c52-182 214-124 238-304S484 38 612-40" />
            <path className="route-map__signal" d="M40 454C174 407 134 300 293 294s139-113 275-116 116-74 177-99" />
          </svg>
          <div className="route-map__origin">
            <span />
            <small>You</small>
          </div>
          <div className="route-map__beacon">
            <i />
            <span>SIGNAL 127</span>
            <strong>{store.address.street}</strong>
          </div>
          <div className="route-map__coordinates">40.8259° N // 74.2090° W</div>
        </div>

        <div className="visit-console__panel">
          <div className="visit-status" data-open={status.isOpen}>
            <span className={`status-dot${status.isOpen ? ' status-dot--open status-dot--pulse' : ''}`} />
            <div>
              <span>Current store signal</span>
              <strong>{status.label}</strong>
            </div>
            <small>{status.detail}</small>
          </div>

          <div className="visit-address">
            <span>Destination</span>
            <h3>{store.address.street}</h3>
            <p>
              {store.address.city}, {store.address.state} {store.address.postalCode}
            </p>
          </div>

          <div className="visit-actions">
            <a className="button button--primary" href={store.directionsUrl} target="_blank" rel="noreferrer">
              Get directions <span aria-hidden="true">↗</span>
            </a>
            <a className="button button--ghost" href={store.phone.href}>
              Call {store.phone.display}
            </a>
          </div>

          <div className="hours-grid" aria-label="Weekly hours">
            {hours.map((row) => (
              <div key={row.day} className={status.day === row.day ? 'is-today' : ''}>
                <span>{row.label.slice(0, 3)}</span>
                <strong>{row.open}</strong>
                <i aria-hidden="true">—</i>
                <strong>{row.close}</strong>
              </div>
            ))}
          </div>

          <p className="verification-note">
            Hours are based on current public listings and should be confirmed directly with the store, especially on holidays.
          </p>
        </div>
      </div>
    </section>
  );
}
