# SCHEMATIS

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![Travis (.org)](https://img.shields.io/travis/arielpchara/schematis?style=flat-square)
![Coveralls github](https://img.shields.io/coveralls/github/arielpchara/schematis?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/arielpchara/schematis?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/arielpchara/schematis?style=flat-square)
![GitHub package.json dynamic](https://img.shields.io/github/package-json/keywords/arielpchara/schematis?style=flat-square)

Yes i'm trying to create a JOI alternative more functional, and browser compatible.

JSON contract validator

## Install

Usual way `npm install schematis`

## Usage

It has many things to do but is it a good begin

### Type String

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

### Type Object

```js
import types, { key } from 'schematis'

const user = {
  name: 'Ariel Pchara',
  country: ''
  city: 123
}

const checkUserObject = types.object('Should be an object')(
  key('name')(typed.string(isRequired())),
  key('country')(typed.string()),
  key('city')(typed.string()),
)

checkUserObject(user)
/**
 * [
 *  {type: 'key', ref: 'country', error: [{type: 'required': error: true}] }
 *  {type: 'key', ref: 'city', error: [{type: 'string': error: true}] }
 * ]
 * /
```
