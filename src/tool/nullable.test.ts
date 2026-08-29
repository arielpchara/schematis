import { describe, expect, it } from 'vitest'
import { isString } from '../types/is-string'
import { nullable } from './nullable'

describe('nullable', () => {
  const schema = nullable(isString())

  it('allows null', () => {
    expect(schema(null).isValid()).toBe(true)
    expect(schema(null).getParsed()).toBeNull()
  })

  it('allows strings', () => {
    expect(schema('a').getParsed()).toBe('a')
  })

  it('rejects other values', () => {
    expect(schema(1).isValid()).toBe(false)
  })
})
