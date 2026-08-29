import { defineType } from '../core/define-type'

/** Schema that accepts any value. */
export const isUnknown = defineType(
  'unknown',
  (_value: unknown): _value is unknown => true,
  'Expected value'
)
