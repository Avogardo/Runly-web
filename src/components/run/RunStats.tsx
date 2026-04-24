import { formatDistance, formatDuration, formatPace } from '@/lib/utils'

type Props = {
  distance: number
  duration: number
  startedAt: Date
  endedAt: Date
}

function formatDateTime(date: Date): string {
  return date.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  })
}

type StatCardProps = {
  label: string
  value: string
  accent?: boolean
}

function StatCard({ label, value, accent = false }: StatCardProps) {
  return (
    <div className="flex flex-col gap-1 bg-white/[0.04] rounded-xl p-4 border border-white/[0.06]">
      <span className="text-xs text-white/40 uppercase tracking-wider">{label}</span>
      <span className={`text-xl font-bold ${accent ? 'text-emerald-400' : 'text-white'}`}>
        {value}
      </span>
    </div>
  )
}

export default function RunStats({ distance, duration, startedAt, endedAt }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="Distance" value={formatDistance(distance)} accent />
        <StatCard label="Duration" value={formatDuration(duration)} />
        <StatCard label="Avg Pace" value={formatPace(distance, duration)} />
        <StatCard label="Date" value={startedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })} />
      </div>

      {/* Time range */}
      <div className="text-sm text-white/40">
        {formatDateTime(startedAt)} → {formatDateTime(endedAt)}
      </div>
    </div>
  )
}

