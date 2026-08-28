import { describe, expect, it } from 'vitest'
import { hasMax } from './has-max'

describe('hasMax', () => {
  it('accepts values at or below the bound', () => {
    expect(hasMax(99)(99)).toEqual([])
    expect(hasMax(99)(0)).toEqual([])
  })

  it('fails above the bound', () => {
    expect(hasMax(99)(100)).toEqual([
      { code: 'max', message: 'Must be at most 99', path: [] }
    ])
  })

  it('skips non-numbers', () => {
    expect(hasMax(1)(undefined)).toEqual([])
  })
})
