import { RULE } from './brand'
import type { Rule } from './result'

export function isRule(value: unknown): value is Rule {
  return typeof value === 'function' && RULE in value
}
