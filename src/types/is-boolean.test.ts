import { describe, expect, it } from 'vitest'
import { isBoolean } from './is-boolean'

describe('isBoolean', () => {
  const schema = isBoolean()

  it('accepts true and false', () => {
    expect(schema(true).getParsed()).toBe(true)
    expect(schema(false).getParsed()).toBe(false)
    expect(schema(true).isValid()).toBe(true)
  })

  it('rejects other values', () => {
    expect(schema('true').getErrors()).toEqual([
      { path: '', message: 'Expected boolean' }
    ])
  })
})
