import { describe, expect, it } from 'vitest'
import { coerceNumber } from './coerce-number'

describe('coerceNumber', () => {
  it('coerces numeric strings', () => {
    expect(coerceNumber()('12').getParsed()).toBe(12)
    expect(coerceNumber()('x').isValid()).toBe(false)
  })
})
