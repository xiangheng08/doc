# 包管理工具命令大全

::: warning 
yarn 我较少使用，命令可能不准确
:::

## 获取帮助信息

::: code-group

```sh [pnpm]
pnpm --help
```

```sh [yarn]
yarn --help
```

```sh [npm]
npm --help
```

:::

## 安装所有依赖项

::: code-group

```sh [pnpm]
pnpm install

# 简写
pnpm i
```

```sh [yarn]
yarn
```

```sh [npm]
npm install

# 简写
npm i
```

:::


## 安装指定依赖项

::: code-group

```sh [pnpm]
pnpm add <package-name>

# or
pnpm i <package-name>

# or
pnpm install <package-name>

# 同时安装多个依赖
pnpm add <package-name1> package-name2> ...

# 指定版本
pnpm add <package-name>@<version>

# 最新版本
pnpm add <package-name>@latest

# 结合
pnpm add <package-name1> <package-name2>@<version> <package-name3>@latest
```

```sh [yarn]
yarn add <package-name>

# or
yarn install <package-name>

# 同时安装多个依赖
yarn add <package-name1> <package-name2> ...

# 指定版本
yarn add <package-name>@<version>

# 最新版本
yarn add <package-name>@latest

# 结合
yarn add <package-name1> <package-name2>@<version> <package-name3>@latest
```

```sh [npm]
npm install <package-name>

# or
npm i <package-name>

# 同时安装多个依赖
npm i <package-name1> <package-name2> ...

# 指定版本
npm i <package-name>@<version>

# 最新版本
npm i <package-name>@latest

# 结合
npm i <package-name1> <package-name2>@<version> <package-name3>@latest
```

:::

## 安装到 dependencies

加上 `-S` 或 `--save` 参数，这个参数可不加，默认就是保存到 dependencies，但如果你使用的包管理工具版本比较老建议加上。

::: code-group

```sh [pnpm]
pnpm add -S <package-name>
```

```sh [yarn]
yarn add -S <package-name>
```

```sh [npm]
npm i -S <package-name>
```

:::

## 安装到 devDependencies

加上 `-D` 或 `--save-dev` 参数。

::: code-group

```sh [pnpm]
pnpm add -D <package-name>
```

```sh [yarn]
yarn add -D <package-name>
```

```sh [npm]
npm i -D <package-name>
```

:::

## 移除依赖项

::: code-group

```sh [pnpm]
pnpm remove <package-name>

# or
pnpm un <package-name>

# 同时移除多个
pnpm un <package-name-1> <package-name-2> ...
```

```sh [yarn]
yarn remove <package-name>

# 同时移除多个
yarn remove <package-name-1> <package-name-2> ...
```

```sh [npm]
npm uninstall <package-name>

# 简写
npm un <package-name>

# 同时移除多个
npm un <package-name-1> <package-name-2> ...
```

:::

## 更新依赖项

::: code-group

```sh [pnpm]
# 更新所有依赖项
pnpm update

# 更新指定依赖项
pnpm update <package-name>
```

```sh [yarn]
# 更新所有依赖项
yarn update

# 更新指定依赖项
yarn update <package-name>
```

```sh [npm]
# 更新所有依赖项
npm update

# 更新指定依赖项
npm update <package-name>
```

:::

## 运行脚本

::: code-group

```sh [pnpm]
pnpm <script>
```

```sh [yarn]
yarn run <script>
```

```sh [npm]
npm run <script>
```

:::

## 查看包信息

::: code-group

```sh [pnpm]
pnpm info <package-name>
```

```sh [yarn]
yarn info <package-name>
```

```sh [npm]
npm info <package-name>
```

:::

## 本地包安装/卸载

本地包安装/卸载与远程包安装/卸载基本一致，只要把包名**换成本地包路径**即可。

::: code-group

```sh [pnpm]
# 安装
pnpm add <local-path>

# 卸载
pnpm remove <local-path>
```

```sh [yarn]
# 安装
yarn add <local-path>

# 卸载
yarn remove <local-path>
```

```sh [npm]
# 安装
npm i <local-path>

# 卸载
npm un <local-path>
```

:::

## 镜像源

::: code-group

```sh [pnpm]
# 查看源
pnpm get registry

# 设置源
pnpm config set registry <registry-address>

# 设置淘宝镜像
pnpm config set registry https://registry.npmmirror.com/

# 恢复官方源
pnpm config set registry https://registry.npmjs.org/
```

```sh [yarn]
# 查看源
yarn config get registry

# 设置源
yarn config set registry <registry-address>

# 设置淘宝镜像
yarn config set registry https://registry.npmmirror.com/

# 恢复官方源
yarn config set registry https://registry.yarnpkg.com/
```

```sh [npm]
# 查看源
npm get registry

# 设置源
npm config set registry <registry-address>

# 设置淘宝镜像
npm config set registry https://registry.npmmirror.com/

# 恢复官方源
npm config set registry https://registry.npmjs.org/
```

:::

## 临时使用镜像源

在命令中加上 `--registry <registry-address>` 参数。

::: code-group

```sh [pnpm]
pnpm add --registry <registry-address> axios
```

```sh [yarn]
yarn add --registry <registry-address> axios
```

```sh [npm]
npm i --registry <registry-address> axios
```

:::

## 查看全局依赖的安装路径

::: code-group

```sh [pnpm]
pnpm root -g
```

```sh [yarn]
yarn root -g
```

```sh [npm]
npm root -g
```

:::

## 查看依赖

::: code-group

```sh [pnpm]
pnpm show <package-name>

# 指定版本
pnpm show <package-name>@<version>
```

```sh [yarn]
yarn show <package-name>

# 指定版本
yarn show <package-name>@<version>
```

```sh [npm]
npm show <package-name>

# 指定版本
npm show <package-name>@<version>
```

:::

## 查看依赖的所有版本

::: code-group

```sh [pnpm]
pnpm show <package-name> versions
```

```sh [yarn]
yarn show <package-name> versions
```

```sh [npm]
npm show <package-name> versions
```

:::

## 显示依赖于指定包的所有包

::: code-group

```sh [pnpm]
pnpm why <package-name>
```

[pnpm why](https://pnpm.io/zh/cli/why)

:::

## 语法解释

- `[xxx]` 表示可选项
- `<xxx>` 表示可选项
- `{xxx1,xxx2,xxx3}` 表示多个选项
