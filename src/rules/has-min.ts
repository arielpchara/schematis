import { brandRule } from '../core/brand-rule'

/** Number must be `>= n`. */
export function hasMin(n: number) {
  return brandRule(value => {
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      return []
    }
    if (value >= n) {
      return []
    }
    return [
      {
        code: 'min',
        message: `Must be at least ${n}`,
        path: []
      }
    ]
  })
}
