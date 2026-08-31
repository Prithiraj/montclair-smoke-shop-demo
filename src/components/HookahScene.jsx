import { useEffect, useRef, useState } from 'react';
import artworkPart1 from '../assets/hookahArtworkPart1.js';
import artworkPart2 from '../assets/hookahArtworkPart2.js';
import artworkPart3 from '../assets/hookahArtworkPart3.js';
import artworkPart4 from '../assets/hookahArtworkPart4.js';
import artworkPart5 from '../assets/hookahArtworkPart5.js';

const HOOKAH_ARTWORK = `data:image/webp;base64,${artworkPart1}${artworkPart2}${artworkPart3}${artworkPart4}${artworkPart5}`;
const VALID_FINISHES = new Set(['crystal', 'chrome', 'onyx', 'iridescent']);

export function HookahScene({ materialMode = 'crystal', scrollProgress = 0, reduceMotion = false }) {
  const stageRef = useRef(null);
  const frameRef = useRef(0);
  const [nearHero, setNearHero] = useState(() => window.scrollY < window.innerHeight * 1.08);
  const selectedMode = VALID_FINISHES.has(materialMode) ? materialMode : 'crystal';

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    const updatePointer = (event) => {
      if (reduceMotion) return;
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
      frameRef.current = window.requestAnimationFrame(() => {
        stage.style.setProperty('--visual-x', `${x * 18}px`);
        stage.style.setProperty('--visual-y', `${y * 12}px`);
        frameRef.current = 0;
      });
    };

    const resetPointer = () => {
      stage.style.setProperty('--visual-x', '0px');
      stage.style.setProperty('--visual-y', '0px');
    };

    window.addEventListener('pointermove', updatePointer, { passive: true });
    window.addEventListener('blur', resetPointer);
    return () => {
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
      window.removeEventListener('pointermove', updatePointer);
      window.removeEventListener('blur', resetPointer);
    };
  }, [reduceMotion]);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      setNearHero(window.scrollY < window.innerHeight * 1.08);
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className={`hookah-visual-stage${nearHero ? ' is-visible' : ' is-hidden'}${reduceMotion ? ' is-static' : ''}`}
      data-finish={selectedMode}
      style={{ '--visual-scroll': Math.min(scrollProgress * 10, 1) }}
      aria-hidden="true"
    >
      <div className="hookah-visual-stage__glow" />
      <div className="hookah-visual-stage__orbit hookah-visual-stage__orbit--one" />
      <div className="hookah-visual-stage__orbit hookah-visual-stage__orbit--two" />
      <div className="hookah-visual-stage__images">
        <img src={HOOKAH_ARTWORK} alt="" decoding="async" fetchPriority="high" />
      </div>
      <div className="hookah-visual-stage__floor" />
      <div className="hookah-visual-stage__scan" />
    </div>
  );
}
