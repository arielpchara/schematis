import { RULE } from './brand'
import type { Issue, Rule } from './result'

/** Mark a function as a branded {@link Rule}. */
export function brandRule(rule: (value: unknown) => Issue[]): Rule {
  return Object.assign(rule, { [RULE]: true as const })
}
