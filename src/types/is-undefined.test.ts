import { describe, expect, it } from 'vitest'
import { isUndefined } from './is-undefined'

describe('isUndefined', () => {
  it('accepts undefined only', () => {
    expect(isUndefined()(undefined).isValid()).toBe(true)
    expect(isUndefined()(null).isValid()).toBe(false)
  })
})
