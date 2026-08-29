import { brandSchema } from '../core/brand-schema'
import { getOutcome } from '../core/get-outcome'
import type { Schema } from '../core/result'
import { isString } from '../types/is-string'

/** `String(value)` then validate with `schema`. `undefined` is not converted. */
export function coerceString(
  schema: Schema<string> = isString()
): Schema<string> {
  return brandSchema(value => {
    const converted = value === undefined ? undefined : String(value)
    return getOutcome(schema(converted))
  })
}
