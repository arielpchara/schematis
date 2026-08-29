import { describe, expect, it } from 'vitest'
import { isNegative } from './is-negative'

describe('isNegative', () => {
  it('rejects zero and positives', () => {
    expect(isNegative()(-1)).toEqual([])
    expect(isNegative()(0)[0]?.code).toBe('negative')
  })
})
