import { brandSchema } from '../core/brand-schema'
import { getOutcome } from '../core/get-outcome'
import type { Rule, Schema } from '../core/result'
import { isString } from '../types/is-string'

/** `String(value)` then validate as a string. `undefined` is not converted. */
export function coerceString(...rules: Rule[]): Schema<string> {
  const schema = isString(...rules)
  return brandSchema(value => {
    const converted = value === undefined ? undefined : String(value)
    return getOutcome(schema(converted))
  })
}
