/** `true` for JSON objects (not `null`, arrays, or class instances). */
export function isPlainObject(
  value: unknown
): value is Record<string, unknown> {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return false
  }
  const proto = Object.getPrototypeOf(value)
  return proto === Object.prototype || proto === null
}
