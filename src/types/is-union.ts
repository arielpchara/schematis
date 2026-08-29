import { brandSchema } from '../core/brand-schema'
import { createOutcome } from '../core/create-outcome'
import { getOutcome } from '../core/get-outcome'
import type { Infer, Schema } from '../core/result'

/** First matching schema wins; otherwise the last failure. */
export function isUnion<S extends Schema<unknown>[]>(
  ...schemas: S
): Schema<Infer<S[number]>> {
  return brandSchema(value => {
    let last = createOutcome(value as Infer<S[number]>, [
      { code: 'union', message: 'Invalid union', path: [] }
    ])
    for (const schema of schemas) {
      const outcome = getOutcome(schema(value))
      if (outcome.issues.length === 0) {
        return outcome as typeof last
      }
      last = outcome as typeof last
    }
    return last
  })
}
