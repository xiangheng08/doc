# 最佳实践

遵循 Lit 最佳实践可以帮助你构建高性能、可维护的 Web Components。

## 避免在 render() 中执行副作用

永远不要在 `render()` 方法中执行副作用或复杂计算：

```js
// ❌ 错误做法
render() {
  // 不要在 render 中执行这些操作
  this.expensiveCalculation(); // 复杂计算
  this.sideEffectOperation();  // 副作用操作
  this.updateGlobalState();    // 全局状态更新
  
  return html`<div>Content</div>`;
}

// ✅ 正确做法
render() {
  // 只做渲染相关的工作
  const calculatedValue = this.computeValue(this.data);
  return html`<div>${calculatedValue}</div>`;
}

private computeValue(data) {
  // 复杂计算移到单独的方法中
  return data.map(item => item.value * 2);
}
```

## 合理使用 shouldUpdate() 优化性能

使用 `shouldUpdate()` 方法避免不必要的更新：

```js
shouldUpdate(changedProperties) {
  // 只有当重要属性变化时才更新
  if (changedProperties.has('data') || changedProperties.has('config')) {
    return true;
  }
  
  // 对于只影响样式的属性，可以直接更新而不触发完整渲染
  if (changedProperties.has('theme')) {
    this.renderRoot?.querySelector('.container')
      ?.setAttribute('theme', this.theme);
    return false; // 避免完整更新
  }
  
  return super.shouldUpdate(changedProperties);
}
```

## 保持组件小而专注

遵循单一职责原则，让每个组件专注于一项任务：

```js
// ❌ 过于复杂的组件
@customElement('user-profile-card')
class UserProfileCard extends LitElement {
  // 处理用户数据、权限、表单、验证等太多功能
}

// ✅ 拆分为多个小组件
@customElement('user-avatar')
class UserAvatar extends LitElement { /* 只处理头像显示 */ }

@customElement('user-info')
class UserInfo extends LitElement { /* 只处理用户信息显示 */ }

@customElement('user-actions')
class UserActions extends LitElement { /* 只处理用户操作 */ }

@customElement('user-profile')
class UserProfile extends LitElement {
  // 组合使用上述小组件
  render() {
    return html`
      <user-avatar .src="${this.user.avatar}"></user-avatar>
      <user-info .user="${this.user}"></user-info>
      <user-actions .userId="${this.user.id}"></user-actions>
    `;
  }
}
```

## 利用组合而非继承复用逻辑

使用控制器（Controllers）或混入（Mixins）来复用逻辑：

```js
// 使用控制器复用逻辑
import { LitElement } from 'lit';
import { ResizeController } from './resize-controller.js';

class ResizableElement extends LitElement {
  private _resizeController = new ResizeController(this);
  
  render() {
    return html`
      <div>Width: ${this._resizeController.width}px</div>
    `;
  }
}

// 使用混入复用逻辑
const DraggableMixin = (superclass) => class extends superclass {
  dragStart(e) {
    // 拖拽逻辑
  }
  
  dragEnd(e) {
    // 拖拽结束逻辑
  }
};

@customElement('draggable-element')
class DraggableElement extends DraggableMixin(LitElement) {
  render() {
    return html`<div @mousedown="${this.dragStart}">Drag me</div>`;
  }
}
```

## 遵循无障碍（a11y）规范

确保组件对所有用户都可用：

```js
@customElement('accessible-button')
class AccessibleButton extends LitElement {
  @property({ type: String })
  label = '';
  
  @property({ type: String })
  ariaLabel = '';
  
  render() {
    return html`
      <button
        aria-label="${this.ariaLabel || nothing}"
        title="${this.label}"
        @click="${this._handleClick}">
        <slot name="icon"></slot>
        ${this.label}
      </button>
    `;
  }
  
  private _handleClick(e: Event) {
    // 确保键盘和鼠标用户都能触发
    this.dispatchEvent(new CustomEvent('custom-click', {
      bubbles: true,
      composed: true
    }));
  }
}
```

## 正确管理事件监听器

在合适的生命周期中添加和移除事件监听器：

```js
connectedCallback() {
  super.connectedCallback();
  // 添加全局事件监听器
  window.addEventListener('resize', this._handleResize);
  document.addEventListener('click', this._handleDocumentClick, true);
}

disconnectedCallback() {
  super.disconnectedCallback();
  // 清理事件监听器
  window.removeEventListener('resize', this._handleResize);
  document.removeEventListener('click', this._handleDocumentClick, true);
}

private _handleResize = (e: Event) => {
  // 使用箭头函数保持 this 上下文
  this._windowWidth = window.innerWidth;
};

private _handleDocumentClick = (e: Event) => {
  // 检查点击是否在组件外部
  if (!this.contains(e.target as Node)) {
    this._closeDropdown();
  }
};
```

## 使用私有属性和方法

使用私有命名约定表明内部实现细节：

```js
@customElement('my-component')
class MyComponent extends LitElement {
  // 公共属性
  @property()
  publicValue = '';
  
  // 私有属性
  @state()
  private _internalState = '';
  
  // 私有方法使用下划线前缀
  private _privateMethod() {
    // 内部逻辑
  }
  
  // 公共方法
  publicMethod() {
    this._privateMethod();
  }
}
```

## 正确处理异步操作

妥善处理异步操作和状态管理：

```js
@customElement('data-fetching-component')
class DataFetchingComponent extends LitElement {
  @state()
  private _loading = false;
  
  @state()
  private _data: any[] = [];
  
  @state()
  private _error: string | null = null;
  
  async fetchData() {
    this._loading = true;
    this._error = null;
    
    try {
      const response = await fetch('/api/data');
      if (!response.ok) throw new Error('Failed to fetch');
      this._data = await response.json();
    } catch (error) {
      this._error = error.message;
    } finally {
      this._loading = false;
    }
  }
  
  render() {
    if (this._loading) return html`<div>Loading...</div>`;
    if (this._error) return html`<div>Error: ${this._error}</div>`;
    return html`
      <ul>
        ${this._data.map(item => html`<li>${item.name}</li>`)}
      </ul>
    `;
  }
}
```

## 使用指令优化渲染

使用 Lit 指令优化特定渲染场景：

```js
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { until } from 'lit/directives/until.js';

render() {
  return html`
    <!-- 使用 repeat 优化列表渲染 -->
    <ul>
      ${repeat(this.items, 
        item => item.id,
        item => html`<li>${item.name}</li>`)}
    </ul>
    
    <!-- 使用 classMap 动态切换类 -->
    <div class="${classMap({
      active: this.isActive,
      disabled: this.isDisabled
    })}"></div>
    
    <!-- 使用 styleMap 动态设置样式 -->
    <div style="${styleMap({
      color: this.textColor,
      fontSize: this.fontSize + 'px'
    })}"></div>
    
    <!-- 使用 until 处理异步内容 -->
    <div>
      ${until(
        this.fetchData().then(data => html`<p>${data}</p>`),
        html`<p>Loading...</p>`
      )}
    </div>
  `;
}
```

## 内存泄漏预防

确保组件销毁时清理所有引用：

```js
disconnectedCallback() {
  super.disconnectedCallback();
  
  // 清理定时器
  if (this._timerId) {
    clearTimeout(this._timerId);
  }
  
  // 清理观察器
  this._resizeObserver?.disconnect();
  
  // 移除事件监听器
  window.removeEventListener('resize', this._handleResize);
  
  // 取消未完成的请求
  this._abortController?.abort();
}
```

## 国际化考虑

为国际化做好准备：

```js
@customElement('i18n-component')
class I18nComponent extends LitElement {
  @property()
  locale = 'en';
  
  @property()
  messages = {
    en: { greeting: 'Hello' },
    zh: { greeting: '你好' }
  };
  
  render() {
    const msg = this.messages[this.locale] || this.messages.en;
    return html`<p>${msg.greeting}</p>`;
  }
}
```

遵循这些最佳实践将帮助你创建高质量、可维护和高性能的 Lit 组件。
