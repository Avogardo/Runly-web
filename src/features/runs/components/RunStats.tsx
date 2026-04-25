import { type FC } from 'react'
import { formatDistance, formatDuration, formatPace } from '@/utils'
import GlassCard from '@/components/ui/GlassCard'
import {StatCard} from "./StatCard";

import {formatDateTime} from "../utils";

type Props = {
  distance: number
  duration: number
  startedAt: Date
  endedAt: Date
}

export const RunStats: FC<Props> = ({ distance, duration, startedAt, endedAt }) => {
  return (
    <GlassCard className="p-4 sm:p-6 flex flex-col gap-4">
      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        <StatCard label="Distance" value={formatDistance(distance)} accent />
        <StatCard label="Duration" value={formatDuration(duration)} />
        <StatCard label="Avg Pace" value={formatPace(distance, duration)} />
        <StatCard label="Date" value={startedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })} />
      </div>

      {/* Time range */}
      <div className="text-xs sm:text-sm text-foreground-muted">
        {formatDateTime(startedAt)} → {formatDateTime(endedAt)}
      </div>
    </GlassCard>
  )
}

