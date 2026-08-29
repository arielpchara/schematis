import { describe, expect, it } from 'vitest'
import { isString } from '../types/is-string'
import { withDefault } from './with-default'

describe('withDefault', () => {
  const schema = withDefault(isString(), 'anon')

  it('fills undefined', () => {
    expect(schema(undefined).getParsed()).toBe('anon')
    expect(schema(undefined).isValid()).toBe(true)
  })

  it('keeps provided values', () => {
    expect(schema('bob').getParsed()).toBe('bob')
  })
})
