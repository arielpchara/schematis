import { isRealValue, Valid, validators } from '../rules'

const isNumber = (message?: string): Valid => (value?: any) => [
  'number',
  isRealValue(value) &&
    !(typeof value === 'number' || value instanceof Number) &&
    (message || true)
]

export const typeNumber = (message?: string) => (...funcs: Valid[]) => (
  value?: any
) =>
  [isNumber(message), ...funcs].reduce(
    (errors: any, func: Valid) => validators(func, errors, value),
    null
  )
