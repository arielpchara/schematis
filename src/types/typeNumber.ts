import { isRealValue, Valid, validators } from '../validators'
import { Validator } from './index'

const isNumber = (message?: string): Valid => (value?: any) => [
  'number',
  isRealValue(value) &&
    !(typeof value === 'number' || value instanceof Number) &&
    (message || true)
]

export const typeNumber = (message?: string) => (
  ...funcs: Valid[]
): Validator => (value?: any) =>
  [isNumber(message), ...funcs].reduce(
    (errors: any, func: Valid) => validators(func, errors, value),
    null
  )
