import { brandRule } from '../core/brand-rule'

const ipv4Pattern =
  /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/

/** String must be a dotted IPv4 address. */
export function isIpv4(message = 'Invalid ipv4') {
  return brandRule(value => {
    if (typeof value !== 'string') {
      return []
    }
    return ipv4Pattern.test(value)
      ? []
      : [{ code: 'ipv4', message, path: [] }]
  })
}
