# Rules

Import from `schematis/rules`. A rule is `(value) => Issue[]`. Empty array means pass. Compose into a type:

```ts
isString(isRequired(), hasMinLength(2), isEmail())
```

Rules skip when the value is the wrong kind (e.g. `hasMin` on a string). `undefined` skips every rule except `isRequired`.

## Presence

| Function | Fails when |
|---|---|
| `isRequired(message?)` | `value === undefined` (`null` and `''` pass) |

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

## Formats (strings)

| Function | Fails when |
|---|---|
| `isEmail(message?)` | not a strict email |
| `isUuid(message?)` | not RFC-style UUID |
| `isUrl(message?)` | not `http:` / `https:` `URL` |
| `isIpv4(message?)` | not dotted IPv4 |
| `isIpv6(message?)` | not IPv6 |
| `isHex(message?)` | not hex digits |
| `isBase64(message?)` | not padded base64 |

Custom `message` replaces the default. Issue `code` is the rule name (`required`, `min`, `email`, …).
