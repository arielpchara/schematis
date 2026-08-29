import { brandSchema } from '../core/brand-schema'
import { getOutcome } from '../core/get-outcome'
import type { Outcome, Schema } from '../core/result'

/**
 * After `schema` passes, convert the value and validate with `outSchema`.
 * Skips conversion when the input is invalid or `undefined`.
 */
export function transform<A, B>(
  schema: Schema<A>,
  convert: (value: A) => B,
  outSchema: Schema<B>
): Schema<B> {
  return brandSchema(value => {
    const input = getOutcome(schema(value))
    if (input.issues.length > 0 || value === undefined) {
      return input as unknown as Outcome<B>
    }
    return getOutcome(outSchema(convert(input.value)))
  })
}
