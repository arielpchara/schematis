import { describe, expect, it } from 'vitest'
import { hasLength } from './has-length'

describe('hasLength', () => {
  it('checks string and array length', () => {
    expect(hasLength(2)('ab')).toEqual([])
    expect(hasLength(2)('a')[0]?.code).toBe('length')
    expect(hasLength(1)([1])).toEqual([])
  })
})
