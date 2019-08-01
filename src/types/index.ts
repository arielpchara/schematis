import { typeObject } from './typeObject'
import { typeString } from './typeString'
import { typeNumber } from './typeNumber'
import { typeBoolean } from './typeBoolean'
import { typeArray } from './typeArray'

export { key } from './typeObject'

export default {
  array: typeArray,
  boolean: typeBoolean,
  number: typeNumber,
  object: typeObject,
  string: typeString
}
