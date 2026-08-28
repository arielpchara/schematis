import { describe, expect, it } from 'vitest'
import { isRequired } from '../rules/is-required'
import { isNull } from './is-null'

describe('isNull', () => {
  const schema = isNull()

  it('accepts null', () => {
    expect(schema(null).isValid()).toBe(true)
    expect(schema(null).getParsed()).toBeNull()
  })

  it('allows missing values', () => {
    expect(schema(undefined).isValid()).toBe(true)
  })

  it('rejects other values', () => {
    expect(schema(0).getErrors()).toEqual([
      { path: '', message: 'Expected null' }
    ])
  })

  it('fails isRequired when missing', () => {
    expect(isNull(isRequired())(undefined).isValid()).toBe(false)
  })
})
