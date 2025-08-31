# 组合式 API

## 简介

组合式 API (Composition API) 是 Vue 3 中引入的一系列 API 的集合，通过组合式 API，我们可以使用导入的 API 函数来描述组件逻辑。Composition API 也更方便将共用的逻辑抽离出来 (Hook)，使其更易维护和复用。

## 与 Options API 的对比

组合式 API 相比于传统的 Options API 有以下优势：

1. **更好的逻辑复用**：组合式 API 使我们能够通过组合函数来实现更加简洁高效的逻辑复用，解决了 mixins 的所有缺陷
2. **更灵活的代码组织**：在处理多个逻辑关注点的组件中，组合式 API 可以将同一逻辑关注点的代码组织在一起，而不是分散在不同选项中
3. **更好的类型推导**：组合式 API 主要利用基本的变量和函数，它们本身就是类型友好的，可以享受到完整的类型推导
4. **更小的生产包体积**：搭配 `<script setup>` 使用组合式 API 比等价情况下的选项式 API 更高效，对代码压缩也更友好

## setup()

### 基本使用

[setup()](https://cn.vuejs.org/api/composition-api-setup.html#basic-usage) 钩子是在组件中使用组合式 API 的入口，通常只在以下情况下使用：

1. 需要在非单文件组件中使用组合式 API 时
2. 需要在基于选项式 API 的组件中集成基于组合式 API 的代码时

```js
export default {
  setup() {
    const count = ref(0)

    // 返回值会暴露给模板和其他的选项式 API 钩子
    return {
      count
    }
  },

  mounted() {
    console.log(this.count) // 0
  }
}
```

### 访问 Props

setup 函数的第一个参数是组件的 props。和标准的组件一致，一个 setup 函数的 props 是响应式的，并且会在传入新的 props 时同步更新。

```js
export default {
  props: {
    title: String
  },
  setup(props) {
    console.log(props.title)
  }
}
```

### Setup 上下文

传入 setup 函数的第二个参数是一个 Setup 上下文对象。上下文对象暴露了其他一些在 setup 中可能会用到的值：

```js
export default {
  setup(props, context) {
    // 透传 Attributes (非响应式的对象，等价于 $attrs)
    console.log(context.attrs)

    // 插槽(非响应式的对象，等价于 $slots)
    console.log(context.slots)

    // 触发事件(函数，等价于 $emit)
    console.log(context.emit)

    // 暴露公共属性(函数)
    console.log(context.expose)
  }
}
```

### 与渲染函数一起使用

setup 也可以返回一个渲染函数，此时在渲染函数中可以直接使用在同一作用域下声明的响应式状态：

```js
import { h, ref } from 'vue'

export default {
  setup() {
    const count = ref(0)
    return () => h('div', count.value)
  }
}
```

## 响应式: 核心

### ref()

接受一个内部值，返回一个响应式的、可更改的 ref 对象，此对象只有一个指向其内部值的属性 .value。

```ts
function ref<T>(value: T): Ref<UnwrapRef<T>>

interface Ref<T> {
  value: T
}
```

示例：

```js
const count = ref(0)
console.log(count.value) // 0

count.value = 1
console.log(count.value) // 1
```

### computed()

接受一个 getter 函数，返回一个只读的响应式 ref 对象。该 ref 通过 .value 暴露 getter 函数的返回值。它也可以接受一个带有 get 和 set 函数的对象来创建一个可写的 ref 对象。

```ts
// 只读
function computed<T>(
  getter: (oldValue: T | undefined) => T,
  // 查看下方的 "计算属性调试" 链接
  debuggerOptions?: DebuggerOptions
): Readonly<Ref<Readonly<T>>>

// 可写的
function computed<T>(
  options: {
    get: (oldValue: T | undefined) => T
    set: (value: T) => void
  },
  debuggerOptions?: DebuggerOptions
): Ref<T>
```

示例：

```js
// 创建一个只读的计算属性 ref
const count = ref(1)
const plusOne = computed(() => count.value + 1)

console.log(plusOne.value) // 2

// 创建一个可写的计算属性 ref
const count = ref(1)
const plusOne = computed({
  get: () => count.value + 1,
  set: (val) => {
    count.value = val - 1
  }
})

plusOne.value = 1
console.log(count.value) // 0
```

### reactive()

返回一个对象的响应式代理。

```ts
function reactive<T extends object>(target: T): UnwrapNestedRefs<T>
```

示例：

```js
const obj = reactive({ count: 0 })
obj.count++
```

### readonly()

接受一个对象 (不论是响应式还是普通的) 或是一个 ref，返回一个原值的只读代理。

```ts
function readonly<T extends object>(
  target: T
): DeepReadonly<UnwrapNestedRefs<T>>
```

示例：

```js
const original = reactive({ count: 0 })

const copy = readonly(original)

watchEffect(() => {
  // 用来做响应性追踪
  console.log(copy.count)
})

// 更改源属性会触发其依赖的侦听器
original.count++

// 更改该只读副本将会失败，并会得到一个警告
copy.count++ // warning!
```

### watchEffect()

立即运行一个函数，同时响应式地追踪其依赖，并在依赖更改时重新执行。

```ts
function watchEffect(
  effect: (onCleanup: OnCleanup) => void,
  options?: WatchEffectOptions
): WatchHandle

type OnCleanup = (cleanupFn: () => void) => void

interface WatchEffectOptions {
  flush?: 'pre' | 'post' | 'sync' // 默认：'pre'
  onTrack?: (event: DebuggerEvent) => void
  onTrigger?: (event: DebuggerEvent) => void
}

interface WatchHandle {
  (): void // 可调用，与 `stop` 相同
  pause: () => void
  resume: () => void
  stop: () => void
}
```

示例：

```js
const count = ref(0)

watchEffect(() => console.log(count.value))
// -> 输出 0

count.value++
// -> 输出 1
```

### watchPostEffect()

[watchEffect()](#watcheffect) 使用 `flush: 'post'` 选项时的别名。

### watchSyncEffect()

[watchEffect()](#watcheffect) 使用 `flush: 'sync'` 选项时的别名。

### watch()

侦听一个或多个响应式数据源，并在数据源变化时调用所给的回调函数。

```ts
// 侦听单个来源
function watch<T>(
  source: WatchSource<T>,
  callback: WatchCallback<T>,
  options?: WatchOptions
): WatchHandle

// 侦听多个来源
function watch<T>(
  sources: WatchSource<T>[],
  callback: WatchCallback<T[]>,
  options?: WatchOptions
): WatchHandle

type WatchCallback<T> = (
  value: T,
  oldValue: T,
  onCleanup: (cleanupFn: () => void) => void
) => void

type WatchSource<T> =
  | Ref<T> // ref
  | (() => T) // getter
  | (T extends object ? T : never) // 响应式对象
  // ...或是由以上类型的值组成的数组

interface WatchOptions extends WatchEffectOptions {
  immediate?: boolean // 默认：false
  deep?: boolean | number // 默认：false
  flush?: 'pre' | 'post' | 'sync' // 默认：'pre'
  onTrack?: (event: DebuggerEvent) => void
  onTrigger?: (event: DebuggerEvent) => void
  once?: boolean // 默认：false (3.4+)
}
```

示例：

```js
const state = reactive({ count: 0 })
watch(
  () => state.count,
  (count, prevCount) => {
    /* ... */
  }
)
```

## 响应式: 工具

### isRef()

检查某个值是否为 ref。

```ts
function isRef<T>(r: Ref<T> | unknown): r is Ref<T>
```

### unref()

如果参数是 ref，则返回内部值，否则返回参数本身。这是 `val = isRef(val) ? val.value : val` 计算的一个语法糖。

```ts
function unref<T>(ref: T | Ref<T>): T
```

### toRef() <Badge type="tip" text="3.3+" />

可以将值、refs 或 getters 规范化为 refs (3.3+)。

也可以基于响应式对象上的一个属性，创建一个对应的 ref。这样创建的 ref 与其源属性保持同步：改变源属性的值将更新 ref 的值，反之亦然。

```ts
// 规范化签名 (3.3+)
function toRef<T>(
  value: T
): T extends () => infer R
  ? Readonly<Ref<R>>
  : T extends Ref
    ? T
    : Ref<UnwrapRef<T>>

// 对象属性签名
function toRef<T extends object, K extends keyof T>(
  object: T,
  key: K,
  defaultValue?: T[K]
): ToRef<T[K]>

type ToRef<T> = T extends Ref ? T : Ref<T>
```

示例：

```js
const state = reactive({
  foo: 1,
  bar: 2
})

// 双向 ref，会与源属性同步
const fooRef = toRef(state, 'foo')

// 更改该 ref 会更新源属性
fooRef.value++
console.log(state.foo) // 2

// 更改源属性也会更新该 ref
state.foo++
console.log(fooRef.value) // 3
```

### toValue()

将值、refs 或 getters 规范化为值。这与 [unref()](#unref) 类似，不同的是此函数也会规范化 getter 函数。如果参数是一个 getter，它将会被调用并且返回它的返回值。

这可以在组合式函数中使用，用来规范化一个可以是值、ref 或 getter 的参数。

```ts
function toValue<T>(source: T | Ref<T> | (() => T)): T
```

示例：

```js
toValue(1) //       --> 1
toValue(ref(1)) //  --> 1
toValue(() => 1) // --> 1
```

### toRefs()

将一个响应式对象转换为一个普通对象，这个普通对象的每个属性都是指向源对象相应属性的 ref。每个单独的 ref 都是使用 [toRef()](#toref) 创建的。

```ts
function toRefs<T extends object>(
  object: T
): {
  [K in keyof T]: ToRef<T[K]>
}

type ToRef = T extends Ref ? T : Ref<T>
```

示例：

```js
const state = reactive({
  foo: 1,
  bar: 2
})

const stateAsRefs = toRefs(state)
/*
stateAsRefs 的类型：{
  foo: Ref<number>,
  bar: Ref<number>
}
*/

// 这个 ref 和源属性已经"链接上了"
state.foo++
console.log(stateAsRefs.foo.value) // 2

stateAsRefs.foo.value++
console.log(state.foo) // 3
```

### isProxy()

检查一个对象是否是由 [reactive()](#reactive)、[readonly()](#readonly)、[shallowReactive()](#shallowreactive) 或 [shallowReadonly()](#shallowreadonly) 创建的代理。

```ts
function isProxy(value: any): boolean
```

### isReactive()

检查一个对象是否是由 [reactive()](#reactive) 或 [shallowReactive()](#shallowreactive) 创建的代理。

```ts
function isReactive(value: unknown): boolean
```

### isReadonly()

检查传入的值是否为只读对象。只读对象的属性可以更改，但他们不能通过传入的对象直接赋值。

通过 [readonly()](#readonly) 和 [shallowReadonly()](#shallowreadonly) 创建的代理都是只读的，类似于没有 set 函数的 [computed()](#computed) ref。

```ts
function isReadonly(value: unknown): boolean
```

## 响应式: 进阶

### shallowRef()

[ref()](#ref) 的浅层作用形式。

```ts
function shallowRef<T>(value: T): ShallowRef<T>

interface ShallowRef<T> {
  value: T
}
```

示例：

```js
const state = shallowRef({ count: 1 })

// 不会触发更改
state.value.count = 2

// 会触发更改
state.value = { count: 2 }
```

### triggerRef()

强制触发依赖于一个浅层 ref 的副作用，这通常在对浅引用的内部值进行深度变更后使用。

```ts
function triggerRef(ref: ShallowRef): void
```

示例：

```js
const shallow = shallowRef({
  greet: 'Hello, world'
})

// 触发该副作用第一次应该会打印 "Hello, world"
watchEffect(() => {
  console.log(shallow.value.greet)
})

// 这次变更不应触发副作用，因为这个 ref 是浅层的
shallow.value.greet = 'Hello, universe'

// 打印 "Hello, universe"
triggerRef(shallow)
```

### customRef()

创建一个自定义的 ref，显式声明对其依赖追踪和更新触发的控制方式。

```ts
function customRef<T>(factory: CustomRefFactory<T>): Ref<T>

type CustomRefFactory<T> = (
  track: () => void,
  trigger: () => void
) => {
  get: () => T
  set: (value: T) => void
}
```

示例：

```js
import { customRef } from 'vue'

export function useDebouncedRef(value, delay = 200) {
  let timeout
  return customRef((track, trigger) => {
    return {
      get() {
        track()
        return value
      },
      set(newValue) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      }
    }
  })
}
```

### shallowReactive()

[reactive()](#reactive) 的浅层作用形式。

```ts
function shallowReactive<T extends object>(target: T): T
```

示例：

```js
const state = shallowReactive({
  foo: 1,
  nested: {
    bar: 2
  }
})

// 更改状态自身的属性是响应式的
state.foo++

// ...但下层嵌套对象不会被转为响应式
isReactive(state.nested) // false

// 不是响应式的
state.nested.bar++
```

### shallowReadonly()

[readonly()](#readonly) 的浅层作用形式

```ts
function shallowReadonly<T extends object>(target: T): Readonly<T>
```

示例：

```js
const state = shallowReadonly({
  foo: 1,
  nested: {
    bar: 2
  }
})

// 更改状态自身的属性会失败
state.foo++

// ...但可以更改下层嵌套对象
isReadonly(state.nested) // false

// 这是可以通过的
state.nested.bar++
```

### toRaw()

根据一个 Vue 创建的代理返回其原始对象。

```ts
function toRaw<T>(proxy: T): T
```

示例：

```js
const foo = {}
const reactiveFoo = reactive(foo)

console.log(toRaw(reactiveFoo) === foo) // true
```

### markRaw()

将一个对象标记为不可被转为代理。返回该对象本身。

```ts
function markRaw<T extends object>(value: T): T
```

示例：

```js
const foo = markRaw({})
console.log(isReactive(reactive(foo))) // false

// 也适用于嵌套在其他响应性对象
const bar = reactive({ foo })
console.log(isReactive(bar.foo)) // false
```

### effectScope()

创建一个 effect 作用域，可以捕获其中所创建的响应式副作用 (即计算属性和侦听器)，这样捕获到的副作用可以一起处理。

```ts
function effectScope(detached?: boolean): EffectScope

interface EffectScope {
  run<T>(fn: () => T): T | undefined // 如果作用域不活跃就为 undefined
  stop(): void
}
```

示例：

```js
const scope = effectScope()

scope.run(() => {
  const doubled = computed(() => counter.value * 2)

  watch(doubled, () => console.log(doubled.value))

  watchEffect(() => console.log('Count: ', doubled.value))
})

// 处理掉当前作用域内的所有 effect
scope.stop()
```

### getCurrentScope()

如果有的话，返回当前活跃的 effect 作用域。

```ts
function getCurrentScope(): EffectScope | undefined
```

### onScopeDispose()

在当前活跃的 effect 作用域上注册一个处理回调函数。当相关的 effect 作用域停止时会调用这个回调函数。

```ts
function onScopeDispose(fn: () => void, failSilently?: boolean): void
```

## 生命周期钩子

### onMounted()

注册一个回调函数，在组件挂载完成后执行。

```ts
function onMounted(
  callback: () => void, target?: ComponentInternalInstance | null
): void
```

示例：

```js
<script setup>
import { ref, onMounted } from 'vue'

const el = ref()

onMounted(() => {
  el.value // <div>
})
</script>

<template>
  <div ref="el"></div>
</template>
```

### onUpdated()

注册一个回调函数，在组件因为响应式状态变更而更新其 DOM 树之后调用。

```ts
function onUpdated(
  callback: () => void, target?: ComponentInternalInstance | null
): void
```

示例：

```js
<script setup>
import { ref, onUpdated } from 'vue'

const count = ref(0)

onUpdated(() => {
  // 文本内容应该与当前的 `count.value` 一致
  console.log(document.getElementById('count').textContent)
})
</script>

<template>
  <button id="count" @click="count++">{{ count }}</button>
</template>
```

### onUnmounted()

注册一个回调函数，在组件实例被卸载之后调用。

```ts
function onUnmounted(
  callback: () => void, target?: ComponentInternalInstance | null
): void
```

示例：

```js
<script setup>
import { onMounted, onUnmounted } from 'vue'

let intervalId
onMounted(() => {
  intervalId = setInterval(() => {
    // ...
  })
})

onUnmounted(() => clearInterval(intervalId))
</script>
```

### onBeforeMount()

注册一个钩子，在组件被挂载之前被调用。

```ts
function onBeforeMount(
  callback: () => void, target?: ComponentInternalInstance | null
): void
```

### onBeforeUpdate()

注册一个钩子，在组件即将因为响应式状态变更而更新其 DOM 树之前调用。

```ts
function onBeforeUpdate(
  callback: () => void, target?: ComponentInternalInstance | null
): void
```

### onBeforeUnmount()

注册一个钩子，在组件实例被卸载之前调用。

```ts
function onBeforeUnmount(
  callback: () => void, target?: ComponentInternalInstance | null
): void
```

### onErrorCaptured()

注册一个钩子，在捕获了后代组件传递的错误时调用。

```ts
function onErrorCaptured(callback: ErrorCapturedHook): void

type ErrorCapturedHook = (
  err: unknown,
  instance: ComponentPublicInstance | null,
  info: string
) => boolean | void
```

### onRenderTracked()

注册一个调试钩子，当组件渲染过程中追踪到响应式依赖时调用。

```ts
function onRenderTracked(callback: DebuggerHook): void

type DebuggerHook = (e: DebuggerEvent) => void

type DebuggerEvent = {
  effect: ReactiveEffect
  target: object
  type: TrackOpTypes /* 'get' | 'has' | 'iterate' */
  key: any
}
```

### onRenderTriggered()

注册一个调试钩子，当响应式依赖的变更触发了组件渲染时调用。

```ts
function onRenderTriggered(callback: DebuggerHook): void

type DebuggerHook = (e: DebuggerEvent) => void

type DebuggerEvent = {
  effect: ReactiveEffect
  target: object
  type: TriggerOpTypes /* 'set' | 'add' | 'delete' | 'clear' */
  key: any
  newValue?: any
  oldValue?: any
  oldTarget?: Map<any, any> | Set<any>
}
```

### onActivated()

注册一个回调函数，若组件实例是 `<KeepAlive>` 缓存树的一部分，当组件被插入到 DOM 中时调用。

```ts
function onActivated(
  callback: () => void, target?: ComponentInternalInstance | null
): void
```

### onDeactivated()

注册一个回调函数，若组件实例是 `<KeepAlive>` 缓存树的一部分，当组件从 DOM 中被移除时调用。

```ts
function onDeactivated(
  callback: () => void, target?: ComponentInternalInstance | null
): void
```

### onServerPrefetch()

注册一个异步函数，在组件实例在服务器上被渲染之前调用。

```ts
function onServerPrefetch(callback: () => Promise<any>): void
```

## 依赖注入

### provide()

提供一个值，可以被后代组件注入。

```ts
function provide<T>(key: InjectionKey<T> | string, value: T): void
```

示例：

```vue
<script setup>
import { ref, provide } from 'vue'
import { countSymbol } from './injectionSymbols'

// 提供静态值
provide('path', '/project/')

// 提供响应式的值
const count = ref(0)
provide('count', count)

// 提供时将 Symbol 作为 key
provide(countSymbol, count)
</script>
```

### inject()

注入一个由祖先组件或整个应用 (通过 app.provide()) 提供的值。

```ts
// 没有默认值
function inject<T>(key: InjectionKey<T> | string): T | undefined

// 带有默认值
function inject<T>(key: InjectionKey<T> | string, defaultValue: T): T

// 使用工厂函数
function inject<T>(
  key: InjectionKey<T> | string,
  defaultValue: () => T,
  treatDefaultAsFactory: true
): T
```

示例：

```vue
<script setup>
import { inject } from 'vue'
import { countSymbol } from './injectionSymbols'

// 注入不含默认值的静态值
const path = inject('path')

// 注入响应式的值
const count = inject('count')

// 通过 Symbol 类型的 key 注入
const count2 = inject(countSymbol)

// 注入一个值，若为空则使用提供的默认值
const bar = inject('path', '/default-path')

// 注入一个值，若为空则使用提供的函数类型的默认值
const fn = inject('function', () => {})

// 注入一个值，若为空则使用提供的工厂函数
const baz = inject('factory', () => new ExpensiveObject(), true)
</script>
```

### hasInjectionContext()

如果 [inject()](#inject) 可以在错误的地方 (例如 setup() 之外) 被调用而不触发警告，则返回 true。此方法适用于希望在内部使用 inject() 而不向用户发出警告的库。

```ts
function hasInjectionContext(): boolean
```

## 辅助

### useAttrs()

从 Setup 上下文中返回 attrs 对象，其中包含当前组件的透传 attributes。

```ts
function useAttrs(): Record<string, unknown>
```

### useSlots()

从 Setup 上下文中返回 slots 对象，其中包含父组件传递的插槽。

```ts
function useSlots(): Record<string, (...args: any[]) => VNode[]>
```

### useModel()

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

### useTemplateRef()

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

### useId()

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

## 相关链接

- [Vue 3 官方文档 - 组合式 API](https://cn.vuejs.org/api/)
- [Vue 3 组合式 API 常见问答](https://cn.vuejs.org/guide/extras/composition-api-faq.html)
- [Vue 3 响应式系统深入](https://cn.vuejs.org/guide/extras/reactivity-in-depth.html)
