export type CalendarDay = {
  dayNumber: number // 0 = padding/empty
  isToday: boolean
  isCurrentMonth: boolean
}

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

export function formatMonthYear(year: number, month: number): string {
  return new Date(year, month - 1, 1).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })
}

export function getAdjacentMonths(yearMonth: string): { prev: string; next: string } {
  const { year, month } = parseYearMonth(yearMonth)
  const toYM = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
  return {
    prev: toYM(new Date(year, month - 2, 1)),
    next: toYM(new Date(year, month, 1)),
  }
}

export function getCalendarDays(year: number, month: number): CalendarDay[] {
  const today = new Date()
  const firstDayOfMonth = new Date(year, month - 1, 1)
  const daysInMonth = new Date(year, month, 0).getDate()
  // Monday = 0, ..., Sunday = 6
  const startOffset = (firstDayOfMonth.getDay() + 6) % 7

  const days: CalendarDay[] = []

  // Leading empty cells
  for (let i = 0; i < startOffset; i++) {
    days.push({ dayNumber: 0, isToday: false, isCurrentMonth: false })
  }

  // Days 1..daysInMonth
  for (let d = 1; d <= daysInMonth; d++) {
    days.push({
      dayNumber: d,
      isToday:
        today.getFullYear() === year &&
        today.getMonth() + 1 === month &&
        today.getDate() === d,
      isCurrentMonth: true,
    })
  }

  // Trailing empty cells to complete last row
  const trailing = (7 - (days.length % 7)) % 7
  for (let i = 0; i < trailing; i++) {
    days.push({ dayNumber: 0, isToday: false, isCurrentMonth: false })
  }

  return days
}

export function getMonthDateRange(year: number, month: number): { start: Date; end: Date } {
  return {
    start: new Date(Date.UTC(year, month - 1, 1)),
    end: new Date(Date.UTC(year, month, 1)),
  }
}

