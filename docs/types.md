# Types

Import from `schematis/types`. Each `is*` builds a **schema**: `(value) => Check`. Extra arguments are [rules](./rules.md).

Call the factory: `isString()` or `optional(isString())`.

> **Required by default**
>
> Values are required until `optional(schema)` wraps them. `undefined` fails with one required issue.

## JSON primitives

**Example** (String and number)

```ts
isString()('ok').isValid()
isNumber(hasMin(0))(-1).getErrors()
```

| Function | Accepts | Notes |
|---|---|---|
| `isString(...rules)` | `typeof === 'string'` | no boxed `String` |
| `isNumber(...rules)` | finite numbers | `NaN` / `Infinity` fail |
| `isBoolean(...rules)` | `true` \| `false` | |
| `isNull(...rules)` | `null` | missing (`undefined`) is required |
| `isInteger(...rules)` | `Number.isInteger` | |

## Objects and arrays

Unknown object keys are dropped from `getParsed()`. Wrap with `strict()` to reject them.

**Example** (Nested object)

```ts
isObject(
  map('id', isString()),
  map('tags', isArray(isString())),
)

isTuple(isString(), isNumber())(['a', 1])
isRecord(isString(), isNumber())({ a: 1 })
```

| Function | Role |
|---|---|
| `isObject(...fields)` | plain object; fields via `map` |
| `isArray(item?, ...rulesOrMaps)` | array; item schema, rules, `map(index, …)` |
| `isTuple(...schemas)` | fixed-length array; extra items fail |
| `isRecord(keySchema, valueSchema)` | dictionary; every key/value is checked |

## Unions and literals

**Example** (Literal, enum, union)

```ts
isLiteral('red', 'green')()
isEnum(['Salmon', 'Tuna'] as const)()
isUnion(isString(), isNumber())
```

| Function | Role |
|---|---|
| `isLiteral(...values)` | exact `string \| number \| boolean \| null` |
| `isEnum(values)` | string union (`['a', 'b']`) |
| `isUnion(...schemas)` | first matching schema; last failure if none match |

## Special

`undefined` on most types fails as required unless wrapped with `optional()`. `isUndefined` accepts only `undefined`; `isNever` always fails.

| Function | Role |
|---|---|
| `isUnknown(...rules)` | any value |
| `isUndefined()` | only `undefined` |
| `isNever()` | always fails |

## Cheatsheet

| API | Given | Result |
|---|---|---|
| `isString` | `unknown` | `string` |
| `isNumber` | `unknown` | `number` |
| `isObject` | fields via `map` | plain object |
| `isArray` | item schema | `T[]` |
| `isUnion` | schemas | first match |
