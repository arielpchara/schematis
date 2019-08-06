# SCHEMATIS

Yes, I'm trying to create a JOI alternative more functional, and browser compatible.

## Support on Beerpay

Hey dude! Help me out for a couple of :beers:!

[![Beerpay](https://beerpay.io/arielpchara/schematis/badge.svg?style=beer-square)](https://beerpay.io/arielpchara/schematis) [![Beerpay](https://beerpay.io/arielpchara/schematis/make-wish.svg?style=flat-square)](https://beerpay.io/arielpchara/schematis?focus=wish)

---

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![Travis (.org)](https://img.shields.io/travis/arielpchara/schematis?style=flat-square)
![Coveralls github](https://img.shields.io/coveralls/github/arielpchara/schematis?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/arielpchara/schematis?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/arielpchara/schematis?style=flat-square)
![GitHub package.json dynamic](https://img.shields.io/github/package-json/keywords/arielpchara/schematis?style=flat-square)
![Typescript, yes](https://img.shields.io/badge/typescript-yes-blue?style=flat-square)

## Install

Usual way `npm install schematis`

## Usage

It has many things to do but is it a good begin

### Type String

**Number rules validators**

- minLength(minLength: number, message: string): Minimum length
- maxLength(maxLength: number, message: string): Maximum length

```js
import types, { isRequired } from 'schematis'

const name = 'Ariel Pchara'
const country = ''
const city = 123

const checkRequiredString = types.string('Should be an string')(
  isRequired("This string can't be empty")
)

checkRequiredString(name) // null - because has no errors
checkRequiredString(country) // [{type: 'required', error: 'This string can\'t be empty'}] - is an empty string
checkRequiredString(city) // [{type: 'string', error: 'Should be an string'}] - is not a string
```

### Type Number

**Number rules validators**

- min(minValue: number, message: string): Minimum value
- max(maxValue: number, message: string): Maximum value
- pair(message: string): Pair number
- odd(message: string): Odd number

```js
import types, { pair } from 'schematis'

const age = 35

const checkNumber = types.number('Should be a number')
const checkNumberPair = checkNumber(pair())

checkNumber()(age) // null -  its a number
checkNumberPair(age) // [{type: 'pair', error: true}] - its a number
checkNumberPair(20) // null -  20 is a pair number
```

### Type Object

```js
import types, { key, isRequired } from 'schematis'

const user = {
  name: 'Ariel Pchara',
  country: '',
  city: 123
}

const checkRequiredString = types.string('Should be an string')(
  isRequired("This string can't be empty")
)

const checkUserObject = types.object('Should be an object')(
  key('name')(checkRequiredString),
  key('country')(checkRequiredString),
  key('city')(checkRequiredString),
)

checkUserObject(user)
/**
 * [
 *  {type: 'key', ref: 'country', error: [{type: 'required': error: 'This string can't be empty'}] }
 *  {type: 'key', ref: 'city', error: [{type: 'string': error: 'Should be an string'}] }
 * ]
 * /
```

### Type Array

```js
import types, { elementType, isRequired } from 'schematis'

const arrayScheme = types.array()(
  elementType(types.number()(
    min(0), max(10)
  )
))

arrayScheme([4, 5, 10, 9.6])
// null
arrayScheme([4, 5, 100, 9.6])
/**
 * [
 *  {type: 'elementType', ref: 100, error: [{type: 'max': error: true}] }
 * ]
 * /
```

## Other Types

- boolean
- date
