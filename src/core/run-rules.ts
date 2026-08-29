import type { Issue, Rule } from './result'

/** Run every rule and concatenate issues. */
export function runRules(rules: Rule[], value: unknown): Issue[] {
  return rules.flatMap(rule => rule(value))
}
