import { brandSchema } from '../core/brand-schema'
import { createOutcome } from '../core/create-outcome'
import { getOutcome } from '../core/get-outcome'
import type { Schema } from '../core/result'

/** Allow `null` in addition to the inner schema. */
export function nullable<T>(schema: Schema<T>): Schema<T | null> {
  return brandSchema(value => {
    if (value === null) {
      return createOutcome<T | null>(null)
    }
    const outcome = getOutcome(schema(value))
    return createOutcome<T | null>(outcome.value, outcome.issues)
  })
}
