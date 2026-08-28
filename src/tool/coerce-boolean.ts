import { brandSchema } from '../core/brand-schema'
import { getOutcome } from '../core/get-outcome'
import type { Rule, Schema } from '../core/result'
import { isBoolean } from '../types/is-boolean'

/** `Boolean(value)` then validate as a boolean. `undefined` is not converted. */
export function coerceBoolean(...rules: Rule[]): Schema<boolean> {
  const schema = isBoolean(...rules)
  return brandSchema(value => {
    if (value === undefined) {
      return getOutcome(schema(undefined))
    }
    return getOutcome(schema(Boolean(value)))
  })
}
