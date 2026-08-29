import { describe, expect, it } from 'vitest'
import { isNull } from './is-null'
import { optional } from '../tool/optional'

describe('isNull', () => {
  const schema = isNull()

  it('accepts null', () => {
    expect(schema(null).isValid()).toBe(true)
    expect(schema(null).getParsed()).toBeNull()
  })

  it('rejects missing values', () => {
    expect(schema(undefined).getErrors()).toEqual([
      { path: '', message: 'Required' }
    ])
  })

  it('rejects other values', () => {
    expect(schema(0).getErrors()).toEqual([
      { path: '', message: 'Expected null' }
    ])
  })

  it('composes optional', () => {
    expect(optional(isNull())(undefined).isValid()).toBe(true)
  })
})
