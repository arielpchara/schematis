import { describe, expect, it } from 'vitest'
import { isEmail } from '../rules/is-email'
import { hasMin } from '../rules/has-min'
import { isNumber } from '../types/is-number'
import { isObject } from '../types/is-object'
import { isString } from '../types/is-string'
import { isUnion } from '../types/is-union'
import { error } from './error'
import { map } from './map'
import { strict } from './strict'

describe('error', () => {
  const schema = error(
    'must be a string',
    isString(error('is not an email', isEmail()))
  )

  it('overrides a type mismatch', () => {
    expect(schema(1).getErrors()).toEqual([
      { path: '', message: 'must be a string' }
    ])
  })

  it('overrides a rule failure', () => {
    expect(schema('foo').getErrors()).toEqual([
      { path: '', message: 'is not an email' }
    ])
  })

  it('leaves required alone', () => {
    expect(schema(undefined).getErrors()).toEqual([
      { path: '', message: 'Required' }
    ])
  })

  it('accepts a valid value', () => {
    expect(schema('a@b.co').isValid()).toBe(true)
    expect(schema('a@b.co').getParsed()).toBe('a@b.co')
  })

  it('overrides nested field type errors', () => {
    const user = error(
      'must be an object',
      isObject(
        map('id', error('id must be a string', isString())),
        map(
          'email',
          error(
            'email must be a string',
            isString(error('is not an email', isEmail()))
          )
        )
      )
    )
    expect(user('nope').getErrors()).toEqual([
      { path: '', message: 'must be an object' }
    ])
    expect(user({ id: 1, email: 'a@b.co' }).getErrors()).toEqual([
      { path: 'id', message: 'id must be a string' }
    ])
    expect(user({ id: '1', email: 2 }).getErrors()).toEqual([
      { path: 'email', message: 'email must be a string' }
    ])
    expect(user({ id: '1', email: 'foo' }).getErrors()).toEqual([
      { path: 'email', message: 'is not an email' }
    ])
  })

  it('overrides number type and min rule', () => {
    const age = error(
      'must be a number',
      isNumber(error('must be at least 0', hasMin(0)))
    )
    expect(age('x').getErrors()).toEqual([
      { path: '', message: 'must be a number' }
    ])
    expect(age(-1).getErrors()).toEqual([
      { path: '', message: 'must be at least 0' }
    ])
  })

  it('overrides a failed union type', () => {
    const schema = error(
      'must be string or number',
      isUnion(isString(), isNumber())
    )
    expect(schema(true).getErrors()).toEqual([
      { path: '', message: 'must be string or number' }
    ])
  })

  it('keeps object shape for strict', () => {
    const schema = strict(
      error('must be an object', isObject(map('name', isString())))
    )
    expect(schema({ name: 'a', extra: 1 }).getErrors()).toEqual([
      { path: 'extra', message: 'Unexpected key' }
    ])
  })
})
