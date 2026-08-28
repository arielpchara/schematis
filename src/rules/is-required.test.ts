import { describe, expect, it } from 'vitest'
import { isRequired } from './is-required'

describe('isRequired', () => {
  it('fails on undefined', () => {
    expect(isRequired()(undefined)).toEqual([
      { code: 'required', message: 'Required', path: [] }
    ])
  })

  it('uses a custom message', () => {
    expect(isRequired('id is required')(undefined)).toEqual([
      { code: 'required', message: 'id is required', path: [] }
    ])
  })

  it('allows null', () => {
    expect(isRequired()(null)).toEqual([])
  })

  it('allows empty string', () => {
    expect(isRequired()('')).toEqual([])
  })

  it('allows other values', () => {
    expect(isRequired()(0)).toEqual([])
  })
})
