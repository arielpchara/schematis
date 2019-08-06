import { Valid, isRealValue, validators, IError } from '../rules'
import { Validator } from './index'

const isObject = (message?: string): Valid => (value: any) => [
  'object',
  isRealValue(value) &&
    !(typeof value === 'object' || value instanceof Object) &&
    (message || true)
]

export const key = (k: string) => (typeCheck?: any): Valid => (value: any) => {
  const keyErrors = typeCheck((value || {})[k])
  if (keyErrors) {
    return ['key', keyErrors, k]
  }
  return null
}

export const typeObject = (message?: string) => (
  ...funcs: Valid[]
): Validator => (value?: any): IError[] | null => {
  const resultErrors: IError[] | null = [isObject(message), ...funcs].reduce(
    (errors: IError[] | null, func: Valid) => {
      return validators(func, errors, value)
    },
    null
  )
  return resultErrors
}
