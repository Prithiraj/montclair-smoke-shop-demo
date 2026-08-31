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
    label: 'Crystal glass study',
    note: 'Clear, luminous, precise',
  },
  {
    id: 'chrome',
    shortLabel: 'Chrome',
    label: 'Polished chrome study',
    note: 'Reflective, architectural, clean',
  },
  {
    id: 'onyx',
    shortLabel: 'Onyx',
    label: 'Matte onyx study',
    note: 'Dark, quiet, sculptural',
  },
  {
    id: 'iridescent',
    shortLabel: 'Iridescent',
    label: 'Iridescent study',
    note: 'Reactive color, futuristic glow',
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
  const [hookahRotation, setHookahRotation] = useState(-0.18);
  const bootTimer = useRef(null);
  const hookahDrag = useRef(null);
  const status = useStoreStatus(store);

  const activeAccent = useMemo(() => {
    const active = categories.find((category) => category.id === activeCategory);
    if (active) return active.accent;
    return theme === 'ember' ? '#ffb66e' : '#63f5f2';
  }, [activeCategory, theme]);

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

  const startHookahDrag = (event) => {
    if (event.button !== undefined && event.button !== 0) return;
    event.currentTarget.setPointerCapture?.(event.pointerId);
    hookahDrag.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startRotation: hookahRotation,
    };
  };

  const moveHookahDrag = (event) => {
    const drag = hookahDrag.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    const delta = event.clientX - drag.startX;
    setHookahRotation(drag.startRotation + delta * 0.012);
  };

  const endHookahDrag = (event) => {
    const drag = hookahDrag.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    hookahDrag.current = null;
  };

  const rotateHookahWithKeyboard = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      setHookahRotation((value) => value - 0.22);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      setHookahRotation((value) => value + 0.22);
    }
  };

  return (
    <div className="app-shell" id="top">
      <div className="scroll-progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${scrollProgress})` }} />
      </div>
      <div className="ambient-field" aria-hidden="true" />
      <div className="site-vignette" aria-hidden="true" />
      <HookahScene
        accent={activeAccent}
        materialMode={hookahMaterial}
        rotation={hookahRotation}
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
                <span>Montclair,</span>
                <span className="gradient-text">elevated.</span>
              </h1>
              <p className="hero__lede">
                A cinematic preview of your local shop—browse the collection, assemble a private visit list,
                then call or navigate directly to Valley Road.
              </p>
              <div className="hero__actions">
                <a className="button button--primary" href="#explore">
                  Explore the collection <span aria-hidden="true">↘</span>
                </a>
                <a className="button button--ghost" href="#visit">
                  See the real location
                </a>
              </div>
              <div className="hero__protocols" aria-label="Experience characteristics">
                <span>21+ access</span>
                <span>Browse only</span>
                <span>Local visit list</span>
              </div>
            </div>

            <div className="hero__artifact-label hero__artifact-label--hookah">
              <span>OBJECT // 360° STUDY</span>
              <strong>Hookah material lab</strong>
              <small>Drag to rotate · select a concept finish</small>
            </div>

            <div
              className="hero__hookah-interaction"
              role="group"
              aria-label="Interactive hookah. Drag horizontally or use the left and right arrow keys to rotate."
              tabIndex="0"
              onPointerDown={startHookahDrag}
              onPointerMove={moveHookahDrag}
              onPointerUp={endHookahDrag}
              onPointerCancel={endHookahDrag}
              onLostPointerCapture={() => {
                hookahDrag.current = null;
              }}
              onKeyDown={rotateHookahWithKeyboard}
            >
              <span className="hero__drag-cue" aria-hidden="true">
                <i>←</i> Drag to rotate <i>→</i>
              </span>
            </div>

            <div className="hookah-materials glass-panel" aria-label="Hookah concept finish">
              <div className="hookah-materials__heading">
                <span>Concept finish</span>
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
              <p>Visual study only — not a claim about current store inventory.</p>
            </div>

            <StoreSignal store={store} status={status} />

            <a className="hero__scroll-cue" href="#channels" aria-label="Continue to collection channels">
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
