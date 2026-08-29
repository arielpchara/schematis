import { brandSchema } from '../core/brand-schema'
import { createOutcome } from '../core/create-outcome'
import type { Schema } from '../core/result'

/** Schema that accepts only `undefined`. */
export function isUndefined(): Schema<undefined> {
  return brandSchema(value => {
    if (value === undefined) {
      return createOutcome(undefined)
    }
    return createOutcome(undefined, [
      { code: 'undefined', message: 'Expected undefined', path: [] }
    ])
  })
}
