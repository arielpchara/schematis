import { describe, expect, it } from 'vitest'
import { isHex } from './is-hex'

describe('isHex', () => {
  it('accepts hex strings', () => {
    expect(isHex()('deadBEEF')).toEqual([])
    expect(isHex()('zz')[0]?.code).toBe('hex')
  })
})
