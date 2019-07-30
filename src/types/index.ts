import { typeObject } from './typeObject'
import { typeString } from './typeString'
import { typeNumber } from './typeNumber'

export { key } from './typeObject'

export default {
  number: typeNumber,
  object: typeObject,
  string: typeString
}
