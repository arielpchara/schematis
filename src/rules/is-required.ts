import { brandRule } from '../core/brand-rule'

export function isRequired(message = 'Required') {
  return brandRule(value =>
    value === undefined
      ? [{ code: 'required', message, path: [] }]
      : []
  )
}
