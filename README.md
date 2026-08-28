<p align="center">
  <img src="docs/hero.svg" alt="schematis — functional JSON validation" width="100%"/>
</p>

<p align="center">
  <strong>functional JSON validation</strong><br/>
  schemas are functions · rules are functions · keys use <code>map</code>
</p>

<p align="center">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square"/>
  <img alt="Node" src="https://img.shields.io/badge/node-LTS-3c873a?style=flat-square"/>
  <img alt="license" src="https://img.shields.io/badge/license-MIT-e8a54b?style=flat-square"/>
  <img alt="deps" src="https://img.shields.io/badge/deps-0-14120f?style=flat-square"/>
</p>

# schematis

Zero dependencies. TypeScript. Node LTS.

```ts
import { map } from 'schematis/tool'
import { isObject, isString, isNumber } from 'schematis/types'
import { isRequired, hasMin } from 'schematis/rules'

const user = isObject(
  map('id', isString(isRequired('id is required'))),
  map('age', isNumber(hasMin(0))),
)

const { isValid, assertValid, getParsed, getErrors } = user({
  id: '42',
  age: 35,
})
```

A schema returns a **check**: `isValid()`, `assertValid()`, `getParsed()`, `getErrors()`. Values are optional until `isRequired()`.

## Install

```
npm install schematis
```

Named exports from `schematis`, or from `schematis/types`, `schematis/rules`, `schematis/tool`.

## Docs

Function reference lives in [`docs/`](docs/README.md):

- [Types](docs/types.md) — `isString`, `isObject`, `isUnion`, …
- [Rules](docs/rules.md) — `isRequired`, `hasMin`, `isEmail`, …
- [Tools](docs/tools.md) — `map`, `transform`, `refine`, `strict`, …
- [Core](docs/core.md) — check object, pipeline, internals

## License

MIT
