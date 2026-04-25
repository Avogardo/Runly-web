import { describe, it, expect, vi, afterEach } from 'vitest'
import {
  getCurrentYearMonth,
  formatMonthYear,
  getAdjacentMonths,
  getCalendarDays,
  formatTime,
} from './date.utils'

afterEach(() => {
  vi.useRealTimers()
})

describe('Given calendar date util', () => {
  describe('When getCurrentYearMonth is called', () => {
    describe('And current date is 2026-04-25', () => {
      it('Then result should be "2026-04"', () => {
        vi.useFakeTimers()
        vi.setSystemTime(new Date('2026-04-25T10:00:00Z'))

        expect(getCurrentYearMonth()).toBe('2026-04')
      })
    })

    describe('And current date is 2026-01-05 (month needs zero-padding)', () => {
      it('Then result should be "2026-01"', () => {
        vi.useFakeTimers()
        vi.setSystemTime(new Date('2026-01-05T10:00:00Z'))

        expect(getCurrentYearMonth()).toBe('2026-01')
      })
    })
  })

  describe('When formatMonthYear is called', () => {
    describe('And year is 2026, month is 4, locale is "en"', () => {
      it('Then result should contain "April" and "2026"', () => {
        const result = formatMonthYear(2026, 4, 'en')

        expect(result).toContain('April')
        expect(result).toContain('2026')
      })
    })

    describe('And year is 2026, month is 1, locale is "en"', () => {
      it('Then result should contain "January" and "2026"', () => {
        const result = formatMonthYear(2026, 1, 'en')

        expect(result).toContain('January')
        expect(result).toContain('2026')
      })
    })

    describe('And year is 2026, month is 4, locale is "pl"', () => {
      it('Then result should contain "2026"', () => {
        const result = formatMonthYear(2026, 4, 'pl')

        expect(result).toContain('2026')
      })
    })
  })

  describe('When getAdjacentMonths is called', () => {
    describe('And yearMonth is "2026-04"', () => {
      it('Then prev should be "2026-03" and next should be "2026-05"', () => {
        const result = getAdjacentMonths('2026-04')

        expect(result.prev).toBe('2026-03')
        expect(result.next).toBe('2026-05')
      })
    })

    describe('And yearMonth is "2026-01" (January — year boundary)', () => {
      it('Then prev should be "2025-12" and next should be "2026-02"', () => {
        const result = getAdjacentMonths('2026-01')

        expect(result.prev).toBe('2025-12')
        expect(result.next).toBe('2026-02')
      })
    })

    describe('And yearMonth is "2026-12" (December — year boundary)', () => {
      it('Then prev should be "2026-11" and next should be "2027-01"', () => {
        const result = getAdjacentMonths('2026-12')

        expect(result.prev).toBe('2026-11')
        expect(result.next).toBe('2027-01')
      })
    })
  })

  describe('When getCalendarDays is called', () => {
    describe('And year is 2026, month is 4 (April — 30 days, starts Thursday)', () => {
      it('Then total days array length should be a multiple of 7', () => {
        const days = getCalendarDays(2026, 4)

        expect(days.length % 7).toBe(0)
      })

      it('Then number of current-month days should be 30', () => {
        const days = getCalendarDays(2026, 4)
        const currentMonthDays = days.filter((d) => d.isCurrentMonth)

        expect(currentMonthDays.length).toBe(30)
      })

      it('Then first current-month day should have dayNumber 1', () => {
        const days = getCalendarDays(2026, 4)
        const firstReal = days.find((d) => d.isCurrentMonth)

        expect(firstReal?.dayNumber).toBe(1)
      })
    })

    describe('And year is 2026, month is 2 (February — 28 days)', () => {
      it('Then number of current-month days should be 28', () => {
        const days = getCalendarDays(2026, 2)
        const currentMonthDays = days.filter((d) => d.isCurrentMonth)

        expect(currentMonthDays.length).toBe(28)
      })
    })

    describe('And current date is 2026-04-25', () => {
      it('Then day 25 in April 2026 should have isToday true', () => {
        vi.useFakeTimers()
        vi.setSystemTime(new Date('2026-04-25T12:00:00Z'))

        const days = getCalendarDays(2026, 4)
        const today = days.find((d) => d.isCurrentMonth && d.dayNumber === 25)

        expect(today?.isToday).toBe(true)
      })

      it('Then day 24 in April 2026 should have isToday false', () => {
        vi.useFakeTimers()
        vi.setSystemTime(new Date('2026-04-25T12:00:00Z'))

        const days = getCalendarDays(2026, 4)
        const notToday = days.find((d) => d.isCurrentMonth && d.dayNumber === 24)

        expect(notToday?.isToday).toBe(false)
      })
    })

    describe('And padding days exist before the first of month', () => {
      it('Then padding days should have isCurrentMonth false', () => {
        const days = getCalendarDays(2026, 4)
        const paddingDays = days.filter((d) => !d.isCurrentMonth)

        for (const d of paddingDays) {
          expect(d.isCurrentMonth).toBe(false)
          expect(d.isToday).toBe(false)
        }
      })
    })
  })

  describe('When formatTime is called', () => {
    describe('And date is 2026-04-25T08:05:00Z', () => {
      it('Then result should be "08:05"', () => {
        const result = formatTime(new Date('2026-04-25T08:05:00Z'))

        expect(result).toBe('08:05')
      })
    })

    describe('And date is 2026-04-25T23:59:00Z', () => {
      it('Then result should be "23:59"', () => {
        const result = formatTime(new Date('2026-04-25T23:59:00Z'))

        expect(result).toBe('23:59')
      })
    })

    describe('And date is 2026-04-25T12:30:00Z (noon)', () => {
      it('Then result should be "12:30"', () => {
        const result = formatTime(new Date('2026-04-25T12:30:00Z'))

        expect(result).toBe('12:30')
      })
    })
  })
})
