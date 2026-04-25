import { describe, it, expect } from 'vitest'
import { parseYearMonth } from './date.utils'

describe('Given date util', () => {
  describe('When parseYearMonth is called', () => {
    describe('And yearMonth is "2026-04"', () => {
      it('Then result should be year 2026 and month 4', () => {
        const result = parseYearMonth('2026-04')
        expect(result).toEqual({ year: 2026, month: 4 })
      })
    })

    describe('And yearMonth is "2025-12"', () => {
      it('Then result should be year 2025 and month 12', () => {
        const result = parseYearMonth('2025-12')
        expect(result).toEqual({ year: 2025, month: 12 })
      })
    })

    describe('And yearMonth is "2026-01"', () => {
      it('Then result should be year 2026 and month 1', () => {
        const result = parseYearMonth('2026-01')
        expect(result).toEqual({ year: 2026, month: 1 })
      })
    })
  })
})
