const signals = [
  {
    index: '01',
    label: 'Selection',
    title: 'Broad local variety',
    copy: 'Public reviews frequently mention a wide selection and consistent stock.',
  },
  {
    index: '02',
    label: 'Speed',
    title: 'Quick counter visits',
    copy: 'Several public reviews describe fast, convenient visits for regular purchases.',
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
    copy: 'Value and reasonable pricing are recurring themes, pending owner confirmation.',
  },
];

export function CommunitySignal() {
  return (
    <section className="section section--community" aria-labelledby="community-title">
      <div className="section-heading reveal">
        <div>
          <p className="section-kicker">04 // Community signal</p>
          <h2 id="community-title">Known locally. Reframed digitally.</h2>
        </div>
        <p>
          The concept translates recurring public-review themes into a restrained reputation system without fabricating testimonials.
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
      <p className="source-note reveal">Public-listing themes only. Exact claims and quotations require owner approval.</p>
    </section>
  );
}
