import { describe, expect, it } from 'vitest'
import { hasPrefix } from './has-prefix'

describe('hasPrefix', () => {
  it('requires a prefix', () => {
    expect(hasPrefix('aa')('aaa')).toEqual([])
    expect(hasPrefix('aa')('baa')[0]?.code).toBe('prefix')
  })
})
