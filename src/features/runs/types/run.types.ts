export type Coordinate = {
  latitude: number
  longitude: number
  timestamp: number
}

export type IntervalConfig = {
  total: number
  lightDurationSec: number
  heavyDurationSec: number
  startWithHeavy: boolean
  voiceEnabled: boolean
}

export type Interval = {
  type: 'light' | 'heavy'
  startedAt: number
  endedAt: number
  duration: number
}

export type IntervalSummary = {
  config: IntervalConfig
  intervals: Interval[]
}

export type IntervalLabels = {
  title: string
  planned: string
  heavy: string
  light: string
  completed: string
  intervals: string
  heavyLabel: string
  lightLabel: string
}

export type StatsLabels = {
  distance: string
  duration: string
  avgPace: string
  date: string
}
