import { describe, expect, it } from 'vitest'
import { isEmail } from './is-email'

describe('isEmail', () => {
  it('validates emails', () => {
    expect(isEmail()('a@b.co')).toEqual([])
    expect(isEmail()('not-an-email')[0]?.code).toBe('email')
  })
})
