import { describe, expect, it } from 'vitest'
import { isNonnegative } from './is-nonnegative'

describe('isNonnegative', () => {
  it('allows zero', () => {
    expect(isNonnegative()(0)).toEqual([])
    expect(isNonnegative()(-1)[0]?.code).toBe('nonnegative')
  })
})
