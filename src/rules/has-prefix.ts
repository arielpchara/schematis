import { brandRule } from '../core/brand-rule'

/** String must start with `prefix`. */
export function hasPrefix(prefix: string, message?: string) {
  return brandRule(value => {
    if (typeof value !== 'string') {
      return []
    }
    if (value.startsWith(prefix)) {
      return []
    }
    return [
      {
        code: 'prefix',
        message: message ?? `Must start with ${JSON.stringify(prefix)}`,
        path: []
      }
    ]
  })
}
