import { defineType } from '../core/define-type'

export const isNull = defineType(
  'null',
  (value: unknown): value is null => value === null,
  'Expected null'
)
