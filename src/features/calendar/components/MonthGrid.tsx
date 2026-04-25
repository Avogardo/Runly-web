import { type FC } from 'react'
import type { CalendarDay } from '@/features/calendar/types'
import GlassCard from '@/components/ui/GlassCard'
import {DayCell} from './DayCell'

type RunSummary = {
  distance: number
  duration: number
}

type Props = {
  calendarDays: CalendarDay[]
  runsByDay: Map<number, RunSummary[]>
  selectedDay: number | null
  yearMonth: string
  dayNames: string[]
  runsLabel: string
}

export const MonthGrid: FC<Props> = ({ calendarDays, runsByDay, selectedDay, yearMonth, dayNames, runsLabel }) => {
  return (
    <GlassCard className="p-3 sm:p-4">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-1">
        {dayNames.map((name) => (
          <div key={name} className="text-center text-[10px] sm:text-xs font-medium text-white/35 py-2 uppercase tracking-wider">
            {name}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => {
          if (!day.isCurrentMonth) {
            return <div key={`empty-${index}`} className="min-h-16 sm:min-h-18" />
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
              runsLabel={runsLabel}
            />
          )
        })}
      </div>
    </GlassCard>
  )
}

