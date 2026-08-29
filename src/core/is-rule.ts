import { RULE } from './brand'
import type { Rule } from './result'

/** Type guard for branded rules. */
export function isRule(value: unknown): value is Rule {
  return typeof value === 'function' && RULE in value
}
