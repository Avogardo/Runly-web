import Link from 'next/link'
import { formatDistance, formatDuration, formatPace } from '@/lib/utils'
import GlassCard from '@/components/ui/GlassCard'

type Run = {
  id: string
  startedAt: Date
  distance: number
  duration: number
}

type Props = {
  day: number
  month: number
  year: number
  runs: Run[]
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  })
}

export default function DayRunsList({ day, month, year, runs }: Props) {
  const dateLabel = new Date(Date.UTC(year, month - 1, day)).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })

  return (
    <GlassCard className="p-5 sm:p-6">
      <h3 className="text-base sm:text-lg font-semibold text-white mb-4">{dateLabel}</h3>

      {runs.length === 0 ? (
        <p className="text-foreground-muted text-sm">No runs on this day.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {runs.map((run) => (
            <Link
              key={run.id}
              href={`/run/${run.id}`}
              className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/[0.06] hover:border-purple-500/20 transition-all duration-200 group hover:shadow-[0_0_12px_rgba(168,85,247,0.08)]"
            >
              <div className="flex flex-col gap-1 min-w-14 sm:min-w-15">
                <span className="text-foreground-muted text-xs">{formatTime(run.startedAt)}</span>
                <span className="text-emerald-400 font-semibold text-sm">
                  {formatDistance(run.distance)}
                </span>
              </div>

              <div className="flex gap-4 sm:gap-6 text-right">
                <div className="flex flex-col gap-1">
                  <span className="text-foreground-muted text-[10px] sm:text-xs uppercase tracking-wider">Duration</span>
                  <span className="text-white/80 text-sm font-medium">
                    {formatDuration(run.duration)}
                  </span>
                </div>
                <div className="flex flex-col gap-1 hidden sm:flex">
                  <span className="text-foreground-muted text-xs uppercase tracking-wider">Pace</span>
                  <span className="text-white/80 text-sm font-medium">
                    {formatPace(run.distance, run.duration)}
                  </span>
                </div>
              </div>

              <span className="text-purple-400 ml-2 sm:ml-4 transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>
          ))}
        </div>
      )}
    </GlassCard>
  )
}
