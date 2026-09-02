# Tools

Import from `schematis/tool`. Tools compose schemas; they are not fluent methods.

> **Functions, not builders**
>
> There is no `schema.min(2).email()`. Pass rules into the type, and wrap schemas with tools.

## `map`

Only way to name an object field or array index.

**Example** (Field and index)

```ts
map('id', isString())
map('nick', optional(isString()))
map(0, isString(hasMatch('tag1')))
```

## `transform`

Wrap a schema: after it passes, convert the value and validate with `outSchema`. `getParsed()` returns the converted value.

**Example** (Split into an array)

```ts
transform(
  isString(hasMinLength(1)),
  value => value.split(' '),
  isArray(isString()),
)
```

## `refine`

Custom rule. Return a falsy value to fail. Does not run on `undefined`.

**Example** (Lowercase)

```ts
isString(error('Must be lowercase', refine(value => value === value.toLowerCase())))
```

## `error`

`error(message, schema)` or `error(message, rule)`. Override a type-mismatch or rule message. Nested issues stay as they are.

**Example** (String and email)

```ts
error(
  'must be a string',
  isString(error('is not an email', isEmail()))
)
```

## Presence

| Function | Role |
|---|---|
| `optional(schema)` | allow `undefined` |
| `nullable(schema)` | allow `null` |
| `nullish(schema)` | allow `null` \| `undefined` |
| `withDefault(schema, value)` | use `value` when input is `undefined` |

**Example** (Null and default)

```ts
nullable(isString())(null).isValid() // true
optional(isString())(undefined).isValid() // true
withDefault(isString(), 'anon')(undefined).getParsed() // 'anon'
```

## `strict`

Reject keys that are not in the `isObject` shape. Only wraps `isObject`.

**Example** (Unexpected key)

```ts
strict(isObject(map('name', isString())))({ name: 'a', extra: 1 }).getErrors()
// [{ path: 'extra', message: 'Unexpected key' }]
```

## Coercion

Convert then validate with a type. `undefined` is not converted.

| Function | Conversion |
|---|---|
| `coerceString(schema?)` | `String(value)` then `isString()` |
| `coerceNumber(schema?)` | `Number(value)` then `isNumber()` |
| `coerceBoolean(schema?)` | `Boolean(value)` then `isBoolean()` |

**Example** (Number from string)

```ts
coerceNumber()('12').getParsed() // 12
```

## Cheatsheet

| API | Given | Result |
|---|---|---|
| `map` | key, schema | field |
| `transform` | schema, convert, schema | converted value |
| `refine` | predicate | rule |
| `error(message, schema)` | schema or rule | custom type/rule message |
| `optional` | schema | allow undefined |
| `strict` | object schema | reject extra keys |
| `coerceNumber` | unknown | number |
