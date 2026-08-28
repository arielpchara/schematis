import { describe, expect, it } from 'vitest'
import { isInteger } from './is-integer'

describe('isInteger', () => {
  it('accepts integers', () => {
    expect(isInteger()(3).isValid()).toBe(true)
  })

  it('rejects floats', () => {
    expect(isInteger()(3.14).isValid()).toBe(false)
  })
})
