import {ReactNode} from "react";
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

import { DayRunsList } from './DayRunsList'

vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    className,
  }: {
    children: ReactNode
    href: string
    className?: string
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}))

const baseProps = {
  day: 25,
  month: 4,
  year: 2026,
  lng: 'en',
  noRunsLabel: 'No runs this day',
  durationLabel: 'Duration',
  paceLabel: 'Pace',
}

const run = {
  id: 'abc123',
  startedAt: new Date('2026-04-25T08:00:00Z'),
  endedAt: new Date('2026-04-25T08:25:00Z'),
  distance: 5200,
  duration: 1500,
  createdAt: new Date(),
}

describe('Given DayRunsList component', () => {
  describe('When rendered with no runs', () => {
    describe('And runs array is empty', () => {
      it('Then "No runs this day" label should be visible', () => {
        render(<DayRunsList {...baseProps} runs={[]} />)
        expect(screen.getByText('No runs this day')).toBeInTheDocument()
      })
    })
  })

  describe('When rendered with runs', () => {
    describe('And one run of 5200m and 1500s duration', () => {
      it('Then distance "5.20 km" should be visible', () => {
        render(<DayRunsList {...baseProps} runs={[run]} />)
        expect(screen.getByText('5.20 km')).toBeInTheDocument()
      })

      it('Then duration "25:00" should be visible', () => {
        render(<DayRunsList {...baseProps} runs={[run]} />)
        expect(screen.getByText('25:00')).toBeInTheDocument()
      })

      it('Then link should point to /run/abc123', () => {
        render(<DayRunsList {...baseProps} runs={[run]} />)
        expect(screen.getByRole('link', { name: /5.20 km/ })).toHaveAttribute('href', '/run/abc123')
      })

      it('Then "No runs this day" label should NOT be visible', () => {
        render(<DayRunsList {...baseProps} runs={[run]} />)
        expect(screen.queryByText('No runs this day')).not.toBeInTheDocument()
      })
    })
  })
})

