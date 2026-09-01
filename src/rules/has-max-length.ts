import { brandRule } from '../core/brand-rule'

/** String or array `.length` must be `<= n`. */
export function hasMaxLength(n: number) {
  return brandRule(value => {
    if (typeof value !== 'string' && !Array.isArray(value)) {
      return []
    }
    if (value.length <= n) {
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
        code: 'maxLength',
        message: `Must have at most ${n} ${unit}`,
        path: []
      }
    ]
  })
}
