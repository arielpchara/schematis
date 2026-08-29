import { describe, expect, it } from 'vitest'
import { isString } from './is-string'
import { optional } from '../tool/optional'

describe('isString', () => {
  const schema = isString()

  it('accepts a string', () => {
    const check = schema('ok')
    expect(check.isValid()).toBe(true)
    expect(check.getParsed()).toBe('ok')
  })

  it('accepts an empty string', () => {
    expect(schema('').isValid()).toBe(true)
    expect(schema('').getParsed()).toBe('')
  })

  it('rejects non-strings', () => {
    const check = schema(1)
    expect(check.isValid()).toBe(false)
    expect(check.getErrors()).toEqual([{ path: '', message: 'Expected string' }])
    expect(schema(new String('boxed')).isValid()).toBe(false)
  })

  it('rejects missing values', () => {
    const check = schema(undefined)
    expect(check.isValid()).toBe(false)
    expect(check.getErrors()).toEqual([{ path: '', message: 'Required' }])
  })

  it('rejects null', () => {
    expect(schema(null).getErrors()).toEqual([
      { path: '', message: 'Expected string' }
    ])
  })

  it('composes optional', () => {
    expect(optional(isString())(undefined).isValid()).toBe(true)
  })
})
