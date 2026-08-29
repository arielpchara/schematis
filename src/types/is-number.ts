import { defineType } from '../core/define-type'

/** Schema for finite numbers (`NaN` / `Infinity` fail). */
export const isNumber = defineType(
  'number',
  (value: unknown): value is number =>
    typeof value === 'number' && Number.isFinite(value),
  'Expected number'
)
