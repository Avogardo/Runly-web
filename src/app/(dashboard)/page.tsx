import { auth } from '@/lib/auth'
import { getRunsByMonth } from '@/features/runs/queries'
import {
  parseYearMonth,
  getCurrentYearMonth,
  getCalendarDays,
  getAdjacentMonths,
  formatMonthYear,
} from '@/features/calendar/utils'
import {CalendarNav, MonthGrid, DayRunsList} from '@/features/calendar'
import { getServerTranslation, getLocale } from '@/lib/i18n/server'

type SearchParams = Promise<{ month?: string; day?: string }>

export default async function HomePage({ searchParams }: { searchParams: SearchParams }) {
  const session = (await auth())!
  const userId = session.user.id

  const lng = await getLocale()
  const { t } = await getServerTranslation('common', { lng })

  const { month: monthParam, day: dayParam } = await searchParams

  const yearMonth = monthParam ?? getCurrentYearMonth()
  const { year, month } = parseYearMonth(yearMonth)
  const selectedDay = dayParam ? Number(dayParam) : null

  const runs = await getRunsByMonth(userId, year, month)

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
  const monthTitle = formatMonthYear(year, month, lng)
  const selectedDayRuns = selectedDay !== null ? (runsByDay.get(selectedDay) ?? []) : []

  const dayNames = [
    t('days.mon'), t('days.tue'), t('days.wed'), t('days.thu'),
    t('days.fri'), t('days.sat'), t('days.sun'),
  ]

  return (
    <div className="flex flex-col gap-6">
      <CalendarNav monthTitle={monthTitle} prevMonth={prev} nextMonth={next} />
      <MonthGrid
        calendarDays={calendarDays}
        runsByDay={runsByDay}
        selectedDay={selectedDay}
        yearMonth={yearMonth}
        dayNames={dayNames}
        runsLabel={t('runs')}
      />
      {selectedDay !== null && (
        <DayRunsList
          day={selectedDay}
          month={month}
          year={year}
          runs={selectedDayRuns}
          lng={lng}
          noRunsLabel={t('noRunsOnDay')}
          durationLabel={t('stats.duration')}
          paceLabel={t('stats.pace')}
        />
      )}
    </div>
  )
}
