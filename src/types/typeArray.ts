import { Valid, isRealValue, validators, IError } from '../rules'
import { Validator } from './index'

const isArray = (message?: string): Valid => (value: any[]) => [
  'array',
  isRealValue(value) && !Array.isArray(value) && (message || true)
]

export const typeArray = (message?: string) => (
  ...funcs: Valid[]
): Validator => (value?: any): IError[] | null => {
  const resultErrors: IError[] | null = [isArray(message), ...funcs].reduce(
    (errors: IError[] | null, func: Valid) => {
      return validators(func, errors, value)
    },
    null
  )
  return resultErrors
}
