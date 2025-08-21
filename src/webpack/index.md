# Webpack

## 简介

Webpack 是一个现代 JavaScript 应用程序的静态模块打包器（module bundler）。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图（dependency graph），其中包含应用程序需要的每个模块，然后将这些模块打包成一个或多个 bundles。

## 特点

- **模块化支持**：支持 ES6 模块、CommonJS、AMD 等多种模块系统
- **代码分割**：通过 `SplitChunksPlugin` 实现智能代码分割，优化加载性能
- **强大的 loader 系统**：通过 loader 可以处理各种类型的文件（CSS、图片、字体等）
- **插件架构**：丰富的插件生态系统，可以扩展 webpack 的功能
- **开发工具**：提供热模块替换（HMR）、source maps 等开发便利功能
- **tree shaking**：自动删除未使用的代码，减小打包体积
- **配置灵活**：支持多种配置方式，适应不同项目需求

## 历史

Webpack 由 [Tobias Koppers](https://github.com/sokra) 于 2012 年创建，最初是为了解决当时 JavaScript 模块系统不统一的问题。随着前端工程化的发展，Webpack 逐渐成为了最流行的前端构建工具之一：

- **2012年**：Webpack 项目启动
- **2014年**：发布 Webpack 1.0 版本
- **2017年**：发布 Webpack 3.0，引入 Scope Hoisting 优化
- **2018年**：发布 Webpack 4.0，零配置概念和模式（mode）选项
- **2020年**：发布 Webpack 5.0，改进缓存、持久化等特性

Webpack 的出现极大地推动了前端工程化的发展，成为现代前端开发不可或缺的工具之一。

## 相关链接

- [Webpack | Github](https://github.com/webpack/webpack)
- [Webpack | 官网](https://www.webpackjs.com/)
- [Webpack | 官网（中文）](https://webpack.docschina.org/)
