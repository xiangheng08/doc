# 分批渲染

## 什么是分批渲染？

分批渲染是一种优化大量数据渲染的方法，它将一次性渲染大量数据的操作分解为多次小批次的渲染。通过分批渲染，可以有效减少浏览器的计算压力，避免主线程长时间被占用，从而减少页面卡顿现象。

分批渲染的主要思路是：

1. 每次只渲染一部分数据。
2. 通过 `setTimeout` 或 [`requestAnimationFrame`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame) 等方法，将剩余数据的渲染分散到后续的任务队列中。

这种方法的优点是页面的响应性更好，因为渲染任务被拆分成了多个小任务，页面不会因为一次性渲染大量数据而卡顿，用户可以在任务间隙进行交互，同时渲染任务被分散到多个帧中，用户可以感知到页面的逐步加载。

::: tip
分批渲染不适合超大数据量，因为即使分批渲染完，大量的 DOM 也会导致浏览器卡顿。对于超大数据量，可以考虑使用虚拟滚动（virtual scrolling）等技术。

推荐数据量在几百到一两千之间使用分批渲染比较好。

[一些虚拟滚动库](#一些虚拟滚动库)
:::

---

## Demo（Vue3 setup 语法）

以下是一个使用 Vue3 setup 语法实现的分批渲染的 Demo：

::: demo 分批渲染 Demo

./batch-render-demo.vue

:::

## 使用 setTimeout 和 requestAnimationFrame 的区别

- `setTimeout` 可以调节每次渲染的时间，一个恰当 `batchSize` 和 `渲染的间隔时间` 能然用户很明显的感觉到一个顺畅分批渲染的过程。相比 `requestAnimationFrame` `batchSize` 的值可以稍微大一点
- `requestAnimationFrame` 是浏览器下一次重绘之前的回调函数，不建议将 `batchSize` 的值设置的过大，否则会导致浏览器卡顿。相比 `setTimeout` 一个恰当 `batchSize` 值，用户几乎感觉不到这个是分批渲染的。

## 一些虚拟滚动库

- [Vue Virtual Scroller](https://github.com/Akryum/vue-virtual-scroller)
- [Vueuc (Vue Utilities Components)](https://github.com/07akioni/vueuc)
- [Vue Virtual Scroll List](https://github.com/tangbc/vue-virtual-scroll-list)
- [Vite-Vue-Virtual-Scroller](https://github.com/MustafaSalih1993/vite-vue-virtual-scroller)
- [Tiny-Virtual-Scroll](https://github.com/TinyAllen/Tiny-Virtual-Scroll)

比较与选择
| 库名称                    | Vue 版本支持 | 动态高度 | 网格支持 | 复杂度   | 适用场景             |
| ------------------------- | ------------ | -------- | -------- | -------- | -------------------- |
| Vue Virtual Scroller      | Vue 2/3      | ✅        | ✅        | 中等     | 列表、网格、动态布局 |
| Vueuc (Vue Utilities)     | Vue 3        | ✅        | ❌        | 简单     | 动态高度简单列表     |
| Vue Virtual Scroll List   | Vue 2/3      | ✅        | ❌        | 简单     | 高性能长列表         |
| Vite-Vue-Virtual-Scroller | Vue 3        | ✅        | ❌        | 中等     | 高性能长列表         |
| Tiny-Virtual-Scroll       | Vue 3        | ❌        | ❌        | 非常简单 | 简单固定高度列表     |
