# 依赖注入

## provide()

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

## inject()

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

## hasInjectionContext()

如果 [inject()](#inject) 可以在错误的地方 (例如 setup() 之外) 被调用而不触发警告，则返回 true。此方法适用于希望在内部使用 inject() 而不向用户发出警告的库。

```ts
function hasInjectionContext(): boolean
```
