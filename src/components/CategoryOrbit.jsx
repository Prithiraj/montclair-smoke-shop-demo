const positions = [
  ['50%', '8%'],
  ['82%', '28%'],
  ['82%', '72%'],
  ['50%', '92%'],
  ['18%', '72%'],
  ['18%', '28%'],
];

export function CategoryOrbit({ categories, activeCategory, onSelect }) {
  const selected =
    categories.find((category) => category.id === activeCategory) ?? {
      id: 'all',
      label: 'All categories',
      code: 'CAT-00',
      accent: '#63f5f2',
      description: 'Browse all of the sample categories included in this concept.',
    };

  const choose = (category) => {
    onSelect(category.id);
    const behavior = document.documentElement.classList.contains('reduce-motion') ? 'auto' : 'smooth';
    document.getElementById('explore')?.scrollIntoView({ behavior, block: 'start' });
  };

  return (
    <section className="section section--orbit" id="channels" aria-labelledby="channels-title">
      <div className="section-heading reveal">
        <div>
          <p className="section-kicker">02 // Product categories</p>
          <h2 id="channels-title">Choose what you want to browse.</h2>
        </div>
        <p>
          Select a category to jump to the sample catalog. Products, prices, and availability must be
          confirmed with the store.
        </p>
      </div>

      <div className="orbit-stage glass-panel reveal" style={{ '--orbit-accent': selected.accent }}>
        <div className="orbit-stage__grid" aria-hidden="true" />
        <div className="orbit-stage__ring orbit-stage__ring--one" aria-hidden="true" />
        <div className="orbit-stage__ring orbit-stage__ring--two" aria-hidden="true" />
        <div className="orbit-stage__ring orbit-stage__ring--three" aria-hidden="true" />
        <div className="orbit-stage__sweep" aria-hidden="true" />

        <div className="orbit-core" aria-hidden="true">
          <span>{selected.code}</span>
          <strong>{selected.label}</strong>
          <small>Selected category</small>
        </div>

        {categories.map((category, index) => {
          const active = category.id === activeCategory;
          return (
            <button
              key={category.id}
              type="button"
              className={`orbit-node${active ? ' is-active' : ''}`}
              style={{
                '--node-x': positions[index][0],
                '--node-y': positions[index][1],
                '--node-accent': category.accent,
              }}
              onClick={() => choose(category)}
              aria-pressed={active}
            >
              <span className="orbit-node__index">0{index + 1}</span>
              <strong>{category.label}</strong>
              <span className="orbit-node__code">{category.code}</span>
            </button>
          );
        })}

        <div className="orbit-stage__caption">
          <span>{selected.code}</span>
          <p>{selected.description}</p>
        </div>
      </div>
    </section>
  );
}
