# Vue 3.0 介绍

## 简介

Vue 3 是一款用于构建用户界面的渐进式 JavaScript 框架，于 2020 年 9 月 18 日正式发布。它基于标准 HTML、CSS 和 JavaScript 构建，并提供了一套声明式的、组件化的编程模型，帮助开发者高效地开发用户界面。

Vue 3 是 Vue.js 框架的一次重大升级，旨在解决 Vue 2 中的一些性能瓶颈和架构限制，以更好地适应现代应用的开发需求。它保持了 Vue 一贯的渐进式理念，可以在不同场景下灵活使用：

- 无需构建步骤，渐进式增强静态的 HTML
- 在任何页面中作为 Web Components 嵌入
- 单页应用 (SPA)
- 全栈 / 服务端渲染 (SSR)
- Jamstack / 静态站点生成 (SSG)
- 开发桌面端、移动端、WebGL，甚至是命令行终端中的界面

Vue 3 的核心特性包括：

- 声明式渲染：基于标准 HTML 拓展了一套模板语法，声明式地描述最终输出的 HTML 和 JavaScript 状态之间的关系
- 响应性：自动跟踪 JavaScript 状态并在其发生变化时响应式地更新 DOM

## 新特性

### Composition API（组合式 API）

Vue 3 最重要的新特性之一是引入了 Composition API，它是一系列 API 的集合，使我们可以使用函数而不是声明选项的方式书写 Vue 组件。它包括：

- 响应式 API：例如 [ref()](https://cn.vuejs.org/api/reactivity-core.html#ref) 和 [reactive()](https://cn.vuejs.org/api/reactivity-core.html#reactive)，使我们可以直接创建响应式状态、计算属性和侦听器
- 生命周期钩子：例如 [onMounted()](https://cn.vuejs.org/api/composition-api-lifecycle.html#onmounted) 和 [onUnmounted()](https://cn.vuejs.org/api/composition-api-lifecycle.html#onunmounted)，使我们可以在组件各个生命周期阶段添加逻辑
- 依赖注入：例如 [provide()](https://cn.vuejs.org/api/composition-api-dependency-injection.html#provide) 和 [inject()](https://cn.vuejs.org/api/composition-api-dependency-injection.html#inject)，使我们可以在使用响应式 API 时，利用 Vue 的依赖注入系统

相比选项式 API，组合式 API 提供了更好的逻辑复用能力、更灵活的代码组织方式以及更好的类型推导支持。

### 全新的响应式系统

Vue 3 使用了基于 Proxy 的全新响应式系统，取代了 Vue 2 中基于 Object.defineProperty 的实现。这个新系统提供了更好的性能，更精确的变更检测，以及对更多数据类型的支持。

### 更好的 TypeScript 支持

Vue 3 在设计时就考虑了 TypeScript，提供了更好的类型推导和更完整的类型定义。使用组合式 API 编写的代码可以享受到完整的类型推导，而无需编写太多类型标注。

### 性能优化

Vue 3 在多个方面进行了性能优化：

- 更快的渲染速度：重写了虚拟 DOM 实现，提高了渲染性能
- 更小的包体积：通过 [Tree-shaking](https://cn.vuejs.org/guide/best-practices/performance.html#bundle-size-and-tree-shaking)，未使用的代码可以被移除
- 更高效的组件初始化：组件初始化速度提高了约 100%
- 更少的内存占用：内存使用量减少了约 30%

### 多根节点支持（Fragment）

Vue 3 支持组件拥有多个根节点，这使得组件模板更加灵活：

```vue
<template>
  <header>...</header>
  <main>...</main>
  <footer>...</footer>
</template>
```

### Teleport 组件

Teleport 组件允许我们将子组件渲染到 DOM 层次结构之外的指定位置，这在处理模态框、提示框等场景时非常有用：

```vue
<button @click="open = true">Open Modal</button>

<Teleport to="body">
  <div v-if="open" class="modal">
    <p>Hello from the modal!</p>
    <button @click="open = false">Close</button>
  </div>
</Teleport>
```

### Suspense 组件

::: warning 实验性功能
`<Suspense>` 是一项实验性功能。它不一定会最终成为稳定功能，并且在稳定之前相关 API 也可能会发生变化。
:::

Suspense 组件提供了一种优雅的方式来处理异步依赖的加载状态：

```vue
<Suspense>
  <template #default>
    <AsyncComponent />
  </template>
  <template #fallback>
    <div>Loading...</div>
  </template>
</Suspense>
```

## 性能提升

Vue 3 在性能方面相比 Vue 2 有了显著提升：

### 包体积优化

- 更小的基础包体积：通过重写和优化，Vue 3 的基础包体积减小了约 41%
- 更好的 Tree-shaking 支持：未使用的代码可以被构建工具完全移除

### 渲染性能提升

- 虚拟 DOM 重写：新的虚拟 DOM 实现比 Vue 2 快了约 1.3 到 2 倍
- 更高效的组件初始化：组件初始化速度提高了约 100%
- 更少的内存占用：内存使用量减少了约 30%

### 编译优化

- 更智能的静态分析：编译器可以识别更多静态内容并进行优化
- 更高效的模板编译：生成的渲染函数更加优化

### 更新优化

- 更精确的变更检测：减少了不必要的组件更新
- 更高效的响应式系统：基于 Proxy 的实现提供了更好的性能

## 时间线（重大事件）

Vue 3 的开发和发布经历了一个较长的过程：

- **2018年初**：Vue 3 的开发计划公布
- **2019年4月**：Vue 3.0.0 Alpha 版本发布
- **2019年10月**：Vue 3 的开发计划细节公布
- **2020年2月**：Vue 3 的首个测试版发布
- **2020年6月**：Vue 3 的第一个正式候选版发布
- **2020年9月18日**：Vue 3.0.0 正式版本发布
- **2022年2月**：Vue 3 成为默认版本
- **2023年12月31日**：Vue 2 终止支持（EOL）

## 相关链接

- [Vue 3 官方文档](https://cn.vuejs.org/)
- [Vue 3 GitHub 仓库](https://github.com/vuejs/core)
- [Vue 2 终止支持公告](https://v2.cn.vuejs.org/eol/)
- [Vue 3 迁移指南](https://v3-migration.vuejs.org/zh/)
