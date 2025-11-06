# 样式与封装

Lit 默认使用 Shadow DOM 实现样式隔离，并提供多种方式定义组件样式。

## Shadow DOM 样式隔离

Shadow DOM 为组件提供样式封装，防止组件样式影响页面其他部分，也防止页面样式影响组件：

```js
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('styled-component')
export class StyledComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
      background-color: #f0f0f0;
    }

    p {
      color: blue;
      font-size: 16px;
    }
  `;

  render() {
    return html`
      <p>This text is styled within the component</p>
    `;
  }
}
```

## 静态样式

通过 `static styles` 属性定义组件样式：

```js
static styles = css`
  :host {
    display: block;
  }

  .container {
    border: 1px solid #ccc;
    padding: 10px;
  }
`;
```

## 多个样式表

可以组合多个样式表：

```js
static styles = [
  css`
    :host {
      display: block;
    }
  `,
  css`
    .highlight {
      background-color: yellow;
    }
  `
];
```

## CSS 自定义属性（CSS Variables）

使用 CSS 自定义属性实现主题定制：

```js
static styles = css`
  :host {
    display: block;
    --primary-color: #007bff;
    --border-radius: 4px;
  }

  .button {
    background-color: var(--primary-color, #007bff);
    border-radius: var(--border-radius, 4px);
    padding: 8px 16px;
  }
`;
```

外部可以覆盖这些变量：

```css
styled-component {
  --primary-color: #28a745;
  --border-radius: 8px;
}
```

## :host 选择器

`:host` 选择器用于样式化自定义元素本身：

```js
static styles = css`
  :host {
    display: block;
    font-family: Arial, sans-serif;
  }

  :host(.featured) {
    border: 2px solid gold;
  }

  :host([disabled]) {
    opacity: 0.5;
    pointer-events: none;
  }
`;
```

## :host-context() 选择器

根据外部上下文应用样式：

```js
static styles = css`
  :host-context(.dark-theme) {
    background-color: #333;
    color: white;
  }
`;
```

## 样式化子元素

```js
static styles = css`
  .container {
    display: flex;
    flex-direction: column;
  }

  .header {
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .content {
    flex: 1;
    padding: 10px;
  }
`;
```

## 关闭 Shadow DOM（不推荐）

如果需要关闭 Shadow DOM 封装：

```js
export class NoShadowComponent extends LitElement {
  // 关闭 Shadow DOM
  protected createRenderRoot() {
    return this;
  }
}
```

注意：关闭 Shadow DOM 后，组件样式将不再隔离。

## CSS 模块

可以使用 CSS 模块组织样式：

```js
// styles.css.ts
import { css } from 'lit';

export default css`
  .container {
    padding: 16px;
  }

  .title {
    font-size: 1.2em;
    color: blue;
  }
`;

// component.ts
import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from './styles.css.ts';

@customElement('my-component')
export class MyComponent extends LitElement {
  static styles = [styles];

  render() {
    return html`
      <div class="container">
        <h1 class="title">Styled Component</h1>
      </div>
    `;
  }
}
```

## 动态样式

根据组件状态动态应用样式：

```js
@customElement('dynamic-styled-component')
export class DynamicStyledComponent extends LitElement {
  @state()
  private _isActive = false;

  static styles = css`
    :host {
      display: block;
    }

    .button {
      padding: 8px 16px;
      background-color: #ccc;
    }

    .button.active {
      background-color: #007bff;
      color: white;
    }
  `;

  render() {
    return html`
      <button 
        class="button ${this._isActive ? 'active' : ''}"
        @click="${this._toggleActive}">
        ${this._isActive ? 'Active' : 'Inactive'}
      </button>
    `;
  }

  private _toggleActive() {
    this._isActive = !this._isActive;
  }
}
```

## 全局样式

如果需要应用全局样式，可以使用 `unsafeCSS`：

```js
import { css, unsafeCSS } from 'lit';

// 从外部 CSS 文件导入
const globalStyles = `
  body {
    font-family: Arial, sans-serif;
  }
`;

static styles = css`
  ${unsafeCSS(globalStyles)}

  :host {
    display: block;
  }
`;
```

警告：使用 `unsafeCSS` 时要确保内容是安全的，避免 XSS 风险。

## 主题系统示例

创建一个支持主题的组件：

```js
@customElement('themed-component')
export class ThemedComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      --component-bg: #ffffff;
      --component-text: #000000;
      --component-accent: #007bff;
    }

    :host([theme="dark"]) {
      --component-bg: #333333;
      --component-text: #ffffff;
      --component-accent: #00aaff;
    }

    .container {
      background-color: var(--component-bg);
      color: var(--component-text);
      padding: 16px;
      border: 1px solid var(--component-accent);
    }

    .accent-text {
      color: var(--component-accent);
    }
  `;

  @property()
  theme = 'light';

  render() {
    return html`
      <div class="container">
        <h2>Themed Component</h2>
        <p class="accent-text">This text uses accent color</p>
        <p>Current theme: ${this.theme}</p>
      </div>
    `;
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('theme')) {
      this.setAttribute('theme', this.theme);
    }
  }
}
```

使用组件：
```html
<themed-component theme="dark"></themed-component>
```

## 样式最佳实践

1. 使用 Shadow DOM 实现样式隔离
2. 通过 CSS 自定义属性提供主题定制能力
3. 使用 `:host` 选择器样式化组件本身
4. 合理使用 CSS 变量实现灵活的主题系统
5. 避免使用 `unsafeCSS`，除非绝对必要
6. 将样式组织在 `static styles` 中以获得最佳性能
7. 使用组件化的 CSS 类名命名约定
