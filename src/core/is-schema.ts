import { SCHEMA } from './brand'
import type { Schema } from './result'

export function isSchema(value: unknown): value is Schema<unknown> {
  return typeof value === 'function' && SCHEMA in value
}
