import { isRealValue } from './isRealValue'
import { Valid } from './validators'

export const minLength = (min: number, message?: string): Valid => (
  value: string | any[]
) => [
  'minLength',
  isRealValue(value) && value.length < min && (message || true)
]

export const maxLength = (min: number, message?: string): Valid => (
  value: string | any[]
) => [
  'maxLength',
  isRealValue(value) && value.length > min && (message || true)
]
