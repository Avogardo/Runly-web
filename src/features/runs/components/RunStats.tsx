import { type FC } from 'react'
import { LOCALE_MAP, DEFAULT_LOCALE } from '@/consts'
import { GlassCard } from '@/ui'
import { formatDistance, formatDuration, formatPace } from '@/utils'

import { StatsLabels } from '../types'
import { formatDateTime } from '../utils'
import { StatCard } from './StatCard'

type RunStatsProps = {
  distance: number
  duration: number
  startedAt: Date
  endedAt: Date
  labels: StatsLabels
  lng: string
}

export const RunStats: FC<RunStatsProps> = ({
  distance,
  duration,
  startedAt,
  endedAt,
  labels,
  lng,
}) => {
  const dateLocale = LOCALE_MAP[lng] ?? DEFAULT_LOCALE

  return (
    <GlassCard className="p-4 sm:p-6 flex flex-col gap-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        <StatCard label={labels.distance} value={formatDistance(distance)} accent />
        <StatCard label={labels.duration} value={formatDuration(duration)} />
        <StatCard label={labels.avgPace} value={formatPace(distance, duration)} />
        <StatCard
          label={labels.date}
          value={startedAt.toLocaleDateString(dateLocale, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            timeZone: 'UTC',
          })}
        />
      </div>

      <div className="text-xs sm:text-sm text-foreground-muted">
        {formatDateTime(startedAt, dateLocale)} → {formatDateTime(endedAt, dateLocale)}
      </div>
    </GlassCard>
  )
}
