import { FIELD } from './brand'
import type { Field } from './result'

/** Type guard for {@link Field} from `map`. */
export function isField(
  value: unknown
): value is Field<string | number, unknown> {
  return typeof value === 'object' && value !== null && FIELD in value
}
