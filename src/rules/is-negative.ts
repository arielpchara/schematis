import { brandRule } from '../core/brand-rule'

/** Number must be `< 0`. */
export function isNegative() {
  return brandRule(value => {
    if (typeof value !== 'number' || !Number.isFinite(value)) {
      return []
    }
    if (value < 0) {
      return []
    }
    return [{ code: 'negative', message: 'Must be negative', path: [] }]
  })
}
