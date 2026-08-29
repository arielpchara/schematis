import { describe, expect, it } from 'vitest'
import { isOptional } from '../rules/is-optional'
import { isLiteral } from './is-literal'

describe('isLiteral', () => {
  const schema = isLiteral('red', 'green')()

  it('accepts listed values', () => {
    expect(schema('red').isValid()).toBe(true)
    expect(schema('green').getParsed()).toBe('green')
  })

  it('rejects other values', () => {
    expect(schema('blue').getErrors()[0]?.message).toContain('Expected one of')
  })

  it('rejects missing values', () => {
    expect(schema(undefined).getErrors()).toEqual([
      { path: '', message: 'Required' }
    ])
  })

  it('composes isOptional', () => {
    expect(isLiteral(true)(isOptional())(undefined).isValid()).toBe(true)
  })
})
