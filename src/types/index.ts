import { typeObject } from './typeObject'
import { typeString } from './typeString'
import { typeNumber } from './typeNumber'
import { typeBoolean } from './typeBoolean'
import { typeArray } from './typeArray'
import { IError, Valid } from '../validators'
import { typeDate } from './typeDate'

export { key } from './typeObject'

export type SchemeType = (...funcs: Valid[]) => Validator

export type Validator = (value?: any) => IError[] | null

export default {
  array: typeArray,
  boolean: typeBoolean,
  number: typeNumber,
  object: typeObject,
  string: typeString,
  date: typeDate
}
