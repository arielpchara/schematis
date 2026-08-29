import { brandRule } from '../core/brand-rule'

/** Custom rule: return a falsy value to fail. Skips `undefined`. */
export function refine(
  predicate: (value: unknown) => boolean,
  message = 'Invalid value'
) {
  return brandRule(value => {
    if (value === undefined) {
      return []
    }
    if (predicate(value)) {
      return []
    }
    return [{ code: 'custom', message, path: [] }]
  })
}
