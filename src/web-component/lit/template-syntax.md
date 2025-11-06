# 模板语法（lit-html）

Lit 使用 JavaScript 模板字面量（template literals）编写 HTML，通过 `html` 标签函数创建高效、安全的模板。

## 基础语法

使用 `html` 标签函数创建模板：

```js
import { html } from 'lit';

const template = html`<p>Hello World</p>`;
```

## 表达式绑定

在模板中可以使用表达式插入动态内容：

```js
const name = 'Lit';
const template = html`<p>Hello, ${name}!</p>`;
```

## 条件渲染

使用 JavaScript 的条件运算符进行条件渲染：

```js
render() {
  return html`
    ${this.isLoggedIn 
      ? html`<p>Welcome back!</p>`
      : html`<button>Login</button>`}
  `;
}
```

或者使用逻辑运算符：

```js
render() {
  return html`
    ${this.showMessage && html`<p>This is a message</p>`}
  `;
}
```

## 列表渲染

使用 `map()` 函数渲染列表：

```js
render() {
  return html`
    <ul>
      ${this.items.map(item => 
        html`<li>${item.name}</li>`)}
    </ul>
  `;
}
```

## 事件绑定

通过属性绑定方式绑定事件处理器：

```js
render() {
  return html`
    <button @click="${this.handleClick}">
      Click me
    </button>
  `;
}

private handleClick(e: Event) {
  console.log('Button clicked!');
}
```

## 属性和属性绑定

### 属性（Properties）

使用 `.` 前缀绑定属性：

```js
render() {
  return html`
    <input .value="${this.inputValue}" />
    <my-element .data="${this.dataObject}"></my-element>
  `;
}
```

### 特性（Attributes）

直接绑定特性值：

```js
render() {
  return html`
    <div class="${this.classes}"></div>
    <my-element ?disabled="${this.isDisabled}"></my-element>
  `;
}
```

### 布尔特性

使用 `?` 前缀绑定布尔特性：

```js
render() {
  return html`
    <button ?disabled="${this.isDisabled}">
      ${this.isDisabled ? 'Disabled' : 'Enabled'}
    </button>
  `;
}
```

## 模板组织

### 模板块

使用 `repeat` 指令优化列表渲染：

```js
import { repeat } from 'lit/directives/repeat.js';

render() {
  return html`
    <ul>
      ${repeat(this.items, 
        (item) => item.id,
        (item, index) => html`
          <li>${index}: ${item.name}</li>
        `)}
    </ul>
  `;
}
```

### 条件模板

使用 `ifDefined` 指令处理可能未定义的值：

```js
import { ifDefined } from 'lit/directives/if-defined.js';

render() {
  return html`
    <img src="${ifDefined(this.imageUrl)}" />
  `;
}
```

## 安全性

lit-html 自动处理表达式内容，防止 XSS 攻击：

```js
// 安全 - 内容会被转义
const userInput = '<script>alert("XSS")</script>';
const template = html`<p>${userInput}</p>`;
// 渲染为: <p>&lt;script&gt;alert("XSS")&lt;/script&gt;</p>
```

如果需要渲染 HTML 内容，使用 `unsafeHTML` 指令：

```js
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

const htmlContent = '<strong>Bold text</strong>';
const template = html`<div>${unsafeHTML(htmlContent)}</div>`;
```

注意：使用 `unsafeHTML` 时要确保内容是安全的，否则可能导致 XSS 漏洞。
