import { useEffect, useMemo, useState } from 'react'

const storageKey = 'accessible-clinical-dashboard.reviewed-results'

function readStoredResultIds(): string[] {
  try {
    const storedValue = window.localStorage.getItem(storageKey)
    return storedValue ? (JSON.parse(storedValue) as string[]) : []
  } catch {
    return []
  }
}

export function useReviewedResults() {
  const [reviewedIds, setReviewedIds] = useState<string[]>(
    readStoredResultIds,
  )

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(reviewedIds))
    } catch {
      // Reviewing still works for the current session if storage is blocked.
    }
  }, [reviewedIds])

  const reviewedIdSet = useMemo(() => new Set(reviewedIds), [reviewedIds])

  function toggleReviewed(resultId: string) {
    setReviewedIds((currentIds) =>
      currentIds.includes(resultId)
        ? currentIds.filter((id) => id !== resultId)
        : [...currentIds, resultId],
    )
  }

  return {
    reviewedIdSet,
    toggleReviewed,
  }
}
