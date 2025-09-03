# 辅助 API

## useAttrs()

从 Setup 上下文中返回 attrs 对象，其中包含当前组件的透传 attributes。

```ts
function useAttrs(): Record<string, unknown>
```

## useSlots()

从 Setup 上下文中返回 slots 对象，其中包含父组件传递的插槽。

```ts
function useSlots(): Record<string, (...args: any[]) => VNode[]>
```

## useModel()

这是驱动 defineModel() 的底层辅助函数。如果使用 `<script setup>`，应当优先使用 defineModel()。

```ts
function useModel(
  props: Record<string, any>,
  key: string,
  options?: DefineModelOptions
): ModelRef

type DefineModelOptions<T = any> = {
  get?: (v: T) => any
  set?: (v: T) => any
}

type ModelRef<T, M extends PropertyKey = string, G = T, S = T> = Ref<G, S> & [
  ModelRef<T, M, G, S>,
  Record<M, true | undefined>
]
```

示例：

```js
export default {
  props: ['count'],
  emits: ['update:count'],
  setup(props) {
    const msg = useModel(props, 'count')
    msg.value = 1
  }
}
```

## useTemplateRef()

返回一个浅层 ref，其值将与模板中的具有匹配 ref attribute 的元素或组件同步。

```ts
function useTemplateRef<T>(key: string): Readonly<ShallowRef<T | null>>
```

示例：

```vue
<script setup>
import { useTemplateRef, onMounted } from 'vue'

const inputRef = useTemplateRef('input')

onMounted(() => {
  inputRef.value.focus()
})
</script>

<template>
  <input ref="input" />
</template>
```

## useId()

用于为无障碍属性或表单元素生成每个应用内唯一的 ID。

```ts
function useId(): string
```

示例：

```vue
<script setup>
import { useId } from 'vue'

const id = useId()
</script>

<template>
  <form>
    <label :for="id">Name:</label>
    <input :id="id" type="text" />
  </form>
</template>
```
