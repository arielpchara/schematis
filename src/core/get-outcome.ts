import { OUTCOME } from './brand'
import type { Check, Outcome } from './result'

export function getOutcome<T>(check: Check<T>): Outcome<T> {
  return check[OUTCOME]
}
