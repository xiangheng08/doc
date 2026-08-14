# useSwap

一个在 Vue 中使用的组合式函数（hook），用于封装 [SwapDrag](/utils/browser/swap-drag)，以响应式的方式在组件中启用拖拽排序。

- 通过 `ref` 传入容器元素，`onMounted` 时自动初始化，`onUnmounted` 时自动销毁
- 提供 `isDragging` 响应式状态，方便在拖拽期间控制 UI
- 暴露 `init` / `destroy` / `reinitialize` 方法，便于手动管理生命周期
- 支持 `autoInit` 选项控制是否自动初始化

<script setup>
import Example from './swap_assets/example.vue'
</script>

## 示例

<demo>
  <Example />
</demo>

[random](/utils/random/)、[sleep](/utils/sleep/)

::: details 示例代码
<<< ./swap_assets/example.vue
:::

## code

[SwapDrag](/utils/browser/swap-drag)

<<< ./swap_assets/code.ts
