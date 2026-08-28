import { brandSchema } from '../core/brand-schema'
import { getOutcome } from '../core/get-outcome'
import type { Schema } from '../core/result'

/** Use `fallback` when the input is `undefined`. */
export function withDefault<T>(schema: Schema<T>, fallback: T): Schema<T> {
  return brandSchema(value =>
    getOutcome(schema(value === undefined ? fallback : value))
  )
}
