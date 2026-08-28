import type { Path } from './result'

export function formatPath(path: Path): string {
  return path.map(String).join('.')
}
