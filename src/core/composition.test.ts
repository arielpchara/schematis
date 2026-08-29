import { describe, it } from 'vitest'
import { isEmail } from '../rules/is-email'
import { map } from '../tool/map'
import { strict } from '../tool/strict'
import { isNumber } from '../types/is-number'
import { isString } from '../types/is-string'

describe('composition', () => {
  it('rejects a rule in map', () => {
    // @ts-expect-error map requires a schema
    map('field', isEmail())
  })

  it('rejects a schema as a type rule', () => {
    // @ts-expect-error types only receive rules
    isString(isNumber())
  })

  it('rejects strict on a non-object schema', () => {
    // @ts-expect-error strict only wraps isObject
    strict(isString())
  })
})
