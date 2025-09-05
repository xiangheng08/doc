# KeepAlive

Vue 提供了内置的 [KeepAlive](https://cn.vuejs.org/guide/built-ins/keep-alive.html) 组件，用于在多个组件间动态切换时缓存被移除的组件实例。

## 简介

`<KeepAlive>` 是一个内置组件，它的功能是在多个组件间动态切换时缓存被移除的组件实例，而不是销毁它们。这使得组件在被切换回来时能够保持之前的状态。

## 基本使用

在动态组件中使用 `<KeepAlive>` 可以缓存组件实例：

```vue
<template>
  <!-- 非活跃的组件将会被缓存！ -->
  <KeepAlive>
    <component :is="activeComponent" />
  </KeepAlive>
</template>
```

默认情况下，`<KeepAlive>` 会缓存内部的所有组件实例。

## 包含/排除

可以通过 `include` 和 `exclude` prop 来定制缓存行为。这两个 prop 的值都可以是一个以英文逗号分隔的字符串、一个正则表达式，或是包含这两种类型的一个数组：

```vue
<template>
  <!-- 以英文逗号分隔的字符串 -->
  <KeepAlive include="a,b">
    <component :is="view" />
  </KeepAlive>

  <!-- 正则表达式 (需使用 `v-bind`) -->
  <KeepAlive :include="/a|b/">
    <component :is="view" />
  </KeepAlive>

  <!-- 数组 (需使用 `v-bind`) -->
  <KeepAlive :include="['a', 'b']">
    <component :is="view" />
  </KeepAlive>
</template>
```

组件会根据它们的 `name` 选项进行匹配，所以组件如果想要条件性地被 KeepAlive 缓存，就必须显式声明一个 `name` 选项。

## 最大缓存实例数

可以通过传入 `max` prop 来限制可被缓存的最大组件实例数：

```vue
<template>
  <KeepAlive :max="10">
    <component :is="activeComponent" />
  </KeepAlive>
</template>
```

`<KeepAlive>` 的行为在指定了 `max` 后类似一个 LRU 缓存：如果缓存的实例数量即将超过指定的最大数量，则最久没有被访问的缓存实例将被销毁，以便为新的实例腾出空间。

## 缓存实例的生命周期

当一个组件实例从 DOM 上移除但因为被 `<KeepAlive>` 缓存而仍作为组件树的一部分时，它将变为不活跃状态而不是被卸载。当一个组件实例作为缓存树的一部分插入到 DOM 中时，它将重新被激活。

可以通过 `onActivated()` 和 `onDeactivated()` 注册相应的两个状态的生命周期钩子：

```vue
<script setup>
import { onActivated, onDeactivated } from 'vue'

onActivated(() => {
  // 调用时机为首次挂载
  // 以及每次从缓存中被重新插入时
})

onDeactivated(() => {
  // 在从 DOM 上移除、进入缓存
  // 以及组件卸载时调用
})
</script>
```

或者在选项式 API 中使用：

```js
export default {
  activated() {
    // 在首次挂载、
    // 以及每次从缓存中被重新插入的时候调用
  },
  deactivated() {
    // 在从 DOM 上移除、进入缓存
    // 以及组件卸载时调用
  }
}
```

## 使用案例

### 基本动态组件缓存

```vue
<template>
  <div>
    <button @click="currentTab = 'Home'">Home</button>
    <button @click="currentTab = 'Posts'">Posts</button>
    <button @click="currentTab = 'Archive'">Archive</button>
    
    <KeepAlive>
      <component :is="currentTab"></component>
    </KeepAlive>
  </div>
</template>

<script>
import Home from './components/Home.vue'
import Posts from './components/Posts.vue'
import Archive from './components/Archive.vue'

export default {
  components: {
    Home,
    Posts,
    Archive
  },
  data() {
    return {
      currentTab: 'Home'
    }
  }
}
</script>
```

### 与 Transition 组件结合使用

```vue
<template>
  <div>
    <transition name="fade" mode="out-in">
      <KeepAlive :max="10">
        <component :is="currentView"></component>
      </KeepAlive>
    </transition>
  </div>
</template>
```

[结合 RouterView 和 Transition](/vue/router/v4#keep-alive-transition)

### 条件缓存特定组件

```vue-html
<KeepAlive :include="/^(TabA|TabB)$/">
  <component :is="currentTab"></component>
</KeepAlive>
```

## 注意事项

1. 在 [DOM 内模板](https://cn.vuejs.org/guide/essentials/component-basics.html#in-dom-template-parsing-caveats)中使用时，组件名需要写为 `<keep-alive>`
2. 只有在 `<KeepAlive>` 中的直接子组件才会被缓存
3. 每个被缓存的组件都需要有唯一的 `name` 选项，以便在 `include`/`exclude` 中进行匹配
4. `onActivated` 和 `onDeactivated` 钩子不仅适用于缓存的根组件，也适用于缓存树中的后代组件
5. 在 3.2.34 或以上的版本中，使用 `<script setup>` 的单文件组件会自动根据文件名生成对应的 `name` 选项
