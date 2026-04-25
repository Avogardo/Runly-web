import { type FC } from 'react'
import Link from 'next/link'
import { formatDistance, cn } from '@/utils'

type DayCellProps = {
  dayNumber: number
  isToday: boolean
  isSelected: boolean
  runCount: number
  totalDistance: number
  yearMonth: string
  runsLabel: string
}

export const DayCell: FC<DayCellProps> = ({
  dayNumber,
  isToday,
  isSelected,
  runCount,
  totalDistance,
  yearMonth,
  runsLabel,
}) => {
  const href = isSelected ? `/?month=${yearMonth}` : `/?month=${yearMonth}&day=${dayNumber}`

  return (
    <Link
      href={href}
      className={cn(
        'relative flex flex-col items-stretch justify-between p-1.5 sm:p-2 rounded-xl min-h-16 sm:min-h-18 transition-all duration-200',
        isSelected
          ? 'bg-purple-500/20 ring-1 ring-purple-500 shadow-[0_0_16px_rgba(168,85,247,0.2)]'
          : isToday
            ? 'bg-white/10 ring-1 ring-purple-400/40 hover:bg-white/15'
            : runCount > 0
              ? 'bg-white/[0.05] hover:bg-white/10 border border-white/[0.06]'
              : 'bg-white/[0.02] hover:bg-white/[0.06]',
      )}
    >
      <span
        className={cn(
          'text-xs sm:text-sm font-semibold leading-none',
          isSelected ? 'text-white' : isToday ? 'text-purple-300' : 'text-white/60',
        )}
      >
        {dayNumber}
      </span>

      {runCount > 0 && (
        <div className="flex flex-col gap-0.5 mt-auto">
          <span className="text-[10px] sm:text-xs text-emerald-400 font-medium leading-none truncate">
            {formatDistance(totalDistance)}
          </span>
          {runCount > 1 && (
            <span className="text-[9px] sm:text-[10px] text-white/45 leading-none">
              {runCount} {runsLabel}
            </span>
          )}
        </div>
      )}

      {runCount > 0 && (
        <span
          className={cn(
            'absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full',
            isSelected ? 'bg-purple-400' : 'bg-emerald-400',
          )}
        />
      )}
    </Link>
  )
}
