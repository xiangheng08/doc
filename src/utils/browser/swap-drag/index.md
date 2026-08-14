# SwapDrag

一个基于原生 HTML5 拖拽（Drag and Drop API）实现的**列表排序工具**，用于让容器内的子元素可以通过拖拽调整顺序。

它**只负责视觉上的拖拽交互，不会主动改变元素的顺序**。所有排序逻辑都由使用方在回调中自行处理，例如在 `onSort` 中触发网络请求，待**请求成功后再改变数据顺序**。这种「操作数据、不操作 DOM」的思路与 Vue 等框架的理念相契合，尤其适用于需要后端持久化排序的场景。

可前往 [useSwap](/vue/hooks/swap) 查看使用示例及效果

## 特性

- 支持拖动动画与位置交换动画
- 可配置拖拽延迟、动画时长与缓动函数
- 支持拖拽手柄（`handle`）与可拖拽/不可拖拽子项过滤（`draggable`/`filter`）
- 提供 `onStart` / `onMove` / `onSort` / `onEnd` 等回调，方便接入业务逻辑
- 拖拽过程中自动添加选中、阴影、高亮等样式类，便于自定义视觉反馈

## Code

[sleep](/utils/sleep/)、[getElementIndex](/utils/browser/get-element-index/)

<<< ./code.ts
