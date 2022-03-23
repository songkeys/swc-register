import { transformSync } from '@swc/core'

export async function load(url, context, defaultLoad) {
  const { format } = context ?? 'commonjs'
  const { source: rawSource } = await defaultLoad(url, { format }, defaultLoad)
  const source = rawSource.toString()

  console.log({ source })

  const code = transformSync(source, {
    module: {
      type: 'commonjs',
    },
  })

  console.log(code)

  return { source: code }
}
