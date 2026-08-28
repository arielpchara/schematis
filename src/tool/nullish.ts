import { brandSchema } from '../core/brand-schema'
import { createOutcome } from '../core/create-outcome'
import { getOutcome } from '../core/get-outcome'
import type { Schema } from '../core/result'

/** Allow `null` or `undefined` in addition to the inner schema. */
export function nullish<T>(
  schema: Schema<T>
): Schema<T | null | undefined> {
  return brandSchema(value => {
    if (value === null || value === undefined) {
      return createOutcome(value)
    }
    const outcome = getOutcome(schema(value))
    return createOutcome<T | null | undefined>(outcome.value, outcome.issues)
  })
}
