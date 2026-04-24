import type { CalendarDay } from '@/lib/calendar'
import DayCell from './DayCell'

type RunSummary = {
  distance: number
  duration: number
}

type Props = {
  calendarDays: CalendarDay[]
  runsByDay: Map<number, RunSummary[]>
  selectedDay: number | null
  yearMonth: string
}

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function MonthGrid({ calendarDays, runsByDay, selectedDay, yearMonth }: Props) {
  return (
    <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl p-4">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_NAMES.map((name) => (
          <div key={name} className="text-center text-xs font-medium text-white/35 py-2">
            {name}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => {
          if (!day.isCurrentMonth) {
            return <div key={`empty-${index}`} className="min-h-[72px]" />
          }

          const dayRuns = runsByDay.get(day.dayNumber) ?? []
          const totalDistance = dayRuns.reduce((sum, r) => sum + r.distance, 0)

          return (
            <DayCell
              key={day.dayNumber}
              dayNumber={day.dayNumber}
              isToday={day.isToday}
              isSelected={selectedDay === day.dayNumber}
              runCount={dayRuns.length}
              totalDistance={totalDistance}
              yearMonth={yearMonth}
            />
          )
        })}
      </div>
    </div>
  )
}

