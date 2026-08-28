import { describe, expect, it } from 'vitest'
import { map } from '../tool/map'
import { isRequired } from '../rules/is-required'
import { isNumber } from './is-number'
import { isObject } from './is-object'
import { isString } from './is-string'

describe('isObject', () => {
  const schema = isObject(map('place', isString()), map('n', isNumber()))

  it('accepts a matching object', () => {
    const check = schema({ place: 'St', n: 1 })
    expect(check.isValid()).toBe(true)
    expect(check.getParsed()).toEqual({ place: 'St', n: 1 })
  })

  it('prefixes field paths', () => {
    const check = schema({ place: 1, n: 'x' })
    expect(check.isValid()).toBe(false)
    expect(check.getErrors()).toEqual([
      { path: 'place', message: 'Expected string' },
      { path: 'n', message: 'Expected number' }
    ])
    expect(check.getParsed()).toEqual({ place: 1, n: 'x' })
  })

  it('rejects arrays and dates', () => {
    expect(schema([]).isValid()).toBe(false)
    expect(schema(new Date()).isValid()).toBe(false)
  })

  it('allows missing objects without required fields', () => {
    const check = schema(undefined)
    expect(check.isValid()).toBe(true)
    expect(check.getParsed()).toBeUndefined()
  })

  it('drops unknown keys from parsed output', () => {
    expect(schema({ place: 'St', n: 1, extra: true }).getParsed()).toEqual({
      place: 'St',
      n: 1
    })
  })

  it('nests paths', () => {
    const nested = isObject(
      map('address', isObject(map('place', isString(isRequired()))))
    )
    const check = nested({ address: {} })
    expect(check.getErrors()).toEqual([
      { path: 'address.place', message: 'Required' }
    ])
  })

  it('reports nested required fields when the object is missing', () => {
    const nested = isObject(
      map('address', isObject(map('place', isString(isRequired('place is required')))))
    )
    const check = nested({})
    expect(check.isValid()).toBe(false)
    expect(check.getParsed()).toEqual({})
    expect(check.getErrors()).toEqual([
      { path: 'address.place', message: 'place is required' }
    ])
  })
})
