import { describe, expect, it } from 'vitest'
import { isRequired } from '../rules/is-required'
import { isString } from './is-string'

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

  it('allows missing values', () => {
    const check = schema(undefined)
    expect(check.isValid()).toBe(true)
    expect(check.getParsed()).toBeUndefined()
  })

  it('rejects null', () => {
    expect(schema(null).getErrors()).toEqual([
      { path: '', message: 'Expected string' }
    ])
  })

  it('composes isRequired', () => {
    expect(isString(isRequired())(undefined).getErrors()).toEqual([
      { path: '', message: 'Required' }
    ])
  })
})
