import { brandRule } from '../core/brand-rule'

/** Number must be `> 0`. */
export function isPositive(message = 'Must be positive') {
  return brandRule(value => {
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      return []
    }
    if (value > 0) {
      return []
    }
    return [{ code: 'positive', message, path: [] }]
  })
}
