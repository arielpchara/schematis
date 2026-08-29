import { applyTransforms } from './apply-transforms'
import { brandSchema } from './brand-schema'
import { createMissingOutcome } from './create-missing-outcome'
import { createOutcome } from './create-outcome'
import { isRule } from './is-rule'
import { isTransform } from './is-transform'
import type { Outcome, Rule, Schema, Transform } from './result'
import { runRules } from './run-rules'

/**
 * Build a primitive type factory: `(...rules) => Schema`.
 * `undefined` fails unless `isOptional` is composed; then rules, then transforms.
 */
export function defineType<T>(
  code: string,
  guard: (value: unknown) => value is T,
  defaultMessage: string
) {
  return <U = T>(...args: Array<Rule | Transform<T, U>>): Schema<U> => {
    const rules: Rule[] = []
    const transforms: Transform<unknown, unknown>[] = []

    for (const arg of args) {
      if (isTransform(arg)) {
        transforms.push(arg)
      } else if (isRule(arg)) {
        rules.push(arg)
      }
    }

    return brandSchema((value: unknown) => {
      if (value === undefined) {
        return createMissingOutcome<U>(rules)
      }
      if (!guard(value)) {
        return createOutcome(value as unknown as U, [
          { code, message: defaultMessage, path: [] }
        ])
      }
      const issues = runRules(rules, value)
      if (issues.length > 0) {
        return createOutcome(value as unknown as U, issues)
      }
      if (transforms.length === 0) {
        return createOutcome(value as unknown as U)
      }
      return applyTransforms(value, transforms) as Outcome<U>
    })
  }
}
