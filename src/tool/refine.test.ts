import { describe, expect, it } from 'vitest'
import { isString } from '../types/is-string'
import { refine } from './refine'

describe('refine', () => {
  const schema = isString(
    refine(value => typeof value === 'string' && value === value.toLowerCase(), 'Must be lowercase')
  )

  it('accepts passing values', () => {
    expect(schema('ok').isValid()).toBe(true)
  })

  it('fails the predicate', () => {
    expect(schema('OK').getErrors()).toEqual([
      { path: '', message: 'Must be lowercase' }
    ])
  })
})
