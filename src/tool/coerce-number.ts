import { brandSchema } from '../core/brand-schema'
import { getOutcome } from '../core/get-outcome'
import type { Schema } from '../core/result'
import { isNumber } from '../types/is-number'

/** `Number(value)` then validate with `schema`. `undefined` is not converted. */
export function coerceNumber(
  schema: Schema<number> = isNumber()
): Schema<number> {
  return brandSchema(value => {
    if (value === undefined) {
      return getOutcome(schema(undefined))
    }
    return getOutcome(schema(Number(value)))
  })
}
