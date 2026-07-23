import { resultFilters } from '../data/labResults'
import type { ResultFilter } from '../types/clinical'

type ResultsToolbarProps = {
  searchTerm: string
  activeFilter: ResultFilter
  visibleCount: number
  totalCount: number
  onSearchChange: (value: string) => void
  onFilterChange: (value: ResultFilter) => void
}

export function ResultsToolbar({
  searchTerm,
  activeFilter,
  visibleCount,
  totalCount,
  onSearchChange,
  onFilterChange,
}: ResultsToolbarProps) {
  return (
    <>
      <div className="section-title-row">
        <div>
          <p className="eyebrow">Laboratory</p>
          <h2>Recent results</h2>
        </div>
        <p className="result-count" aria-live="polite">
          Showing <strong>{visibleCount}</strong> of {totalCount} results
        </p>
      </div>

      <div className="toolbar">
        <div className="search-field">
          <label htmlFor="result-search">Search results</label>
          <span className="search-icon" aria-hidden="true" />
          <input
            id="result-search"
            type="search"
            placeholder="Search by test or panel"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>
        <div className="filter-group" aria-label="Filter laboratory results">
          {resultFilters.map((filter) => (
            <button
              className={activeFilter === filter.value ? 'is-active' : ''}
              type="button"
              key={filter.value}
              aria-pressed={activeFilter === filter.value}
              onClick={() => onFilterChange(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
