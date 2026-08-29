import { describe, expect, it } from 'vitest'
import { hasInclude } from './has-include'

describe('hasInclude', () => {
  it('requires a substring', () => {
    expect(hasInclude('--')('a--b')).toEqual([])
    expect(hasInclude('--')('ab')[0]?.code).toBe('include')
  })
})
