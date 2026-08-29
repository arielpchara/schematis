import { describe, expect, it } from 'vitest'
import { coerceBoolean } from './coerce-boolean'

describe('coerceBoolean', () => {
  it('uses Boolean()', () => {
    expect(coerceBoolean()(1).getParsed()).toBe(true)
    expect(coerceBoolean()('').getParsed()).toBe(false)
  })
})
