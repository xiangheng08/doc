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

## 属性描述对象

属性描述对象（Property Descriptor）是描述 JavaScript 对象属性特征的内部对象。

### 描述对象的属性

属性描述对象包含以下属性：

- `value` - 属性的值，默认为 `undefined`
- `writable` - 属性值是否可写，默认为 `true`
- `enumerable` - 属性是否可枚举，默认为 `true`
- `configurable` - 属性描述符是否可配置，默认为 `true`
- `get` - 属性的 getter 函数，默认为 `undefined`
- `set` - 属性的 setter 函数，默认为 `undefined`

其中 `value`、`writable` 与 `get`、`set` 是互斥的，不能同时存在。

### Object.defineProperty 详解

[Object.defineProperty()](#Object.defineProperty) 方法允许精确地添加或修改对象上的属性。通过属性描述对象可以控制属性的行为。

```js
const obj = {};

// 定义一个不可写的属性
Object.defineProperty(obj, 'key', {
  value: 'static',
  writable: false,
  enumerable: true,
  configurable: false
});

console.log(obj.key); // "static"
obj.key = 'new value';
console.log(obj.key); // "static" (未改变)

// 定义一个访问器属性
Object.defineProperty(obj, 'computed', {
  get: function() { 
    return this.key + '!';
  },
  set: function(value) {
    this.key = value.replace('!', '');
  },
  enumerable: true,
  configurable: true
});

console.log(obj.computed); // "static!"
obj.computed = 'dynamic!';
console.log(obj.key); // "dynamic"
```

通过使用 [Object.defineProperties()](#Object.defineProperties) 可以同时定义多个属性：

```js
const obj = {};
Object.defineProperties(obj, {
  'property1': {
    value: true,
    writable: true
  },
  'property2': {
    value: 'Hello',
    writable: false
  }
});
```

获取属性描述符可以使用 [Object.getOwnPropertyDescriptor()](#Object.getOwnPropertyDescriptor)：

```js
const obj = { p: 'a' };
const descriptor = Object.getOwnPropertyDescriptor(obj, 'p');
// { value: "a", writable: true, enumerable: true, configurable: true }
```

### 控制对象状态

属性描述符与对象状态控制方法配合使用可以实现更精细的对象控制：

```js
// 创建一个不可扩展的对象
const obj = {};
Object.preventExtensions(obj);
// Object.defineProperty(obj, 'prop', { value: 1 }); // 抛出 TypeError

// 创建一个密封的对象（不可添加/删除属性）
const sealed = { prop: 1 };
Object.seal(sealed);
// Object.defineProperty(sealed, 'prop2', { value: 2 }); // 抛出 TypeError
sealed.prop = 2; // 可以修改现有属性的值

// 创建一个冻结的对象（不可修改）
const frozen = { prop: 1 };
Object.freeze(frozen);
frozen.prop = 2; // 严格模式下会抛出 TypeError
```

