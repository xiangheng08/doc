# 编译相关问题

## 路径别名未转换

使用 `tsc` 命令编译时，对于路径别名是不会转换的。可以使用 [tsc-alias](https://www.npmjs.com/package/tsc-alias) 来进行替换。

```bash
npm i tsc-alias
```

```json
"scripts": {
  "build": "tsc --project tsconfig.json && tsc-alias -p tsconfig.json",
}

================ OR ===================

"scripts": {
  "build": "tsc && tsc-alias",
  "build:watch": "tsc && (concurrently \"tsc -w\" \"tsc-alias -w\")"
}
```

## `ts-node` 没有热更新

[ts-node-dev](https://www.npmjs.com/package/ts-node-dev) 可以很好的解决这个问题。

```bash
npm i ts-node-dev -D
```

替换你的 `dev` 脚本：

```json
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/index.ts"
}
```
