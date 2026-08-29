import { brandSchema } from '../core/brand-schema'
import { getOutcome } from '../core/get-outcome'
import type { Schema } from '../core/result'
import { isBoolean } from '../types/is-boolean'

/** `Boolean(value)` then validate with `schema`. `undefined` is not converted. */
export function coerceBoolean(
  schema: Schema<boolean> = isBoolean()
): Schema<boolean> {
  return brandSchema(value => {
    if (value === undefined) {
      return getOutcome(schema(undefined))
    }
    return getOutcome(schema(Boolean(value)))
  })
}
