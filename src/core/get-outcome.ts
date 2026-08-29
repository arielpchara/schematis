import { OUTCOME } from './brand'
import type { Check, Outcome } from './result'

/** Read the internal {@link Outcome} from a {@link Check}. */
export function getOutcome<T>(check: Check<T>): Outcome<T> {
  return check[OUTCOME]
}
