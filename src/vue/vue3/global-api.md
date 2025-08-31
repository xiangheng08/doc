# 全局 API

## createApp()

创建一个应用实例。

```ts
function createApp(rootComponent: Component, rootProps?: object): App
```

详细信息：

第一个参数是根组件。第二个参数可选，它是要传递给根组件的 props。

示例：

可以直接内联根组件：

```js
import { createApp } from 'vue'

const app = createApp({
  /* 根组件选项 */
})
```

也可以使用从别处导入的组件：

```js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
```

## createSSRApp()

以 SSR 激活模式创建一个应用实例。用法与 [createApp()](#createapp) 完全相同。

## app.mount()

将应用实例挂载在一个容器元素中。

```ts
interface App {
  mount(rootContainer: Element | string): ComponentPublicInstance
}
```

详细信息：

参数可以是一个实际的 DOM 元素或一个 CSS 选择器 (使用第一个匹配到的元素)。返回根组件的实例。

如果该组件有模板或定义了渲染函数，它将替换容器内所有现存的 DOM 节点。否则在运行时编译器可用的情况下，容器元素的 innerHTML 将被用作模板。

在 SSR 激活模式下，它将激活容器内现有的 DOM 节点。如果出现了激活不匹配，那么现有的 DOM 节点将会被修改以匹配客户端的实际渲染结果。

对于每个应用实例，mount() 仅能调用一次。

示例：

```js
import { createApp } from 'vue'
const app = createApp(/* ... */)

app.mount('#app')
```

也可以挂载到一个实际的 DOM 元素：

```js
app.mount(document.body.firstChild)
```

## app.unmount()

卸载一个已挂载的应用实例。卸载一个应用会触发该应用组件树内所有组件的卸载生命周期钩子。

```ts
interface App {
  unmount(): void
}
```

## app.onUnmount()

注册一个回调函数，在应用卸载时调用。

```ts
interface App {
  onUnmount(callback: () => any): void
}
```

## app.component()

如果同时传递一个组件名字符串及其定义，则注册一个全局组件；如果只传递一个名字，则会返回用该名字注册的组件 (如果存在的话)。

```ts
interface App {
  component(name: string): Component | undefined
  component(name: string, component: Component): this
}
```

示例：

```js
import { createApp } from 'vue'

const app = createApp({})

// 注册一个选项对象
app.component('MyComponent', {
  /* ... */
})

// 得到一个已注册的组件
const MyComponent = app.component('MyComponent')
```

## app.directive()

如果同时传递一个名字和一个指令定义，则注册一个全局指令；如果只传递一个名字，则会返回用该名字注册的指令 (如果存在的话)。

```ts
interface App {
  directive(name: string): Directive | undefined
  directive(name: string, directive: Directive): this
}
```

示例：

```js
import { createApp } from 'vue'

const app = createApp({
  /* ... */
})

// 注册(对象形式的指令)
app.directive('myDirective', {
  /* 自定义指令钩子 */
})

// 注册(函数形式的指令)
app.directive('myDirective', () => {
  /* ... */
})

// 得到一个已注册的指令
const myDirective = app.directive('myDirective')
```

## app.use()

安装一个插件。

```ts
interface App {
  use(plugin: Plugin, ...options: any[]): this
}
```

详细信息：

第一个参数应是插件本身，可选的第二个参数是要传递给插件的选项。

插件可以是一个带 install() 方法的对象，亦或直接是一个将被用作 install() 方法的函数。

插件选项 (app.use() 的第二个参数) 将会传递给插件的 install() 方法。

若 app.use() 对同一个插件多次调用，该插件只会被安装一次。

示例：

```js
import { createApp } from 'vue'
import MyPlugin from './plugins/MyPlugin'

const app = createApp({
  /* ... */
})

app.use(MyPlugin)
```

## app.mixin()

应用一个全局 mixin (适用于该应用的范围)。一个全局的 mixin 会作用于应用中的每个组件实例。

```ts
interface App {
  mixin(mixin: ComponentOptions): this
}
```

## app.provide()

提供一个值，可以在应用中的所有后代组件中注入使用。

```ts
interface App {
  provide<T>(key: InjectionKey<T> | symbol | string, value: T): this
}
```

详细信息：

第一个参数应当是注入的 key，第二个参数则是提供的值。返回应用实例本身。

示例：

```js
import { createApp } from 'vue'

const app = createApp(/* ... */)

app.provide('message', 'hello')
```

在应用的某个组件中：

```js
import { inject } from 'vue'

export default {
  setup() {
    console.log(inject('message')) // 'hello'
  }
}
```

```js
export default {
  inject: ['message'],
  created() {
    console.log(this.message) // 'hello'
  }
}
```

## app.runWithContext()

使用当前应用作为注入上下文执行回调函数。

```ts
interface App {
  runWithContext<T>(fn: () => T): T
}
```

详情：

需要一个回调函数并立即运行该回调。在回调同步调用期间，即使没有当前活动的组件实例，inject() 调用也可以从当前应用提供的值中查找注入。回调的返回值也将被返回。

示例：

```js
import { inject } from 'vue'

app.provide('id', 1)

const injected = app.runWithContext(() => {
  return inject('id')
})

console.log(injected) // 1
```

## app.version

提供当前应用所使用的 Vue 版本号。这在插件中很有用，因为可能需要根据不同的 Vue 版本执行不同的逻辑。

```ts
interface App {
  version: string
}
```

示例：

在一个插件中对版本作判断：

```js
export default {
  install(app) {
    const version = Number(app.version.split('.')[0])
    if (version < 3) {
      console.warn('This plugin requires Vue 3')
    }
  }
}
```

## app.config

每个应用实例都会暴露一个 config 对象，其中包含了对这个应用的配置设定。你可以在挂载应用前更改这些属性。

```js
import { createApp } from 'vue'

const app = createApp(/* ... */)

console.log(app.config)
```

## app.config.errorHandler

用于为应用内抛出的未捕获错误指定一个全局处理函数。

```ts
interface AppConfig {
  errorHandler?: (
    err: unknown,
    instance: ComponentPublicInstance | null,
    // `info` 是一个 Vue 特定的错误信息
    // 例如：错误是在哪个生命周期的钩子上抛出的
    info: string
  ) => void
}
```

详细信息：

错误处理器接收三个参数：错误对象、触发该错误的组件实例和一个指出错误来源类型信息的字符串。

它可以从下面这些来源中捕获错误：

- 组件渲染器
- 事件处理器
- 生命周期钩子
- setup() 函数
- 侦听器
- 自定义指令钩子
- 过渡 (Transition) 钩子

示例：

```js
app.config.errorHandler = (err, instance, info) => {
  // 处理错误，例如：报告给一个服务
}
```

## app.config.warnHandler

用于为 Vue 的运行时警告指定一个自定义处理函数。

```ts
interface AppConfig {
  warnHandler?: (
    msg: string,
    instance: ComponentPublicInstance | null,
    trace: string
  ) => void
}
```

详细信息：

警告处理器将接受警告信息作为其第一个参数，来源组件实例为第二个参数，以及组件追踪字符串作为第三个参数。

这可以用于过滤筛选特定的警告信息，降低控制台输出的冗余。所有的 Vue 警告都需要在开发阶段得到解决，因此仅建议在调试期间选取部分特定警告，并且应该在调试完成之后立刻移除。

示例：

```js
app.config.warnHandler = (msg, instance, trace) => {
  // `trace` 是组件层级结构的追踪
}
```

## app.config.performance

设置此项为 true 可以在浏览器开发工具的"性能/时间线"页中启用对组件初始化、编译、渲染和修补的性能表现追踪。仅在开发模式和支持 performance.mark API 的浏览器中工作。

类型：boolean

## app.config.compilerOptions

配置运行时编译器的选项。设置在此对象上的值将会在浏览器内进行模板编译时使用，并会影响到所配置应用的所有组件。另外你也可以通过 compilerOptions 选项在每个组件的基础上覆盖这些选项。

### app.config.compilerOptions.isCustomElement

用于指定一个检查方法来识别原生自定义元素。

类型：(tag: string) => boolean

详细信息：

如果该标签需要当作原生自定义元素则应返回 true。对匹配到的标签，Vue 会将其渲染为原生元素而非将其视为一个 Vue 组件来解析。原生 HTML 和 SVG 标签不需要在此函数中进行匹配，Vue 的解析器会自动识别它们。

示例：

```js
// 将所有标签前缀为 'ion-' 的标签都视为自定义元素
app.config.compilerOptions.isCustomElement = tag => tag.startsWith('ion-')
```

### app.config.compilerOptions.whitespace

用于调整模板中空格的处理行为。

类型：'condense' | 'preserve'

默认：'condense'

详细信息：

- 'condense'：缩减空白字符的数量。这是默认值，适用于生产环境。
- 'preserve'：保留空白字符，包括换行符。这在开发时很有用，因为它可以更准确地反映模板源代码。

### app.config.compilerOptions.delimiters

用于调整文本插值的分隔符。

类型：[string, string]

默认：['{{', '}}']

详细信息：

此属性用于调整文本插值的分隔符。该数组的第一个元素是开始分隔符，第二个元素是结束分隔符。

示例：

```js
// 分隔符改为 ES6 模板字符串风格
app.config.compilerOptions.delimiters = ['${', '}']
```

### app.config.compilerOptions.comments

用于调整是否保留模板中的 HTML 注释。

类型：boolean

默认：false

详细信息：

默认情况下 Vue 会移除生产环境中的 HTML 注释。将此选项设为 true 可以强制保留注释，这在开发时很有用。

## app.config.globalProperties

一个用于注册能够被应用内所有组件实例访问到的全局属性的对象。

```ts
interface AppConfig {
  globalProperties: Record<string, any>
}
```

详细信息：

添加到 globalProperties 上的属性可以在应用的任意组件模板中访问到，就像它们是组件自身的属性一样。

这也适用于通过 this 在组件实例中直接访问这些属性。

注意：

避免使用全局属性来保存全局状态，因为这会让状态变得难以理解和调试。在大多数情况下，应该使用响应式 API (如 ref() 和 reactive()) 来创建响应式状态，并通过 provide/inject 在组件间传递。

示例：

在应用中注册一个全局属性后，它可以在任意组件模板中使用：

```js
app.config.globalProperties.msg = 'hello'
```

```vue
<template>
  <div>{{ msg }}</div>
</template>
```

## app.config.optionMergeStrategies

用于为自定义选项定义合并策略的对象。

```ts
interface AppConfig {
  optionMergeStrategies: Record<string, OptionMergeFunction>
}

type OptionMergeFunction = (to: unknown, from: unknown) => any
```

详细信息：

一些插件和库可能需要为自定义选项定义合并策略。例如，当合并 mixin 时，这些策略会控制某个自定义选项应当如何被合并。

示例：

```js
const app = createApp({
  // 自定义选项
  msg: 'Vue',
  // 自定义选项的合并策略
  mergeOptions(to, from) {
    return to ? `${to}-${from}` : from
  }
})

// 为 `msg` 选项定义合并策略
app.config.optionMergeStrategies.msg = (to, from) => {
  return to ? `${to}-${from}` : from
}
```

## app.config.idPrefix

用于为应用生成的 ID 设置前缀。

```ts
interface AppConfig {
  idPrefix?: string
}
```

详细信息：

当使用 useId() 时，这个前缀将被添加到生成的 ID 前面。这对于在同一页面上运行多个 Vue 应用时避免 ID 冲突很有用。

示例：

```js
app.config.idPrefix = 'my-app-'
```

## version

暴露当前所使用的 Vue 版本。

类型：string

示例：

```js
import { version } from 'vue'

console.log(version)
```

## nextTick()

等待下一次 DOM 更新刷新的工具方法。

```ts
function nextTick(callback?: () => void): Promise<void>
```

详细信息：

当你在 Vue 中更改响应式状态时，最终的 DOM 更新并不是同步生效的，而是由 Vue 将它们缓存在一个队列中，直到下一个"tick"才一起执行。这样是为了确保每个组件无论发生多少状态改变，都仅执行一次更新。

nextTick() 可以在状态改变后立即使用，以等待 DOM 更新完成。你可以传递一个回调函数作为参数，或者 await 返回的 Promise。

示例：

```js
<script setup>
import { ref, nextTick } from 'vue'

const count = ref(0)

async function increment() {
  count.value++

  // DOM 还未更新
  console.log(document.getElementById('counter').textContent) // 0

  await nextTick()
  // DOM 此时已经更新
  console.log(document.getElementById('counter').textContent) // 1
}
</script>

<template>
  <button id="counter" @click="increment">{{ count }}</button>
</template>
```

## defineComponent()

在定义 Vue 组件时提供类型推导的辅助函数。

```ts
// 选项语法
function defineComponent(
  component: ComponentOptions
): ComponentConstructor

// 函数语法 (需要 3.3+)
function defineComponent(
  setup: ComponentOptions['setup'],
  extraOptions?: ComponentOptions
): () => any
```

详细信息：

第一个参数是一个组件选项对象。返回值将是该选项对象本身，因为该函数实际上在运行时没有任何操作，仅用于提供类型推导。

注意返回值的类型有一点特别：它会是一个构造函数类型，它的实例类型是根据选项推断出的组件实例类型。这是为了能让该返回值在 TSX 中用作标签时提供类型推导支持。

你可以像这样从 defineComponent() 的返回类型中提取出一个组件的实例类型 (与其选项中的 this 的类型等价)：

```ts
const Foo = defineComponent(/* ... */)

type FooInstance = InstanceType<typeof Foo>
```

## defineAsyncComponent()

定义一个异步组件，它在运行时是懒加载的。参数可以是一个异步加载函数，或是对加载行为进行更具体定制的一个选项对象。

```ts
function defineAsyncComponent(
  source: AsyncComponentLoader | AsyncComponentOptions
): Component

type AsyncComponentLoader = () => Promise<Component>

interface AsyncComponentOptions {
  loader: AsyncComponentLoader
  loadingComponent?: Component
  errorComponent?: Component
  delay?: number
  timeout?: number
  suspensible?: boolean
  onError?: (
    error: Error,
    retry: () => void,
    fail: () => void,
    attempts: number
  ) => any
}
```

## 相关链接

- [Vue 3 官方文档 - 全局 API](https://cn.vuejs.org/api/)
- [Vue 3 应用实例 API](https://cn.vuejs.org/api/application.html)
- [Vue 3 全局 API：常规](https://cn.vuejs.org/api/general.html)