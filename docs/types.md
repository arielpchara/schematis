# Types

Import from `schematis/types`. Each `is*` builds a **schema**: `(value) => Check`. Extra arguments are [rules](./rules.md) or [transforms](./tool.md).

Call the factory: `isString()` or `isString(isRequired())`. Values are optional unless `isRequired()` is composed in.

## JSON primitives

| Function | Accepts | Notes |
|---|---|---|
| `isString(...rules)` | `typeof === 'string'` | no boxed `String` |
| `isNumber(...rules)` | finite numbers | `NaN` / `Infinity` fail |
| `isBoolean(...rules)` | `true` \| `false` | |
| `isNull(...rules)` | `null` | missing (`undefined`) still optional |
| `isInteger(...rules)` | `Number.isInteger` | |

```ts
isString()('ok').isValid()
isNumber(hasMin(0))(-1).getErrors()
```

## Objects and arrays

| Function | Role |
|---|---|
| `isObject(...fields)` | plain object; fields via `map` |
| `isArray(item?, ...rulesOrMaps)` | array; item schema, rules, `map(index, …)` |
| `isTuple(...schemas)` | fixed-length array; extra items fail |
| `isRecord(keySchema, valueSchema)` | dictionary; every key/value is checked |

```ts
isObject(
  map('id', isString(isRequired())),
  map('tags', isArray(isString())),
)

isTuple(isString(), isNumber())(['a', 1])
isRecord(isString(), isNumber())({ a: 1 })
```

Unknown object keys are dropped from `getParsed()`. Wrap with `strict()` to reject them.

## Unions and literals

| Function | Role |
|---|---|
| `isLiteral(...values)` | exact `string \| number \| boolean \| null` |
| `isEnum(values)` | string union (`['a', 'b']`) |
| `isUnion(...schemas)` | first matching schema; last failure if none match |

```ts
isLiteral('red', 'green')()
isEnum(['Salmon', 'Tuna'] as const)()
isUnion(isString(), isNumber())
```

## Special

| Function | Role |
|---|---|
| `isUnknown(...rules)` | any value |
| `isUndefined()` | only `undefined` |
| `isNever()` | always fails |

`undefined` on most types (except `isUndefined` / `isNever`) skips the type guard and only runs rules such as `isRequired`.
