# Vue 2 响应式系统详解

## 什么是响应式？

Vue 最独特的特性之一，是其非侵入性的响应式系统。数据模型仅仅是普通的 JavaScript 对象。而当你修改它们时，视图会进行更新。这使得状态管理非常简单直接，不过理解其工作原理同样重要，这样你可以回避一些常见的陷阱。

## Object.defineProperty 简介

Vue 2 使用 `Object.defineProperty()` 来实现响应式系统。这个方法允许我们精确地添加或修改对象的属性，并可以定义 getter 和 setter 函数来拦截对象属性的访问和修改。

### 基本语法

```javascript
Object.defineProperty(obj, prop, descriptor)
```

参数说明：
- `obj`: 要定义属性的对象
- `prop`: 要定义或修改的属性名称
- `descriptor`: 属性描述符，包含以下可选配置：
  - `value`: 属性的值
  - `writable`: 属性是否可写
  - `enumerable`: 属性是否可枚举
  - `configurable`: 属性是否可配置
  - `get`: 访问属性时调用的函数
  - `set`: 设置属性时调用的函数

### 简单示例

```javascript
let obj = {}
let value = ''

Object.defineProperty(obj, 'name', {
  get() {
    console.log('读取name属性')
    return value
  },
  set(newValue) {
    console.log('设置name属性为:', newValue)
    value = newValue
  }
})

obj.name = 'Vue' // 输出: 设置name属性为: Vue
console.log(obj.name) // 输出: 读取name属性 \n Vue
```

## Vue 2 响应式原理

Vue 2 的响应式系统主要通过以下几个步骤实现：

1. **数据劫持**: Vue 通过 `Object.defineProperty()` 遍历 data 对象的所有属性，并为它们设置 getter 和 setter
2. **依赖收集**: 在模板编译时，会触发属性的 getter，这时会把对应的 Watcher 添加到依赖中
3. **派发更新**: 当数据发生变化时，会触发 setter，通知所有相关的 Watcher 进行更新

### 简化版响应式实现

```javascript
// 简化版响应式实现
function defineReactive(obj, key, val) {
  // 递归处理嵌套对象
  observe(val)
  
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log(`访问属性 ${key}`)
      // 依赖收集逻辑
      return val
    },
    set(newVal) {
      console.log(`修改属性 ${key} 为 ${newVal}`)
      if (newVal === val) return
      val = newVal
      // 递归处理新值
      observe(newVal)
      // 派发更新
      updateView()
    }
  })
}

function observe(value) {
  if (typeof value !== 'object' || value === null) {
    return
  }
  
  Object.keys(value).forEach(key => {
    defineReactive(value, key, value[key])
  })
}

function updateView() {
  console.log('更新视图')
}
```

## 响应式的注意事项

由于 JavaScript 的限制，Vue 无法检测到以下数组和对象的变动：

### 对于对象

Vue 无法检测到对象属性的添加或删除：

```javascript
var vm = new Vue({
  data: {
    a: 1
  }
})

// `vm.a` 现在是响应式的

vm.b = 2
// `vm.b` 不是响应式的
```

对于已经创建的实例，Vue 不允许动态添加根级别的响应式属性。但可以使用 `Vue.set(object, propertyName, value)` 方法向嵌套对象添加响应式属性：

```javascript
// Vue.set(vm.someObject, 'b', 2)
// 或者
// this.$set(this.someObject, 'b', 2)
```

### 对于数组

Vue 无法监听以下数组的变动：

1. 当你利用索引直接设置一个数组项时，例如：`vm.items[indexOfItem] = newValue`
2. 当你修改数组的长度时，例如：`vm.items.length = newLength`

为了解决这些问题，Vue 提供了以下解决方案：

```javascript
// 解决第一种情况
Vue.set(vm.items, indexOfItem, newValue)
// 或者
vm.$set(vm.items, indexOfItem, newValue)
// 或者
vm.items.splice(indexOfItem, 1, newValue)

// 解决第二种情况
vm.items.splice(newLength)
```

## 响应式注意事项

由于 JavaScript 的限制，Vue 无法通过 `Object.defineProperty` 检测到数组索引的变化，也无法检测到对象属性的添加或删除。为了解决这些问题，Vue 对一些常用方法进行了代理，使它们能够触发视图更新。

### 数组

Vue 重写了数组的以下 7 个方法，使它们能够触发视图更新：

1. `push()`
2. `pop()`
3. `shift()`
4. `unshift()`
5. `splice()`
6. `sort()`
7. `reverse()`

这些方法的共同特点是会改变原数组，Vue 通过拦截这些方法的调用来实现响应式更新。

### 对象

除了数组方法，Vue 还提供了全局的 `Vue.set` 和 `Vue.delete` 方法，以及实例上的 `vm.$set` 和 `vm.$delete` 方法来处理对象属性的添加和删除：

1. `Vue.set()` / `vm.$set()` - 向响应式对象中添加属性
2. `Vue.delete()` / `vm.$delete()` - 删除响应式对象中的属性

这些方法确保了当添加或删除对象属性时，也能触发视图更新。

## 总结

Vue 2 的响应式系统是其核心特性，通过 `Object.defineProperty` 实现了数据劫持，使得数据变化能够自动更新视图。虽然这种方式有一些限制，但 Vue 提供了相应的解决方案。在 Vue 3 中，这一机制已经被 Proxy 所替代，解决了 Vue 2 中的一些限制。
