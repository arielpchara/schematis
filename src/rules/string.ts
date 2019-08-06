import { isRealValue } from './isRealValue'
import { Valid } from './validators'
import types from '../types'

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

const runRegExp = (reg: RegExp, value?: string) => value && !reg.test(value)

export const regular = (reg: RegExp, message?: string): Valid => (
  value?: string
) => [
  'regularExpression',
  isRealValue(value) && runRegExp(reg, value) && (message || true)
]
