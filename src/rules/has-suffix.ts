import { brandRule } from '../core/brand-rule'

/** String must end with `suffix`. */
export function hasSuffix(suffix: string) {
  return brandRule(value => {
    if (typeof value !== 'string') {
      return []
    }
    if (value.endsWith(suffix)) {
      return []
    }
    return [
      {
        code: 'suffix',
        message: `Must end with ${JSON.stringify(suffix)}`,
        path: []
      }
    ]
  })
}
