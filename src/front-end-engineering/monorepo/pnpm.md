# 使用 pnpm 管理 Monorepo

pnpm 是一个快速、节省磁盘空间的包管理器，它对 Monorepo 的支持非常出色。通过 pnpm 的 workspace 功能，可以轻松管理包含多个包的项目。

## 什么是 pnpm Workspaces

pnpm 的 workspace 是一种用于管理多个包的机制，它允许你在单个仓库中管理多个项目，同时共享依赖和链接本地包。

## 初始化 pnpm Monorepo

### 1. 创建项目结构

首先创建一个基本的项目结构：

```
my-monorepo/
├── packages/
│   ├── core/
│   ├── ui/
│   └── utils/
├── package.json
└── pnpm-workspace.yaml
```

### 2. 配置 workspace

创建 `pnpm-workspace.yaml` 文件来定义 workspace：

```yaml
packages:
  # 所有在 packages 目录下的包
  - 'packages/*'
  # 也可以包含嵌套目录
  - 'apps/**'
  # 排除某些包
  - '!**/test/**'
```

### 3. 创建根 package.json

在根目录创建 package.json 文件：

```json
{
  "name": "my-monorepo",
  "version": "1.0.0",
  "description": "My monorepo project",
  "private": true,
  "scripts": {
    "build": "pnpm -r build",
    "test": "pnpm -r test",
    "dev": "pnpm -r --parallel dev"
  }
}
```

## pnpm Monorepo 命令

### 安装依赖

```bash
# 安装所有包的依赖
pnpm install

# 为特定包安装依赖
pnpm -F core add lodash

# 为所有包安装开发依赖
pnpm -r add -D typescript

# 为特定包安装本地依赖
pnpm -F ui add ../core
```

### 运行脚本

```bash
# 在所有包中运行 build 脚本
pnpm -r build

# 在特定包中运行脚本
pnpm -F core test

# 并行运行脚本
pnpm -r --parallel dev

# 从根目录运行脚本
pnpm --filter ./packages/core run build
```

## 实际示例：Vue 3 项目结构

Vue 3 项目是 pnpm Monorepo 的优秀示例。其项目结构如下：

```
vue-next/
├── packages/
│   ├── vue/
│   ├── compiler-core/
│   ├── compiler-dom/
│   ├── runtime-core/
│   ├── runtime-dom/
│   ├── reactivity/
│   └── ...
├── package.json
├── pnpm-workspace.yaml
└── scripts/
```

### pnpm-workspace.yaml 配置

```yaml
packages:
  - 'packages/*'
```

### 根 package.json 配置

```json
{
  "private": true,
  "version": "3.0.0",
  "scripts": {
    "dev": "node scripts/dev.js",
    "build": "node scripts/build.js",
    "test": "vitest",
    "lint": "eslint --ext .ts packages/*/src/**"
  }
}
```

### 包之间的依赖关系

Vue 3 中的包之间有明确的依赖关系，例如：

```json
// packages/runtime-core/package.json
{
  "name": "@vue/runtime-core",
  "dependencies": {
    "@vue/reactivity": "workspace:*",
    "@vue/shared": "workspace:*"
  }
}
```

使用 `workspace:*` 协议可以确保总是使用工作区内的版本。

## pnpm Monorepo 优势

### 1. 磁盘空间节省

pnpm 使用硬链接和符号链接来共享依赖，大大减少了磁盘空间占用。

### 2. 快速安装

由于缓存和共享机制，安装速度比 npm 和 Yarn 更快。

### 3. 严格的依赖管理

pnpm 的非扁平 node_modules 结构确保了依赖的隔离性和正确性。

### 4. 内置 Monorepo 支持

相比 Yarn，pnpm 对 Monorepo 的支持是内置的，不需要额外插件。

## 常见问题和解决方案

### 1. 链接的包未更新

当本地包更新时，可能需要重新安装：

```bash
pnpm install --force
```

### 2. peerDependencies 问题

在 package.json 中明确指定 peerDependencies：

```json
{
  "peerDependencies": {
    "react": "^18.0.0"
  },
  "peerDependenciesMeta": {
    "react": {
      "optional": true
    }
  }
}
```

### 3. 构建顺序问题

使用 `--workspace-concurrency=1` 串行构建：

```bash
pnpm -r --workspace-concurrency=1 build
```

## 相关资源

- [pnpm 官方文档 - Workspaces](https://pnpm.io/zh/workspaces)
- [Vue 3 源码仓库](https://github.com/vuejs/core)
- [Changesets](https://github.com/changesets/changesets)
