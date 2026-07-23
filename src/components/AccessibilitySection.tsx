const principles = [
  {
    number: '01',
    title: 'Semantic structure',
    description:
      'Landmarks, headings, tables, labels, and status text make the interface understandable beyond its visual design.',
  },
  {
    number: '02',
    title: 'Keyboard ready',
    description:
      'Every control uses native HTML behavior with visible focus states and a skip link for faster navigation.',
  },
  {
    number: '03',
    title: 'Color independent',
    description:
      'Statuses combine color with readable labels and symbols so meaning never relies on color alone.',
  },
]

export function AccessibilitySection() {
  return (
    <section className="about-section" id="about">
      <div>
        <p className="eyebrow">Built for inclusion</p>
        <h2>Accessible by design, not as an afterthought.</h2>
      </div>
      <div className="principle-grid">
        {principles.map((principle) => (
          <article key={principle.number}>
            <span aria-hidden="true">{principle.number}</span>
            <h3>{principle.title}</h3>
            <p>{principle.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
