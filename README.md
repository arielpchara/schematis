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

## Install

```
npm install schematis
```

```ts
import { map, transform } from 'schematis/tool'
import { isObject, isString, isNumber, isBoolean, isNull, isArray } from 'schematis/types'
import { isRequired, hasMatch, hasMin, hasMax, hasMinLength, hasMaxLength } from 'schematis/rules'
```

Named exports only. You can also import from `schematis` directly.

Docs: [types](docs/types.md) · [rules](docs/rules.md) · [tools](docs/tools.md) · [core](docs/core.md)

## Check

Calling a schema returns a check object — never throws unless you call `assertValid`.

| Method | Returns | Notes |
|---|---|---|
| `isValid()` | `boolean` | `true` when there are no errors |
| `assertValid()` | `void` | throws `Error` if invalid |
| `getParsed()` | parsed value | returned even when invalid; `undefined` keys are omitted |
| `getErrors()` | `{ path, message }[]` | dotted paths (`address.place`, `tags.0`) |

```ts
const check = user({ id: '42' })

check.isValid()
// false

check.getParsed()
// { id: '42' }

check.getErrors()
// []  // age is optional

check.assertValid()
// throws if invalid
```

## Types

JSON types. Each `is*` call builds a schema. Extra arguments are rules (or `transform`).

| Type | Accepts |
|---|---|
| `isString(...rules)` | `typeof === 'string'` |
| `isNumber(...rules)` | finite numbers (`NaN` / `Infinity` fail) |
| `isBoolean()` | `true` \| `false` |
| `isNull()` | `null` |
| `isObject(...fields)` | plain object; fields via `map` |
| `isArray(item?, ...rules)` | array; optional item schema, rules, and `map(index, …)` |
| `isLiteral(...values)` | exact `string \| number \| boolean \| null` |
| `isEnum([...])` | string union |
| `isInteger()` | `Number.isInteger` |
| `isTuple(...schemas)` | fixed-length array |
| `isUnion(...schemas)` | first matching schema |
| `isRecord(key, value)` | dictionary object |
| `isUnknown()` | any value |
| `isUndefined()` | `undefined` |
| `isNever()` | nothing |

Values are **optional** unless you add `isRequired()`. Missing keys are `undefined`. `null` is a JSON value — only `isNull()` accepts it.

```ts
isString()(undefined).isValid()  // true
isString()(null).isValid()       // false
isString(isRequired())(undefined).isValid()  // false
isNull()(null).isValid()         // true
```

## Rules

Compose into a type. Custom messages are optional.

| Rule | Applies to | Fails when |
|---|---|---|
| `isRequired(message?)` | any | value is `undefined` (`null` and `''` pass) |
| `hasMatch(pattern, message?)` | string | `RegExp` → `.test`; `string` → exact equality |
| `hasMin(n, message?)` | number | value `< n` |
| `hasMax(n, message?)` | number | value `> n` |
| `hasMinLength(n, message?)` | string \| array | `.length < n` |
| `hasMaxLength(n, message?)` | string \| array | `.length > n` |
| `hasLength(n, message?)` | string \| array | `.length !== n` |
| `hasPrefix` / `hasSuffix` / `hasInclude` | string | missing substring |
| `hasGt` / `hasLt` | number | not strictly greater / less |
| `isPositive` / `isNegative` / `isNonnegative` | number | sign |
| `isMultipleOf(n)` | number | `value % n !== 0` |
| `isEmail` / `isUuid` / `isUrl` | string | format |
| `isIpv4` / `isIpv6` / `isHex` / `isBase64` | string | format |

```ts
isString(isRequired('id is required'), hasMatch(/\d+/, 'all digits'))
isNumber(hasMin(0), hasMax(99))
isArray(isString(), hasMinLength(1))
```

## Tools

### `map(key, schema | rule)`

The only way to name a field or array index.

```ts
isObject(
  map('id', isString(isRequired())),
  map(
    'address',
    isObject(map('place', isString(isRequired('place is required')))),
  ),
)

isArray(isString(), map(0, hasMatch('tag1')))
```

A missing parent still runs nested `isRequired` fields:

```ts
const schema = isObject(
  map('address', isObject(map('place', isString(isRequired('place is required'))))),
)

schema({}).getErrors()
// [{ path: 'address.place', message: 'place is required' }]
```

### `transform(convert, schema)`

Runs after the type and rules pass. The converted value is then validated; `getParsed()` returns that value.

```ts
import { map, transform } from 'schematis/tool'
import { isString, isArray } from 'schematis/types'
import { isRequired, hasMinLength, hasMaxLength } from 'schematis/rules'

const nameSchema = isString(
  isRequired('string is required'),
  hasMinLength(1),
  hasMaxLength(10),
  transform(
    (value: string) => value.split(' '),
    isArray(
      hasMinLength(2, 'must have at least 2 words'),
      map(0, isString(hasMinLength(2, 'first name must have at least 2 characters'))),
    ),
  ),
)

nameSchema('John Doe').getParsed()
// ['John', 'Doe']
```

### Other tools

| Tool | Role |
|---|---|
| `refine(predicate, message?)` | custom rule |
| `nullable(schema)` | allow `null` |
| `nullish(schema)` | allow `null` \| `undefined` |
| `withDefault(schema, value)` | fill when `undefined` |
| `strict(objectSchema)` | reject unknown keys |
| `coerceString` / `coerceNumber` / `coerceBoolean` | `String` / `Number` / `Boolean` then validate |

## Example

```ts
const validate = isObject(
  map('id', isString(isRequired('id is required'), hasMatch(/\d+/, 'all digits'))),
  map('name', nameSchema),
  map('count', isNumber(hasMin(0), hasMax(99))),
  map('active', isBoolean()),
  map('deletedAt', isNull()),
  map(
    'tags',
    isArray(isString(), hasMinLength(1), map('0', hasMatch('tag1'))),
  ),
)

const { isValid, getParsed, getErrors } = validate({
  id: '123',
  name: 'John Doe',
  count: 3,
  active: true,
  deletedAt: null,
  tags: ['tag1', 'other'],
})
```

## License

MIT
