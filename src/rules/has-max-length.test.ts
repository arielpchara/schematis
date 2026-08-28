import { describe, expect, it } from 'vitest'
import { hasMaxLength } from './has-max-length'

describe('hasMaxLength', () => {
  it('accepts strings short enough', () => {
    expect(hasMaxLength(2)('ab')).toEqual([])
  })

  it('fails long strings', () => {
    expect(hasMaxLength(1)('ab')).toEqual([
      {
        code: 'maxLength',
        message: 'Must have at most 1 character',
        path: []
      }
    ])
  })

  it('fails long arrays', () => {
    expect(hasMaxLength(1)([1, 2])).toEqual([
      { code: 'maxLength', message: 'Must have at most 1 item', path: [] }
    ])
  })
})
