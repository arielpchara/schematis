import { brandSchema } from './brand-schema'
import { createMissingOutcome } from './create-missing-outcome'
import { createOutcome } from './create-outcome'
import type { Rule, Schema } from './result'
import { runRules } from './run-rules'

/**
 * Build a primitive type factory: `(...rules) => Schema`.
 * `undefined` always fails; then rules.
 */
export function defineType<T>(
  code: string,
  guard: (value: unknown) => value is T,
  defaultMessage: string
) {
  return (...rules: Rule[]): Schema<T> => {
    return brandSchema((value: unknown) => {
      if (value === undefined) {
        return createMissingOutcome<T>()
      }
      if (!guard(value)) {
        return createOutcome(value as unknown as T, [
          { code, message: defaultMessage, path: [] }
        ])
      }
      return createOutcome(value, runRules(rules, value))
    })
  }
}