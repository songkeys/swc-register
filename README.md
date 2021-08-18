# swc-register

[![npm version](https://badgen.net/npm/v/swc-register)](https://npm.im/swc-register) [![npm downloads](https://badgen.net/npm/dm/swc-register)](https://npm.im/swc-register)

Transpile JSX, TypeScript and esnext features on the fly with [swc](https://github.com/swc-project/swc)

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
  // ...options
})
```

## License

MIT
