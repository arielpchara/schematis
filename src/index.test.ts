import { describe, expect, it } from 'vitest'
import { map, transform } from './tool/index'
import {
  isArray,
  isBoolean,
  isNull,
  isNumber,
  isObject,
  isString
} from './types/index'
import {
  hasMatch,
  hasMax,
  hasMaxLength,
  hasMin,
  hasMinLength,
  isRequired
} from './rules/index'

describe('schematis', () => {
  const nameSchema = isString(
    isRequired('string is required'),
    hasMinLength(1),
    hasMaxLength(10),
    transform(
      (value: string) => value.split(' '),
      isArray(hasMinLength(2, 'must have at least 2 words'))
    )
  )

  const someSchema = isObject(
    map(
      'id',
      isString(isRequired('id is required'), hasMatch(/\d+/, 'all digits'))
    ),
    map('name', nameSchema),
    map(
      'address',
      isObject(map('place', isString(isRequired('place is required'))))
    )
  )

  it('accepts a valid document', () => {
    const value = {
      id: '123',
      name: 'John Doe',
      address: { place: 'St' }
    }
    const check = someSchema(value)
    expect(check.isValid()).toBe(true)
    expect(check.getParsed()).toEqual({
      id: '123',
      name: ['John', 'Doe'],
      address: { place: 'St' }
    })
    expect(check.getErrors()).toEqual([])
    expect(() => check.assert()).not.toThrow()
  })

  it('returns parsed data and nested errors when invalid', () => {
    const { isValid, assert, getParsed, getErrors } = someSchema({
      id: '123',
      name: 'John Doe'
    })
    expect(isValid()).toBe(false)
    expect(getParsed()).toEqual({
      id: '123',
      name: ['John', 'Doe']
    })
    expect(getErrors()).toEqual([
      { path: 'address.place', message: 'place is required' }
    ])
    expect(() => assert()).toThrow('address.place: place is required')
  })

  it('collects nested issues', () => {
    const validate = isObject(
      map(
        'id',
        isString(isRequired('id is required'), hasMatch(/\d+/, 'all digits'))
      ),
      map('count', isNumber(hasMin(0), hasMax(99))),
      map('active', isBoolean()),
      map('deletedAt', isNull()),
      map(
        'address',
        isObject(map('place', isString()), map('n', isNumber()))
      ),
      map(
        'tags',
        isArray(isString(), hasMinLength(1), map('0', hasMatch('tag1')))
      )
    )
    const check = validate({
      id: 'abc',
      count: 100,
      active: 'yes',
      deletedAt: false,
      address: { place: 1, n: 'x' },
      tags: []
    })
    expect(check.isValid()).toBe(false)
    expect(check.getErrors()).toEqual(
      expect.arrayContaining([
        { path: 'id', message: 'all digits' },
        { path: 'count', message: 'Must be at most 99' },
        { path: 'active', message: 'Expected boolean' },
        { path: 'deletedAt', message: 'Expected null' },
        { path: 'address.place', message: 'Expected string' },
        { path: 'address.n', message: 'Expected number' },
        { path: 'tags', message: 'Must have at least 1 item' }
      ])
    )
  })
})
