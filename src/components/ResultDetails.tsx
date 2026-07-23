import { useState } from 'react'
import {
  statusLabels,
  trendLabels,
  trendSymbols,
} from '../data/labResults'
import type { LabResult } from '../types/clinical'

type ResultDetailsProps = {
  result: LabResult
  isReviewed: boolean
  onToggleReviewed: () => void
}

export function ResultDetails({
  result,
  isReviewed,
  onToggleReviewed,
}: ResultDetailsProps) {
  const historyDates = [
    '19 Mar',
    '17 Apr',
    '15 May',
    '20 Jun',
    result.id === 'hba1c' ? '22 Jul' : '23 Jul',
  ]
  const [selectedHistoryIndex, setSelectedHistoryIndex] = useState(
    result.history.length - 1,
  )
  const highestHistoryValue = Math.max(...result.history)
  const selectedHistoryValue = result.history[selectedHistoryIndex]
  const selectedHistoryDate = historyDates[selectedHistoryIndex]

  return (
    <aside className="detail-panel" aria-labelledby="detail-title">
      <div className="detail-topline">
        <p>Selected result</p>
        <span className={`status-chip status-chip--${result.status}`}>
          <span aria-hidden="true" />
          {statusLabels[result.status]}
        </span>
      </div>
      <div className="detail-heading">
        <span className="test-symbol" aria-hidden="true">
          {result.shortName}
        </span>
        <div>
          <h2 id="detail-title">{result.test}</h2>
          <p>{result.category}</p>
        </div>
      </div>
      <div className="detail-value">
        <strong>{result.displayValue}</strong>
        <span>{result.unit}</span>
      </div>
      <dl className="detail-facts">
        <div>
          <dt>Reference range</dt>
          <dd>{result.referenceRange}</dd>
        </div>
        <div>
          <dt>Trend</dt>
          <dd>
            <span
              className={`trend trend--${result.trend}`}
              aria-hidden="true"
            >
              {trendSymbols[result.trend]}
            </span>{' '}
            {trendLabels[result.trend]}
          </dd>
        </div>
        <div>
          <dt>Collected</dt>
          <dd>
            <time dateTime={result.collectedAt}>{result.collectedLabel}</time>
          </dd>
        </div>
      </dl>
      <div className="trend-history">
        <div className="history-heading">
          <h3>Recent history</h3>
          <span>Select an observation</span>
        </div>
        <output aria-live="polite">
          <strong>{selectedHistoryValue}</strong>
          <span>{result.unit}</span>
          <small>{selectedHistoryDate}</small>
        </output>
        <ol aria-label={`Recent ${result.test} values`}>
          {result.history.map((value, index) => (
            <li key={`${result.id}-${value}-${index}`}>
              <button
                type="button"
                aria-label={`${historyDates[index]}: ${value} ${result.unit}`}
                aria-pressed={selectedHistoryIndex === index}
                onClick={() => setSelectedHistoryIndex(index)}
              >
                <span
                  style={{
                    height: `${Math.max(
                      (value / highestHistoryValue) * 100,
                      12,
                    )}%`,
                  }}
                />
              </button>
            </li>
          ))}
        </ol>
        <div className="history-axis" aria-hidden="true">
          <span>Earlier</span>
          <span>Latest</span>
        </div>
      </div>
      <div className="interpretation">
        <h3>Result context</h3>
        <p>{result.note}</p>
      </div>
      {result.status !== 'normal' && (
        <div className={`review-workflow${isReviewed ? ' is-reviewed' : ''}`}>
          <div aria-live="polite">
            <span aria-hidden="true">{isReviewed ? '✓' : '!'}</span>
            <div>
              <h3>{isReviewed ? 'Result reviewed' : 'Review required'}</h3>
              <p>
                {isReviewed
                  ? 'This result has been removed from the attention queue.'
                  : 'Acknowledge this result after reviewing its context.'}
              </p>
            </div>
          </div>
          <button type="button" onClick={onToggleReviewed}>
            {isReviewed ? 'Return to review queue' : 'Mark as reviewed'}
          </button>
        </div>
      )}
      <p className="detail-disclaimer">
        Educational interface only—not for clinical decision-making.
      </p>
    </aside>
  )
}
