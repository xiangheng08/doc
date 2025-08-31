# 组件相关

## 内置组件

### Teleport

`<Teleport>` 是一个内置组件，它可以将一个组件内部的一部分模板"传送"到该组件的 DOM 结构外层的位置去。

基本用法：

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
```

主要特点：
- `to` prop 指定传送的目标，可以是 CSS 选择器或 DOM 元素
- 可以通过 `disabled` prop 禁用传送功能
- 多个 Teleport 可以共享同一个目标，内容会按顺序追加

### Suspense

::: warning 实验性功能
`<Suspense>` 是一项实验性功能。它不一定会最终成为稳定功能，并且在稳定之前相关 API 也可能会发生变化。
:::

`<Suspense>` 是一个内置组件，用来在组件树中协调对异步依赖的处理。

基本用法：

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

主要特点：
- 有两个插槽：`#default` 和 `#fallback`
- 可以等待带有异步 `setup()` 的组件和异步组件
- 触发 `pending`、`resolve` 和 `fallback` 事件

## define 相关 API

### defineProps() 和 defineEmits()

用于在 `<script setup>` 中声明 props 和 emits：

```vue
<script setup>
const props = defineProps({
  foo: String
})

const emit = defineEmits(['change', 'delete'])
</script>
```

也可以使用类型声明：

```ts
const props = defineProps<{
  foo: string
  bar?: number
}>()

const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
```

### defineModel()<Badge type="tip" text="3.4+" />

用于声明一个双向绑定 prop，通过父组件的 v-model 来使用：

```ts
// 声明 "modelValue" prop，由父组件通过 v-model 使用
const model = defineModel()
// 或者：声明带选项的 "modelValue" prop
const model = defineModel({ type: String })

// 在被修改时，触发 "update:modelValue" 事件
model.value = "hello"

// 声明 "count" prop，由父组件通过 v-model:count 使用
const count = defineModel<number>("count")
// 或者：声明带选项的 "count" prop
const count = defineModel<number>("count", { type: Number, default: 0 })

function inc() {
  // 在被修改时，触发 "update:count" 事件
  count.value++
}
```

::: warning 
如果为 `defineModel` prop 设置了一个 `default` 值且父组件没有为该 `prop` 提供任何值，会导致父组件与子组件之间不同步。
```ts
// 子组件：
const model = defineModel({ default: 1 })

// 父组件
const myRef = ref()
```
```html
<Child v-model="myRef"></Child>
```
:::

[修饰符和转换器](https://cn.vuejs.org/api/sfc-script-setup#modifiers-and-transformers)

### defineExpose()

当使用 `<script setup>` 时，通过组件实例是拿不到任何组件内的属性和方法的。而使用 `defineExpose()` 就可以显式暴露组件的属性给父组件通过模板引用访问：

```vue
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

defineExpose({
  a,
  b
})
</script>
```

### defineOptions()<Badge type="tip" text="3.3+" />

用于在 `<script setup>` 中定义组件选项：

```vue
<script setup>
defineOptions({
  name: 'MyComponent',
  inheritAttrs: false
})
</script>
```

### defineSlots()<Badge type="tip" text="3.3+" />

用于在 `<script setup>` 中声明插槽：

```vue
<script setup>
const slots = defineSlots<{
  default?: (props: { id: number }) => any
  item?: (props: { id: number }) => any
}>()
</script>
```

### defineComponent()

用于定义 Vue 组件，提供类型推导：

```ts
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MyComponent',
  props: {
    message: String
  },
  setup(props) {
    // 组件逻辑
  }
})
```

## 异步组件

通过 `defineAsyncComponent` 定义异步组件：

```js
import { defineAsyncComponent } from 'vue'

// 基本用法
const AsyncComp = defineAsyncComponent(() =>
  import('./components/MyComponent.vue')
)

// 高级用法
const AsyncComp = defineAsyncComponent({
  loader: () => import('./Foo.vue'),
  loadingComponent: LoadingComponent,
  errorComponent: ErrorComponent,
  delay: 200,
  timeout: 3000
})
```

## 自定义指令

自定义指令用于重用涉及普通元素的底层 DOM 访问的逻辑：

```vue
<script setup>
// 在模板中启用 v-focus
const vFocus = {
  mounted: (el) => el.focus()
}
</script>

<template>
  <input v-focus />
</template>
```

指令钩子：
- `created`：在绑定元素的 attribute 前调用
- `beforeMount`：在元素被插入到 DOM 前调用
- `mounted`：在绑定元素的父组件及他自己的所有子节点都挂载完成后调用
- `beforeUpdate`：绑定元素的父组件更新前调用
- `updated`：在绑定元素的父组件及他自己的所有子节点都更新后调用
- `beforeUnmount`：绑定元素的父组件卸载前调用
- `unmounted`：绑定元素的父组件卸载后调用

## useSlots() 和 useAttrs()

在 `<script setup>` 中访问插槽和透传属性：

```vue
<script setup>
import { useSlots, useAttrs } from 'vue'

const slots = useSlots()
const attrs = useAttrs()
</script>
```

## 顶层 await

::: warning 实验性功能
`async setup()` 必须与 `Suspense` 组合使用，该特性目前仍处于实验阶段。
:::

在 `<script setup>` 中支持使用顶层 await。结果代码会被编译成 `async setup()`：

```vue
<script setup>
const post = await fetch(`/api/post/1`).then(r => r.json())
</script>
```

## 组件泛型<Badge type="tip" text="TS" />

在 `<script setup>` 中使用泛型：

```vue
<script setup lang="ts" generic="T extends string | number">
defineProps<{
  msg: T
}>()
</script>
```

## 组件样式

### scoped CSS

通过 `scoped` 属性实现组件作用域样式：

```vue
<style scoped>
.example {
  color: red;
}
</style>
```

深度选择器：
```vue
<style scoped>
.a :deep(.b) {
  /* ... */
}
</style>
```

### src 导入

从外部文件导入样式：

```vue
<style src="./style.css"></style>
```

### CSS Modules

使用 CSS Modules：

```vue
<template>
  <p :class="$style.red">This should be red</p>
</template>

<style module>
.red {
  color: red;
}
</style>
```

自定义注入名称：
```vue
<style module="classes">
.red {
  color: red;
}
</style>
```

### 在 `<style>` 中使用 v-bind

将 CSS 值链接到动态组件状态：

```vue
<script setup>
import { ref } from 'vue'
const theme = ref({
  color: 'red',
})
</script>

<style scoped>
p {
  color: v-bind('theme.color');
}
</style>
```

## 相关链接

- [Vue 3 \<script setup\>](https://cn.vuejs.org/api/sfc-script-setup.html)
- [Vue 3 异步组件](https://cn.vuejs.org/guide/components/async.html)
- [Vue 3 自定义指令](https://cn.vuejs.org/guide/reusability/custom-directives.html)
- [Vue 3 SFC CSS 特性](https://cn.vuejs.org/api/sfc-css-features.html)
