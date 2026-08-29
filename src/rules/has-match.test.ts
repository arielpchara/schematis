import { describe, expect, it } from 'vitest'
import { hasMatch } from './has-match'

describe('hasMatch', () => {
  it('matches a regexp', () => {
    expect(hasMatch(/^\d+$/)('123')).toEqual([])
    expect(hasMatch(/^\d+$/, 'all digits')('ab')).toEqual([
      { code: 'match', message: 'all digits', path: [] }
    ])
  })

  it('matches a string exactly', () => {
    expect(hasMatch('tag1')('tag1')).toEqual([])
    expect(hasMatch('tag1')('tag2')).toEqual([
      { code: 'match', message: 'Invalid format', path: [] }
    ])
  })

  it('skips non-strings', () => {
    expect(hasMatch(/x/)(undefined)).toEqual([])
    expect(hasMatch(/x/)(1)).toEqual([])
  })
})
