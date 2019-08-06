import { isRealValue, Valid, validators } from '../validators'
import { Validator } from './index'

const isDate = (message?: string): Valid => (value?: Date) => [
  'date',
  isRealValue(value) && !(value instanceof Date) && (message || true)
]

export const typeDate = (message?: string) => (
  ...funcs: Valid[]
): Validator => (value?: any) =>
  [isDate(message), ...funcs].reduce(
    (errors: any, func: Valid) => validators(func, errors, value),
    null
  )
