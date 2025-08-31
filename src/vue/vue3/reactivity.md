# 响应式原理

## Proxy vs DefineProperty

Vue 2 和 Vue 3 在实现响应式系统方面采用了不同的技术方案。

### Vue 2 中的 Object.defineProperty

Vue 2 使用 `Object.defineProperty` 来实现响应式系统。这种方法有以下特点和限制：

1. **无法检测属性的添加或删除**：
   ```js
   var vm = new Vue({
     data: {
       a: 1
     }
   })
   
   // `vm.a` 是响应式的
   vm.b = 2
   // `vm.b` 是非响应式的
   ```

2. **数组变化检测的限制**：
   - 无法检测通过索引直接设置数组项：`vm.items[indexOfItem] = newValue`
   - 无法检测修改数组长度：`vm.items.length = newLength`

3. **需要特殊的 API 来处理上述限制**：
   - 使用 `Vue.set` 或 `vm.$set` 添加响应式属性
   - 使用 `Array.prototype.splice` 修改数组长度

4. **需要遍历对象的所有属性并转换为 getter/setter**，这对性能有一定影响。

### Vue 3 中的 Proxy

Vue 3 使用 `Proxy` 来实现响应式系统，解决了 Vue 2 中的许多限制：

1. **可以检测属性的添加和删除**：
   ```js
   const state = reactive({
     a: 1
   })
   
   // 添加新属性是响应式的
   state.b = 2
   
   // 删除属性也是响应式的
   delete state.a
   ```

2. **原生支持数组变化检测**：
   - 可以直接通过索引设置数组项
   - 可以直接修改数组长度

3. **不需要特殊的 API 来处理属性添加/删除**：
   - 直接操作对象属性即可保持响应性

4. **性能更好**：
   - 不需要在初始化时遍历所有属性
   - 可以拦截更多操作，如 `in` 操作符、`delete` 操作等

5. **Proxy 的局限性**：
   - IE 不支持 Proxy（Vue 3 不支持 IE）
   - 对于 `ref`，仍然使用 getter/setter 实现

示例代码展示两种实现方式的差异：

```js
// Vue 2 的响应式实现（简化版）
function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get() {
      track(obj, key) // 依赖追踪
      return val
    },
    set(newVal) {
      val = newVal
      trigger(obj, key) // 触发更新
    }
  })
}

// Vue 3 的响应式实现（简化版）
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key, receiver) {
      track(target, key)
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver)
      trigger(target, key)
      return result
    }
  })
}
```

## ref vs reactive

Vue 3 提供了两种主要的响应式 API：`ref` 和 `reactive`。

### ref

`ref` 用于创建一个响应式的值容器，适用于任何类型的值（基本类型和对象类型）。

```ts
function ref<T>(value: T): Ref<UnwrapRef<T>>

interface Ref<T> {
  value: T
}
```

特点：

1. **适用于所有值类型**：基本类型、对象、数组等
2. **访问需要通过 `.value`**：
   ```js
   const count = ref(0)
   console.log(count.value) // 0
   
   count.value = 1
   console.log(count.value) // 1
   ```
3. **当 ref 包含对象时，对象会被自动转换为 reactive**：
   ```js
   const state = ref({ count: 0 })
   // state.value 是一个 reactive 对象
   state.value.count++ // 响应式更新
   ```

### reactive

`reactive` 用于创建一个响应式的对象代理，只适用于对象类型（包括数组、Map、Set 等）。

```ts
function reactive<T extends object>(target: T): UnwrapNestedRefs<T>
```

特点：

1. **只适用于对象类型**：对象、数组、Map、Set 等
2. **直接访问属性，无需 `.value`**：
   ```js
   const state = reactive({ count: 0 })
   console.log(state.count) // 0
   
   state.count++
   console.log(state.count) // 1
   ```
3. **深层响应式**：对象的所有嵌套属性都是响应式的

### 选择使用 ref 还是 reactive

1. **使用 ref 的场景**：
   - 需要响应式的原始值（number, string, boolean 等）
   - 需要替换整个对象
   - 在模板中使用时希望直接访问值而不是属性

2. **使用 reactive 的场景**：
   - 处理对象或数组
   - 需要保持对象结构不变
   - 有大量相关联的响应式属性

示例对比：

```js
// 使用 ref
const count = ref(0)
const state = ref({ name: 'Vue', version: 3 })

// 访问和修改需要 .value
count.value++
state.value.version = 4

// 使用 reactive
const state = reactive({
  count: 0,
  info: { name: 'Vue', version: 3 }
})

// 直接访问和修改属性
state.count++
state.info.version = 4
```

### ref 和 reactive 的相互作用

1. **ref 在 reactive 对象中的自动解包**：
   ```js
   const count = ref(1)
   const state = reactive({ count })
   
   console.log(state.count) // 1
   state.count = 2
   console.log(count.value) // 2
   ```

2. **reactive 对象赋值给 ref 时也会被自动解包**：
   ```js
   const count = ref(1)
   const obj = reactive({})
   
   obj.count = count
   console.log(obj.count === count.value) // true
   ```

## 进阶用法

### shallowRef 和 shallowReactive

在处理大型数据结构时，深层响应式可能会带来性能开销。Vue 3 提供了浅层响应式 API 来优化这种情况。

#### shallowRef

`shallowRef` 是 `ref` 的浅层作用形式，只有对 `.value` 的访问是响应式的，内部值不会被递归转换为响应式。

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

#### shallowReactive

`shallowReactive` 是 `reactive` 的浅层作用形式，只有根级别的属性是响应式的。

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

### customRef

`customRef` 允许你显式控制依赖追踪和更新触发。

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

示例：创建一个防抖 ref

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

### readonly 和 shallowReadonly

用于创建只读的响应式数据。

#### readonly

```ts
function readonly<T extends object>(
  target: T
): DeepReadonly<UnwrapNestedRefs<T>>
```

示例：

```js
const original = reactive({ count: 0 })
const copy = readonly(original)

// 更改源属性会触发其依赖的侦听器
original.count++

// 更改该只读副本将会失败，并会得到一个警告
copy.count++ // warning!
```

#### shallowReadonly

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

### toRaw 和 markRaw

#### toRaw

获取响应式对象的原始对象。

```ts
function toRaw<T>(proxy: T): T
```

示例：

```js
const foo = {}
const reactiveFoo = reactive(foo)

console.log(toRaw(reactiveFoo) === foo) // true
```

#### markRaw

标记一个对象，使其永远不会转换为代理。

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

### effectScope

创建一个 effect 作用域，可以捕获其中所创建的响应式副作用。

```ts
function effectScope(detached?: boolean): EffectScope

interface EffectScope {
  run<T>(fn: () => T): T | undefined
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

### 响应式调试

Vue 提供了用于调试响应式的 API：

#### onRenderTracked 和 onRenderTriggered

```vue
<script setup>
import { onRenderTracked, onRenderTriggered } from 'vue'

onRenderTracked((event) => {
  debugger
})

onRenderTriggered((event) => {
  debugger
})
</script>
```

## 相关链接

- [Vue 3 响应式系统深入](https://cn.vuejs.org/guide/extras/reactivity-in-depth.html)
- [Vue 3 响应式 API：核心](https://cn.vuejs.org/api/reactivity-core.html)
- [Vue 3 响应式 API：进阶](https://cn.vuejs.org/api/reactivity-advanced.html)
- [Vue 2 响应式原理](https://v2.cn.vuejs.org/v2/guide/reactivity.html)
