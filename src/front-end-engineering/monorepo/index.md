# Monorepo 管理

Monorepo（单体仓库）是一种项目组织方式，将多个相关项目或包存储在同一个代码仓库中。这种方式在现代前端工程化实践中越来越流行。

## 什么是 Monorepo

Monorepo 是 "Mono"（单一）和 "Repo"（Repository）的组合词，指的是使用单一代码仓库来管理多个项目或包的方式。与之相对的是 Multi-repo（多仓库）模式，即每个项目独立存放在不同的仓库中。

## Monorepo 的优势

### 1. 简化依赖管理

在 Monorepo 中，所有项目共享同一个依赖树，便于统一管理和版本控制。

```json
// package.json 示例
{
  "name": "my-monorepo",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "dependencies": {
    "lodash": "^4.17.21"
  }
}
```

### 2. 简化代码复用

项目间可以轻松共享代码，无需发布到 npm 再引入。

```js [packages/shared-utils/src/index.js]
export function formatDate(date) {
  return new Date(date).toISOString().split('T')[0];
}

```

```js [packages/web-app/src/App.js]
import { formatDate } from '@my-org/shared-utils';

function App() {
  return <div>Today is {formatDate(new Date())}</div>;
}
```


### 3. 简化重构流程

跨项目重构变得更加容易，因为所有代码都在同一个仓库中。

### 4. 统一的开发环境

所有项目共享相同的构建工具、代码规范和开发流程。

## Monorepo 的挑战

### 1. 仓库体积增大

随着项目增多，仓库体积会不断增长，可能影响克隆和检出速度。

### 2. 权限管理复杂

不同团队可能需要对不同项目有不同的访问权限。

### 3. 构建复杂性

需要更复杂的构建工具来处理多个项目的依赖关系。

## 常见的 Monorepo 工具

### 1. Lerna

Lerna 是最早流行的 Monorepo 管理工具之一。

### 2. Yarn Workspaces

Yarn 内置的工作区功能，支持 Monorepo 结构。


### 3. pnpm Workspaces

pnpm 提供了高效的 Monorepo 支持。


### 4. Nx

功能强大的企业级 Monorepo 工具，支持多种框架。


### 5. Turborepo

由 Vercel 开发的高性能构建系统。


## Monorepo 最佳实践

### 1. 合理的目录结构

```
my-monorepo/
├── apps/                 # 应用项目
│   ├── web-app/
│   ├── mobile-app/
│   └── admin-app/
├── internal/             # 内部库/配置
│   ├── tsconfig/
│   ├── lint-config/
│   ├── vite-config/
├── packages/             # 可复用的库
│   ├── components/
│   ├── ui/
│   ├── utils/
│   ├── utils-web/
│   ├── utils-node/
│   ├── api-client/
│   └── shared-types/
├── scripts/              # 脚本
│   ├── dev.js
│   ├── build.js
├── package.json
├── ...
```

### 2. 版本管理策略

使用独立版本（Independent Versioning）还是统一版本（Fixed/Locked Versioning）：

```json [my-monorepo/ui/package.json]
{
  "name": "@my-monorepo/ui",
  "version": "1.0.0",
}
```

### 3. 依赖优化

```json
// 使用 peerDependencies 避免重复安装
{
  "name": "@my-monorepo/ui",
  "version": "1.0.0",
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```


## 实际应用案例

### 1. Babel

Babel 使用 Monorepo 管理其核心包和插件：

```
babel/
├── packages/
│   ├── babel-core/
│   ├── babel-cli/
│   ├── babel-preset-env/
│   └── ...
└── package.json
```

### 2. Vue

[Vue3](https://github.com/vuejs/core) 也采用了 Monorepo 结构来管理其生态系统：

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
└── package.json
```

Vue 3 的 Monorepo 结构使其能够将不同的功能模块解耦，便于独立开发和维护。例如，响应式系统（reactivity）可以独立于运行时（runtime）进行开发和测试，同时又能很好地与其他模块集成。

### 3. React

React 源码使用 Monorepo 结构：

```
react/
├── packages/
│   ├── react/
│   ├── react-dom/
│   ├── react-native/
│   └── ...
└── package.json
```

## 选择 Monorepo 的考虑因素

### 适用场景

1. 多个项目之间有大量共享代码
2. 团队需要频繁进行跨项目协作
3. 需要统一的构建和发布流程
4. 项目规模适中，不会导致仓库过于庞大

### 不适用场景

1. 完全不相关的项目
2. 需要严格的访问控制和权限隔离
3. 团队分布在不同时区，协作较少
4. 项目规模过大，影响开发效率

## 相关资源

- [Lerna 官方文档](https://lerna.js.org/)
- [pnpm Workspaces](https://pnpm.io/zh/workspaces)
