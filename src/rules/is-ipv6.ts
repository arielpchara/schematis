import { brandRule } from '../core/brand-rule'

const ipv6Pattern =
  /^(?:[0-9a-f]{1,4}:){7}[0-9a-f]{1,4}$|^::$|^::([0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4}$|^([0-9a-f]{1,4}:){1,7}:$|^([0-9a-f]{1,4}:){1,6}:[0-9a-f]{1,4}$|^([0-9a-f]{1,4}:){1,5}(:[0-9a-f]{1,4}){1,2}$|^([0-9a-f]{1,4}:){1,4}(:[0-9a-f]{1,4}){1,3}$|^([0-9a-f]{1,4}:){1,3}(:[0-9a-f]{1,4}){1,4}$|^([0-9a-f]{1,4}:){1,2}(:[0-9a-f]{1,4}){1,5}$|^[0-9a-f]{1,4}:((:[0-9a-f]{1,4}){1,6})$/i

/** String must be an IPv6 address. */
export function isIpv6(message = 'Invalid ipv6') {
  return brandRule(value => {
    if (typeof value !== 'string') {
      return []
    }
    return ipv6Pattern.test(value)
      ? []
      : [{ code: 'ipv6', message, path: [] }]
  })
}
