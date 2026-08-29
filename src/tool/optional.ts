import { brandSchema } from '../core/brand-schema'
import { createOutcome } from '../core/create-outcome'
import { getOutcome } from '../core/get-outcome'
import type { Schema } from '../core/result'

/** Allow `undefined` in addition to the inner schema. */
export function optional<T>(schema: Schema<T>): Schema<T | undefined> {
  return brandSchema(value => {
    if (value === undefined) {
      return createOutcome(undefined as T | undefined)
    }
    const outcome = getOutcome(schema(value))
    return createOutcome<T | undefined>(outcome.value, outcome.issues)
  })
}