import { brandRule } from '../core/brand-rule'

/** Number must be `< 0`. */
export function isNegative(message = 'Must be negative') {
  return brandRule(value => {
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      return []
    }
    if (value < 0) {
      return []
    }
    return [{ code: 'negative', message, path: [] }]
  })
}
