import { describe, expect, it } from 'vitest'
import { isIpv4 } from './is-ipv4'

describe('isIpv4', () => {
  it('validates dotted quads', () => {
    expect(isIpv4()('192.168.0.1')).toEqual([])
    expect(isIpv4()('999.0.0.1')[0]?.code).toBe('ipv4')
  })
})
