import { brandRule } from '../core/brand-rule'

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

/** String must be an RFC-style UUID. */
export function isUuid(message = 'Invalid uuid') {
  return brandRule(value => {
    if (typeof value !== 'string') {
      return []
    }
    return uuidPattern.test(value)
      ? []
      : [{ code: 'uuid', message, path: [] }]
  })
}
