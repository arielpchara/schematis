import { describe, expect, it } from 'vitest'
import { isNumber } from './is-number'
import { isRecord } from './is-record'
import { isString } from './is-string'

describe('isRecord', () => {
  const schema = isRecord(isString(), isNumber())

  it('accepts string keys and number values', () => {
    expect(schema({ a: 1, b: 2 }).isValid()).toBe(true)
  })

  it('paths value errors', () => {
    expect(schema({ a: 'x' }).getErrors()).toEqual([
      { path: 'a', message: 'Expected number' }
    ])
  })
})
