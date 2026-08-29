import { describe, expect, it } from 'vitest'
import { FIELD } from '../core/brand'
import { isField } from '../core/is-field'
import { isString } from '../types/is-string'
import { hasMatch } from '../rules/has-match'
import { map } from './map'

describe('map', () => {
  it('binds a key to a schema', () => {
    const field = map('id', isString())
    expect(isField(field)).toBe(true)
    expect(field.key).toBe('id')
    expect(field[FIELD]).toBe(true)
    const check = field.schema('ok')
    expect(check.isValid()).toBe(true)
    expect(check.getParsed()).toBe('ok')
  })

  it('binds a rule through a type', () => {
    const field = map('0', isString(hasMatch('tag1')))
    expect(field.schema('tag1').isValid()).toBe(true)
    const check = field.schema('other')
    expect(check.isValid()).toBe(false)
    expect(check.getErrors()).toEqual([{ path: '', message: 'Invalid format' }])
  })
})
