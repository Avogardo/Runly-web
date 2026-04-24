import { prisma } from '@/lib/db'
import {
  parseYearMonth,
  getCurrentYearMonth,
  getCalendarDays,
  getAdjacentMonths,
  formatMonthYear,
  getMonthDateRange,
} from '@/lib/calendar'
import CalendarNav from '@/components/calendar/CalendarNav'
import MonthGrid from '@/components/calendar/MonthGrid'
import DayRunsList from '@/components/calendar/DayRunsList'

type SearchParams = Promise<{ month?: string; day?: string }>

export default async function HomePage({ searchParams }: { searchParams: SearchParams }) {
  const { month: monthParam, day: dayParam } = await searchParams

  const yearMonth = monthParam ?? getCurrentYearMonth()
  const { year, month } = parseYearMonth(yearMonth)
  const selectedDay = dayParam ? Number(dayParam) : null

  const { start, end } = getMonthDateRange(year, month)

  const runs = await prisma.run.findMany({
    where: { startedAt: { gte: start, lt: end } },
    orderBy: { startedAt: 'asc' },
    select: {
      id: true,
      startedAt: true,
      endedAt: true,
      distance: true,
      duration: true,
    },
  })

  // Group runs by UTC day-of-month
  const runsByDay = new Map<number, typeof runs>()
  for (const run of runs) {
    const day = new Date(run.startedAt).getUTCDate()
    const existing = runsByDay.get(day)
    if (existing) {
      existing.push(run)
    } else {
      runsByDay.set(day, [run])
    }
  }

  const calendarDays = getCalendarDays(year, month)
  const { prev, next } = getAdjacentMonths(yearMonth)
  const monthTitle = formatMonthYear(year, month)
  const selectedDayRuns = selectedDay !== null ? (runsByDay.get(selectedDay) ?? []) : []

  return (
    <div className="flex flex-col gap-6">
      <CalendarNav monthTitle={monthTitle} prevMonth={prev} nextMonth={next} />
      <MonthGrid
        calendarDays={calendarDays}
        runsByDay={runsByDay}
        selectedDay={selectedDay}
        yearMonth={yearMonth}
      />
      {selectedDay !== null && (
        <DayRunsList day={selectedDay} month={month} year={year} runs={selectedDayRuns} />
      )}
    </div>
  )
}
