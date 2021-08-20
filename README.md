# swc-register

[![NPM version](https://img.shields.io/npm/v/swc-register.svg?style=flat)](https://npmjs.org/package/swc-register)
[![NPM downloads](https://img.shields.io/npm/dm/swc-register.svg?style=flat)](https://npmjs.org/package/swc-register)

Transpile JSX, TypeScript and esnext features on the fly with [swc](https://github.com/swc-project/swc).

It will respect your `tsconfig.json` (and `.swcrc` if provided).

## Install

```bash
npm i @swc/core swc-register -D
# Or Yarn
yarn add @swc/core swc-register --dev
# Or pnpm
pnpm add @swc/core swc-register -D
```

## Usage

```bash
node -r swc-register file.ts
```

It will use every mappable options from your `tsconfig.json` to make swc works.

You can also add an npm script:

```json
"ts": "node -r swc-register"
```

Now just run `npm run ts -- file.ts` or `yarn ts file.ts` instead.

## Programmatic Usage

```ts
const { register } = require('swc-register/dist/node')

register({
  // ...swc options
})
```

## Similar Projects

There are some other swc registers like:

- [swc-project/register](https://github.com/swc-project/register): this is a babel-register alternative
- [@swc-node/register](https://github.com/Brooooooklyn/swc-node/tree/master/packages/register): a similar project but doesn't has a perfect tsconfig mapping

## License

MIT
