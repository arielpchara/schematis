import { describe, expect, it } from 'vitest'
import { hasMinLength } from './has-min-length'

describe('hasMinLength', () => {
  it('accepts strings long enough', () => {
    expect(hasMinLength(2)('ab')).toEqual([])
  })

  it('fails short strings', () => {
    expect(hasMinLength(2)('a')).toEqual([
      {
        code: 'minLength',
        message: 'Must have at least 2 characters',
        path: []
      }
    ])
  })

  it('accepts arrays long enough', () => {
    expect(hasMinLength(1)(['x'])).toEqual([])
  })

  it('fails short arrays', () => {
    expect(hasMinLength(1)([])).toEqual([
      { code: 'minLength', message: 'Must have at least 1 item', path: [] }
    ])
  })

  it('skips other values', () => {
    expect(hasMinLength(1)(undefined)).toEqual([])
    expect(hasMinLength(1)(10)).toEqual([])
  })
})
