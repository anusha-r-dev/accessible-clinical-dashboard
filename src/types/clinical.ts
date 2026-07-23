export type ResultStatus = 'normal' | 'high' | 'low' | 'critical'
export type ResultFilter = 'all' | 'attention' | 'critical' | 'normal'
export type Trend = 'up' | 'down' | 'stable'
export type InformationDialogType = 'profile' | 'data'

export type LabResult = {
  id: string
  test: string
  shortName: string
  category: string
  displayValue: string
  unit: string
  referenceRange: string
  status: ResultStatus
  trend: Trend
  collectedAt: string
  collectedLabel: string
  history: number[]
  note: string
}
