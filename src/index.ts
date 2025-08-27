import type { PluginOption } from 'vite'

export interface Option {
  /** TailwindCss entry file, that is, the file where `@import "tailwindcss"` is located. */
  entry: string
  /** source path configuration */
  sources?: string[]
}

/** entry point identifier for matching and replacement */
const ENTRY_POINT = '@import \'tailwindcss-source\''

/** plugin name constant */
const PLUGIN_NAME = 'tailwindcss-source'

/**
 * tailwindcss source processing plugin
 * must source processing plugin
 * @param option configuration options
 */
export function tailwindcssSource(option: Option): PluginOption {
  const { entry, sources } = option || {}

  if (!entry) {
    throw new Error(`${PLUGIN_NAME}: 'entry' is required`)
  }

  if (!sources || sources.length === 0) {
    throw new Error(`${PLUGIN_NAME}: 'sources' is required`)
  }

  return {
    name: PLUGIN_NAME,
    enforce: 'pre',
    transform(code: string, id: string) {
      if (id === entry) {
        return handleSource(code, sources)
      }
      return undefined
    },
  } satisfies PluginOption
}

function handleSource(code: string, sources: string[]): string | undefined {
  if (!code.includes(ENTRY_POINT)) {
    return undefined
  }

  const sourcesCode = sources
    .filter(source => source.trim())
    .map(source => `@source "${source}";`)
    .join('\n')

  const transformedCode = code.replace(ENTRY_POINT, sourcesCode)

  return transformedCode
}
