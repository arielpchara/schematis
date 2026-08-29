import { brandRule } from '../core/brand-rule'

const base64Pattern = /^[A-Za-z0-9+/]*={0,2}$/

/** String must be padded base64. */
export function isBase64(message = 'Invalid base64') {
  return brandRule(value => {
    if (typeof value !== 'string') {
      return []
    }
    const ok =
      value.length > 0 &&
      value.length % 4 === 0 &&
      base64Pattern.test(value)
    return ok ? [] : [{ code: 'base64', message, path: [] }]
  })
}
