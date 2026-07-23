import type { ResultFilter } from '../types/clinical'

type SummaryCardProps = {
  kind: 'total' | 'attention' | 'critical' | 'updated'
  label: string
  value: string
  detail: string
  icon: string
  filter?: ResultFilter
  onSelectFilter: (filter: ResultFilter) => void
}

function SummaryCard({
  kind,
  label,
  value,
  detail,
  icon,
  filter,
  onSelectFilter,
}: SummaryCardProps) {
  const content = (
    <>
      <span
        className={`summary-icon summary-icon--${kind}`}
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className="summary-card__content">
        <span className="summary-label">{label}</span>
        <strong className={kind === 'updated' ? 'summary-time' : ''}>
          {value}
        </strong>
        <span className="summary-detail">{detail}</span>
        {filter && <span className="summary-cta">View results →</span>}
      </span>
    </>
  )

  return filter ? (
    <button
      className="summary-card summary-card--action"
      type="button"
      onClick={() => onSelectFilter(filter)}
    >
      {content}
    </button>
  ) : (
    <article className="summary-card">{content}</article>
  )
}

type ResultsSummaryProps = {
  totalCount: number
  attentionCount: number
  criticalCount: number
  onSelectFilter: (filter: ResultFilter) => void
}

export function ResultsSummary({
  totalCount,
  attentionCount,
  criticalCount,
  onSelectFilter,
}: ResultsSummaryProps) {
  return (
    <section className="summary-grid" aria-label="Results summary">
      <SummaryCard
        kind="total"
        label="Total results"
        value={String(totalCount)}
        detail="Across 3 panels"
        icon="08"
        filter="all"
        onSelectFilter={onSelectFilter}
      />
      <SummaryCard
        kind="attention"
        label="Needs attention"
        value={String(attentionCount)}
        detail="Awaiting review"
        icon="!"
        filter="attention"
        onSelectFilter={onSelectFilter}
      />
      <SummaryCard
        kind="critical"
        label="Critical findings"
        value={String(criticalCount)}
        detail="Highest priority"
        icon="!!"
        filter="critical"
        onSelectFilter={onSelectFilter}
      />
      <SummaryCard
        kind="updated"
        label="Last updated"
        value="8:42 AM"
        detail="Today, 23 July"
        icon="↻"
        onSelectFilter={onSelectFilter}
      />
    </section>
  )
}
