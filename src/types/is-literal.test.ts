import { describe, expect, it } from 'vitest'
import { isLiteral } from './is-literal'
import { optional } from '../tool/optional'

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
    expect(schema(undefined).getErrors()[0]?.message).toContain('Expected one of')
  })

  it('composes optional', () => {
    expect(optional(isLiteral('red')())(undefined).isValid()).toBe(true)
  })
})
