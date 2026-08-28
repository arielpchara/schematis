import { describe, expect, it } from 'vitest'
import { hasMin } from './has-min'

describe('hasMin', () => {
  it('accepts values at or above the bound', () => {
    expect(hasMin(0)(0)).toEqual([])
    expect(hasMin(0)(1)).toEqual([])
  })

  it('fails below the bound', () => {
    expect(hasMin(0)(-1)).toEqual([
      { code: 'min', message: 'Must be at least 0', path: [] }
    ])
  })

  it('uses a custom message', () => {
    expect(hasMin(5, 'too small')(1)).toEqual([
      { code: 'min', message: 'too small', path: [] }
    ])
  })

  it('skips non-numbers', () => {
    expect(hasMin(0)(undefined)).toEqual([])
    expect(hasMin(0)('1')).toEqual([])
  })
})
