import {
  statusLabels,
  trendLabels,
  trendSymbols,
} from '../data/labResults'
import type { LabResult } from '../types/clinical'

type ResultsTableProps = {
  results: LabResult[]
  selectedResultId: string
  onSelectResult: (id: string) => void
  onClearFilters: () => void
  reviewedResultIds: ReadonlySet<string>
}

export function ResultsTable({
  results,
  selectedResultId,
  onSelectResult,
  onClearFilters,
  reviewedResultIds,
}: ResultsTableProps) {
  return (
    <div className="table-card">
      <div className="table-scroll">
        <table>
          <caption className="visually-hidden">
            Synthetic laboratory results with values, reference ranges, status,
            trends, and collection time
          </caption>
          <thead>
            <tr>
              <th scope="col">Test</th>
              <th scope="col">Result</th>
              <th scope="col">Reference range</th>
              <th scope="col">Status</th>
              <th scope="col">Trend</th>
              <th scope="col">Collected</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr
                key={result.id}
                className={
                  selectedResultId === result.id ? 'is-selected' : ''
                }
              >
                <th scope="row">
                  <button
                    className="result-name"
                    type="button"
                    aria-pressed={selectedResultId === result.id}
                    onClick={() => onSelectResult(result.id)}
                  >
                    <span>{result.test}</span>
                    <small>{result.category}</small>
                  </button>
                </th>
                <td className="result-value">
                  <strong>{result.displayValue}</strong>
                  <span>{result.unit}</span>
                </td>
                <td>{result.referenceRange}</td>
                <td>
                  <span className="status-stack">
                    <span
                      className={`status-chip status-chip--${result.status}`}
                    >
                      <span aria-hidden="true" />
                      {statusLabels[result.status]}
                    </span>
                    {result.status !== 'normal' &&
                      reviewedResultIds.has(result.id) && (
                        <span className="reviewed-label">Reviewed</span>
                      )}
                  </span>
                </td>
                <td>
                  <span className={`trend trend--${result.trend}`}>
                    <span aria-hidden="true">
                      {trendSymbols[result.trend]}
                    </span>
                    <span className="visually-hidden">
                      {trendLabels[result.trend]}
                    </span>
                  </span>
                </td>
                <td>
                  <time dateTime={result.collectedAt}>
                    {result.collectedLabel}
                  </time>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {results.length === 0 && (
        <div className="empty-state" role="status">
          <span aria-hidden="true">⌕</span>
          <h3>No matching results</h3>
          <p>Try another search term or choose a different filter.</p>
          <button type="button" onClick={onClearFilters}>
            Clear search and filters
          </button>
        </div>
      )}
    </div>
  )
}
