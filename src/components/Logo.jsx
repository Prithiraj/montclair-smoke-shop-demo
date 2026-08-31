export function Logo({ compact = false, monochrome = false }) {
  return (
    <span
      className={`brand-lockup${compact ? ' brand-lockup--compact' : ''}${
        monochrome ? ' brand-lockup--mono' : ''
      }`}
    >
      <svg className="brand-mark" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="18" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle
          cx="24"
          cy="24"
          r="10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="3 4"
        />
        <path d="M24 3v8M24 37v8M3 24h8M37 24h8" stroke="currentColor" strokeWidth="1.5" />
        <path d="m17 28 7-13 7 13-7 5-7-5Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="24" cy="24" r="2.4" fill="currentColor" />
      </svg>
      <span className="brand-copy">
        <span className="brand-copy__primary">MONTCLAIR</span>
        {!compact && <span className="brand-copy__secondary">SMOKE SHOP</span>}
      </span>
      {!compact && <span className="brand-code">// SIGNAL 127</span>}
    </span>
  );
}
