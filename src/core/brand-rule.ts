import { RULE } from './brand'
import type { Issue, Rule } from './result'

export function brandRule(rule: (value: unknown) => Issue[]): Rule {
  return Object.assign(rule, { [RULE]: true as const })
}
