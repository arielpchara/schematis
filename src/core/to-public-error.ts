import { formatPath } from './format-path'
import type { Issue, PublicError } from './result'

/** Convert an {@link Issue} to a public `{ path, message }` error. */
export function toPublicError(issue: Issue): PublicError {
  return {
    path: formatPath(issue.path),
    message: issue.message
  }
}
