'use client'

import { useRouter } from 'next/navigation'

type Props = {
  monthTitle: string
  prevMonth: string
  nextMonth: string
}

const btnClass =
  'w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white text-lg transition-all active:scale-95'

export default function CalendarNav({ monthTitle, prevMonth, nextMonth }: Props) {
  const router = useRouter()

  return (
    <div className="flex items-center justify-between">
      <button
        onClick={() => router.push(`/?month=${prevMonth}`)}
        className={btnClass}
        aria-label="Previous month"
      >
        ←
      </button>

      <h2 className="text-2xl font-bold text-white tracking-tight">{monthTitle}</h2>

      <button
        onClick={() => router.push(`/?month=${nextMonth}`)}
        className={btnClass}
        aria-label="Next month"
      >
        →
      </button>
    </div>
  )
}

