import { isRealValue } from './isRealValue'
import { Valid } from './validators'

export const instanceOf = (of: any, message?: string): Valid => (
  value: any
) => [
  'instanceOf',
  isRealValue(value) && !(value instanceof of) && (message || true)
]
