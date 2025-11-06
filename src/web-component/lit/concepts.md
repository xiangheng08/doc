# 核心概念

Lit 基于标准 Web Components（Custom Elements + Shadow DOM），可被任何框架或原生 HTML 使用。

## Web Components 标准

Lit 构建在 Web Components 标准之上，主要包括：

- **Custom Elements**: 允许定义新的 HTML 元素
- **Shadow DOM**: 提供样式和 DOM 封装
- **HTML Templates**: 定义可复用的 HTML 片段
- **ES Modules**: 支持模块化开发

这些标准确保了 Lit 组件可以在任何现代浏览器中运行，并且可以与任何前端框架（如 React、Vue、Angular）无缝集成。

## 响应式系统

Lit 内置响应式系统，通过声明式属性和状态自动触发 UI 更新。

### 属性（Properties）

属性是组件的公共 API，可以通过 HTML 属性或 JavaScript 属性进行设置：

```js
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('my-counter')
export class MyCounter extends LitElement {
  @property({ type: Number })
  count = 0;

  render() {
    return html`<p>Count: ${this.count}</p>`;
  }
}
```

使用：
```html
<!-- 通过 HTML 属性设置 -->
<my-counter count="5"></my-counter>

<!-- 通过 JavaScript 设置 -->
<script>
  document.querySelector('my-counter').count = 10;
</script>
```

### 状态（State）

状态是组件内部私有的响应式数据：

```js
import { LitElement, html } from 'lit';
import { state } from 'lit/decorators.js';

export class MyComponent extends LitElement {
  @state()
  private _isOpen = false;

  render() {
    return html`
      <button @click="${() => { this._isOpen = !this._isOpen; }}">
        ${this._isOpen ? 'Close' : 'Open'}
      </button>
    `;
  }
}
```

## 合式开发

Lit 支持组合式开发，便于复用逻辑与结构。

### 逻辑复用

可以通过混入（mixins）或控制器（controllers）复用逻辑：

```js
// 控制器示例
import { LitElement } from 'lit';
import { MyController } from './my-controller.js';

class MyElement extends LitElement {
  private _myController = new MyController(this);

  render() {
    return html`<p>Value: ${this._myController.value}</p>`;
  }
}
```

### 结构复用

可以通过模板函数复用结构：

```js
const renderCard = (title, content) => html`
  <div class="card">
    <h3>${title}</h3>
    <p>${content}</p>
  </div>
`;

class MyElement extends LitElement {
  render() {
    return html`
      ${renderCard('Card Title', 'Card content...')}
    `;
  }
}
```

## 性能优势

Lit 的响应式系统只会更新实际发生变化的部分，而不是重新渲染整个组件，这使得它具有出色的性能表现。
