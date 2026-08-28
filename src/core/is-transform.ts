import { TRANSFORM } from './brand'
import type { Transform } from './result'

/** Type guard for {@link Transform} from `transform`. */
export function isTransform(
  value: unknown
): value is Transform<unknown, unknown> {
  return typeof value === 'object' && value !== null && TRANSFORM in value
}
