import { defineType } from '../core/define-type'

/** Schema for integers (`Number.isInteger`). */
export const isInteger = defineType(
  'integer',
  (value: unknown): value is number => Number.isInteger(value),
  'Expected integer'
)
