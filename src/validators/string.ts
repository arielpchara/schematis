import { isRealValue } from './isRealValue'
import { Valid } from './validators'

const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

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

const expIsFalse = (reg: RegExp, value?: string) => value && !reg.test(value)

export const regular = (reg: RegExp, message?: string): Valid => (
  value?: string
) => [
  'regularExpression',
  isRealValue(value) && expIsFalse(reg, value) && (message || true)
]

export const email = (message?: string): Valid => (value?: string) => [
  'email',
  isRealValue(value) && expIsFalse(emailPattern, value) && (message || true)
]
