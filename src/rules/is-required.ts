import { brandRule } from '../core/brand-rule'

/** Fail when the value is `undefined`. `null` and `''` pass. */
export function isRequired(message = 'Required') {
  return brandRule(value =>
    value === undefined
      ? [{ code: 'required', message, path: [] }]
      : []
  )
}
