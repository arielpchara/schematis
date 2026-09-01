import { brandRule } from '../core/brand-rule'

const hexPattern = /^[0-9a-f]+$/i

/** String must be hexadecimal. */
export function isHex() {
  return brandRule(value => {
    if (typeof value !== 'string') {
      return []
    }
    return hexPattern.test(value)
      ? []
      : [{ code: 'hex', message: 'Invalid hex', path: [] }]
  })
}
