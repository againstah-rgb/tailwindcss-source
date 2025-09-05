import type { PluginOption } from 'vite'
import path from 'node:path'
import process from 'node:process'
import { getPackagesSync } from '@manypkg/get-packages'
import { normalizePath } from 'vite'

interface Source {
  name: string
  path: string
}

export interface Option {
  /** TailwindCss entry file, that is, the file where `@import "tailwindcss"` is located. */
  entry: string
  /** source path configuration */
  sources?: Source[]
}

const regex = /^@import\s+['"]tailwindcss['"];/

/** plugin name constant */
const PLUGIN_NAME = 'tailwindcss-source'

const { packages } = getPackagesSync(process.cwd())
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

  const entryPath = normalizePath(path.resolve(entry))

  return {
    name: PLUGIN_NAME,
    enforce: 'pre',
    transform(code: string, id: string) {
      if (id === entryPath) {
        return transformCode(code, sources)
      }
      return undefined
    },
  } satisfies PluginOption
}

function transformCode(code: string, sources: Source[]): string | undefined {
  if (!regex.test(code)) {
    return undefined
  }
  const sourceCode = getSourceCode(sources)
  // 执行替换
  const newCode = code.replace(regex, match => match + sourceCode)

  return newCode
}

function getSourceCode(sources: Source[]) {
  const sourcePaths = sources.reduce<string[]>((res, cur) => {
    const find = packages.find(item => item.packageJson.name === cur.name)
    if (find) {
      const sourcePath = normalizePath(path.join(find.dir, cur.path))
      res.push(`@source "${sourcePath}";`)
    }
    return res
  }, [])

  return sourcePaths.join('')
}
