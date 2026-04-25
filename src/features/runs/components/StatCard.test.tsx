import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import { StatCard } from './StatCard'

describe('Given StatCard component', () => {
  describe('When rendered with label and value', () => {
    describe('And label is "Distance" and value is "5.20 km"', () => {
      it('Then label should be visible', () => {
        render(<StatCard label="Distance" value="5.20 km" />)
        expect(screen.getByText('Distance')).toBeInTheDocument()
      })

      it('Then value should be visible', () => {
        render(<StatCard label="Distance" value="5.20 km" />)
        expect(screen.getByText('5.20 km')).toBeInTheDocument()
      })
    })
  })

  describe('When rendered without accent prop', () => {
    describe('And accent is not provided', () => {
      it('Then value should have white text color class', () => {
        render(<StatCard label="Duration" value="30:00" />)
        expect(screen.getByText('30:00').className).toContain('text-white')
      })
    })
  })

  describe('When rendered with accent prop', () => {
    describe('And accent is true', () => {
      it('Then value should have emerald accent color class', () => {
        render(<StatCard label="Distance" value="5.20 km" accent />)
        expect(screen.getByText('5.20 km').className).toContain('text-emerald-400')
      })
    })
  })
})

