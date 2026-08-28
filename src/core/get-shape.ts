import { SHAPE } from './brand'
import type { Schema } from './result'

/** Field keys stored on an `isObject` schema (used by `strict`). */
export function getShape(schema: Schema<unknown>): string[] | undefined {
  if (SHAPE in schema) {
    return (schema as Schema<unknown> & { [SHAPE]: string[] })[SHAPE]
  }
}
