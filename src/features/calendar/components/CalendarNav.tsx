import { type FC } from 'react'
import Link from 'next/link'

type Props = {
  monthTitle: string
  prevMonth: string
  nextMonth: string
}

const btnClass =
  'w-10 h-10 flex items-center justify-center rounded-xl bg-surface hover:bg-white/12 border border-surface-border text-white text-lg transition-all duration-200 active:scale-95 hover:border-purple-500/30 hover:shadow-[0_0_12px_rgba(168,85,247,0.15)]'

export const CalendarNav: FC<Props> = ({ monthTitle, prevMonth, nextMonth }) => {
  return (
    <div className="flex items-center justify-between">
      <Link
        href={`/?month=${prevMonth}`}
        className={btnClass}
        aria-label="Previous month"
      >
        ←
      </Link>

      <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">{monthTitle}</h2>

      <Link
        href={`/?month=${nextMonth}`}
        className={btnClass}
        aria-label="Next month"
      >
        →
      </Link>
    </div>
  )
}

