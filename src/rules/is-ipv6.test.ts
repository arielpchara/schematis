import { describe, expect, it } from 'vitest'
import { isIpv6 } from './is-ipv6'

describe('isIpv6', () => {
  it('validates compressed and full forms', () => {
    expect(isIpv6()('::1')).toEqual([])
    expect(isIpv6()('2001:db8:85a3::8a2e:370:7334')).toEqual([])
    expect(isIpv6()('not-ip')[0]?.code).toBe('ipv6')
  })
})
