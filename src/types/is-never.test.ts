import { describe, expect, it } from 'vitest'
import { isNever } from './is-never'

describe('isNever', () => {
  it('rejects every value', () => {
    expect(isNever()('x').isValid()).toBe(false)
    expect(isNever()(undefined).isValid()).toBe(false)
  })
})
