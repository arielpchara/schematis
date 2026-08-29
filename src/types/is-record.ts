import { brandSchema } from '../core/brand-schema'
import { createMissingOutcome } from '../core/create-missing-outcome'
import { createOutcome } from '../core/create-outcome'
import { getOutcome } from '../core/get-outcome'
import { isPlainObject } from '../core/is-plain-object'
import { prefixPath } from '../core/prefix-path'
import type { Issue, Schema } from '../core/result'

/** Dictionary object: every key and value is validated. */
export function isRecord<V>(
  keySchema: Schema<string>,
  valueSchema: Schema<V>
): Schema<Record<string, V>> {
  return brandSchema(value => {
    if (value === undefined) {
      return createMissingOutcome<Record<string, V>>()
    }
    if (!isPlainObject(value)) {
      return createOutcome(value as unknown as Record<string, V>, [
        { code: 'record', message: 'Expected object', path: [] }
      ])
    }
    const issues: Issue[] = []
    const parsed: Record<string, V> = {}
    for (const key of Object.keys(value)) {
      const keyOutcome = getOutcome(keySchema(key))
      issues.push(...prefixPath(keyOutcome.issues, key))
      const valueOutcome = getOutcome(valueSchema(value[key]))
      issues.push(...prefixPath(valueOutcome.issues, key))
      if (valueOutcome.value !== undefined) {
        parsed[key] = valueOutcome.value
      }
    }
    return createOutcome(parsed, issues)
  })
}
