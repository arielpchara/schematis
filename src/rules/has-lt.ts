import { brandRule } from '../core/brand-rule'

/** Number must be strictly less than `n`. */
export function hasLt(n: number, message?: string) {
  return brandRule(value => {
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      return []
    }
    if (value < n) {
      return []
    }
    return [
      {
        code: 'lt',
        message: message ?? `Must be less than ${n}`,
        path: []
      }
    ]
  })
}
