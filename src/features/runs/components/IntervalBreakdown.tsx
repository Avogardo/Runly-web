import { type FC } from 'react'
import { GlassCard } from '@/ui'

import { INTERVAL_BAR_WIDTH_DIVISOR, INTERVAL_BAR_MIN_WIDTH_PX } from '../consts'
import { IntervalLabels, IntervalSummary } from '../types'

type IntervalBreakdownProps = {
  intervals: IntervalSummary
  labels: IntervalLabels
}

export const IntervalBreakdown: FC<IntervalBreakdownProps> = ({ intervals, labels }) => {
  const { config, intervals: completed } = intervals
  const heavyCount = completed.filter((i) => i.type === 'heavy').length
  const lightCount = completed.filter((i) => i.type === 'light').length

  return (
    <GlassCard className="p-5 sm:p-6">
      <h3 className="text-base sm:text-lg font-semibold text-white mb-4">{labels.title}</h3>

      {/* Config summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-white/40">{labels.planned}</span>
          <span className="text-white font-medium">
            {config.total} {labels.intervals}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-white/40">{labels.heavy}</span>
          <span className="text-white font-medium">{config.heavyDurationSec}s</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-white/40">{labels.light}</span>
          <span className="text-white font-medium">{config.lightDurationSec}s</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-white/40">{labels.completed}</span>
          <span className="text-emerald-400 font-medium">
            {completed.length} / {config.total}
          </span>
        </div>
      </div>

      {/* Interval bars */}
      <div className="flex gap-1 flex-wrap">
        {completed.map((interval, i) => (
          <div
            key={i}
            className={`h-6 rounded-md flex items-center justify-center text-[10px] font-medium ${
              interval.type === 'heavy'
                ? 'bg-purple-500/30 text-purple-300 border border-purple-500/30'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/20'
            }`}
            style={{
              width: `${Math.max(interval.duration / INTERVAL_BAR_WIDTH_DIVISOR, INTERVAL_BAR_MIN_WIDTH_PX)}px`,
            }}
            title={`${interval.type} — ${interval.duration}s`}
          >
            {interval.type === 'heavy' ? 'H' : 'L'}
          </div>
        ))}
      </div>

      <div className="mt-3 text-xs text-white/35">
        {heavyCount} {labels.heavyLabel} · {lightCount} {labels.lightLabel}
        {config.voiceEnabled && ` · 🔊 ${labels.voiceEnabled}`}
      </div>
    </GlassCard>
  )
}
