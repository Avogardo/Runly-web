import {ReactNode} from "react";
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

import { DayCell } from './DayCell'

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
  dayNumber: 15,
  isToday: false,
  isSelected: false,
  runCount: 0,
  totalDistance: 0,
  yearMonth: '2026-04',
  runsLabel: 'runs',
}

describe('Given DayCell component', () => {
  describe('When rendered with day number', () => {
    describe('And dayNumber is 15', () => {
      it('Then "15" should be visible', () => {
        render(<DayCell {...baseProps} />)
        expect(screen.getByText('15')).toBeInTheDocument()
      })
    })
  })

  describe('When day is not selected', () => {
    describe('And isSelected is false', () => {
      it('Then link should point to select URL with day param', () => {
        render(<DayCell {...baseProps} isSelected={false} />)
        expect(screen.getByRole('link')).toHaveAttribute('href', '/?month=2026-04&day=15')
      })
    })
  })

  describe('When day is selected', () => {
    describe('And isSelected is true', () => {
      it('Then link should point to deselect URL without day param', () => {
        render(<DayCell {...baseProps} isSelected={true} />)
        expect(screen.getByRole('link')).toHaveAttribute('href', '/?month=2026-04')
      })
    })
  })

  describe('When day has runs', () => {
    describe('And runCount is 1 and totalDistance is 5200m', () => {
      it('Then distance "5.20 km" should be visible', () => {
        render(<DayCell {...baseProps} runCount={1} totalDistance={5200} />)
        expect(screen.getByText('5.20 km')).toBeInTheDocument()
      })

      it('Then runs count label should NOT be visible for single run', () => {
        render(<DayCell {...baseProps} runCount={1} totalDistance={5200} />)
        expect(screen.queryByText(/runs/)).not.toBeInTheDocument()
      })
    })

    describe('And runCount is 3', () => {
      it('Then "3 runs" label should be visible', () => {
        render(<DayCell {...baseProps} runCount={3} totalDistance={15000} />)
        expect(screen.getByText('3 runs')).toBeInTheDocument()
      })
    })
  })

  describe('When day has no runs', () => {
    describe('And runCount is 0', () => {
      it('Then no distance label should be visible', () => {
        render(<DayCell {...baseProps} runCount={0} totalDistance={0} />)
        expect(screen.queryByText(/km/)).not.toBeInTheDocument()
      })
    })
  })
})

