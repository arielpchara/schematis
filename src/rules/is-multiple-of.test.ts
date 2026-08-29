import { describe, expect, it } from 'vitest'
import { isMultipleOf } from './is-multiple-of'

describe('isMultipleOf', () => {
  it('checks remainder', () => {
    expect(isMultipleOf(5)(10)).toEqual([])
    expect(isMultipleOf(5)(11)[0]?.code).toBe('multipleOf')
  })
})
