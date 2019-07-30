import { Valid } from './validators'
import { isRealValue } from './isRealValue'

export const isRequired = (message?: string): Valid => (value: any) => [
  'required',
  (!isRealValue(value) || value === '') && (message || true)
]
