import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ReactNode } from 'react'

import type { CalendarDay } from '../types'
import { MonthGrid } from './MonthGrid'

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

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function makeDay(dayNumber: number, isCurrentMonth = true, isToday = false): CalendarDay {
  return { dayNumber, isCurrentMonth, isToday }
}

describe('Given MonthGrid component', () => {
  describe('When rendered with day names', () => {
    describe('And 7 day name labels are provided', () => {
      it('Then all 7 day names should be visible', () => {
        render(
          <MonthGrid
            calendarDays={[]}
            runsByDay={new Map()}
            selectedDay={null}
            yearMonth="2026-04"
            dayNames={DAY_NAMES}
            runsLabel="runs"
          />,
        )

        for (const name of DAY_NAMES) {
          expect(screen.getByText(name)).toBeInTheDocument()
        }
      })
    })
  })

  describe('When rendered with calendar days', () => {
    describe('And 3 current-month days are provided', () => {
      it('Then those 3 day numbers should be visible', () => {
        const days = [makeDay(1), makeDay(2), makeDay(3)]

        render(
          <MonthGrid
            calendarDays={days}
            runsByDay={new Map()}
            selectedDay={null}
            yearMonth="2026-04"
            dayNames={DAY_NAMES}
            runsLabel="runs"
          />,
        )

        expect(screen.getByText('1')).toBeInTheDocument()
        expect(screen.getByText('2')).toBeInTheDocument()
        expect(screen.getByText('3')).toBeInTheDocument()
      })
    })

    describe('And a padding day (not current month) is provided', () => {
      it('Then no day number should be rendered for that padding day', () => {
        const days = [{ dayNumber: 0, isCurrentMonth: false, isToday: false }]

        render(
          <MonthGrid
            calendarDays={days}
            runsByDay={new Map()}
            selectedDay={null}
            yearMonth="2026-04"
            dayNames={DAY_NAMES}
            runsLabel="runs"
          />,
        )

        // Padding day renders an empty div — day number 0 must not appear
        expect(screen.queryByText('0')).not.toBeInTheDocument()
      })
    })
  })

  describe('When rendered with runs on a day', () => {
    describe('And day 5 has one run of 5200m', () => {
      it('Then distance "5.20 km" should be visible', () => {
        const days = [makeDay(5)]
        const runsByDay = new Map([[5, [{ distance: 5200, duration: 1800 }]]])

        render(
          <MonthGrid
            calendarDays={days}
            runsByDay={runsByDay}
            selectedDay={null}
            yearMonth="2026-04"
            dayNames={DAY_NAMES}
            runsLabel="runs"
          />,
        )

        expect(screen.getByText('5.20 km')).toBeInTheDocument()
      })
    })

    describe('And day 5 has two runs', () => {
      it('Then runs count label "2 runs" should be visible', () => {
        const days = [makeDay(5)]
        const runsByDay = new Map([
          [
            5,
            [
              { distance: 3000, duration: 900 },
              { distance: 2000, duration: 600 },
            ],
          ],
        ])

        render(
          <MonthGrid
            calendarDays={days}
            runsByDay={runsByDay}
            selectedDay={null}
            yearMonth="2026-04"
            dayNames={DAY_NAMES}
            runsLabel="runs"
          />,
        )

        expect(screen.getByText('2 runs')).toBeInTheDocument()
      })
    })

    describe('And a day has no runs', () => {
      it('Then no distance label should be rendered', () => {
        const days = [makeDay(10)]

        render(
          <MonthGrid
            calendarDays={days}
            runsByDay={new Map()}
            selectedDay={null}
            yearMonth="2026-04"
            dayNames={DAY_NAMES}
            runsLabel="runs"
          />,
        )

        expect(screen.queryByText(/km/)).not.toBeInTheDocument()
      })
    })
  })

  describe('When a day is selected', () => {
    describe('And selectedDay is 7', () => {
      it('Then the link for day 7 should point to deselect URL (without day param)', () => {
        const days = [makeDay(7)]

        render(
          <MonthGrid
            calendarDays={days}
            runsByDay={new Map()}
            selectedDay={7}
            yearMonth="2026-04"
            dayNames={DAY_NAMES}
            runsLabel="runs"
          />,
        )

        const link = screen.getByRole('link', { name: /7/ })
        expect(link).toHaveAttribute('href', '/?month=2026-04')
      })
    })

    describe('And selectedDay is null', () => {
      it('Then the link for day 7 should point to select URL (with day param)', () => {
        const days = [makeDay(7)]

        render(
          <MonthGrid
            calendarDays={days}
            runsByDay={new Map()}
            selectedDay={null}
            yearMonth="2026-04"
            dayNames={DAY_NAMES}
            runsLabel="runs"
          />,
        )

        const link = screen.getByRole('link', { name: /7/ })
        expect(link).toHaveAttribute('href', '/?month=2026-04&day=7')
      })
    })
  })
})
