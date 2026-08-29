import { describe, expect, it } from 'vitest'
import { defineType } from './define-type'
import { hasMin } from '../rules/has-min'
import { optional } from '../tool/optional'

const isFiniteNumber = defineType(
  'number',
  (value: unknown): value is number =>
    typeof value === 'number' && Number.isFinite(value),
  'Expected number'
)

describe('defineType', () => {
  const schema = isFiniteNumber()

  it('accepts a valid value', () => {
    const check = schema(3)
    expect(check.isValid()).toBe(true)
    expect(check.getParsed()).toBe(3)
    expect(check.getErrors()).toEqual([])
  })

  it('fails required when missing', () => {
    const check = schema(undefined)
    expect(check.isValid()).toBe(false)
    expect(check.getErrors()).toEqual([{ path: '', message: 'Required' }])
    expect(check.getParsed()).toBeUndefined()
  })

  it('fails the type without running other rules', () => {
    const check = isFiniteNumber(hasMin(10))('nope')
    expect(check.isValid()).toBe(false)
    expect(check.getErrors()).toEqual([
      { path: '', message: 'Expected number' }
    ])
    expect(check.getParsed()).toBe('nope')
  })

  it('allows missing values when optional', () => {
    const check = optional(isFiniteNumber())(undefined)
    expect(check.isValid()).toBe(true)
    expect(check.getParsed()).toBeUndefined()
  })

  it('runs rules when the type matches', () => {
    const check = isFiniteNumber(hasMin(10))(3)
    expect(check.isValid()).toBe(false)
    expect(check.getErrors()).toEqual([
      { path: '', message: 'Must be at least 10' }
    ])
    expect(check.getParsed()).toBe(3)
  })
})
