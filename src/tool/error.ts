import { SHAPE } from '../core/brand'
import { brandRule } from '../core/brand-rule'
import { brandSchema } from '../core/brand-schema'
import { createOutcome } from '../core/create-outcome'
import { getOutcome } from '../core/get-outcome'
import { getShape } from '../core/get-shape'
import { isRule } from '../core/is-rule'
import type { Issue, ObjectSchema, Rule, Schema } from '../core/result'

const TYPE_CODES = new Set([
  'string',
  'number',
  'boolean',
  'integer',
  'null',
  'unknown',
  'object',
  'array',
  'tuple',
  'record',
  'literal',
  'enum',
  'union',
  'never',
  'undefined'
])

function rewriteTypeIssues(issues: Issue[], message: string): Issue[] {
  return issues.map(issue =>
    issue.path.length === 0 && TYPE_CODES.has(issue.code)
      ? { ...issue, message }
      : issue
  )
}

/** Override a schema type-mismatch or a rule failure message. */
export function error<T>(message: string, schema: ObjectSchema<T>): ObjectSchema<T>
export function error<T>(message: string, schema: Schema<T>): Schema<T>
export function error(message: string, rule: Rule): Rule
export function error<T>(
  message: string,
  target: Schema<T> | Rule
): Schema<T> | Rule {
  if (isRule(target)) {
    return brandRule(value =>
      target(value).map(issue => ({ ...issue, message }))
    )
  }
  const wrapped = brandSchema((value: unknown) => {
    const outcome = getOutcome(target(value))
    return createOutcome(outcome.value, rewriteTypeIssues(outcome.issues, message))
  })
  const keys = getShape(target)
  if (keys) {
    return Object.assign(wrapped, { [SHAPE]: keys }) as ObjectSchema<T>
  }
  return wrapped
}
