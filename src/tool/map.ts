import { FIELD } from '../core/brand'
import type { Field, Schema } from '../core/result'

/** Bind an object key or array index to a schema. */
export function map<K extends string | number, T>(
  key: K,
  schema: Schema<T>
): Field<K, T> {
  return {
    [FIELD]: true,
    key,
    schema
  }
}
