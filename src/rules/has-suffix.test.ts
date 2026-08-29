import { describe, expect, it } from 'vitest'
import { hasSuffix } from './has-suffix'

describe('hasSuffix', () => {
  it('requires a suffix', () => {
    expect(hasSuffix('z')('az')).toEqual([])
    expect(hasSuffix('z')('za')[0]?.code).toBe('suffix')
  })
})
