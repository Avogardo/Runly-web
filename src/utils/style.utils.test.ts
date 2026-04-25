import { describe, it, expect } from 'vitest'
import { cn } from './style.utils'

describe('Given style util', () => {
  describe('When cn is called', () => {
    describe('And all arguments are strings', () => {
      it('Then result should be joined with spaces', () => {
        expect(cn('foo', 'bar', 'baz')).toBe('foo bar baz')
      })
    })

    describe('And some arguments are falsy', () => {
      it('Then result should only include truthy values', () => {
        expect(cn('foo', false, 'bar', null, undefined, 'baz')).toBe('foo bar baz')
      })
    })

    describe('And no arguments are provided', () => {
      it('Then result should be empty string', () => {
        expect(cn()).toBe('')
      })
    })

    describe('And all arguments are falsy', () => {
      it('Then result should be empty string', () => {
        expect(cn(false, null, undefined)).toBe('')
      })
    })

    describe('And single string is provided', () => {
      it('Then result should be that string', () => {
        expect(cn('only-class')).toBe('only-class')
      })
    })
  })
})
