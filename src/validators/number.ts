import { Valid } from './validators'
import { isRealValue } from './isRealValue'

export const min = (param: number, message?: string): Valid => (
  value: number
) => ['min', isRealValue(value) && value < param && (message || true)]

export const max = (param: number, message?: string): Valid => (
  value: number
) => ['max', isRealValue(value) && value > param && (message || true)]

export const pair = (message?: string): Valid => (value: number) => [
  'pair',
  isRealValue(value) && value % 2 !== 0 && (message || true)
]

export const odd = (message?: string): Valid => (value: number) => [
  'odd',
  isRealValue(value) && value % 2 === 0 && (message || true)
]
