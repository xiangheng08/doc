# Prettier

Prettier 是一个流行的代码格式化工具，支持多种编程语言，包括 JavaScript、TypeScript、CSS、HTML、JSON、Markdown 等。它通过解析代码并重新打印出来的方式，确保项目中的所有代码风格保持一致。

## 主要特点

- **统一代码风格**：Prettier 会自动格式化代码，消除团队中关于代码风格的争论。
- **支持多种语言**：支持包括 JavaScript、TypeScript、JSX、Vue、Angular、CSS、HTML、JSON、Markdown 等在内的多种语言。
- **易于配置**：只需要少量的配置选项，就能实现强大的格式化功能。
- **与编辑器集成**：可以与大多数主流编辑器（如 VS Code、WebStorm 等）集成，保存时自动格式化。

## 安装

::: code-group

```bash [pnpm]
pnpm add --save-dev --save-exact prettier
```

```bash [npm]
npm install --save-dev --save-exact prettier
```

```bash [yarn]
yarn add --dev --exact prettier
```

:::

## 基本使用

在项目根目录创建一个空的配置文件，让编辑器和其他工具知道你使用了 Prettier：

```json [.prettierrc]
{
  "tabWidth": 2,
  "useTabs": false,
  "semi": false,
  "singleQuote": true,
  "printWidth": 100
}
```


创建一个 `.prettierignore` 文件，忽略不需要格式化的文件：

``` [.prettierignore]
# dependencies
node_modules

# build
dist

# logs
*.log

# temp
tmp
```

格式化整个项目：

```bash
npx prettier . --write
```

格式化特定文件：

```bash
npx prettier src/index.js --write
```

检查文件是否已经格式化：

```bash
npx prettier . --check
```

## 配置选项

Prettier 提供了少量但非常实用的配置选项，可以满足大多数项目的格式化需求。详细配置项请参考 [options](./options)。

## 相关链接

- [Prettier](https://prettier.io/)
