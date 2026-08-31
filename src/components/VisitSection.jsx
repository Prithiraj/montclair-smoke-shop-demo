import { useState } from 'react';
import { getHoursRows } from '../lib/storeStatus.js';

export function VisitSection({ store, status }) {
  const hours = getHoursRows(store);
  const [locationView, setLocationView] = useState('map');
  const showingStorefront = locationView === 'storefront';

  return (
    <section className="section section--visit" id="visit" aria-labelledby="visit-title">
      <div className="section-heading reveal">
        <div>
          <p className="section-kicker">05 // Visit the store</p>
          <h2 id="visit-title">See the location before you go.</h2>
        </div>
        <p>
          Open the map, view the storefront, check today’s hours, or call the shop before you visit
          the store at 127 Valley Road.
        </p>
      </div>

      <div className="visit-console visit-console--real-location glass-panel reveal">
        <div className="location-media">
          <div className="location-media__switcher" role="group" aria-label="Location view">
            <button
              type="button"
              className={showingStorefront ? '' : 'is-active'}
              aria-pressed={!showingStorefront}
              onClick={() => setLocationView('map')}
            >
              Live map
            </button>
            <button
              type="button"
              className={showingStorefront ? 'is-active' : ''}
              aria-pressed={showingStorefront}
              onClick={() => setLocationView('storefront')}
            >
              Storefront
            </button>
          </div>

          <div className={`location-media__frame location-media__frame--map${showingStorefront ? '' : ' is-active'}`}>
            <iframe
              title={`Map showing ${store.publicName} at ${store.address.formatted}`}
              src={store.location.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>

          <div className={`location-media__frame location-media__frame--storefront${showingStorefront ? ' is-active' : ''}`}>
            <iframe
              title={`Street-level storefront view near ${store.publicName}`}
              src={store.location.streetViewEmbedUrl}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="location-media__veil" aria-hidden="true" />

          <div className="location-media__beacon">
            <span className="status-dot status-dot--open status-dot--pulse" />
            <div>
              <small>{showingStorefront ? 'Street-level view' : 'Store location'}</small>
              <strong>{store.address.street}</strong>
            </div>
          </div>

          <div className="location-media__coordinates">
            {store.location.latitude.toFixed(4)}° N // {Math.abs(store.location.longitude).toFixed(4)}° W
          </div>

          <a
            className="location-media__external"
            href={showingStorefront ? store.location.streetViewUrl : store.mapSearchUrl}
            target="_blank"
            rel="noreferrer"
          >
            Open {showingStorefront ? 'Street View' : 'full map'} ↗
          </a>
        </div>

        <div className="visit-console__panel">
          <div className="visit-status" data-open={status.isOpen}>
            <span className={`status-dot${status.isOpen ? ' status-dot--open status-dot--pulse' : ''}`} />
            <div>
              <span>Today’s status</span>
              <strong>{status.label}</strong>
            </div>
            <small>{status.detail}</small>
          </div>

          <div className="visit-address">
            <span>Address</span>
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

          <div className="location-trust-note">
            <span>Map and storefront view</span>
            <p>
              Street View may be older than the current storefront. Open the full map for the latest provider
              information.
            </p>
          </div>

          <p className="verification-note">
            Hours are based on current public listings and should be confirmed directly with the store,
            especially on holidays.
          </p>
        </div>
      </div>
    </section>
  );
}
