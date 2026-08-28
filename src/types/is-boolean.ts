import { defineType } from '../core/define-type'

/** Schema for `true` or `false`. */
export const isBoolean = defineType(
  'boolean',
  (value: unknown): value is boolean => value === true || value === false,
  'Expected boolean'
)
