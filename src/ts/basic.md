# 基本使用

## 类型声明

```ts
// 在变量名后面使用冒号，声明类型
const count: number = 1;

function fn(params: string) {
  // ...
}

// 错误：不能赋值与声明类型不符的值
const str: string = 0;
```

## 类型推断

```ts
// ts 会自动根据赋值类型进行类型推断
const count = 1;
// 等于
const count: number = 1;

function fn() {
  return 1;
}
// 等于
function fn(): number {
  return 1;
}
```

## 编译

大部门 JavaScript 的运行环境，都不支持直接运行 TypeScript 的代码，需要先编译成 JavaScript 代码，才能运行。

编译 TypeScript 需要安装 `typescript` 包（全局安装），并使用 `tsc` 命令进行编译。

```bash
npm install -g typescript
```

安装完成后，就可以使用 `tsc` 命令进行编译了。

```bash
tsc index.ts
```

以上命令会编译 `index.ts` 文件，并生成同名的 `index.js` 文件。

如果想在线编译 TypeScript，可以使用 [TypeScript Playground](https://www.typescriptlang.org/zh/play)。

## 值与类型

TypeScript 只涉及类型，不涉及值，所有的值都是由 JavaScript 来实现的。

## tsc 编译器

tsc 编译器就是上面提到的 `typescript` 包。

```bash
npm install -g typescript
```

全局安装后就可以使用 tsc 命令了

```bash
tsc -h               # 查看帮助
tsc -help            # 查看帮助
tsc -v               # 查看版本
tsc index.ts         # 编译 index.ts 文件
tsc index.ts util.ts # 编译多个文件
tsc index.ts util.ts --outFile bundle.js # 将多个文件编译成一个文件
tsc index.ts util.ts --outDir dist # 将多个文件编译到指定目录下
tsc --target es2015 index.ts # 指定编译目标（ES 版本、CommonJS 等）
```

错误：如果编译的文件中存在错误，编译器会报错，并提示错误信息。

```bash
tsc index.ts
index.ts:1:1 - error TS2304: Cannot find name 'a'.
1 a = 1;
  ~~~~~
```

想这样

但是上面的命令还是会生成 js 文件，如果你想在编译时遇到错误，就不要生成文件可以使用 `--noEmitOnError` 参数

```bash
tsc --noEmitOnError index.ts
```

如果你只想检查文件有没有类型错误，而不生成 js 文件，可以使用 `--noEmit` 参数

```bash
tsc --noEmit index.ts
```

## tsconfig.json

`tsconfig.json` 是一个配置文件，用来配置 tsc 编译器的行为。有了它，就可以直接运行 `tsc` 命令了，`tsc` 会自动读取当前目录的 `tsconfig.json` 文件，并使用其中的配置进行编译。

使用 `tsc --init` 会在当前目录生成一个 `tsconfig.json` 文件，里面有一些默认的配置。想下面的这样：

<<< init-tsconfig.json

## ts-node

`ts-node` 是一个非官方的 npm 模块，有了它，你可以直接运行 TypeScript 代码。

```bash
npm install -g ts-node
```

安装完成后，就可以直接运行 TypeScript 代码了。

```bash
ts-node index.ts
```

或者直接 `ts-node` 就会得到一个 REPL 环境，可以输入 TypeScript 代码进行测试。

```bash
ts-node
> const add = (n: number) => n + n;
> add(2)
4
```
