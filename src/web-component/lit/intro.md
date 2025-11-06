# 简介

Lit 是一个用于构建**轻量、快速 Web Components** 的简单库，由 Google 维护。

## 什么是 Lit？

Lit 提供了一套用于构建 Web Components 的现代工具，它基于标准 Web Components 规范（Custom Elements 和 Shadow DOM），并添加了响应式状态管理和其他有用的功能。Lit 的设计目标是简单、快速和符合标准。

## 核心特性

Lit 的核心是一个能**减少样板代码**（boilerplate-killing）的组件基类，并提供响应式状态管理。与其他框架相比，Lit 具有以下优势：

- **轻量级**: 核心库非常小，加载速度快
- **高性能**: 使用高效的渲染机制
- **标准化**: 基于 Web Components 标准，可与任何框架或原生 HTML 配合使用
- **响应式**: 内置响应式系统，自动跟踪状态变化并更新 UI

## 为什么选择 Lit？

如果你需要：

- 构建可复用的 Web Components
- 在不同框架间共享组件
- 轻量级的解决方案
- 符合 Web 标准的组件库

那么 Lit 是一个很好的选择。它特别适合构建设计系统、UI 组件库或需要在多个项目中复用的组件。

## 快速开始示例

```js
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('my-element')
export class MyElement extends LitElement {
  @property()
  name = 'World';

  render() {
    return html`<p>Hello, ${this.name}!</p>`;
  }
}
```

使用组件：
```html
<my-element name="Lit"></my-element>
```

这将渲染为：
```html
<p>Hello, Lit!</p>
```

## 浏览器兼容性

Lit 支持所有现代浏览器，包括 Chrome、Firefox、Safari 和 Edge。对于需要支持旧版浏览器的项目，可以通过 polyfills 实现兼容。
