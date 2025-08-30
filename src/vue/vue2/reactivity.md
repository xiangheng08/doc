# 响应式

Vue 2 使用 `Object.defineProperty` 来实现数据的响应式系统。这是 Vue 2 最核心的特性之一，它使得数据和视图能够保持同步。

## Object.defineProperty 简介

`Object.defineProperty()` 是 ES5 中的方法，它允许我们精确地添加或修改对象的属性，并可以控制属性的特性。

```js
Object.defineProperty(obj, prop, descriptor)
```

参数说明：
- `obj`: 要定义属性的对象
- `prop`: 要定义或修改的属性名称
- `descriptor`: 属性描述符对象

属性描述符包含以下可选键值：
- `value`: 属性的值
- `writable`: 属性是否可写
- `enumerable`: 属性是否可枚举
- `configurable`: 属性是否可配置
- `get`: 属性的 getter 函数
- `set`: 属性的 setter 函数

示例：

```js
let obj = {};
Object.defineProperty(obj, 'name', {
  value: 'Vue',
  writable: true,
  enumerable: true,
  configurable: true
});
console.log(obj.name); // Vue
```

## Vue 2 响应式原理

Vue 2 的响应式系统主要依赖于 `Object.defineProperty` 的 `getter` 和 `setter`：

1. **数据劫持**: 当我们把一个普通的 JavaScript 对象传给 Vue 实例的 `data` 选项时，Vue 会遍历此对象所有的属性，并使用 `Object.defineProperty` 把这些属性全部转为 getter/setter。

2. **依赖收集**: 每个组件实例都有相应的 watcher 实例对象，它会在组件渲染的过程中把属性记录为依赖。

3. **派发更新**: 当依赖项的 setter 被调用时，会通知 watcher 重新计算，从而使它关联的组件得以更新。

简单示例：

```js
// 简化的响应式实现
function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get() {
      console.log(`读取属性 ${key}`);
      return val;
    },
    set(newVal) {
      if (newVal === val) return;
      console.log(`设置属性 ${key} 为 ${newVal}`);
      val = newVal;
    }
  });
}

let data = { message: 'Hello Vue!' };
defineReactive(data, 'message', data.message);

console.log(data.message); // 读取属性 message, Hello Vue!
data.message = 'Hello World!'; // 设置属性 message 为 Hello World!
```

## 响应式的注意事项

由于 JavaScript 的限制，Vue 不能检测以下变动：

### 对象属性的添加或删除

Vue 无法检测到对象属性的添加或删除：

```js
var vm = new Vue({
  data: {
    a: 1
  }
});

// vm.a 是响应式的

vm.b = 2;
// vm.b 是非响应式的
// 解决方法是使用 Vue.set 或 vm.$set
vm.$set(vm, 'b', 2);

delete vm.a;
// delete vm.a 是非响应式的
// 解决方法是使用 Vue.delete 或 vm.$delete
vm.$delete(vm, 'a');
```

### 数组索引的直接设置

Vue 不能检测以下数组的变动：

```js
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c']
  }
});

vm.items[1] = 'x'; // 不是响应性的
vm.items.length = 2; // 不是响应性的
```

解决方法是使用 Vue 包装过的数组方法：

```js
Vue.set(vm.items, indexOfItem, newValue);
vm.items.splice(indexOfItem, 1, newValue);
vm.items.splice(newLength);
```

## 总结

Vue 2 的响应式系统是其核心特性，通过 `Object.defineProperty` 实现了数据劫持，使得数据变化能够自动更新视图。虽然这种方式有一些限制，但 Vue 提供了相应的解决方案。在 Vue 3 中，这一机制已经被 Proxy 所替代，解决了 Vue 2 中的一些限制。
