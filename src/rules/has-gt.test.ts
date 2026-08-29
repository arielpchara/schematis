import { describe, expect, it } from 'vitest'
import { hasGt } from './has-gt'

describe('hasGt', () => {
  it('is exclusive', () => {
    expect(hasGt(5)(6)).toEqual([])
    expect(hasGt(5)(5)[0]?.code).toBe('gt')
  })
})
