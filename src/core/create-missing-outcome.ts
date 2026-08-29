import { createOutcome } from './create-outcome'
import type { Outcome } from './result'

/** Always fail as required — no optional marker in the pipeline. */
export function createMissingOutcome<T>(): Outcome<T> {
  return createOutcome(undefined as T, [
    { code: 'required', message: 'Required', path: [] }
  ])
}