import { OPTIONAL } from './brand'
import { createOutcome } from './create-outcome'
import type { Outcome, Rule } from './result'

/** Pass when `isOptional` is present; otherwise fail as required. */
export function createMissingOutcome<T>(rules: Rule[] = []): Outcome<T> {
  if (rules.some(rule => OPTIONAL in rule)) {
    return createOutcome(undefined as T)
  }
  return createOutcome(undefined as T, [
    { code: 'required', message: 'Required', path: [] }
  ])
}
