import { describe, expect, it } from 'vitest'
import { map } from './map'
import { isObject } from '../types/is-object'
import { isString } from '../types/is-string'
import { strict } from './strict'

describe('strict', () => {
  const schema = strict(isObject(map('name', isString())))

  it('allows known keys', () => {
    expect(schema({ name: 'a' }).isValid()).toBe(true)
  })

  it('rejects extra keys', () => {
    const check = schema({ name: 'a', extra: true })
    expect(check.isValid()).toBe(false)
    expect(check.getErrors()).toEqual([
      { path: 'extra', message: 'Unexpected key' }
    ])
  })
})
