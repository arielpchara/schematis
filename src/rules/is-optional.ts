import { OPTIONAL } from '../core/brand'
import { brandRule } from '../core/brand-rule'
import type { Rule } from '../core/result'

/** Marker: allow `undefined`. The pipeline skips the type guard. */
export function isOptional(): Rule {
  return Object.assign(brandRule(() => []), { [OPTIONAL]: true as const })
}
