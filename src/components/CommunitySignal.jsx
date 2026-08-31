const signals = [
  {
    index: '01',
    label: 'Selection',
    title: 'Broad local variety',
    copy: 'Public reviews often mention a wide selection and reliable stock.',
  },
  {
    index: '02',
    label: 'Convenience',
    title: 'Quick in-store visits',
    copy: 'Several public reviews describe the shop as fast and convenient for regular purchases.',
  },
  {
    index: '03',
    label: 'Service',
    title: 'Helpful store team',
    copy: 'Knowledgeable and welcoming service appears repeatedly in public feedback.',
  },
  {
    index: '04',
    label: 'Value',
    title: 'Competitive local pricing',
    copy: 'Reasonable pricing is a recurring review theme, pending confirmation from the owner.',
  },
];

export function CommunitySignal() {
  return (
    <section className="section section--community" aria-labelledby="community-title">
      <div className="section-heading reveal">
        <div>
          <p className="section-kicker">04 // What customers mention</p>
          <h2 id="community-title">Helpful service and a broad selection.</h2>
        </div>
        <p>
          These themes appear often in public reviews. The owner should verify every business claim before
          the site becomes official.
        </p>
      </div>

      <div className="signal-matrix reveal">
        {signals.map((signal) => (
          <article key={signal.index} className="signal-matrix__cell">
            <span>{signal.index}</span>
            <div>
              <small>{signal.label}</small>
              <h3>{signal.title}</h3>
              <p>{signal.copy}</p>
            </div>
            <i aria-hidden="true" />
          </article>
        ))}
      </div>
      <p className="source-note reveal">Based on public-review themes. Exact claims require owner approval.</p>
    </section>
  );
}
