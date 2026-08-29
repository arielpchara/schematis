import { defineType } from '../core/define-type'

/** Schema for a fixed set of strings. Call the result to add rules: `isEnum(['a'])()`. */
export function isEnum<const T extends readonly string[]>(values: T) {
  return defineType(
    'enum',
    (value: unknown): value is T[number] =>
      typeof value === 'string' && (values as readonly string[]).includes(value),
    `Expected one of ${values.join(', ')}`
  )
}
