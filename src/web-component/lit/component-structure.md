# 组件定义与结构

Lit 组件继承自 `LitElement` 基类，使用装饰器声明属性和状态，并实现 `render()` 方法返回模板。

## 基本组件结构

```js
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('my-component')
export class MyComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  @property({ type: String })
  title = 'Default Title';

  @state()
  private _count = 0;

  render() {
    return html`
      <h1>${this.title}</h1>
      <p>Count: ${this._count}</p>
      <button @click="${this._increment}">Increment</button>
    `;
  }

  private _increment() {
    this._count++;
  }
}
```

## 继承自 LitElement

所有 Lit 组件都需要继承自 `LitElement` 基类：

```js
import { LitElement } from 'lit';

export class MyElement extends LitElement {
  // 组件实现
}
```

使用 `@customElement` 装饰器注册自定义元素：

```js
import { customElement } from 'lit/decorators.js';

@customElement('my-element')
export class MyElement extends LitElement {
  // ...
}
```

这等价于：

```js
export class MyElement extends LitElement {
  // ...
}

customElements.define('my-element', MyElement);
```

## 响应式属性

使用 `@property()` 装饰器声明响应式属性：

```js
import { property } from 'lit/decorators.js';

export class MyElement extends LitElement {
  // 基本字符串属性
  @property()
  name = '';

  // 带选项的属性
  @property({ type: String })
  title = 'Default Title';

  // 数字属性
  @property({ type: Number })
  count = 0;

  // 布尔属性
  @property({ type: Boolean, reflect: true })
  disabled = false;

  // 对象属性
  @property({ type: Object })
  data = {};

  // 数组属性
  @property({ type: Array })
  items = [];
}
```

属性选项：
- `type`: 属性类型（String、Number、Boolean、Array、Object）
- `reflect`: 是否反射到 HTML 特性
- `attribute`: 对应的 HTML 特性名称
- `converter`: 自定义转换器

## 内部状态

使用 `@state()` 装饰器管理内部状态：

```js
import { state } from 'lit/decorators.js';

export class MyElement extends LitElement {
  // 私有状态，不会反映到属性或特性
  @state()
  private _internalValue = '';

  @state()
  private _isOpen = false;
}
```

## 渲染方法

实现 `render()` 方法返回组件的模板：

```js
import { html } from 'lit';

export class MyElement extends LitElement {
  render() {
    return html`
      <div>
        <h1>My Component</h1>
        <p>This is my component content</p>
      </div>
    `;
  }
}
```

## 样式定义

通过 `static styles` 属性定义组件样式：

```js
import { css } from 'lit';

export class MyElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      border: 1px solid #ccc;
      padding: 16px;
    }

    h1 {
      color: blue;
    }
  `;
}
```

## 完整示例

以下是一个完整的计数器组件示例：

```js
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('my-counter')
export class MyCounter extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: sans-serif;
    }

    .counter {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    button {
      padding: 8px 16px;
      font-size: 16px;
    }

    .count {
      font-size: 20px;
      font-weight: bold;
      min-width: 30px;
      text-align: center;
    }
  `;

  @property({ type: Number })
  initialCount = 0;

  @state()
  private _currentCount = 0;

  connectedCallback() {
    super.connectedCallback();
    this._currentCount = this.initialCount;
  }

  render() {
    return html`
      <div class="counter">
        <button @click="${this._decrement}">-</button>
        <span class="count">${this._currentCount}</span>
        <button @click="${this._increment}">+</button>
      </div>
    `;
  }

  private _increment() {
    this._currentCount++;
  }

  private _decrement() {
    this._currentCount--;
  }
}
```

使用组件：
```html
<my-counter initial-count="5"></my-counter>
```
