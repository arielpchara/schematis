import { TRANSFORM } from '../core/brand'
import type { Schema, Transform } from '../core/result'

/** Convert a value after type/rules pass, then validate with `schema`. */
export function transform<A, B>(
  convert: (value: A) => B,
  schema: Schema<unknown>
): Transform<A, B> {
  return {
    [TRANSFORM]: true,
    convert,
    schema
  }
}
