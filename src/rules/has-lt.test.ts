import { describe, expect, it } from 'vitest'
import { hasLt } from './has-lt'

describe('hasLt', () => {
  it('is exclusive', () => {
    expect(hasLt(5)(4)).toEqual([])
    expect(hasLt(5)(5)[0]?.code).toBe('lt')
  })
})
