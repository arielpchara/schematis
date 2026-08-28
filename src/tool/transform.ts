import { TRANSFORM } from '../core/brand'
import type { Schema, Transform } from '../core/result'

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
