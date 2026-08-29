import { describe, expect, it } from 'vitest'
import { OPTIONAL } from '../core/brand'
import { isOptional } from './is-optional'

describe('isOptional', () => {
  it('never fails', () => {
    expect(isOptional()(undefined)).toEqual([])
    expect(isOptional()(null)).toEqual([])
    expect(isOptional()('')).toEqual([])
    expect(isOptional()(0)).toEqual([])
  })

  it('is marked optional', () => {
    expect(OPTIONAL in isOptional()).toBe(true)
  })
})
