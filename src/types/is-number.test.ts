import { describe, expect, it } from 'vitest'
import { isNumber } from './is-number'

describe('isNumber', () => {
  const schema = isNumber()

  it('accepts finite numbers', () => {
    expect(schema(0).getParsed()).toBe(0)
    expect(schema(-1.5).getParsed()).toBe(-1.5)
    expect(schema(0).isValid()).toBe(true)
  })

  it('rejects NaN and Infinity', () => {
    expect(schema(NaN).isValid()).toBe(false)
    expect(schema(Infinity).isValid()).toBe(false)
  })

  it('rejects non-numbers', () => {
    expect(schema('1').getErrors()).toEqual([
      { path: '', message: 'Expected number' }
    ])
  })

  it('allows missing values', () => {
    expect(schema(undefined).isValid()).toBe(true)
  })
})
