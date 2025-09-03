# 响应式: 工具

## isRef()

检查某个值是否为 ref。

```ts
function isRef<T>(r: Ref<T> | unknown): r is Ref<T>
```

## unref()

如果参数是 ref，则返回内部值，否则返回参数本身。这是 `val = isRef(val) ? val.value : val` 计算的一个语法糖。

```ts
function unref<T>(ref: T | Ref<T>): T
```

## toRef() <Badge type="tip" text="3.3+" />

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

## toValue()

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

## toRefs()

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

## isProxy()

检查一个对象是否是由 [reactive()](#reactive)、[readonly()](#readonly)、[shallowReactive()](#shallowreactive) 或 [shallowReadonly()](#shallowreadonly) 创建的代理。

```ts
function isProxy(value: any): boolean
```

## isReactive()

检查一个对象是否是由 [reactive()](#reactive) 或 [shallowReactive()](#shallowreactive) 创建的代理。

```ts
function isReactive(value: unknown): boolean
```

## isReadonly()

检查传入的值是否为只读对象。只读对象的属性可以更改，但他们不能通过传入的对象直接赋值。

通过 [readonly()](#readonly) 和 [shallowReadonly()](#shallowreadonly) 创建的代理都是只读的，类似于没有 set 函数的 [computed()](#computed) ref。

```ts
function isReadonly(value: unknown): boolean
```
