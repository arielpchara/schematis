import { FIELD } from '../core/brand'
import { asSchema } from '../core/as-schema'
import { isRule } from '../core/is-rule'
import type { Field, Rule, Schema } from '../core/result'

export function map<K extends string | number, T>(
  key: K,
  target: Schema<T> | Rule
): Field<K, T> {
  const schema = isRule(target) ? asSchema<T>(target) : target
  return {
    [FIELD]: true,
    key,
    schema
  }
}
