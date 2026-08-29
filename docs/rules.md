# Rules

Import from `schematis/rules`. A rule is `(value) => Issue[]`. Empty array means pass. Compose into a type:

**Example** (Optional email)

```ts
isString(isOptional(), hasMinLength(2), isEmail())
```

> **Skip the wrong kind**
>
> Rules skip when the value is the wrong kind (e.g. `hasMin` on a string). `undefined` skips every rule. The pipeline fails missing values unless `isOptional` is composed.

## Presence

| Function | Fails when |
|---|---|
| `isOptional()` | never — allows `undefined` (`null` still follows the type) |

## Strings and arrays

| Function | Fails when |
|---|---|
| `hasMatch(pattern, message?)` | string: `RegExp` → `!test`; `string` → not equal |
| `hasMinLength(n, message?)` | `.length < n` |
| `hasMaxLength(n, message?)` | `.length > n` |
| `hasLength(n, message?)` | `.length !== n` |
| `hasPrefix(s, message?)` | string does not start with `s` |
| `hasSuffix(s, message?)` | string does not end with `s` |
| `hasInclude(s, message?)` | string does not include `s` |

## Numbers

`hasMin` / `hasMax` are inclusive. Use `hasGt` / `hasLt` for exclusive bounds.

| Function | Fails when |
|---|---|
| `hasMin(n, message?)` | `value < n` (inclusive) |
| `hasMax(n, message?)` | `value > n` (inclusive) |
| `hasGt(n, message?)` | `value <= n` |
| `hasLt(n, message?)` | `value >= n` |
| `isPositive(message?)` | `value <= 0` |
| `isNegative(message?)` | `value >= 0` |
| `isNonnegative(message?)` | `value < 0` |
| `isMultipleOf(n, message?)` | `value % n !== 0` |

## Formats

Custom `message` replaces the default. Issue `code` is the rule name (`min`, `email`, …). Missing values use `required`.

| Function | Fails when |
|---|---|
| `isEmail(message?)` | not a strict email |
| `isUuid(message?)` | not RFC-style UUID |
| `isUrl(message?)` | not `http:` / `https:` `URL` |
| `isIpv4(message?)` | not dotted IPv4 |
| `isIpv6(message?)` | not IPv6 |
| `isHex(message?)` | not hex digits |
| `isBase64(message?)` | not padded base64 |

## Cheatsheet

| API | Applies to | Fail |
|---|---|---|
| `isOptional` | any | never |
| `hasMinLength` | string / array | too short |
| `hasMin` | number | below n |
| `isEmail` | string | not email |
