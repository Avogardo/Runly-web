import { CalendarDay } from '../types'
import { DAYS_IN_WEEK, LOCALE_MAP, DEFAULT_LOCALE } from '@/consts'

export function parseYearMonth(yearMonth: string): { year: number; month: number } {
  return {
    year: Number(yearMonth.slice(0, 4)),
    month: Number(yearMonth.slice(5, 7)),
  }
}

export function getCurrentYearMonth(): string {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

export function formatMonthYear(year: number, month: number, locale: string = 'en'): string {
  return new Date(year, month - 1, 1).toLocaleDateString(LOCALE_MAP[locale] ?? DEFAULT_LOCALE, {
    month: 'long',
    year: 'numeric',
  })
}

export function getAdjacentMonths(yearMonth: string): { prev: string; next: string } {
  const { year, month } = parseYearMonth(yearMonth)
  const toYM = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
  return {
    prev: toYM(new Date(year, month - 2, 1)),
    next: toYM(new Date(year, month, 1)),
  }
}

export function getCalendarDays(year: number, month: number): CalendarDay[] {
  const now = new Date()
  const todayUTC = {
    year: now.getUTCFullYear(),
    month: now.getUTCMonth() + 1,
    day: now.getUTCDate(),
  }
  const firstDayOfMonth = new Date(Date.UTC(year, month - 1, 1))
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate()
  // Monday = 0, ..., Sunday = 6
  const startOffset = (firstDayOfMonth.getUTCDay() + (DAYS_IN_WEEK - 1)) % DAYS_IN_WEEK

  const days: CalendarDay[] = []

  // Leading empty cells
  for (let i = 0; i < startOffset; i++) {
    days.push({ dayNumber: 0, isToday: false, isCurrentMonth: false })
  }

  // Days 1..daysInMonth
  for (let d = 1; d <= daysInMonth; d++) {
    days.push({
      dayNumber: d,
      isToday: todayUTC.year === year && todayUTC.month === month && todayUTC.day === d,
      isCurrentMonth: true,
    })
  }

  // Trailing empty cells to complete last row
  const trailing = (DAYS_IN_WEEK - (days.length % DAYS_IN_WEEK)) % DAYS_IN_WEEK
  for (let i = 0; i < trailing; i++) {
    days.push({ dayNumber: 0, isToday: false, isCurrentMonth: false })
  }

  return days
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'UTC',
  })
}
