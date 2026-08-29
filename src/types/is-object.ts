import { SHAPE } from '../core/brand'
import { brandSchema } from '../core/brand-schema'
import { createMissingOutcome } from '../core/create-missing-outcome'
import { createOutcome } from '../core/create-outcome'
import { getOutcome } from '../core/get-outcome'
import { isField } from '../core/is-field'
import { isPlainObject } from '../core/is-plain-object'
import { isRule } from '../core/is-rule'
import { prefixPath } from '../core/prefix-path'
import { runRules } from '../core/run-rules'
import type { Field, Issue, Rule, Schema } from '../core/result'

type ObjectShape<A extends Array<Field<string, unknown> | Rule>> = {
  [F in Extract<A[number], Field<string, unknown>> as F['key']]: F extends Field<
    string,
    infer T
  >
    ? T
    : never
}

/** Plain object schema. Fields come from `map`; unknown keys are omitted from parse. */
export function isObject<
  const A extends Array<Field<string, unknown> | Rule>
>(...args: A): Schema<ObjectShape<A>> {
  const fields: Field<string, unknown>[] = []
  const rules: Rule[] = []

  for (const arg of args) {
    if (isField(arg)) {
      fields.push(arg as Field<string, unknown>)
    } else if (isRule(arg)) {
      rules.push(arg)
    }
  }

  const schema = brandSchema((value: unknown) => {
    if (value === undefined) {
      return createMissingOutcome<ObjectShape<A>>(rules)
    }
    if (!isPlainObject(value)) {
      return createOutcome(value as unknown as ObjectShape<A>, [
        { code: 'object', message: 'Expected object', path: [] }
      ])
    }
    const issues: Issue[] = [...runRules(rules, value)]
    const parsed: Record<string, unknown> = {}
    for (const field of fields) {
      const outcome = getOutcome(field.schema(value[field.key]))
      issues.push(...prefixPath(outcome.issues, field.key))
      if (outcome.value !== undefined) {
        parsed[field.key] = outcome.value
      }
    }
    return createOutcome(parsed as ObjectShape<A>, issues)
  })
  return Object.assign(schema, {
    [SHAPE]: fields.map(field => field.key)
  })
}
