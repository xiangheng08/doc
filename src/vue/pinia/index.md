# Pinia 简介

Pinia 是 Vue.js 的直观状态管理库，是 Vuex 的轻量级替代品。

## 为什么选择 Pinia？

- 直观的 API 设计，类似组件的 Store
- 完整的 TypeScript 支持
- Vue Devtools 集成
- 模块化设计，支持多 Store
- 支持 Composition API 和 Options API
- 支持服务端渲染

## 核心概念

Pinia 有三个核心概念：

1. **Store**: 保存状态和业务逻辑的容器
2. **State**: Store 中的状态数据
3. **Getters**: 从 state 派生出一些状态
4. **Actions**: 可以执行异步操作并修改 state 的函数

## 安装

::: code-group

```sh [npm]
npm install pinia
```

```sh [pnpm]
pnpm add pinia
```

```sh [yarn]
yarn add pinia
```

:::

## 注册 Pinia

```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
```

## 目录结构

下面为推荐的目录结构，根据自己需要可自行调整：

```
src
└── stores
    ├── index.js          # (可选) 初始化 Pinia，不必导入 store
    ├── module1.js        # 'module1' id
    ├── nested-module2.js # 'nested/module2' id
    ├── nested-module3.js # 'nested/module3' id
    └── nested.js         # 'nested' id
```

## 在组件外使用 store

必须在 `app.use(pinia)` 安装 pinia 插件后，才能使用 `useStore()`。

```js
import { useUserStore } from '@/stores/user'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'

// ❌  失败，因为它是在创建 pinia 之前被调用的
const userStore = useUserStore()

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

// ✅ 成功，因为 pinia 实例现在激活了
const userStore = useUserStore()
```

如果是服务端渲染请点击[此处查看](https://pinia.vuejs.org/zh/core-concepts/outside-component-usage.html#ssr-apps)

## 相关链接

- [官方文档](https://pinia.vuejs.org/zh/)
- [从 Vuex ≤4 迁移](https://pinia.vuejs.org/zh/cookbook/migration-vuex.html)
- [热更新](https://pinia.vuejs.org/zh/core-concepts/outside-component-usage.html#ssr-apps)
- [store 测试](https://pinia.vuejs.org/zh/cookbook/testing.html)
