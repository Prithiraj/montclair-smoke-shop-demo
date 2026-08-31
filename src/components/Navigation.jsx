import { Logo } from './Logo.jsx';

export function Navigation({
  theme,
  onThemeToggle,
  reduceMotion,
  onMotionToggle,
  visitCount,
  onOpenVisitList,
  store,
}) {
  return (
    <header className="topbar">
      <a className="topbar__brand" href="#top" aria-label="Montclair Smoke Shop concept home">
        <Logo compact />
      </a>

      <nav className="topbar__nav" aria-label="Primary navigation">
        <a href="#channels">Categories</a>
        <a href="#explore">Browse</a>
        <a href="#visit">Visit</a>
      </nav>

      <div className="topbar__actions">
        <span className="concept-chip">Independent concept</span>
        <button
          className="topbar-button topbar-button--icon"
          type="button"
          onClick={onThemeToggle}
          aria-label={`Switch to ${theme === 'obsidian' ? 'Chrome Ember' : 'Obsidian'} theme`}
          title="Switch theme"
        >
          <span aria-hidden="true">{theme === 'obsidian' ? '◐' : '◑'}</span>
        </button>
        <button
          className={`topbar-button topbar-button--icon${reduceMotion ? ' is-active' : ''}`}
          type="button"
          onClick={onMotionToggle}
          aria-pressed={reduceMotion}
          aria-label={reduceMotion ? 'Enable full motion' : 'Reduce motion'}
          title={reduceMotion ? 'Enable full motion' : 'Reduce motion'}
        >
          <span aria-hidden="true">≈</span>
        </button>
        <button className="topbar-button topbar-button--list" type="button" onClick={onOpenVisitList}>
          Visit list <span>{visitCount}</span>
        </button>
        <a className="topbar-button topbar-button--call" href={store.phone.href}>
          Call
        </a>
      </div>
    </header>
  );
}
