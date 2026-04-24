import { formatDistance, formatDuration, formatPace, formatDateTime } from '@/lib/utils'
import GlassCard from '@/components/ui/GlassCard'

type Props = {
  distance: number
  duration: number
  startedAt: Date
  endedAt: Date
}


type StatCardProps = {
  label: string
  value: string
  accent?: boolean
}

function StatCard({ label, value, accent = false }: StatCardProps) {
  return (
    <div className="flex flex-col gap-1.5 bg-white/4 rounded-xl p-3 sm:p-4 border border-white/6">
      <span className="text-[10px] sm:text-xs text-foreground-muted uppercase tracking-wider">{label}</span>
      <span className={`text-lg sm:text-xl font-bold ${accent ? 'text-emerald-400' : 'text-white'}`}>
        {value}
      </span>
    </div>
  )
}

export default function RunStats({ distance, duration, startedAt, endedAt }: Props) {
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

