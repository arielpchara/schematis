import { describe, expect, it } from 'vitest'
import { isPositive } from './is-positive'

describe('isPositive', () => {
  it('rejects zero and negatives', () => {
    expect(isPositive()(1)).toEqual([])
    expect(isPositive()(0)[0]?.code).toBe('positive')
  })
})
