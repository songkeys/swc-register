import path from 'path'
import { test } from 'tap'
import { spawn } from 'child_process'

const register = path.resolve(__dirname, '..', 'register.js')

test('import module', (t) => {
  spawn('node', [
    '-r',
    register,
    path.resolve(__dirname, 'fixtures', 'import-module', 'index.js'),
  ]).stdout.on('data', (data) => {
    t.match(data.toString(), 'foo')
    t.end()
  })
})

test('import module (ts)', (t) => {
  spawn('node', [
    '-r',
    register,
    path.resolve(__dirname, 'fixtures', 'module-ts', 'index.ts'),
  ]).stdout.on('data', (data) => {
    t.match(data.toString(), 'foo')
    t.end()
  })
})

test('arrow function', (t) => {
  spawn('node', [
    '-r',
    register,
    path.resolve(__dirname, 'fixtures', 'arrowFunction.ts'),
  ]).stdout.on('data', (data) => {
    t.match(data.toString(), 'arrowFunction')
    t.end()
  })
})

test('cjs', (t) => {
  spawn('node', [
    '-r',
    register,
    path.resolve(__dirname, 'fixtures', 'cjs.ts'),
  ]).stdout.on('data', (data) => {
    t.match(data.toString(), 'fs imported')
    t.end()
  })
})

test('normal', (t) => {
  spawn('node', [
    '-r',
    register,
    path.resolve(__dirname, 'fixtures', 'normal.ts'),
  ]).stdout.on('data', (data) => {
    t.match(data.toString(), 'normal')
    t.end()
  })
})
