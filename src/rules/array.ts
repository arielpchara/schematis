import { Validator } from '../types'
import { isRealValue } from './isRealValue'
import { Valid } from './validators'

export const elementType = (typeValidator: Validator): Valid => (
  value: any[]
) => {
  let error: any = false
  let elementWithError: any
  if (isRealValue(value)) {
    for (const el of value) {
      const typeErrors = typeValidator(el)
      if (typeErrors !== null) {
        error = typeErrors
        elementWithError = el
        break
      }
    }
  }
  return ['elementType', error, elementWithError]
}
