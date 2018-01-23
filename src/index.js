import { getOptions } from 'loader-utils'

const DEFAULT_EXPR = 'typeof window === \'undefined\''

export default function loader (content) {
  const { expr = DEFAULT_EXPR } = getOptions(this) || {}

  return `(function () {\nif (${expr}) { return }\n\n${content}\n}())`
}
