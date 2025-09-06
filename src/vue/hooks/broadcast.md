# 广播

## 介绍

向所有自身、子组件和后代组件广播的 Vue 组合式 API Hook。基于 `provide/inject` 实现。

假设又如下组件结构：

```
Parent.vue
├── Child1.vue
└── Child2.vue
    ├── Child2_1.vue
    └── Child2_2.vue
```

我们在 `Parent.vue` 中使用 `useBroadcast()` 创建一个广播器实例，那么 `Parent.vue` 的子组件和后代组件就组成了一个广播域。在这个域中任意组件发出广播，整个域中的组件都会收到这个广播。

利用这一套组合式 API，就可以在一个域中实现子传父、父传子、子子传父，父传子子的传递数据。有点类似于 Vue 2 的事件总线，但是组合式 API 更加灵活，而且使用 `provide/inject` 范围不会那么广，更适合在小范围中使用。

::: warning 注意
一个域中不能有两个及以上的广播器实例，不然可能会冲突。
:::

## 示例

<script setup>
import Example from './broadcast_assets/example-parent.vue'
</script>

<demo>
  <Example />
</demo>

父组件或祖先组件：

<<< ./broadcast_assets/example-parent.vue

子组件：

<<< ./broadcast_assets/example-child.vue

## 代码

<<< ./broadcast_assets/broadcast.ts

<!-- 
  TODO:
  后续可改成通过一个 createBroadcast 方法创建出 useBroadcast、useReceiveBroadcast、useChildBroadcast 三个组合式 API
  从而实现在一个域中有多个广播器实例时，不会冲突
 -->
