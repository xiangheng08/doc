# 附录：常用速查

这是一个快速参考指南，包含 Lit 开发中常用的代码模式和语法。

## 属性和状态装饰器

### @property()

声明响应式属性：

```js
import { property } from 'lit/decorators.js';

// 基本用法
@property()
name = '';

// 指定类型
@property({ type: String })
title = 'Default Title';

@property({ type: Number })
count = 0;

@property({ type: Boolean })
disabled = false;

@property({ type: Array })
items = [];

@property({ type: Object })
config = {};

// 高级选项
@property({
  type: String,
  reflect: true,           // 反射到 HTML attribute
  attribute: 'my-title',   // 自定义 attribute 名称
  converter: myConverter,  // 自定义转换器
  hasChanged: (newVal, oldVal) => newVal !== oldVal // 自定义变化检测
})
advancedProperty = '';
```

### @state()

声明内部状态：

```js
import { state } from 'lit/decorators.js';

@state()
private _internalValue = '';

@state()
private _isOpen = false;

@state()
private _data: MyDataType[] = [];
```

## 模板语法

### 基本渲染

```js
import { html } from 'lit';

render() {
  return html`
    <div>
      <h1>Hello ${this.name}!</h1>
      <p>Count: ${this.count}</p>
    </div>
  `;
}
```

### 条件渲染

```js
render() {
  return html`
    <!-- if/else -->
    ${this.isLoggedIn 
      ? html`<p>Welcome back!</p>`
      : html`<button>Login</button>`}
    
    <!-- if -->
    ${this.showMessage && html`<p>Message here</p>`}
    
    <!-- switch -->
    ${this.status === 'loading' ? html`<div>Loading...</div>` :
      this.status === 'error' ? html`<div>Error!</div>` :
      html`<div>Content</div>`}
  `;
}
```

### 列表渲染

```js
render() {
  return html`
    <ul>
      ${this.items.map(item => html`
        <li>${item.name}</li>
      `)}
    </ul>
    
    <!-- 使用 repeat 指令优化 -->
    <ul>
      ${repeat(this.items, 
        item => item.id,
        item => html`<li>${item.name}</li>`)}
    </ul>
  `;
}
```

### 事件绑定

```js
render() {
  return html`
    <!-- 基本事件绑定 -->
    <button @click="${this._handleClick}">Click me</button>
    
    <!-- 传递参数 -->
    <button @click="${() => this._handleClickWithParam('value')}">
      Click with param
    </button>
    
    <!-- 表单元素 -->
    <input @input="${this._handleInput}" .value="${this.inputValue}" />
    <select @change="${this._handleSelect}">
      <option value="1">Option 1</option>
    </select>
  `;
}

private _handleClick(e: Event) {
  console.log('Clicked');
}

private _handleClickWithParam(value: string) {
  console.log('Param:', value);
}

private _handleInput(e: Event) {
  const target = e.target as HTMLInputElement;
  this.inputValue = target.value;
}
```

### 属性绑定

```js
render() {
  return html`
    <!-- 属性 (properties) -->
    <my-element .data="${this.dataObject}"></my-element>
    <input .value="${this.inputValue}" />
    
    <!-- 特性 (attributes) -->
    <div class="${this.className}"></div>
    <my-element id="${this.elementId}"></my-element>
    
    <!-- 布尔特性 -->
    <button ?disabled="${this.isDisabled}">Button</button>
    <input ?checked="${this.isChecked}" />
  `;
}
```

## 样式定义

### 静态样式

```js
import { css } from 'lit';

static styles = css`
  :host {
    display: block;
    font-family: Arial, sans-serif;
  }
  
  .container {
    padding: 16px;
    border: 1px solid #ccc;
  }
  
  :host([disabled]) {
    opacity: 0.5;
  }
`;

// 多个样式表
static styles = [
  css`:host { display: block; }`,
  css`.highlight { background: yellow; }`
];
```

### 动态样式

```js
render() {
  return html`
    <div class="container ${this.isActive ? 'active' : ''}">
      Content
    </div>
  `;
}

// 使用 classMap 指令
import { classMap } from 'lit/directives/class-map.js';

render() {
  return html`
    <div class="${classMap({
      container: true,
      active: this.isActive,
      disabled: this.isDisabled
    })}">
      Content
    </div>
  `;
}
```

## 生命周期方法

```js
// 构造函数
constructor() {
  super();
}

// 连接到 DOM
connectedCallback() {
  super.connectedCallback();
}

// 从 DOM 断开
disconnectedCallback() {
  super.disconnectedCallback();
}

// 决定是否更新
shouldUpdate(changedProperties) {
  return super.shouldUpdate(changedProperties);
}

// 渲染
render() {
  return html`<div>Content</div>`;
}

// 首次更新后
firstUpdated(changedProperties) {
  super.firstUpdated(changedProperties);
}

// 每次更新后
updated(changedProperties) {
  super.updated(changedProperties);
}
```

## 常用指令

```js
// repeat - 优化列表渲染
import { repeat } from 'lit/directives/repeat.js';
${repeat(this.items, 
  item => item.id,
  item => html`<li>${item.name}</li>`)}

// classMap - 动态 CSS 类
import { classMap } from 'lit/directives/class-map.js';
<div class="${classMap({ active: this.isActive })}"></div>

// styleMap - 动态样式
import { styleMap } from 'lit/directives/style-map.js';
<div style="${styleMap({ color: this.color, fontSize: '16px' })}"></div>

// ifDefined - 处理可能未定义的值
import { ifDefined } from 'lit/directives/if-defined.js';
<img src="${ifDefined(this.imageUrl)}" />

// unsafeHTML - 渲染原始 HTML（谨慎使用）
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
<div>${unsafeHTML(this.htmlContent)}</div>

// until - 处理异步内容
import { until } from 'lit/directives/until.js';
${until(
  this.fetchData(),
  html`<p>Loading...</p>`
)}
```

## 组件定义

```js
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('my-element')
export class MyElement extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  @property()
  name = 'World';

  @state()
  private _count = 0;

  render() {
    return html`<p>Hello, ${this.name}! Count: ${this._count}</p>`;
  }
}
```

## 事件派发

```js
// 简单事件
private _dispatchEvent() {
  this.dispatchEvent(new CustomEvent('my-event'));
}

// 带数据的事件
private _dispatchDataEvent() {
  this.dispatchEvent(new CustomEvent('data-event', {
    detail: { message: 'Hello' },
    bubbles: true,
    composed: true
  }));
}

// 带回调的事件
private _dispatchEventWithCallback() {
  const event = new CustomEvent('event-with-callback', {
    detail: {
      callback: (result) => {
        console.log('Callback result:', result);
      }
    },
    bubbles: true,
    composed: true
  });
  this.dispatchEvent(event);
}
```

## TypeScript 类型

```typescript
// 属性类型
@property({ type: String })
name: string = '';

@property({ type: Number })
count: number = 0;

@property({ type: Boolean })
enabled: boolean = false;

@property({ type: Array })
items: string[] = [];

@property({ type: Object })
config: MyConfigType = {} as MyConfigType;

// 事件类型
private _handleClick(e: Event) { }
private _handleInput(e: InputEvent) { }
private _handleChange(e: Event) { 
  const target = e.target as HTMLInputElement;
}

// 生命周期参数类型
updated(changedProperties: Map<string, unknown>) { }
firstUpdated(changedProperties: Map<string, unknown>) { }
```

## 性能优化技巧

```js
// 1. 使用 shouldUpdate 避免不必要的更新
shouldUpdate(changedProperties) {
  return changedProperties.has('criticalProperty');
}

// 2. 缓存计算结果
private _computedValue: string | undefined;

private get computedValue() {
  if (!this._computedValue) {
    this._computedValue = this.expensiveComputation();
  }
  return this._computedValue;
}

// 3. 使用私有属性避免触发更新
private _internalCache = new Map();

// 4. 清理资源防止内存泄漏
disconnectedCallback() {
  super.disconnectedCallback();
  this._abortController?.abort();
  clearTimeout(this._timerId);
}
```

这份速查表涵盖了 Lit 开发中最常用的功能和模式，可以帮助你快速查找和使用相关语法。
