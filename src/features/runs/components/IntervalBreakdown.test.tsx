import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import type { IntervalSummary, IntervalLabels } from '../types'
import { IntervalBreakdown } from './IntervalBreakdown'

const labels: IntervalLabels = {
  title: 'Interval Training',
  planned: 'Planned',
  heavy: 'Heavy',
  light: 'Light',
  completed: 'Completed',
  intervals: 'intervals',
  heavyLabel: 'heavy',
  lightLabel: 'light',
  voiceEnabled: 'Voice',
}

function makeIntervals(voiceEnabled = false): IntervalSummary {
  return {
    config: {
      total: 6,
      heavyDurationSec: 60,
      lightDurationSec: 90,
      startWithHeavy: true,
      voiceEnabled,
    },
    intervals: [
      { type: 'heavy', startedAt: 0, endedAt: 60000, duration: 60 },
      { type: 'light', startedAt: 60000, endedAt: 150000, duration: 90 },
      { type: 'heavy', startedAt: 150000, endedAt: 210000, duration: 60 },
    ],
  }
}

describe('Given IntervalBreakdown component', () => {
  describe('When rendered with interval data', () => {
    describe('And 3 completed intervals out of 6 planned', () => {
      it('Then completed count "3 / 6" should be visible', () => {
        render(<IntervalBreakdown intervals={makeIntervals()} labels={labels} />)
        expect(screen.getByText('3 / 6')).toBeInTheDocument()
      })

      it('Then planned count "6 intervals" should be visible', () => {
        render(<IntervalBreakdown intervals={makeIntervals()} labels={labels} />)
        expect(screen.getByText('6 intervals')).toBeInTheDocument()
      })

      it('Then heavy duration "60s" should be visible', () => {
        render(<IntervalBreakdown intervals={makeIntervals()} labels={labels} />)
        expect(screen.getByText('60s')).toBeInTheDocument()
      })

      it('Then light duration "90s" should be visible', () => {
        render(<IntervalBreakdown intervals={makeIntervals()} labels={labels} />)
        expect(screen.getByText('90s')).toBeInTheDocument()
      })

      it('Then heavy and light summary counts should be visible', () => {
        render(<IntervalBreakdown intervals={makeIntervals()} labels={labels} />)
        expect(screen.getByText(/2 heavy/)).toBeInTheDocument()
        expect(screen.getByText(/1 light/)).toBeInTheDocument()
      })
    })

    describe('And voiceEnabled is true', () => {
      it('Then voice label should be visible', () => {
        render(<IntervalBreakdown intervals={makeIntervals(true)} labels={labels} />)
        expect(screen.getByText(/Voice/)).toBeInTheDocument()
      })
    })

    describe('And voiceEnabled is false', () => {
      it('Then voice label should NOT be visible', () => {
        render(<IntervalBreakdown intervals={makeIntervals(false)} labels={labels} />)
        expect(screen.queryByText(/Voice/)).not.toBeInTheDocument()
      })
    })
  })
})

