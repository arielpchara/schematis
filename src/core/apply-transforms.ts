import { createOutcome } from './create-outcome'
import { getOutcome } from './get-outcome'
import type { Outcome, Transform } from './result'

/** Apply convert+schema transform steps in order. */
export function applyTransforms(
  value: unknown,
  transforms: Transform<unknown, unknown>[]
): Outcome<unknown> {
  let current = value
  for (const step of transforms) {
    current = step.convert(current)
    const outcome = getOutcome(step.schema(current))
    if (outcome.issues.length > 0) {
      return outcome
    }
    current = outcome.value
  }
  return createOutcome(current)
}
