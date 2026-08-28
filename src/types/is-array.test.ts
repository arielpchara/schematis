import { describe, expect, it } from 'vitest'
import { map } from '../tool/map'
import { hasMatch } from '../rules/has-match'
import { hasMinLength } from '../rules/has-min-length'
import { isArray } from './is-array'
import { isNumber } from './is-number'
import { isString } from './is-string'

describe('isArray', () => {
  it('accepts an array of items', () => {
    const check = isArray(isString())(['a', 'b'])
    expect(check.isValid()).toBe(true)
    expect(check.getParsed()).toEqual(['a', 'b'])
  })

  it('collects every item issue', () => {
    const check = isArray(isNumber())([1, 'x', 3, 'y'])
    expect(check.isValid()).toBe(false)
    expect(check.getErrors()).toEqual([
      { path: '1', message: 'Expected number' },
      { path: '3', message: 'Expected number' }
    ])
  })

  it('runs array-level rules', () => {
    const check = isArray(isString(), hasMinLength(1))([])
    expect(check.getErrors()).toEqual([
      { path: '', message: 'Must have at least 1 item' }
    ])
  })

  it('extra-checks a mapped index', () => {
    expect(
      isArray(isString(), hasMinLength(1), map('0', hasMatch('tag1')))([
        'tag1',
        'x'
      ]).isValid()
    ).toBe(true)

    expect(
      isArray(isString(), map('0', hasMatch('tag1')))(['nope']).getErrors()
    ).toEqual([{ path: '0', message: 'Invalid format' }])
  })

  it('rejects non-arrays', () => {
    expect(isArray(isString())({}).getErrors()).toEqual([
      { path: '', message: 'Expected array' }
    ])
  })
})
