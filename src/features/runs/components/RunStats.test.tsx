import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import { RunStats } from './RunStats'
import type { StatsLabels } from '../types'

const labels: StatsLabels = {
  distance: 'Distance',
  duration: 'Duration',
  avgPace: 'Avg Pace',
  date: 'Date',
}

describe('Given RunStats component', () => {
  describe('When rendered with run data', () => {
    describe('And distance is 5200m and duration is 1500s', () => {
      it('Then formatted distance "5.20 km" should be visible', () => {
        render(
          <RunStats
            distance={5200}
            duration={1500}
            startedAt={new Date('2026-04-25T08:00:00Z')}
            endedAt={new Date('2026-04-25T08:25:00Z')}
            labels={labels}
            lng="en"
          />,
        )
        expect(screen.getByText('5.20 km')).toBeInTheDocument()
      })

      it('Then formatted duration "25:00" should be visible', () => {
        render(
          <RunStats
            distance={5200}
            duration={1500}
            startedAt={new Date('2026-04-25T08:00:00Z')}
            endedAt={new Date('2026-04-25T08:25:00Z')}
            labels={labels}
            lng="en"
          />,
        )
        expect(screen.getByText('25:00')).toBeInTheDocument()
      })

      it('Then all stat labels should be visible', () => {
        render(
          <RunStats
            distance={5200}
            duration={1500}
            startedAt={new Date('2026-04-25T08:00:00Z')}
            endedAt={new Date('2026-04-25T08:25:00Z')}
            labels={labels}
            lng="en"
          />,
        )
        expect(screen.getByText('Distance')).toBeInTheDocument()
        expect(screen.getByText('Duration')).toBeInTheDocument()
        expect(screen.getByText('Avg Pace')).toBeInTheDocument()
        expect(screen.getByText('Date')).toBeInTheDocument()
      })
    })
  })
})
