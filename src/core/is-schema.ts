import { SCHEMA } from './brand'
import type { Schema } from './result'

/** Type guard for branded schemas. */
export function isSchema(value: unknown): value is Schema<unknown> {
  return typeof value === 'function' && SCHEMA in value
}
