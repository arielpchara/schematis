import { brandRule } from '../core/brand-rule'

/** Number must be strictly less than `n`. */
export function hasLt(n: number) {
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
        message: `Must be less than ${n}`,
        path: []
      }
    ]
  })
}
