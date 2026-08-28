import { defineType } from '../core/define-type'

/** Schema for JSON `null`. */
export const isNull = defineType(
  'null',
  (value: unknown): value is null => value === null,
  'Expected null'
)
