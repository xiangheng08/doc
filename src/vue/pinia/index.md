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

```bash
npm install pinia
```

## 基本用法

```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
```

## 相关链接

- [官方文档](https://pinia.vuejs.org/zh/)
