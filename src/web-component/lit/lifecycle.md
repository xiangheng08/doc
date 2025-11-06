# 生命周期

Lit 组件具有标准的 Web Components 生命周期方法，以及一些额外的生命周期回调。

## 标准生命周期方法

### connectedCallback

当元素被添加到文档中时调用：

```js
connectedCallback() {
  super.connectedCallback();
  // 初始化操作，如添加事件监听器
  window.addEventListener('resize', this._handleResize);
}
```

### disconnectedCallback

当元素从文档中移除时调用：

```js
disconnectedCallback() {
  super.disconnectedCallback();
  // 清理操作，如移除事件监听器
  window.removeEventListener('resize', this._handleResize);
}
```

### adoptedCallback

当元素被移动到新文档时调用：

```js
adoptedCallback() {
  super.adoptedCallback();
  // 处理元素被移动到新文档的情况
}
```

## Lit 特有的生命周期方法

### firstUpdated()

首次渲染完成后执行，适合 DOM 操作或初始化：

```js
firstUpdated() {
  // 组件第一次更新后调用
  // 可以安全地访问 DOM 元素
  this._inputElement = this.renderRoot.querySelector('input');
  this._inputElement.focus();
}

firstUpdated(changedProperties) {
  // 调用父类方法
  super.firstUpdated(changedProperties);
  
  // 执行初始化逻辑
  this.initializeComponent();
}
```

### updated(changedProperties)

每次更新后调用，可用于副作用处理：

```js
updated(changedProperties) {
  // 调用父类方法
  super.updated(changedProperties);
  
  // 检查特定属性是否改变
  if (changedProperties.has('userId')) {
    this._loadUserData(this.userId);
  }
  
  // 执行其他更新后的逻辑
  this._notifyParentOfChanges();
}
```

### shouldUpdate(changedProperties)

决定组件是否应该更新：

```js
shouldUpdate(changedProperties) {
  // 检查特定条件来决定是否更新
  if (changedProperties.has('readOnly') && this.readOnly) {
    return false; // 只读状态下不更新
  }
  
  // 默认情况下允许更新
  return super.shouldUpdate(changedProperties);
}
```

## 属性更改周期

### reactiveProperties

当响应式属性更改时的处理：

```js
// 当属性更改时会自动触发更新周期
@property()
name = '';

@property({ type: Number })
count = 0;
```

### requestUpdate()

手动请求组件更新：

```js
// 强制组件更新
this.requestUpdate();

// 更新特定属性
this.requestUpdate('propertyName', oldValue);
```

## 完整生命周期示例

```js
import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';

export class LifecycleExample extends LitElement {
  @property()
  name = '';

  @property({ type: Number })
  count = 0;

  constructor() {
    super();
    console.log('1. constructor: 组件实例化');
  }

  connectedCallback() {
    super.connectedCallback();
    console.log('2. connectedCallback: 组件添加到DOM');
    
    // 添加全局事件监听器
    window.addEventListener('online', this._handleOnline);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    console.log('disconnectedCallback: 组件从DOM移除');
    
    // 清理事件监听器
    window.removeEventListener('online', this._handleOnline);
  }

  shouldUpdate(changedProperties) {
    console.log('3. shouldUpdate: 决定是否更新', changedProperties);
    
    // 如果name为空则不更新
    if (changedProperties.has('name') && !this.name) {
      return false;
    }
    
    return super.shouldUpdate(changedProperties);
  }

  render() {
    console.log('4. render: 渲染模板');
    return html`<p>Name: ${this.name}, Count: ${this.count}</p>`;
  }

  firstUpdated() {
    console.log('5. firstUpdated: 首次更新完成');
    // 可以在这里安全地访问DOM元素
  }

  updated(changedProperties) {
    super.updated(changedProperties);
    console.log('6. updated: 更新完成', changedProperties);
    
    // 处理属性更改后的副作用
    if (changedProperties.has('count')) {
      this.dispatchEvent(new CustomEvent('count-changed', {
        detail: { count: this.count }
      }));
    }
  }

  private _handleOnline = () => {
    console.log('设备上线');
  };
}
```

## 最佳实践

1. 始终调用父类的生命周期方法
2. 在 [connectedCallback](file:///d:/mine/doc/node_modules/@types/node/globals.d.ts#L106-L106) 中添加事件监听器，在 [disconnectedCallback](file:///d:/mine/doc/node_modules/@types/node/globals.d.ts#L107-L107) 中移除
3. 使用 [firstUpdated](file:///d:/mine/doc/node_modules/lit-element/lib/updating-element.d.ts#L351-L355) 进行一次性的初始化操作
4. 使用 [updated](file:///d:/mine/doc/node_modules/lit-element/lib/updating-element.d.ts#L357-L362) 处理属性更改的副作用
5. 使用 [shouldUpdate](file:///d:/mine/doc/node_modules/lit-element/lib/updating-element.d.ts#L328-L338) 优化性能，避免不必要的更新
