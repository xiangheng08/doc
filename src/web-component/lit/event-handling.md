# 事件处理

在 Lit 中，事件处理是组件交互的核心部分。可以通过多种方式绑定事件处理器，并使用自定义事件实现组件间通信。

## 模板中的事件绑定

### 直接绑定方法

在模板中使用 `@` 前缀绑定事件处理器：

```js
import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('event-demo')
export class EventDemo extends LitElement {
  @state()
  private _count = 0;

  render() {
    return html`
      <button @click="${this._handleClick}">
        Clicked ${this._count} times
      </button>
    `;
  }

  private _handleClick(e: Event) {
    this._count++;
    console.log('Button clicked!', e);
  }
}
```

### 传递参数

可以通过箭头函数传递参数：

```js
render() {
  return html`
    <button @click="${() => this._handleClickWithParam('hello')}">
      Click with param
    </button>
  `;
}

private _handleClickWithParam(message: string) {
  console.log('Message:', message);
}
```

## 事件对象和类型

使用 TypeScript 时，为事件指定正确的类型：

```js
private _handleChange(e: Event) {
  const input = e.target as HTMLInputElement;
  console.log('Input value:', input.value);
}

private _handleKeyboard(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    console.log('Enter key pressed');
  }
}

private _handleMouse(e: MouseEvent) {
  console.log('Mouse position:', e.clientX, e.clientY);
}
```

## 在模板中使用

```js
render() {
  return html`
    <div>
      <input @input="${this._handleChange}" 
             @keydown="${this._handleKeyboard}" />
      <button @click="${this._handleClick}">Click</button>
      <div @mousemove="${this._handleMouse}">Hover over me</div>
    </div>
  `;
}
```

## 派发自定义事件

使用 `dispatchEvent` 派发自定义事件实现子→父通信：

```js
private _handleSubmit() {
  const data = {
    name: 'John',
    email: 'john@example.com'
  };

  // 派发不带数据的简单事件
  this.dispatchEvent(new CustomEvent('submit'));

  // 派发带数据的事件
  this.dispatchEvent(new CustomEvent('data-submit', {
    detail: data,
    bubbles: true,
    composed: true
  }));
}
```

## 父组件监听事件

```js
// 父组件模板
render() {
  return html`
    <event-demo 
      @submit="${this._handleDemoSubmit}"
      @data-submit="${this._handleDataSubmit}">
    </event-demo>
  `;
}

private _handleDemoSubmit(e: CustomEvent) {
  console.log('Demo submitted');
}

private _handleDataSubmit(e: CustomEvent) {
  const data = e.detail;
  console.log('Received data:', data);
}
```

## 事件修饰符

虽然 Lit 本身不提供 Vue 风格的事件修饰符，但我们可以通过简单函数实现类似功能：

```js
// 阻止默认行为
private _handleClickPrevent(e: Event) {
  e.preventDefault();
  // 处理点击逻辑
}

// 停止事件冒泡
private _handleClickStop(e: Event) {
  e.stopPropagation();
  // 处理点击逻辑
}

// 只触发一次
private _handleClickOnce(e: Event) {
  e.currentTarget?.removeEventListener(e.type, this._handleClickOnce);
  // 处理点击逻辑
}

render() {
  return html`
    <a href="#" @click="${this._handleClickPrevent}">Link</a>
    <div @click="${this._handleClickStop}">Click me</div>
    <button @click="${this._handleClickOnce}">Click once</button>
  `;
}
```

## 表单事件处理

处理表单事件的完整示例：

```js
@customElement('form-demo')
export class FormDemo extends LitElement {
  @state()
  private _formData = {
    name: '',
    email: ''
  };

  render() {
    return html`
      <form @submit="${this._handleSubmit}">
        <input 
          name="name" 
          .value="${this._formData.name}"
          @input="${this._handleInput}"
          placeholder="Name" />
        
        <input 
          name="email" 
          .value="${this._formData.email}"
          @input="${this._handleInput}"
          placeholder="Email" />
        
        <button type="submit">Submit</button>
      </form>
    `;
  }

  private _handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this._formData = {
      ...this._formData,
      [target.name]: target.value
    };
  }

  private _handleSubmit(e: Event) {
    e.preventDefault();
    console.log('Form data:', this._formData);
    
    // 派发事件给父组件
    this.dispatchEvent(new CustomEvent('form-submit', {
      detail: this._formData
    }));
  }
}
```

## 全局事件监听

在组件的生命周期中添加和移除全局事件监听器：

```js
connectedCallback() {
  super.connectedCallback();
  window.addEventListener('resize', this._handleResize);
  document.addEventListener('keydown', this._handleKeyDown);
}

disconnectedCallback() {
  super.disconnectedCallback();
  window.removeEventListener('resize', this._handleResize);
  document.removeEventListener('keydown', this._handleKeyDown);
}

private _handleResize = (e: Event) => {
  console.log('Window resized');
};

private _handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    console.log('Escape key pressed');
  }
};
```

## 事件处理最佳实践

1. 使用箭头函数避免 `this` 绑定问题
2. 为事件处理器使用私有方法命名约定（如 `_handleClick`）
3. 正确使用 TypeScript 类型注解
4. 在 [connectedCallback](file:///d:/mine/doc/node_modules/@types/node/globals.d.ts#L106-L106) 中添加全局事件监听器，在 [disconnectedCallback](file:///d:/mine/doc/node_modules/@types/node/globals.d.ts#L107-L107) 中移除
5. 使用 `composed: true` 使自定义事件能够跨越 Shadow DOM 边界
6. 合理使用事件冒泡和捕获
