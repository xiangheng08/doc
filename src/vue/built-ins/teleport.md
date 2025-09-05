# Teleport

Vue 提供了内置的 [Teleport](https://cn.vuejs.org/guide/built-ins/teleport.html) 组件，它可以将一个组件内部的一部分模板"传送"到该组件的 DOM 结构外层的位置去。

::: tip
Vue3 才有 Teleport 组件
:::

## 简介

`<Teleport>` 是一个内置组件，用于将组件的一部分模板传送到 DOM 中的另一个位置。这在处理模态框、浮层、提示框等需要脱离当前组件 DOM 结构的场景时非常有用。

## 基本使用

最基本的使用方式是通过 [to](https://cn.vuejs.org/api/built-in-components.html#teleport) prop 指定传送的目标位置：

```vue
<template>
  <button @click="open = true">Open Modal</button>

  <Teleport to="body">
    <div v-if="open" class="modal">
      <p>Hello from the modal!</p>
      <button @click="open = false">Close</button>
      </div>
  </Teleport>
</template>

<script>
export default {
  data() {
    return {
      open: false
    }
  }
}
</script>
```

[to](https://cn.vuejs.org/api/built-in-components.html#teleport) prop 的值可以是一个 CSS 选择器字符串，也可以是一个 DOM 元素对象。

## Props

`<Teleport>` 组件接受以下 props：

- [to](https://cn.vuejs.org/api/built-in-components.html#teleport)：指定目标容器，可以是选择器或实际元素（必填）
- [disabled](https://cn.vuejs.org/api/built-in-components.html#teleport)：当值为 `true` 时，内容将保留在其原始位置而不是移动到目标容器中
- [defer](https://cn.vuejs.org/api/built-in-components.html#teleport)：当值为 `true` 时，Teleport 将推迟直到应用的其他部分挂载后再解析其目标（Vue 3.5+）

## 使用案例

### 模态框

最常见的使用场景是模态框，将模态框传送到 body 元素下，避免 CSS 样式问题：

```vue
<template>
  <button @click="showModal = true">打开模态框</button>
  
  <Teleport to="body">
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h2>模态框标题</h2>
        <p>这是模态框内容</p>
        <button @click="showModal = false">关闭</button>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'

const showModal = ref(false)
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
```

### 条件禁用 Teleport

在某些场景下可能需要视情况禁用 `<Teleport>`，比如在桌面端将组件作为浮层渲染，在移动端作为行内组件：

```vue
<template>
  <Teleport :disabled="isMobile" to="body">
    <div class="tooltip">这是一个提示框</div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'

const isMobile = ref(window.innerWidth < 768)
</script>
```

### 延迟解析的 Teleport

在 Vue 3.5+ 中，可以使用 [defer](https://cn.vuejs.org/api/built-in-components.html#teleport) prop 推迟 Teleport 的目标解析：

```vue
<template>
  <Teleport defer to="#late-div">
    <p>这部分内容将被传送到 #late-div 元素中</p>
  </Teleport>

  <!-- 稍后出现于模板中的某处 -->
  <div id="late-div"></div>
</template>
```

### 多个 Teleport 共享目标

多个 `<Teleport>` 组件可以将其内容挂载在同一个目标元素上，内容会按顺序追加：

```vue
<template>
  <Teleport to="#modals">
    <div>A</div>
  </Teleport>
  
  <Teleport to="#modals">
    <div>B</div>
  </Teleport>
</template>
```

渲染结果为：

```html
<div id="modals">
  <div>A</div>
  <div>B</div>
</div>
```

## 注意事项

1. `<Teleport>` 挂载时，传送的 to 目标必须已经存在于 DOM 中
2. `<Teleport>` 只改变了渲染的 DOM 结构，不会影响组件间的逻辑关系
3. 来自父组件的注入也会按预期工作
4. 子组件在 Vue Devtools 中仍会嵌套在父级组件下面
5. 使用 [defer](https://cn.vuejs.org/api/built-in-components.html#teleport) 时，目标元素必须与 Teleport 在同一个挂载/更新周期内渲染

## 结合其他组件使用

`<Teleport>` 可以与 `<Transition>` 组件结合使用来创建带动画的传送内容：

```vue
<template>
  <button @click="showModal = true">打开带动画的模态框</button>
  
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="showModal" class="modal-overlay" @click="showModal = false">
        <div class="modal" @click.stop>
          <h2>模态框标题</h2>
          <p>这是带动画的模态框</p>
          <button @click="showModal = false">关闭</button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal,
.modal-leave-active .modal {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal,
.modal-leave-to .modal {
  transform: scale(0.8);
}
</style>
