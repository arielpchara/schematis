# Tools

Import from `schematis/tool`. Tools compose schemas; they are not fluent methods.

> **Functions, not builders**
>
> There is no `schema.min(2).email()`. Pass rules into the type, and wrap schemas with tools.

## `map`

Only way to name an object field or array index.

**Example** (Field and index)

```ts
map('id', isString(isRequired()))
map(0, hasMatch('tag1'))
```

## `transform`

After type + rules pass, convert the value and validate the result. `getParsed()` returns the converted value.

**Example** (Split into an array)

```ts
isString(
  hasMinLength(1),
  transform(value => value.split(' '), isArray(isString())),
)
```

## `refine`

Custom rule. Return a falsy value to fail. Does not run on `undefined`.

**Example** (Lowercase)

```ts
isString(refine(value => value === value.toLowerCase(), 'Must be lowercase'))
```

## Presence

| Function | Role |
|---|---|
| `nullable(schema)` | allow `null` |
| `nullish(schema)` | allow `null` \| `undefined` |
| `withDefault(schema, value)` | use `value` when input is `undefined` |

**Example** (Null and default)

```ts
nullable(isString())(null).isValid() // true
withDefault(isString(), 'anon')(undefined).getParsed() // 'anon'
```

## `strict`

Reject keys that are not in the `isObject` shape.

**Example** (Unexpected key)

```ts
strict(isObject(map('name', isString())))({ name: 'a', extra: 1 }).getErrors()
// [{ path: 'extra', message: 'Unexpected key' }]
```

## Coercion

Convert then validate. `undefined` is not converted.

| Function | Conversion |
|---|---|
| `coerceString(...rules)` | `String(value)` |
| `coerceNumber(...rules)` | `Number(value)` |
| `coerceBoolean(...rules)` | `Boolean(value)` |

**Example** (Number from string)

```ts
coerceNumber()('12').getParsed() // 12
```

## Cheatsheet

| API | Given | Result |
|---|---|---|
| `map` | key, schema \| rule | field |
| `transform` | convert, schema | converted value |
| `refine` | predicate | rule |
| `strict` | object schema | reject extra keys |
| `coerceNumber` | unknown | number |
