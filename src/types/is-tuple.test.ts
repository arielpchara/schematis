import { describe, expect, it } from 'vitest'
import { isBoolean } from './is-boolean'
import { isNumber } from './is-number'
import { isString } from './is-string'
import { isTuple } from './is-tuple'

describe('isTuple', () => {
  const schema = isTuple(isString(), isNumber(), isBoolean())

  it('accepts a matching tuple', () => {
    expect(schema(['a', 1, true]).isValid()).toBe(true)
  })

  it('rejects wrong length', () => {
    expect(schema(['a', 1]).getErrors()[0]?.message).toContain('length 3')
  })

  it('paths item errors', () => {
    expect(schema([1, 1, true]).getErrors()).toEqual([
      { path: '0', message: 'Expected string' }
    ])
  })
})
