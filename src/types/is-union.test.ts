import { describe, expect, it } from 'vitest'
import { isNumber } from './is-number'
import { isString } from './is-string'
import { isUnion } from './is-union'

describe('isUnion', () => {
  const schema = isUnion(isString(), isNumber())

  it('accepts the first matching schema', () => {
    expect(schema('a').getParsed()).toBe('a')
    expect(schema(1).getParsed()).toBe(1)
  })

  it('fails when no option matches', () => {
    expect(schema(true).isValid()).toBe(false)
  })
})
