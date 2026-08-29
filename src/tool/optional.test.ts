import { describe, expect, it } from 'vitest'
import { isString } from '../types/is-string'
import { optional } from './optional'

describe('optional', () => {
  const schema = optional(isString())

  it('allows undefined', () => {
    expect(schema(undefined).isValid()).toBe(true)
    expect(schema(undefined).getParsed()).toBeUndefined()
  })

  it('allows strings', () => {
    expect(schema('a').getParsed()).toBe('a')
  })

  it('rejects other values', () => {
    expect(schema(1).isValid()).toBe(false)
  })
})
