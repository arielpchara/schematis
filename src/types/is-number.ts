import { defineType } from '../core/define-type'

export const isNumber = defineType(
  'number',
  (value: unknown): value is number =>
    typeof value === 'number' && Number.isFinite(value),
  'Expected number'
)
