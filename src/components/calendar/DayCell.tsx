import Link from 'next/link'
import { formatDistance } from '@/lib/utils'
import { cn } from '@/lib/utils'

type Props = {
  dayNumber: number
  isToday: boolean
  isSelected: boolean
  runCount: number
  totalDistance: number
  yearMonth: string
}

export default function DayCell({
  dayNumber,
  isToday,
  isSelected,
  runCount,
  totalDistance,
  yearMonth,
}: Props) {
  const href = isSelected
    ? `/?month=${yearMonth}` // deselect on second click
    : `/?month=${yearMonth}&day=${dayNumber}`

  return (
    <Link
      href={href}
      className={cn(
        'relative flex flex-col items-stretch justify-between p-2 rounded-xl min-h-[72px] transition-all duration-150',
        isSelected
          ? 'bg-purple-500/20 ring-1 ring-purple-500'
          : isToday
            ? 'bg-white/10 ring-1 ring-purple-400/50 hover:bg-white/[0.15]'
            : 'bg-white/[0.03] hover:bg-white/[0.08]',
      )}
    >
      {/* Day number */}
      <span
        className={cn(
          'text-sm font-semibold leading-none',
          isSelected ? 'text-white' : isToday ? 'text-purple-300' : 'text-white/70',
        )}
      >
        {dayNumber}
      </span>

      {/* Run stats */}
      {runCount > 0 && (
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-emerald-400 font-medium leading-none">
            {formatDistance(totalDistance)}
          </span>
          {runCount > 1 && (
            <span className="text-[10px] text-white/35 leading-none">{runCount}×</span>
          )}
        </div>
      )}

      {/* Run dot indicator */}
      {runCount > 0 && (
        <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-emerald-400" />
      )}
    </Link>
  )
}

