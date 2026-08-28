import { brandSchema } from '../core/brand-schema'
import { createOutcome } from '../core/create-outcome'
import { getOutcome } from '../core/get-outcome'
import { getShape } from '../core/get-shape'
import { isPlainObject } from '../core/is-plain-object'
import type { Issue, Schema } from '../core/result'

/** Reject object keys that are not in the `isObject` shape. */
export function strict<T>(schema: Schema<T>): Schema<T> {
  return brandSchema(value => {
    const outcome = getOutcome(schema(value))
    if (!isPlainObject(value)) {
      return outcome
    }
    const allowed = getShape(schema)
    if (!allowed) {
      return outcome
    }
    const issues: Issue[] = [...outcome.issues]
    for (const key of Object.keys(value)) {
      if (!allowed.includes(key)) {
        issues.push({
          code: 'unrecognized_keys',
          message: 'Unexpected key',
          path: [key]
        })
      }
    }
    return createOutcome(outcome.value, issues)
  })
}
