import type { Issue, Rule } from './result'

export function runRules(rules: Rule[], value: unknown): Issue[] {
  return rules.flatMap(rule => rule(value))
}
