export function parseYearMonth(yearMonth: string): { year: number; month: number } {
  return {
    year: Number(yearMonth.slice(0, 4)),
    month: Number(yearMonth.slice(5, 7)),
  }
}
