import { Valid, isRealValue, validators } from '../rules'
import { Validator, SchemeType } from './index'

const isString = (message?: string): Valid => (value?: any) => [
  'string',
  isRealValue(value) &&
    !(typeof value === 'string' || value instanceof String) &&
    (message || true)
]

export const typeString = (message?: string): SchemeType => (
  ...funcs: Valid[]
): Validator => (value?: any) =>
  [isString(message), ...funcs].reduce(
    (errors: any, func: Valid) => validators(func, errors, value),
    null
  )
