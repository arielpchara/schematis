# Rules

Import from `schematis/rules`. A rule is `(value) => Issue[]`. Empty array means pass. Compose into a type:

**Example** (Email with min length)

```ts
isString(hasMinLength(2), isEmail())
```

> **Skip the wrong kind**
>
> Rules skip when the value is the wrong kind (e.g. `hasMin` on a string). `undefined` skips every rule. The pipeline fails missing values unless wrapped with `optional()`.

## Strings and arrays

| Function | Fails when |
|---|---|
| `hasMatch(pattern)` | string: `RegExp` → `!test`; `string` → not equal |
| `hasMinLength(n)` | `.length < n` |
| `hasMaxLength(n)` | `.length > n` |
| `hasLength(n)` | `.length !== n` |
| `hasPrefix(s)` | string does not start with `s` |
| `hasSuffix(s)` | string does not end with `s` |
| `hasInclude(s)` | string does not include `s` |

## Numbers

`hasMin` / `hasMax` are inclusive. Use `hasGt` / `hasLt` for exclusive bounds.

| Function | Fails when |
|---|---|
| `hasMin(n)` | `value < n` (inclusive) |
| `hasMax(n)` | `value > n` (inclusive) |
| `hasGt(n)` | `value <= n` |
| `hasLt(n)` | `value >= n` |
| `isPositive()` | `value <= 0` |
| `isNegative()` | `value >= 0` |
| `isNonnegative()` | `value < 0` |
| `isMultipleOf(n)` | `value % n !== 0` |

## Formats

Wrap with `error(message, rule)` to replace the default. Issue `code` is the rule name (`min`, `email`, …). Missing values use `required`.

**Example** (Custom message)

```ts
isString(error('invalid email', isEmail()))
```

| Function | Fails when |
|---|---|
| `isEmail()` | not a strict email |
| `isUuid()` | not RFC-style UUID |
| `isUrl()` | not `http:` / `https:` `URL` |
| `isIpv4()` | not dotted IPv4 |
| `isIpv6()` | not IPv6 |
| `isHex()` | not hex digits |
| `isBase64()` | not padded base64 |

## Cheatsheet

| API | Applies to | Fail |
|---|---|---|
| `hasMinLength` | string / array | too short |
| `hasMin` | number | below n |
| `isEmail` | string | not email |
