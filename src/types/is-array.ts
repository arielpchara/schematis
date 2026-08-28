import { brandSchema } from '../core/brand-schema'
import { createOutcome } from '../core/create-outcome'
import { getOutcome } from '../core/get-outcome'
import { isField } from '../core/is-field'
import { isRule } from '../core/is-rule'
import { isSchema } from '../core/is-schema'
import { prefixPath } from '../core/prefix-path'
import { runRules } from '../core/run-rules'
import type { Field, Issue, Rule, Schema } from '../core/result'
import { toIndex } from '../core/to-index'

export function isArray<T>(
  ...args: Array<Schema<T> | Rule | Field<string | number, unknown>>
): Schema<T[]> {
  let item: Schema<T> | undefined
  const rules: Rule[] = []
  const indexMaps: Field<string | number, unknown>[] = []

  for (const arg of args) {
    if (isField(arg)) {
      indexMaps.push(arg)
    } else if (isRule(arg)) {
      rules.push(arg)
    } else if (isSchema(arg) && item === undefined) {
      item = arg as Schema<T>
    }
  }

  return brandSchema((value: unknown) => {
    if (value === undefined) {
      return createOutcome(value as unknown as T[], runRules(rules, value))
    }
    if (!Array.isArray(value)) {
      return createOutcome(value as unknown as T[], [
        { code: 'array', message: 'Expected array', path: [] }
      ])
    }
    const issues: Issue[] = [...runRules(rules, value)]
    const parsed = [...value] as T[]
    const itemSchema = item
    if (itemSchema) {
      value.forEach((element, index) => {
        const outcome = getOutcome(itemSchema(element))
        issues.push(...prefixPath(outcome.issues, index))
        parsed[index] = outcome.value
      })
    }
    for (const field of indexMaps) {
      const index = toIndex(field.key)
      const element = typeof index === 'number' ? parsed[index] : undefined
      const outcome = getOutcome(field.schema(element))
      issues.push(...prefixPath(outcome.issues, index))
      if (typeof index === 'number' && outcome.value !== undefined) {
        parsed[index] = outcome.value as T
      }
    }
    return createOutcome(parsed, issues)
  })
}
