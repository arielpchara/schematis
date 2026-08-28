import { describe, expect, it } from 'vitest'
import { isUnknown } from './is-unknown'

describe('isUnknown', () => {
  it('accepts any value', () => {
    expect(isUnknown()('a').isValid()).toBe(true)
    expect(isUnknown()(null).isValid()).toBe(true)
  })
})
