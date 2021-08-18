import { test } from 'tap'
import path from 'path'
import { getTSOptions } from '../src/utils'

test('read tsconfig file', (t) => {
  let result = getTSOptions(path.resolve(__dirname, 'fixtures', 'tsconfig'))
  t.match(result, { lib: ['esnext'] })
  result = getTSOptions()
  t.match(result, { lib: ['es2018'] })
  result = getTSOptions(path.resolve('/')) // a place with no tsconfig
  t.match(result, null)
  t.end()
})
