import { brandRule } from '../core/brand-rule'

export function hasMin(n: number, message?: string) {
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
        message: message ?? `Must be at least ${n}`,
        path: []
      }
    ]
  })
}
