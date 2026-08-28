/** Coerce a numeric string key to an array index. */
export function toIndex(key: string | number): number | string {
  if (typeof key === 'number') {
    return key
  }
  const index = Number(key)
  return Number.isInteger(index) && String(index) === key ? index : key
}
