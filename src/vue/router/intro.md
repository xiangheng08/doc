# 介绍

## 简介

Vue Router 是 Vue.js 官方的路由管理器。它与 Vue.js 的核心深度集成，让构建单页应用变得易如反掌。它包含的功能有：

- 嵌套路由映射
- 动态路由选择(v4.x)
- 模块化的、基于组件的路由配置
- 路由参数、查询、通配符
- 基于 Vue.js 过渡系统的视图过渡效果
- 细粒度的导航控制
- 带有自动激活的 CSS class 的链接
- HTML5 历史模式或 hash 模式；在 IE9 中自动降级(v3.x)
- 自定义的滚动条行为
- URL 的正确编码(v4.x)

## 版本对应关系

- Vue 2 项目应使用 Vue Router v3
- Vue 3 项目应使用 Vue Router v4

## Vue Router v3 到 v4 的主要变化

Vue Router v4 是为 Vue 3 设计的全新版本，在 API 和内部实现上都有重大变化：

1. **安装方式变化**：
   - v3: `new Router({ routes })`
   - v4: `createRouter({ routes })`

2. **模式配置变化**：
   - v3: 使用 [mode](https://v3.router.vuejs.org/zh/api/#mode) 选项配置模式
   - v4: 使用 [history](https://router.vuejs.org/zh/api/#history) 选项配置历史模式

3. **TypeScript 集成**：
   - v4 提供了更好的 TypeScript 支持

4. **代码拆分**：
   - v4 将代码分为三个主要部分：History 实现、Router 匹配器和 Router 本身

5. **新的功能**：
   - 动态路由的改进
   - 更好的路由匹配算法

## 迁移指南

如果你需要从 Vue Router v3 迁移到 v4，请参考官方迁移指南：
[Vue Router 迁移指南](https://router.vuejs.org/zh/guide/migration/)

## 相关链接

- [Vue Router v4 官方中文文档](https://router.vuejs.org/zh/)
- [Vue Router v3 官方中文文档](https://v3.router.vuejs.org/zh/)
