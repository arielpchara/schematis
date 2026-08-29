import { brandRule } from '../core/brand-rule'

/** String or array `.length` must equal `n`. */
export function hasLength(n: number, message?: string) {
  return brandRule(value => {
    if (typeof value !== 'string' && !Array.isArray(value)) {
      return []
    }
    if (value.length === n) {
      return []
    }
    const unit = Array.isArray(value)
      ? n === 1
        ? 'item'
        : 'items'
      : n === 1
        ? 'character'
        : 'characters'
    return [
      {
        code: 'length',
        message: message ?? `Must have ${n} ${unit}`,
        path: []
      }
    ]
  })
}
