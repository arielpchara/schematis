import { brandSchema } from '../core/brand-schema'
import { getOutcome } from '../core/get-outcome'
import type { Rule, Schema } from '../core/result'
import { isNumber } from '../types/is-number'

/** `Number(value)` then validate as a number. `undefined` is not converted. */
export function coerceNumber(...rules: Rule[]): Schema<number> {
  const schema = isNumber(...rules)
  return brandSchema(value => {
    if (value === undefined) {
      return getOutcome(schema(undefined))
    }
    return getOutcome(schema(Number(value)))
  })
}
