import { describe, expect, it } from 'vitest'
import { isNumber } from '../types/is-number'
import { nullish } from './nullish'

describe('nullish', () => {
  const schema = nullish(isNumber())

  it('allows null and undefined', () => {
    expect(schema(null).isValid()).toBe(true)
    expect(schema(undefined).isValid()).toBe(true)
  })
})
