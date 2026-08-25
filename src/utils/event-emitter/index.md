# 事件触发器

## 简介

事件触发器（`EventEmitter`）是一个轻量级、类型安全、零依赖的事件发布订阅工具，用于在对象之间解耦通信。它允许你注册事件监听器、触发事件、取消监听，并提供事件等待等高级能力。

## 特性

- **类型安全**: 通过泛型把「事件名」与「参数元组」强绑定，编译期即可发现拼错的事件名或错误的参数类型
- **跨环境**: 纯 TypeScript 实现，不依赖任何运行时 API（`window`、`document`、`process` 等），可在浏览器、Node.js、Web Worker、Deno、Bun 等环境运行
- **上下文绑定**: 支持为监听器绑定自定义 `this` 上下文
- **取消监听**: `on` / `once` 均返回取消函数，无需持有原函数即可随时精准取消监听
- **一次监听**: `once` 触发后自动移除，无需手动取消
- **等待事件**: `waitForEvent` 以 Promise 方式等待事件触发，支持条件过滤与超时
- **错误隔离**: 单个监听器抛出异常不会影响其他监听器的执行
- **私有存储**: 内部监听器使用 `Symbol` 存储，天然私有且不会与实例其他属性冲突

## 多环境使用

本实现是纯 ES/TypeScript 代码，不依赖任何宿主环境特有的 API，因此可在任意 JavaScript 运行时中使用。

## 与其他事件触发器的区别

### 与 Node.js `EventEmitter` 对比

- **类型安全**: Node 的事件名与参数都是字符串 + `any`，本实现用泛型把事件名与参数强绑定，编译期即可发现错误
- **上下文绑定**: 原生支持为监听器绑定自定义 `this`，Node 需要手动 `bind`
- **等待事件**: 内置 `waitForEvent` 以 Promise 等待事件，Node 需自行封装

### 与 `mitt` 等轻量库对比

- **类型安全**: `mitt` 的事件参数为 `any`，本实现通过 `EventMap` 精确约束每个事件的参数类型
- **上下文绑定**: 支持 `context` 参数，`mitt` 不支持
- **等待事件**: 提供 `waitForEvent`，`mitt` 没有

### 与浏览器 `EventTarget` 对比

- **调用方式**: 直接 `emit(event, ...args)` 传递任意参数，无需像 `EventTarget` 那样构造 `CustomEvent` 并包装数据
- **类型安全**: 事件名与参数有类型约束，`EventTarget` 仅支持 `string` 事件名与 `Event` 对象
- **等待事件**: 提供 `waitForEvent`，原生 `EventTarget` 没有

## 使用示例

<<< ./example.ts

## 代码实现

<<< ./code.ts
