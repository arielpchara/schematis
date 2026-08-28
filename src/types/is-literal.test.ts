import { describe, expect, it } from 'vitest'
import { isRequired } from '../rules/is-required'
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

  it('composes isRequired', () => {
    expect(isLiteral(true)(isRequired())(undefined).isValid()).toBe(false)
  })
})
