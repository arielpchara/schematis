import { brandRule } from '../core/brand-rule'

/** Custom rule: return a falsy value to fail. Skips `undefined`. */
export function refine(predicate: (value: unknown) => boolean) {
  return brandRule(value => {
    if (value === undefined) {
      return []
    }
    if (predicate(value)) {
      return []
    }
    return [{ code: 'custom', message: 'Invalid value', path: [] }]
  })
}
