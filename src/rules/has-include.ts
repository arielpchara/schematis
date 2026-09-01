import { brandRule } from '../core/brand-rule'

/** String must include `part`. */
export function hasInclude(part: string) {
  return brandRule(value => {
    if (typeof value !== 'string') {
      return []
    }
    if (value.includes(part)) {
      return []
    }
    return [
      {
        code: 'include',
        message: `Must include ${JSON.stringify(part)}`,
        path: []
      }
    ]
  })
}
