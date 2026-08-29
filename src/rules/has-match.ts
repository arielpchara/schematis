import { brandRule } from '../core/brand-rule'

/** String: `RegExp.test` or exact string equality. */
export function hasMatch(pattern: string | RegExp, message = 'Invalid format') {
  return brandRule(value => {
    if (typeof value !== 'string') {
      return []
    }
    const matched =
      typeof pattern === 'string' ? value === pattern : pattern.test(value)
    return matched ? [] : [{ code: 'match', message, path: [] }]
  })
}
