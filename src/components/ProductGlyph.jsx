import { useId } from 'react';

function GlassGlyph() {
  return (
    <>
      <path d="M72 36h48l-8 24v28c0 10 12 17 12 34 0 23-18 42-42 42s-42-19-42-42c0-17 12-24 12-34V60l-8-24h28Z" />
      <path d="M57 62h54M62 112c12-7 28-7 40 0" />
      <circle cx="82" cy="130" r="14" />
    </>
  );
}

function RollingGlyph() {
  return (
    <>
      <rect x="38" y="55" width="124" height="82" rx="12" />
      <path d="M50 72h100M58 96h45M58 112h68" />
      <path d="m118 72 28 20-28 20Z" />
      <circle cx="62" cy="148" r="10" />
      <circle cx="138" cy="148" r="10" />
    </>
  );
}

function CigarGlyph() {
  return (
    <>
      <path d="M34 96c0-13 10-23 23-23h77c18 0 32 10 32 23s-14 23-32 23H57c-13 0-23-10-23-23Z" />
      <path d="M68 73v46M118 73v46" />
      <path d="M144 78c-5 7-7 13-7 18s2 11 7 18" />
      <path d="M44 82c-7-8-9-18-4-27M52 78c-2-12 1-21 9-28" />
    </>
  );
}

function HookahGlyph() {
  return (
    <>
      <path d="M78 33h44M87 33v24h26V33" />
      <path d="M100 57v28" />
      <path d="M72 91c0-12 13-21 28-21s28 9 28 21c0 9-8 17-13 24-5 7-7 15-7 26H92c0-11-2-19-7-26-5-7-13-15-13-24Z" />
      <path d="M82 141h36l8 22H74l8-22Z" />
      <path d="M126 78c24 4 35 18 29 42-3 10 1 19 11 26" />
    </>
  );
}

function DeviceGlyph() {
  return (
    <>
      <rect x="66" y="35" width="68" height="130" rx="21" />
      <rect x="78" y="51" width="44" height="65" rx="12" />
      <circle cx="100" cy="138" r="10" />
      <path d="M88 30V18h24v12M84 70h32M84 84h24" />
    </>
  );
}

function AccessoryGlyph() {
  return (
    <>
      <circle cx="100" cy="100" r="62" />
      <circle cx="100" cy="100" r="42" />
      <path d="m100 58 36 21v42l-36 21-36-21V79l36-21Z" />
      <path d="M64 79l36 21 36-21M100 100v42" />
    </>
  );
}

const glyphs = {
  glass: GlassGlyph,
  rolling: RollingGlyph,
  cigars: CigarGlyph,
  hookah: HookahGlyph,
  vapor: DeviceGlyph,
  accessories: AccessoryGlyph,
};

export function ProductGlyph({ product, large = false }) {
  const Glyph = glyphs[product.category] ?? AccessoryGlyph;
  const instanceId = useId().replaceAll(':', '');
  const gradientId = `glyph-${product.id}-${instanceId}`;

  return (
    <svg
      className={`product-glyph${large ? ' product-glyph--large' : ''}`}
      viewBox="0 0 200 200"
      role="img"
      aria-label={`${product.name} conceptual illustration`}
    >
      <defs>
        <linearGradient id={gradientId} x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f3f7fa" stopOpacity="0.92" />
          <stop offset="0.48" stopColor={product.accent} />
          <stop offset="1" stopColor={product.accent} stopOpacity="0.2" />
        </linearGradient>
        <filter id={`${gradientId}-glow`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#${gradientId}-glow)`}
      >
        <Glyph />
      </g>
    </svg>
  );
}
