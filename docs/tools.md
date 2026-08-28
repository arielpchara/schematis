# Tools

Import from `schematis/tool`. Tools compose schemas; they are not fluent methods.

## `map(key, schema | rule)`

Only way to name an object field or array index.

```ts
map('id', isString(isRequired()))
map(0, hasMatch('tag1'))
```

## `transform(convert, schema)`

After type + rules pass, convert the value and validate the result. `getParsed()` returns the converted value.

```ts
isString(
  hasMinLength(1),
  transform(value => value.split(' '), isArray(isString())),
)
```

## `refine(predicate, message?)`

Custom rule. Return a falsy value to fail. Does not run on `undefined`.

```ts
isString(refine(value => value === value.toLowerCase(), 'Must be lowercase'))
```

## Presence wrappers

| Function | Role |
|---|---|
| `nullable(schema)` | allow `null` |
| `nullish(schema)` | allow `null` \| `undefined` |
| `withDefault(schema, value)` | use `value` when input is `undefined` |

```ts
nullable(isString())(null).isValid() // true
withDefault(isString(), 'anon')(undefined).getParsed() // 'anon'
```

## `strict(objectSchema)`

Reject keys that are not in the `isObject` shape.

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

```ts
coerceNumber()('12').getParsed() // 12
```
