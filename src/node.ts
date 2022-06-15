import { addHook } from 'pirates'
import sourceMapSupport from 'source-map-support'
import { transformSync } from '@swc/core'
import type * as swcType from '@swc/core'
import { convert } from 'tsconfig-to-swcconfig'

const map = new Map<string, string>()

export function register(swcOptions: swcType.Options = {}) {
  // http://json.schemastore.org/tsconfig
  const transformedOptions = convert(undefined, undefined, swcOptions)

  sourceMapSupport.install({
    handleUncaughtExceptions: false,
    environment: 'node',
    retrieveSourceMap: (filename) => {
      if (map.has(filename)) {
        return {
          url: filename,
          map: map.get(filename)!,
        }
      }
      return null
    },
  })

  addHook(
    (code, filename) => {
      // more options about this file
      transformedOptions.filename = filename
      transformedOptions.sourceFileName = filename
      if (transformedOptions.jsc?.parser?.syntax === 'typescript') {
        ;(transformedOptions.jsc.parser as swcType.TsParserConfig).tsx =
          filename.endsWith('.tsx') || filename.endsWith('.jsx')
      }

      const { code: result, map: sourceMap } = transformSync(
        code,
        transformedOptions,
      )

      if (sourceMap) {
        map.set(filename, sourceMap)
      }

      return result
    },
    {
      exts: ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
    },
  )
}
