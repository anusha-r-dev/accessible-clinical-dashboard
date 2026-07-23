type HeroSectionProps = {
  onOpenProfile: () => void
}

export function HeroSection({ onOpenProfile }: HeroSectionProps) {
  return (
    <section className="hero-section" id="top">
      <div className="hero-copy">
        <p className="eyebrow">Accessible Clinical Results Dashboard</p>
        <h1>Make every result clear at a glance.</h1>
        <p className="hero-description">
          A keyboard-friendly dashboard for reviewing synthetic laboratory
          results, reference ranges, trends, and priority findings.
        </p>
      </div>
      <div className="patient-card" aria-label="Synthetic patient profile">
        <div className="patient-avatar" aria-hidden="true">
          AM
        </div>
        <div className="patient-identity">
          <div>
            <p className="patient-name">Avery Morgan</p>
            <span className="synthetic-label">Demo profile</span>
          </div>
          <p>46 years · Profile S-1042</p>
        </div>
        <dl className="patient-meta">
          <div>
            <dt>Collected</dt>
            <dd>23 Jul 2026</dd>
          </div>
          <div>
            <dt>Panel</dt>
            <dd>CBC · BMP · HbA1c</dd>
          </div>
        </dl>
        <button
          className="profile-action"
          type="button"
          aria-haspopup="dialog"
          onClick={onOpenProfile}
        >
          View demo profile
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </section>
  )
}
