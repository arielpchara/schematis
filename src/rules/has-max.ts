import { brandRule } from '../core/brand-rule'

export function hasMax(n: number, message?: string) {
  return brandRule(value => {
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      return []
    }
    if (value <= n) {
      return []
    }
    return [
      {
        code: 'max',
        message: message ?? `Must be at most ${n}`,
        path: []
      }
    ]
  })
}
