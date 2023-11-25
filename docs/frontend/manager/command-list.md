# 命令大全

## npm (Node Package Manager)

### 获取帮助信息

```sh
npm --help
```

### 安装依赖项

```sh
npm install

# 简写
npm i
```

### 安装特定依赖项

```sh
npm install package-name

# 简写
npm i package-name
```

### 全局安装依赖项

```sh
npm install -g package-name

# 简写
npm i -g package-name
```

### 安装依赖项并将其保存到 `dependencies`

```sh
npm install package-name --save

# 简写
npm i package-name -S

# 可以不加，默认就是保存到 dependencies
```

### 安装开发依赖项并将其保存到 `devDependencies`

```sh
npm install package-name --save-dev

# 简写
npm i package-name -D
```

### 卸载依赖项

```sh
npm uninstall package-name

# 简写
npm un package-name
```

### 查看已安装的依赖项

```sh
npm ls
```

### 更新依赖项

```sh
npm update
```

### 运行脚本

```sh
npm run script-name
```

### 查看包信息

```sh
npm show package-name
```

### 设置淘宝镜像

```sh
npm config set registry https://registry.npm.taobao.org
```

::: tip 注意
如果要发布/上传包，需要设置为官方镜像
:::

### 临时修改淘宝源

在下载命令中加上 `--registry https://registry.npm.taobao.org`

```sh
npm --registry https://registry.npm.taobao.org install axios
```


### 设置官方镜像源

```sh
npm config set registry https://registry.npmjs.org
```

### 查看镜像使用状态

```sh
npm config get registry
```

## Yarn

### 获取帮助信息

```sh
yarn --help
```

### 安装依赖项

```sh
yarn
```

### 安装特定依赖项

```sh
yarn add package-name
```

### 全局安装依赖项

```sh
yarn global add package-name
```

### 安装依赖项并将其保存到 `dependencies`

```sh
yarn add package-name
```

### 安装开发依赖项并将其保存到 `devDependencies`

```sh
yarn add package-name --dev
```

### 卸载依赖项

```sh
yarn remove package-name
```

### 查看已安装的依赖项

```sh
yarn list
```

### 更新依赖项

```sh
yarn upgrade
```

### 运行脚本

```sh
yarn run script-name
```

### 查看包信息

```sh
yarn info package-name
```

### 设置淘宝源

```sh
yarn config set registry https://registry.npm.taobao.org
```

### 临时设置淘宝源

在下载命令中加上 `--registry=https://registry.npm.taobao.org`

```sh
yarn add axios --registry=https://registry.npmjs.org/
```

### 设置默认源

```sh
yarn config set registry https://registry.yarnpkg.com
```

### 查看镜像源

```sh
yarn config get registry
```


## pnpm

### 获取帮助信息

```sh
pnpm --help
```

### 安装依赖项

```sh
pnpm install

# 简写
pnpm i
```

### 安装特定依赖项

```sh
pnpm add package-name

# 或者
pnpm i package-name
```

### 全局安装依赖项

```sh
pnpm add -g package-name
```

### 安装依赖项并将其保存到 `dependencies`

```sh
pnpm add package-name
```

### 安装开发依赖项并将其保存到 `devDependencies`

```sh
pnpm add -D package-name
```

### 卸载依赖项

```sh
pnpm remove package-name

# 或者
pnpm un package-name
```

### 查看已安装的依赖项

```sh
pnpm list

# 简写
pnpm ls

# 查看全局安装的依赖项
pnpm ls -g
```

### 更新依赖项

```sh
pnpm update

# 更新指定依赖项
pnpm update package-name
```

### 运行脚本

```sh
pnpm run script-name
```

### 查看包信息

```sh
pnpm info package-name
```

### 查看源

```sh
pnpm get registry
```

### 设置淘宝源

```sh
pnpm config set registry 
```

### 临时修改淘宝源

在下载命令中加上 `--registry https://registry.npm.taobao.org`

```sh
pnpm --registry https://registry.npm.taobao.org install axios
```

### 设置默认源

```sh
pnpm config set registry https://registry.npmjs.org
```

## 源

- 阿里：`https://registry.npmmirror.com`
- 淘宝：`https://registry.npm.taobao.org`
- npm：`https://registry.npmjs.org`
- yarn：`https://registry.yarnpkg.com`

