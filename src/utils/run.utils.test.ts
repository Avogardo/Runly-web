import { describe, it, expect } from 'vitest'
import { formatDuration, formatDistance, formatPace } from './run.utils'

describe('Given run util', () => {
  describe('When formatDuration is called', () => {
    describe('And seconds is 0', () => {
      it('Then result should be "0:00"', () => {
        expect(formatDuration(0)).toBe('0:00')
      })
    })

    describe('And seconds is 65', () => {
      it('Then result should be "1:05"', () => {
        expect(formatDuration(65)).toBe('1:05')
      })
    })

    describe('And seconds is 3661', () => {
      it('Then result should be "1:01:01"', () => {
        expect(formatDuration(3661)).toBe('1:01:01')
      })
    })

    describe('And seconds is 1800', () => {
      it('Then result should be "30:00"', () => {
        expect(formatDuration(1800)).toBe('30:00')
      })
    })

    describe('And seconds is 7200', () => {
      it('Then result should be "2:00:00"', () => {
        expect(formatDuration(7200)).toBe('2:00:00')
      })
    })
  })

  describe('When formatDistance is called', () => {
    describe('And meters is 0', () => {
      it('Then result should be "0.00 km"', () => {
        expect(formatDistance(0)).toBe('0.00 km')
      })
    })

    describe('And meters is 1000', () => {
      it('Then result should be "1.00 km"', () => {
        expect(formatDistance(1000)).toBe('1.00 km')
      })
    })

    describe('And meters is 5200', () => {
      it('Then result should be "5.20 km"', () => {
        expect(formatDistance(5200)).toBe('5.20 km')
      })
    })

    describe('And meters is 500', () => {
      it('Then result should be "0.50 km"', () => {
        expect(formatDistance(500)).toBe('0.50 km')
      })
    })

    describe('And meters is 12345', () => {
      it('Then result should be "12.35 km"', () => {
        expect(formatDistance(12345)).toBe('12.35 km')
      })
    })
  })

  describe('When formatPace is called', () => {
    describe('And distance is 0', () => {
      it('Then result should be "--:--"', () => {
        expect(formatPace(0, 1800)).toBe('--:--')
      })
    })

    describe('And duration is 0', () => {
      it('Then result should be "--:--"', () => {
        expect(formatPace(5000, 0)).toBe('--:--')
      })
    })

    describe('And distance is 5000m and duration is 1500s', () => {
      it('Then result should be "5:00 /km"', () => {
        expect(formatPace(5000, 1500)).toBe('5:00 /km')
      })
    })

    describe('And distance is 10000m and duration is 3600s', () => {
      it('Then result should be "6:00 /km"', () => {
        expect(formatPace(10000, 3600)).toBe('6:00 /km')
      })
    })

    describe('And distance is 1000m and duration is 330s', () => {
      it('Then result should be "5:30 /km"', () => {
        expect(formatPace(1000, 330)).toBe('5:30 /km')
      })
    })
  })
})
