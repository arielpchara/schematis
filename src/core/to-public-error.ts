import { formatPath } from './format-path'
import type { Issue, PublicError } from './result'

export function toPublicError(issue: Issue): PublicError {
  return {
    path: formatPath(issue.path),
    message: issue.message
  }
}
