import { brandRule } from '../core/brand-rule'

/** Number must be strictly greater than `n`. */
export function hasGt(n: number) {
  return brandRule(value => {
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      return []
    }
    if (value > n) {
      return []
    }
    return [
      {
        code: 'gt',
        message: `Must be greater than ${n}`,
        path: []
      }
    ]
  })
}
