import { describe, expect, it } from 'vitest'
import { isArray } from '../types/is-array'
import { isString } from '../types/is-string'
import { hasMaxLength } from '../rules/has-max-length'
import { hasMinLength } from '../rules/has-min-length'
import { error } from './error'
import { map } from './map'
import { transform } from './transform'

describe('transform', () => {
  const nameSchema = transform(
    isString(hasMinLength(1), hasMaxLength(10)),
    (value: string) => value.split(' '),
    isArray(
      error('must have at least 2 words', hasMinLength(2)),
      map(
        0,
        isString(
          error(
            'first name must have at least 1 character',
            hasMinLength(2)
          )
        )
      )
    )
  )

  it('returns the transformed value', () => {
    const check = nameSchema('John Doe')
    expect(check.isValid()).toBe(true)
    expect(check.getParsed()).toEqual(['John', 'Doe'])
  })

  it('fails string rules before transforming', () => {
    const missing = nameSchema(undefined)
    expect(missing.isValid()).toBe(false)
    expect(missing.getErrors()).toEqual([
      { path: '', message: 'Required' }
    ])
    expect(nameSchema('abcdefghijk').isValid()).toBe(false)
  })

  it('fails the transformed schema', () => {
    const check = nameSchema('John')
    expect(check.isValid()).toBe(false)
    expect(check.getErrors()).toEqual([
      { path: '', message: 'must have at least 2 words' }
    ])
    expect(check.getParsed()).toEqual(['John'])
  })

  it('fails a mapped index on the transformed value', () => {
    const check = nameSchema('J Doe')
    expect(check.isValid()).toBe(false)
    expect(check.getErrors()).toEqual([
      {
        path: '0',
        message: 'first name must have at least 1 character'
      }
    ])
  })
})
