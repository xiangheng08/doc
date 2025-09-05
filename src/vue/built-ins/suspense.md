# Suspense

Vue 提供了内置的 [Suspense](https://cn.vuejs.org/guide/built-ins/suspense.html) 组件，用来在组件树中协调对异步依赖的处理。它让我们可以在组件树上层等待下层的多个嵌套异步依赖项解析完成，并可以在等待时渲染一个加载状态。

::: warning ⚠️ 实验性功能

`<Suspense>` 是一项实验性功能。它不一定会最终成为稳定功能，并且在稳定之前相关 API 也可能会发生变化。

:::

## 简介

`<Suspense>` 是一个内置组件，用于处理组件树中的异步依赖。它可以等待其子组件树中的多个嵌套异步依赖项解析完成，并在等待期间显示加载状态。

## 异步依赖

`<Suspense>` 可以等待的异步依赖有两种：

1. 带有异步 `setup()` 钩子的组件。这也包含了使用 `<script setup>` 时有顶层 `await` 表达式的组件。
2. 异步组件。

### async setup()

组合式 API 中组件的 `setup()` 钩子可以是异步的：

```js
export default {
  async setup() {
    const res = await fetch(...)
    const posts = await res.json()
    return {
      posts
    }
  }
}
```

如果使用 `<script setup>`，那么顶层 `await` 表达式会自动让该组件成为一个异步依赖：

```vue
<script setup>
const res = await fetch(...)
const posts = await res.json()
</script>

<template>
  {{ posts }}
</template>
```

### 异步组件

异步组件默认就是"suspensible"的。这意味着如果组件关系链上有一个 `<Suspense>`，那么这个异步组件就会被当作这个 `<Suspense>` 的一个异步依赖。

## 基本使用

`<Suspense>` 组件有两个插槽：`#default` 和 `#fallback`。两个插槽都只允许一个直接子节点。

```vue
<template>
  <Suspense>
    <!-- 具有深层异步依赖的组件 -->
    <Dashboard />
    
    <!-- 在 #fallback 插槽中显示 "正在加载中" -->
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>
```

## Props

`<Suspense>` 组件接受以下 props：

- [timeout](https://cn.vuejs.org/api/built-in-components.html#suspense)：指定等待新内容的超时时间（毫秒）
- [suspensible](https://cn.vuejs.org/api/built-in-components.html#suspense)：控制是否可被父级 Suspense 处理（用于嵌套的 Suspense）

## 事件

`<Suspense>` 组件会触发三个事件：

- [@pending](https://cn.vuejs.org/api/built-in-components.html#suspense)：在进入挂起状态时触发
- [@resolve](https://cn.vuejs.org/api/built-in-components.html#suspense)：在 default 插槽完成获取新内容时触发
- [@fallback](https://cn.vuejs.org/api/built-in-components.html#suspense)：在 fallback 插槽的内容显示时触发

```vue
<template>
  <Suspense
    @pending="handlePending"
    @resolve="handleResolve"
    @fallback="handleFallback"
  >
    <AsyncComponent />
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>

<script setup>
const handlePending = () => {
  console.log('进入挂起状态')
}

const handleResolve = () => {
  console.log('异步组件加载完成')
}

const handleFallback = () => {
  console.log('显示加载状态')
}
</script>
```

## 使用案例

### 基本异步组件加载

```vue
<template>
  <Suspense>
    <template #default>
      <AsyncComponent />
    </template>
    <template #fallback>
      <div>正在加载组件...</div>
    </template>
  </Suspense>
</template>

<script setup>
import { defineAsyncComponent } from 'vue'

const AsyncComponent = defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
)
</script>
```

### 结合其他组件使用

`<Suspense>` 常常与 `<Transition>`、`<KeepAlive>` 等组件结合使用：

```vue
<template>
  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <Transition mode="out-in">
        <KeepAlive>
          <Suspense>
            <!-- 主要内容 -->
            <component :is="Component"></component>
            
            <!-- 加载中状态 -->
            <template #fallback>
              正在加载...
            </template>
          </Suspense>
        </KeepAlive>
      </Transition>
    </template>
  </RouterView>
</template>
```

### 嵌套使用（Vue 3.3+）

当我们有多个嵌套的异步组件时，可以使用嵌套的 `<Suspense>`：

```vue
<template>
  <Suspense>
    <component :is="DynamicAsyncOuter">
      <Suspense suspensible>
        <component :is="DynamicAsyncInner" />
      </Suspense>
    </component>
    
    <template #fallback>
      Loading outer...
    </template>
  </Suspense>
</template>
```

## 注意事项

1. `<Suspense>` 是一项实验性功能，API 可能会在未来版本中发生变化
2. 进入完成状态后，只有当默认插槽的根节点被替换时，`<Suspense>` 才会回到挂起状态
3. 组件树中新的更深层次的异步依赖不会造成 `<Suspense>` 回退到挂起状态
4. `<Suspense>` 组件自身目前还不提供错误处理，可以使用 `errorCaptured` 选项或者 `onErrorCaptured()` 钩子来处理异步错误
5. 嵌套使用时需要设置 `suspensible` 属性来确保正确的依赖处理
