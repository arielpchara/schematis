import { brandRule } from '../core/brand-rule'

const emailPattern =
  /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9-]*\.)+[a-z]{2,}$/i

/** String must look like a strict email address. */
export function isEmail() {
  return brandRule(value => {
    if (typeof value !== 'string') {
      return []
    }
    return emailPattern.test(value)
      ? []
      : [{ code: 'email', message: 'Invalid email', path: [] }]
  })
}
