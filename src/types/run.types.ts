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

export type Run = {
  id: string
  startedAt: string // ISO 8601
  endedAt: string // ISO 8601
  distance: number // meters
  duration: number // seconds
  path: Coordinate[]
  intervals?: IntervalSummary
}

