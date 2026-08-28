import { defineType } from '../core/define-type'

/** Schema for one or more literal values. Call the result to add rules: `isLiteral('a')()`. */
export function isLiteral<const T extends string | number | boolean | null>(
  ...values: T[]
) {
  const label =
    values.length === 1
      ? `Expected ${JSON.stringify(values[0])}`
      : `Expected one of ${values.map(value => JSON.stringify(value)).join(', ')}`
  return defineType(
    'literal',
    (value: unknown): value is T => values.includes(value as T),
    label
  )
}
