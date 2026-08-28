import { defineType } from '../core/define-type'

export const isString = defineType(
  'string',
  (value: unknown): value is string => typeof value === 'string',
  'Expected string'
)
