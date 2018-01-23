import { getOptions } from 'loader-utils'

const DEFAULT_EXPR = 'typeof window !== \'undefined\''

export default function loader (content) {
  const { expr = DEFAULT_EXPR } = getOptions(this) || {}

  return `if (${expr}) {\n${content}\n}`
}
