import { useMemo, useState } from 'react'
import { AccessibilitySection } from './components/AccessibilitySection'
import { HeroSection } from './components/HeroSection'
import { InformationDialog } from './components/InformationDialog'
import { ResultDetails } from './components/ResultDetails'
import { ResultsSummary } from './components/ResultsSummary'
import { ResultsTable } from './components/ResultsTable'
import { ResultsToolbar } from './components/ResultsToolbar'
import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'
import { labResults } from './data/labResults'
import { useReviewedResults } from './hooks/useReviewedResults'
import type {
  InformationDialogType,
  ResultFilter,
} from './types/clinical'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState<ResultFilter>('all')
  const [selectedResultId, setSelectedResultId] = useState('potassium')
  const [activeDialog, setActiveDialog] =
    useState<InformationDialogType | null>(null)
  const { reviewedIdSet, toggleReviewed } = useReviewedResults()

  const visibleResults = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return labResults.filter((result) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        result.test.toLowerCase().includes(normalizedSearch) ||
        result.shortName.toLowerCase().includes(normalizedSearch) ||
        result.category.toLowerCase().includes(normalizedSearch)
      const matchesFilter =
        activeFilter === 'all' ||
        (activeFilter === 'attention' &&
          result.status !== 'normal' &&
          !reviewedIdSet.has(result.id)) ||
        (activeFilter === 'critical' && result.status === 'critical') ||
        (activeFilter === 'normal' && result.status === 'normal')

      return matchesSearch && matchesFilter
    })
  }, [activeFilter, reviewedIdSet, searchTerm])

  const selectedResult =
    labResults.find((result) => result.id === selectedResultId) ?? labResults[0]
  const attentionCount = labResults.filter(
    (result) =>
      result.status !== 'normal' && !reviewedIdSet.has(result.id),
  ).length
  const criticalCount = labResults.filter(
    (result) => result.status === 'critical',
  ).length

  function clearFilters() {
    setSearchTerm('')
    setActiveFilter('all')
  }

  function showFilteredResults(filter: ResultFilter) {
    setSearchTerm('')
    setActiveFilter(filter)
    document.getElementById('results')?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    })
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <SiteHeader onOpenDataInformation={() => setActiveDialog('data')} />

      <main id="main-content">
        <HeroSection onOpenProfile={() => setActiveDialog('profile')} />
        <ResultsSummary
          totalCount={labResults.length}
          attentionCount={attentionCount}
          criticalCount={criticalCount}
          onSelectFilter={showFilteredResults}
        />

        <section className="results-section" id="results">
          <ResultsToolbar
            searchTerm={searchTerm}
            activeFilter={activeFilter}
            visibleCount={visibleResults.length}
            totalCount={labResults.length}
            onSearchChange={setSearchTerm}
            onFilterChange={setActiveFilter}
          />
          <div className="results-layout">
            <ResultsTable
              results={visibleResults}
              selectedResultId={selectedResult.id}
              onSelectResult={setSelectedResultId}
              onClearFilters={clearFilters}
              reviewedResultIds={reviewedIdSet}
            />
            <ResultDetails
              key={selectedResult.id}
              result={selectedResult}
              isReviewed={reviewedIdSet.has(selectedResult.id)}
              onToggleReviewed={() => toggleReviewed(selectedResult.id)}
            />
          </div>
        </section>

        <AccessibilitySection />
      </main>

      <SiteFooter />

      {activeDialog && (
        <InformationDialog
          type={activeDialog}
          onClose={() => setActiveDialog(null)}
        />
      )}
    </div>
  )
}

export default App
