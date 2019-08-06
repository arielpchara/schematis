import { isRealValue, Valid, validators } from '../rules'
import { Validator } from './index'

const isBoolean = (message?: string): Valid => (value?: any) => [
  'boolean',
  isRealValue(value) &&
    !(value === true || value === false) &&
    (message || true)
]

export const typeBoolean = (message?: string) => (
  ...funcs: Valid[]
): Validator => (value?: any) =>
  [isBoolean(message), ...funcs].reduce(
    (errors: any, func: Valid) => validators(func, errors, value),
    null
  )
