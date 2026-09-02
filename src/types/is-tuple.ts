import { brandSchema } from '../core/brand-schema'
import { createOutcome } from '../core/create-outcome'
import { getOutcome } from '../core/get-outcome'
import { prefixPath } from '../core/prefix-path'
import type { Infer, Issue, Schema } from '../core/result'

type TupleOf<S extends Schema<unknown>[]> = {
  [I in keyof S]: Infer<S[I]>
}

/** Fixed-length array; extra or missing items fail. */
export function isTuple<S extends Schema<unknown>[]>(
  ...schemas: S
): Schema<TupleOf<S>> {
  return brandSchema(value => {
    if (!Array.isArray(value)) {
      return createOutcome(value as unknown as TupleOf<S>, [
        { code: 'tuple', message: 'Expected tuple', path: [] }
      ])
    }
    const issues: Issue[] = []
    if (value.length !== schemas.length) {
      issues.push({
        code: 'tuple',
        message: `Expected tuple of length ${schemas.length}`,
        path: []
      })
    }
    const parsed: unknown[] = []
    schemas.forEach((schema, index) => {
      const outcome = getOutcome(schema(value[index]))
      issues.push(...prefixPath(outcome.issues, index))
      parsed[index] = outcome.value
    })
    return createOutcome(parsed as TupleOf<S>, issues)
  })
}
