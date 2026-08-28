import { OUTCOME } from './brand'
import { formatPath } from './format-path'
import type { Check, Outcome } from './result'
import { toPublicError } from './to-public-error'

/** Build the public check object (`isValid`, `assert`, `getParsed`, `getErrors`). */
export function createCheck<T>(outcome: Outcome<T>): Check<T> {
  return {
    [OUTCOME]: outcome,
    isValid: () => outcome.issues.length === 0,
    assert: () => {
      if (outcome.issues.length === 0) {
        return
      }
      throw new Error(
        outcome.issues
          .map(issue => {
            const path = formatPath(issue.path)
            return path ? `${path}: ${issue.message}` : issue.message
          })
          .join('\n')
      )
    },
    getParsed: () => outcome.value,
    getErrors: () => outcome.issues.map(toPublicError)
  }
}
