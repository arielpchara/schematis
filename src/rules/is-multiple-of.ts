import { brandRule } from '../core/brand-rule'

/** Number must be a multiple of `n`. */
export function isMultipleOf(n: number, message?: string) {
  return brandRule(value => {
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      return []
    }
    if (n === 0 || value % n === 0) {
      return []
    }
    return [
      {
        code: 'multipleOf',
        message: message ?? `Must be a multiple of ${n}`,
        path: []
      }
    ]
  })
}
