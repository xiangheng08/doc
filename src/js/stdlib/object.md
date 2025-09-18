# Object

JavaScript 中几乎所有对象都继承自 Object，是所有对象的基类。

## `Object()` {#Object.constructor}

将输入值转换为对象。

```js
// 基本类型转换为对象
Object(1); // Number {1}
Object('foo'); // String {'foo'}
Object(true); // Boolean {true}

// null/undefined 转换为空对象
Object(null); // {}
Object(undefined); // {}

// 对象保持不变
const obj = {};
Object(obj) === obj; // true
```

## 静态方法 {#static-methods}

### `Object.assign(target, ...sources)` {#Object.assign}

将源对象的所有可枚举属性复制到目标对象。

```js
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };
Object.assign(target, source); 
// target: { a: 1, b: 4, c: 5 }
```

### `Object.create(proto, propertiesObject)` {#Object.create}

使用指定的原型对象和属性创建新对象。

```js
const person = { isHuman: false };
const me = Object.create(person);
me.isHuman = true;

// 创建无原型对象
const obj = Object.create(null);
```

### `Object.defineProperty(obj, prop, descriptor)` {#Object.defineProperty}

定义对象属性及其描述符。[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

```js
const obj = {};
Object.defineProperty(obj, 'key', {
  value: 'static',
  writable: false, // 不可修改
  enumerable: true, // 可枚举
  configurable: false // 不可配置
});
```

### `Object.defineProperties(obj, props)` {#Object.defineProperties}

定义多个属性。

```js
Object.defineProperties(obj, {
  property1: { value: true, writable: true },
  property2: { value: 'Hello', writable: false }
});
```

### `Object.entries(obj)` {#Object.entries}

返回对象键值对数组。

```js
const obj = { foo: 'bar', baz: 42 };
Object.entries(obj); // [ ['foo', 'bar'], ['baz', 42] ]
```

### `Object.freeze(obj)` {#Object.freeze}

冻结对象，防止修改。

```js
const obj = { prop: 42 };
Object.freeze(obj);
obj.prop = 77; // 严格模式下会报错
```

### `Object.fromEntries(iterable)` {#Object.fromEntries}

将键值对数组转换为对象。

```js
const entries = new Map([['foo', 'bar'], ['baz', 42]]);
Object.fromEntries(entries); // { foo: 'bar', baz: 42 }
```

### `Object.getOwnPropertyDescriptor(obj, prop)` {#Object.getOwnPropertyDescriptor}

获取属性描述符。

```js
const obj = { bar: 42 };
Object.getOwnPropertyDescriptor(obj, 'bar');
// { value: 42, writable: true, enumerable: true, configurable: true }
```

### `Object.getOwnPropertyDescriptors(obj)` {#Object.getOwnPropertyDescriptors}

获取所有属性描述符。

```js
const obj = { foo: 1, bar: 2 };
Object.getOwnPropertyDescriptors(obj);
```

### `Object.getOwnPropertyNames(obj)` {#Object.getOwnPropertyNames}

返回对象所有自有属性名（包括不可枚举属性）。

```js
const arr = ['a', 'b', 'c'];
Object.getOwnPropertyNames(arr); // ['0', '1', '2', 'length']
```

### `Object.getOwnPropertySymbols(obj)` {#Object.getOwnPropertySymbols}

返回对象所有 Symbol 属性。

```js
const obj = {};
const sym = Symbol('foo');
obj[sym] = 'bar';
Object.getOwnPropertySymbols(obj); // [Symbol(foo)]
```

### `Object.getPrototypeOf(obj)` {#Object.getPrototypeOf}

获取对象原型。

```js
const proto = {};
const obj = Object.create(proto);
Object.getPrototypeOf(obj) === proto; // true
```

### `Object.hasOwn(obj, prop)` {#Object.hasOwn}

检查对象是否有指定自有属性（ES2022）。

```js
const obj = { prop: 'exists' };
Object.hasOwn(obj, 'prop'); // true
Object.hasOwn(obj, 'toString'); // false
```

### `Object.is(value1, value2)` {#Object.is}

比较两个值是否严格相等。

```js
Object.is('foo', 'foo'); // true
Object.is(0, -0); // false
Object.is(NaN, NaN); // true
```

### `Object.keys(obj)` {#Object.keys}

返回对象所有可枚举自有属性名。

```js
const obj = { 0: 'a', 1: 'b', 2: 'c' };
Object.keys(obj); // ['0', '1', '2']
```

### `Object.preventExtensions(obj)` {#Object.preventExtensions}

防止对象扩展。

```js
const obj = {};
Object.preventExtensions(obj);
obj.property1 = 42; // 非严格模式下静默失败
```

### `Object.seal(obj)` {#Object.seal}

密封对象，防止添加或删除属性。

```js
const obj = { prop: 42 };
Object.seal(obj);
obj.prop = 37; // 可以修改
obj.newProp = 10; // 严格模式下报错
```

### `Object.setPrototypeOf(obj, prototype)` {#Object.setPrototypeOf}

设置对象原型。

```js
const obj = {};
const proto = { foo: 'bar' };
Object.setPrototypeOf(obj, proto);
obj.foo; // 'bar'
```

### `Object.values(obj)` {#Object.values}

返回对象所有可枚举属性值。

```js
const obj = { foo: 'bar', baz: 42 };
Object.values(obj); // ['bar', 42]
```

## 实例方法 {#instance-methods}

### `Object.prototype.hasOwnProperty(prop)` {#Object.prototype.hasOwnProperty}

检查对象是否有指定自有属性。

```js
const obj = { prop: 'exists' };
obj.hasOwnProperty('prop'); // true
obj.hasOwnProperty('toString'); // false
```

### `Object.prototype.isPrototypeOf(obj)` {#Object.prototype.isPrototypeOf}

检查对象是否在另一个对象的原型链上。

```js
const proto = {};
const obj = Object.create(proto);
proto.isPrototypeOf(obj); // true
```

### `Object.prototype.propertyIsEnumerable(prop)` {#Object.prototype.propertyIsEnumerable}

检查属性是否可枚举。

```js
const arr = [];
arr.propertyIsEnumerable('length'); // false
arr.propertyIsEnumerable(0); // true
```

### `Object.prototype.toString()` {#Object.prototype.toString}

返回对象的字符串表示。

```js
const obj = {};
obj.toString(); // '[object Object]'

// 类型检测
Object.prototype.toString.call([]); // '[object Array]'
Object.prototype.toString.call(null); // '[object Null]'
```

### `Object.prototype.valueOf()` {#Object.prototype.valueOf}

返回对象的原始值。

```js
const obj = new Number(123);
obj.valueOf(); // 123
```
