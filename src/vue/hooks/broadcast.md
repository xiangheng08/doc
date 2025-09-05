# 广播

## 介绍

向所有子组件和后代组件广播 Vue 组合式 API Hook。基于 `provide/inject` 实现。

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
