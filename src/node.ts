import deepmerge from 'deepmerge'
import { addHook } from 'pirates'
import sourceMapSupport from 'source-map-support'
import { transformSync } from '@swc/core'
import type * as swcType from '@swc/core'
import { getTSOptions } from './utils'

const map = new Map<string, string>()

export function register(swcOptions: swcType.Options = {}) {
  // http://json.schemastore.org/tsconfig
  const {
    esModuleInterop = false,
    sourceMap = 'inline', // notice here we default it to 'inline' instead of false
    importHelpers = false,
    experimentalDecorators = false,
    emitDecoratorMetadata = false,
    target = 'es3',
    module: _module,
    jsxFactory = 'React.createElement',
    jsxFragmentFactory = 'React.Fragment',
    strict = false,
    alwaysStrict = false,
    noImplicitUseStrict = false,
  } = getTSOptions() ?? {}
  const module = (_module as unknown as string).toLowerCase()

  const transformOptions = deepmerge(
    {
      sourceMaps: sourceMap,
      module: {
        type: ['commonjs', 'amd', 'umd'].includes(module) ? module : 'commonjs',
        strict,
        strictMode: alwaysStrict || !noImplicitUseStrict,
        noInterop: !esModuleInterop,
      } as swcType.ModuleConfig,
      jsc: {
        externalHelpers: importHelpers,
        target: target as swcType.JscTarget,
        parser: {
          syntax: 'typescript',
          decorators: experimentalDecorators,
          dynamicImport: true,
        },
        transform: {
          legacyDecorator: true,
          decoratorMetadata: emitDecoratorMetadata,
          react: {
            throwIfNamespace: false,
            development: false,
            useBuiltins: false,
            pragma: jsxFactory,
            pragmaFrag: jsxFragmentFactory,
          },
        },
        keepClassNames: ['es3', 'es5', 'es6', 'es2015'].includes(
          (target as string).toLowerCase(),
        ),
      },
    } as swcType.Options,
    swcOptions,
  )

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
      transformOptions.filename = filename
      transformOptions.sourceFileName = filename
      if (transformOptions.jsc?.parser?.syntax === 'typescript') {
        ;(transformOptions.jsc.parser as swcType.TsParserConfig).tsx =
          filename.endsWith('.tsx') || filename.endsWith('.jsx')
      }

      const { code: result, map: sourceMap } = transformSync(
        code,
        transformOptions,
      )

      if (sourceMap) {
        console.log(sourceMap)
        map.set(filename, sourceMap)
      }

      return result
    },
    {
      exts: ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
    },
  )
}
