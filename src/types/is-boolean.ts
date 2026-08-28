import { defineType } from '../core/define-type'

export const isBoolean = defineType(
  'boolean',
  (value: unknown): value is boolean => value === true || value === false,
  'Expected boolean'
)
