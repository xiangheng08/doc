# Vue 2.0 介绍

Vue 2.0 是一个用于构建用户界面的渐进式 JavaScript 框架，于 2016 年 9 月 30 日正式发布。它采用自底向上增量开发的设计，核心库只关注视图层，易于上手且非常便于与第三方库或既有项目整合。

## MVVM 模式

Vue 2 使用 MVVM（Model-View-ViewModel）架构模式，这是其核心设计模式之一

![MVVM](../images/mvvm.webp)


- **Model（模型）**：代表数据模型，负责处理业务逻辑以及和服务端进行交互。
- **View（视图）**：负责将数据模型转化为 UI 展示出来，用户通过视图与应用程序交互。
- **ViewModel（视图模型）**：连接 Model 和 View 的桥梁，负责双向数据绑定和业务逻辑处理。

在 Vue 中，ViewModel 由 Vue 实例来表示，它负责管理 View 与 Model 的交互逻辑。Vue 的响应式系统是 MVVM 模式的核心，它使得数据与视图可以自动同步，从而简化了开发过程。

## 核心特点

1. **数据驱动（MVVM）**：Vue 采用 MVVM 模式，实现了数据与视图的自动同步，开发者只需关注业务逻辑。
2. **组件化开发**：Vue 将 UI 组件抽象为一个个可独立复用的组件，每个组件拥有自己的状态和行为，可以在其他组件中进行调用和嵌套。
3. **响应式数据绑定**：Vue 采用了双向绑定的机制，数据的变化会立即反映到视图上，同时视图的变化也会即时更新数据。
4. **虚拟 DOM**：Vue 2 引入了虚拟 DOM 技术，通过在内存中创建一个虚拟的 DOM 树，并在实际 DOM 上进行最小化的更新，从而提高了性能。
5. **指令系统**：Vue 提供了丰富的指令系统，如 `v-if`、`v-for`、`v-bind`、`v-on` 等，简化了 DOM 操作。
6. **轻量级**：Vue 2 的运行大小约为 20kB min+gzip，非常轻量。
7. **渐进式框架**：Vue 被设计为可以自底向上逐层应用，可以根据项目需求逐步采用其功能。

## 时间线（重大事件）

- **2013年**：尤雨溪开始开发 Vue.js
- **2014年2月**：Vue.js 首次公开发布
- **2015年10月**：Vue 1.0 发布
- **2016年9月**：Vue 2.0 发布候选版本
- **2016年9月30日**：Vue 2.0 正式发布，代号 [Ghost in the Shell](https://github.com/vuejs/vue/releases/tag/v2.0.0)
- **2016年11月**：Vue 2.1 发布，引入了作用域插槽
- **2017年**：陆续发布 Vue 2.2、2.3、2.4 等多个版本，持续优化和增强功能
- **2019年2月**：Vue 2.6 发布，这是 Vue 2 的最后一个主要版本
- **2020年9月**：Vue 3.0 正式发布，代号 [One Piece](https://github.com/vuejs/core/releases/tag/v3.0.0)
- **2023年12月24日**：Vue 2.7.16 发布，这是 Vue 2 的最后一个版本
- **2023年12月31日**：Vue 2 正式结束生命周期（[Swan Song](https://github.com/vuejs/vue/releases/tag/v2.7.16)）

## 相关链接

- [Vue 2 官方文档](https://v2.vuejs.org/v2/guide/)
- [Vue 2 中文文档](https://cn.vuejs.org/v2/guide/)
- [Vue 2 GitHub 仓库](https://github.com/vuejs/vue)
- [Vue 2 CLI 工具](https://cli.vuejs.org/)
- [Vue Devtools 浏览器扩展](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- [Vue Router（Vue 2 版本）](https://v3.router.vuejs.org/zh/)
- [Vuex（Vue 2 版本）](https://v3.vuex.vuejs.org/zh/)
