import { SCHEMA } from './brand'
import { createCheck } from './create-check'
import type { Outcome, Schema } from './result'

export function brandSchema<T>(
  run: (value: unknown) => Outcome<T>
): Schema<T> {
  const schema = (value: unknown) => createCheck(run(value))
  return Object.assign(schema, { [SCHEMA]: true as const })
}
