import { brandSchema } from './brand-schema'
import { createOutcome } from './create-outcome'
import type { Rule, Schema } from './result'

/** Lift a {@link Rule} into a {@link Schema}. */
export function asSchema<T>(rule: Rule): Schema<T> {
  return brandSchema(value => createOutcome(value as T, rule(value)))
}
