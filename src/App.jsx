import { useEffect, useMemo, useRef, useState } from 'react';
import { AgePortal } from './components/AgePortal.jsx';
import { BootSequence } from './components/BootSequence.jsx';
import { CategoryOrbit } from './components/CategoryOrbit.jsx';
import { CommunitySignal } from './components/CommunitySignal.jsx';
import { Footer } from './components/Footer.jsx';
import { HookahScene } from './components/HookahScene.jsx';
import { MobileDock } from './components/MobileDock.jsx';
import { Navigation } from './components/Navigation.jsx';
import { ProductExplorer } from './components/ProductExplorer.jsx';
import { StoreSignal } from './components/StoreSignal.jsx';
import { VisitList } from './components/VisitList.jsx';
import { VisitSection } from './components/VisitSection.jsx';
import { categories, products } from './data/catalog.js';
import { store } from './data/store.js';
import { useStoreStatus } from './hooks/useStoreStatus.js';

const STORAGE_KEYS = {
  theme: 'montclair-signal-theme',
  motion: 'montclair-signal-reduce-motion',
  visitList: 'montclair-signal-visit-list',
  age: 'montclair-signal-age-ack',
};

const HOOKAH_FINISHES = [
  {
    id: 'crystal',
    shortLabel: 'Crystal',
    label: 'Crystal finish',
    note: 'Cool glass and silver',
  },
  {
    id: 'chrome',
    shortLabel: 'Chrome',
    label: 'Chrome finish',
    note: 'Polished metal and neutral light',
  },
  {
    id: 'onyx',
    shortLabel: 'Onyx',
    label: 'Onyx finish',
    note: 'Dark metal and warm light',
  },
  {
    id: 'iridescent',
    shortLabel: 'Iridescent',
    label: 'Iridescent finish',
    note: 'Cyan and magenta glow',
  },
];

function readLocal(key, fallback) {
  try {
    const value = window.localStorage.getItem(key);
    return value === null ? fallback : value;
  } catch {
    return fallback;
  }
}

function readSession(key, fallback) {
  try {
    const value = window.sessionStorage.getItem(key);
    return value === null ? fallback : value;
  } catch {
    return fallback;
  }
}

function initialVisitList() {
  try {
    const parsed = JSON.parse(readLocal(STORAGE_KEYS.visitList, '[]'));
    if (!Array.isArray(parsed)) return [];
    const knownIds = new Set(products.map((product) => product.id));
    return parsed.filter((id) => knownIds.has(id));
  } catch {
    return [];
  }
}

export default function App() {
  const systemPrefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const storedMotion = readLocal(STORAGE_KEYS.motion, null);
  const [theme, setTheme] = useState(() => readLocal(STORAGE_KEYS.theme, 'obsidian'));
  const [reduceMotion, setReduceMotion] = useState(() =>
    storedMotion === null ? systemPrefersReducedMotion : storedMotion === 'true',
  );
  const [ageAccepted, setAgeAccepted] = useState(() => readSession(STORAGE_KEYS.age, 'false') === 'true');
  const [booting, setBooting] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [visitList, setVisitList] = useState(initialVisitList);
  const [visitListOpen, setVisitListOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hookahMaterial, setHookahMaterial] = useState('crystal');
  const bootTimer = useRef(null);
  const status = useStoreStatus(store);

  const activeFinish = useMemo(
    () => HOOKAH_FINISHES.find((finish) => finish.id === hookahMaterial) || HOOKAH_FINISHES[0],
    [hookahMaterial],
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      'content',
      theme === 'ember' ? '#0a0705' : '#050609',
    );
    try {
      window.localStorage.setItem(STORAGE_KEYS.theme, theme);
    } catch {
      // Storage is an optional enhancement.
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion', reduceMotion);
    try {
      window.localStorage.setItem(STORAGE_KEYS.motion, String(reduceMotion));
    } catch {
      // Storage is an optional enhancement.
    }
  }, [reduceMotion]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEYS.visitList, JSON.stringify(visitList));
    } catch {
      // Storage is an optional enhancement.
    }
  }, [visitList]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const maximum = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
      setScrollProgress(Math.min(window.scrollY / maximum, 1));
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    const elements = [...document.querySelectorAll('.reveal')];
    if (reduceMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [reduceMotion, ageAccepted]);

  useEffect(
    () => () => {
      if (bootTimer.current) window.clearTimeout(bootTimer.current);
    },
    [],
  );

  const enterExperience = () => {
    try {
      window.sessionStorage.setItem(STORAGE_KEYS.age, 'true');
    } catch {
      // Session storage is an optional enhancement.
    }
    setAgeAccepted(true);
    setBooting(true);
    bootTimer.current = window.setTimeout(
      () => setBooting(false),
      reduceMotion ? 250 : 1850,
    );
  };

  const toggleVisitItem = (id) => {
    setVisitList((current) =>
      current.includes(id) ? current.filter((itemId) => itemId !== id) : [...current, id],
    );
  };

  return (
    <div className="app-shell" id="top">
      <div className="scroll-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${scrollProgress})` }} />
      </div>
      <div className="ambient-field" aria-hidden="true" />
      <div className="site-vignette" aria-hidden="true" />
      <HookahScene
        materialMode={hookahMaterial}
        scrollProgress={scrollProgress}
        reduceMotion={reduceMotion}
      />

      <AgePortal visible={!ageAccepted} onEnter={enterExperience} />
      <BootSequence visible={booting} />

      <div className="site-shell" aria-hidden={!ageAccepted || booting ? 'true' : undefined}>
        <Navigation
          theme={theme}
          onThemeToggle={() => setTheme((value) => (value === 'obsidian' ? 'ember' : 'obsidian'))}
          reduceMotion={reduceMotion}
          onMotionToggle={() => setReduceMotion((value) => !value)}
          visitCount={visitList.length}
          onOpenVisitList={() => setVisitListOpen(true)}
          store={store}
        />

        <main>
          <section className="hero hero--hookah" aria-labelledby="hero-title">
            <div className="hero__grid" aria-hidden="true" />
            <div className="hero__watermark" aria-hidden="true">360</div>

            <div className="hero__content">
              <p className="section-kicker hero__kicker">
                <span className={`status-dot${status.isOpen ? ' status-dot--open status-dot--pulse' : ''}`} />
                {status.label} // Montclair, New Jersey
              </p>
              <h1 id="hero-title">
                <span>Explore before</span>
                <span className="gradient-text">you visit.</span>
              </h1>
              <p className="hero__lede">
                Browse featured categories, save items you want to ask about in store, and get directions to
                127 Valley Road.
              </p>
              <div className="hero__actions">
                <a className="button button--primary" href="#explore">
                  Browse featured items <span aria-hidden="true">↘</span>
                </a>
                <a className="button button--ghost" href="#visit">
                  Get directions
                </a>
              </div>
              <div className="hero__protocols" aria-label="Store information">
                <span>21+ only</span>
                <span>In-store purchase</span>
                <span>Call to confirm</span>
              </div>
            </div>

            <div className="hero__artifact-label hero__artifact-label--hookah">
              <span>FEATURED VISUAL</span>
              <strong>Hookah concept artwork</strong>
              <small>Choose a finish to change the image</small>
            </div>

            <div className="hookah-materials glass-panel" aria-label="Hookah concept finish">
              <div className="hookah-materials__heading">
                <span>Artwork finish</span>
                <strong>{activeFinish.label}</strong>
                <small>{activeFinish.note}</small>
              </div>
              <div className="hookah-materials__options">
                {HOOKAH_FINISHES.map((finish) => (
                  <button
                    key={finish.id}
                    type="button"
                    className={hookahMaterial === finish.id ? 'is-active' : ''}
                    aria-pressed={hookahMaterial === finish.id}
                    onClick={() => setHookahMaterial(finish.id)}
                  >
                    <i aria-hidden="true" data-finish={finish.id} />
                    <span>{finish.shortLabel}</span>
                  </button>
                ))}
              </div>
              <p>Concept artwork only. Actual products and finishes may differ.</p>
            </div>

            <StoreSignal store={store} status={status} />

            <a className="hero__scroll-cue" href="#channels" aria-label="Continue to product categories">
              <span>Scroll to browse</span>
              <i aria-hidden="true" />
            </a>
          </section>

          <CategoryOrbit
            categories={categories}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />

          <ProductExplorer
            products={products}
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            visitList={visitList}
            onToggleVisit={toggleVisitItem}
            store={store}
          />

          <CommunitySignal />
          <VisitSection store={store} status={status} />
        </main>

        <Footer store={store} />
        <MobileDock
          store={store}
          visitCount={visitList.length}
          onOpenVisitList={() => setVisitListOpen(true)}
        />
      </div>

      <VisitList
        open={visitListOpen}
        onClose={() => setVisitListOpen(false)}
        itemIds={visitList}
        products={products}
        categories={categories}
        onToggle={toggleVisitItem}
        onClear={() => setVisitList([])}
        store={store}
      />
    </div>
  );
}
