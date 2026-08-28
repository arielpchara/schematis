import { brandSchema } from '../core/brand-schema'
import { createOutcome } from '../core/create-outcome'
import type { Schema } from '../core/result'

/** Schema that rejects every value. */
export function isNever(): Schema<never> {
  return brandSchema(value =>
    createOutcome(value as never, [
      { code: 'never', message: 'Expected never', path: [] }
    ])
  )
}
