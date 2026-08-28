import { describe, expect, it } from 'vitest'
import { coerceString } from './coerce-string'

describe('coerceString', () => {
  it('stringifies values', () => {
    expect(coerceString()(42).getParsed()).toBe('42')
    expect(coerceString()(true).getParsed()).toBe('true')
  })
})
