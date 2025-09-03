# 组合式 API

## 简介

组合式 API (Composition API) 是 Vue 3 中引入的一系列 API 的集合，通过组合式 API，我们可以使用导入的 API 函数来描述组件逻辑。Composition API 也更方便将共用的逻辑抽离出来 (Hook)，使其更易维护和复用。

## 与 Options API 的对比

组合式 API 相比于传统的 Options API 有以下优势：

1. **更好的逻辑复用**：组合式 API 使我们能够通过组合函数来实现更加简洁高效的逻辑复用，解决了 mixins 的所有缺陷
2. **更灵活的代码组织**：在处理多个逻辑关注点的组件中，组合式 API 可以将同一逻辑关注点的代码组织在一起，而不是分散在不同选项中
3. **更好的类型推导**：组合式 API 主要利用基本的变量和函数，它们本身就是类型友好的，可以享受到完整的类型推导
4. **更小的生产包体积**：搭配 `<script setup>` 使用组合式 API 比等价情况下的选项式 API 更高效，对代码压缩也更友好

## 组合式 API

- [响应式: 核心](./reactivity-core)
- [响应式: 工具](./reactivity-utilities)
- [响应式: 进阶](./reactivity-advanced)
- [生命周期](./lifecycle)
- [生命周期钩子](./lifecycle-hook)
- [依赖注入](./dependency-injection)
- [辅助 API](./helpers)

## 相关链接

- [Vue 3 官方文档 - 组合式 API](https://cn.vuejs.org/api/)
- [Vue 3 组合式 API 常见问答](https://cn.vuejs.org/guide/extras/composition-api-faq.html)
- [Vue 3 响应式系统深入](https://cn.vuejs.org/guide/extras/reactivity-in-depth.html)
