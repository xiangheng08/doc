# Util

## 简介

`util` 模块是 Node.js 的核心模块之一，提供了一组实用工具函数，用于支持 JavaScript 编程中的调试、错误处理、格式化等功能。它包含了常用函数的集合，用于弥补核心 JavaScript 的功能过于精简的不足。

`util` 模块中的功能涵盖了从对象检查、继承到格式化字符串等多个方面。要使用 `util` 模块，只需通过 `require('util')` 引入即可。

```js
const util = require('node:util');
```

## 格式化函数

### `util.format(format[, ...args])` {#util.format}

根据第一个参数，返回一个格式化字符串，类似 `printf` 的格式化输出。传入的第一个参数是一个字符串，其中包含零个或多个占位符，`format` 方法会将其中的每一个占位符被替换为与其对应的值后，输出结果。

支持的占位符有：
- `%s` - 字符串
- `%d` - 数字（整型和浮点型）
- `%i` - 整数
- `%f` - 浮点数
- `%j` - JSON
- `%o` - 对象
- `%O` - 对象
- `%%` - 单独一个百分号('%')，不会占用一个参数

```js
const util = require('node:util');

// 基本用法
console.log(util.format('%s:%s', 'foo', 'bar'));  // 'foo:bar'
console.log(util.format('%d + %d = %d', 1, 2, 3));  // '1 + 2 = 3'
console.log(util.format('JSON: %j', { a: 1 }));  // 'JSON: {"a":1}'

// 如果参数比占位符多，额外的参数会被转换为字符串并用空格分隔
console.log(util.format('%s:%s', 'foo', 'bar', 'baz')); // 'foo:bar baz'

// 如果第一个参数不是格式化字符串，则会在每个参数上调用 util.inspect() 并用空格分隔
console.log(util.format(1, 2, 3)); // '1 2 3'
```

### `util.formatWithOptions(inspectOptions, format[, ...args])` {#util.formatWithOptions}

与 [util.format()](#util.format) 相同，但接受一个 `inspectOptions` 参数，可以影响格式化结果。

```js
const util = require('node:util');

console.log(util.formatWithOptions({ colors: true }, 'See object %O', { foo: 42 }));
// 根据终端支持情况输出带颜色的对象
```

## 对象检查

### `util.inspect(object[, options])` {#util.inspect}

将对象转换为字符串，通常用于调试。这对于检查对象的内容非常有用。

```js
const util = require('node:util');

// 基本用法
const obj = { name: 'Alice', age: 25 };
console.log(util.inspect(obj));
// 输出: { name: 'Alice', age: 25 }

// 带选项的用法
console.log(util.inspect(obj, { colors: true, depth: null }));
// 输出带颜色的对象，显示所有嵌套层级

// 循环引用处理
const obj1 = { a: 1 };
const obj2 = { b: 2 };
obj1.obj2 = obj2;
obj2.obj1 = obj1;
console.log(util.inspect(obj1));
// 输出: { a: 1, obj2: { b: 2, obj1: [Circular] } }
```

可选的 `options` 参数包括：
- `showHidden` - 显示对象的不可枚举属性和 Symbol 属性
- `depth` - 指定格式化对象时递归的次数
- `colors` - 为输出样式添加 ANSI 颜色代码
- `customInspect` - 如果为 false，则禁用自定义 inspect 函数
- `showProxy` - 显示 Proxy 对象及其目标和处理函数
- `maxArrayLength` - 指定格式化数组和 TypedArray 时的最大元素数量
- `breakLength` - 对象键值对之间插入换行符的长度
- `compact` - 设置为 false 会使输出更宽泛
- `sorted` - 设置为 true 会排序对象的属性

### `util.inspect.custom` {#util.inspect.custom}

一个 Symbol，可被用于声明自定义的 inspect 函数。

```js
const util = require('node:util');

class Box {
  constructor(value) {
    this.value = value;
  }
  
  [util.inspect.custom](depth, opts) {
    return `Box[${this.value}]`;
  }
}

const box = new Box('secret');
console.log(util.inspect(box)); // 'Box[secret]'
```

### `util.inspect.defaultOptions` {#util.inspect.defaultOptions}

`util.inspect()` 的默认选项值可以在这里修改。

```js
const util = require('node:util');

// 修改默认选项
util.inspect.defaultOptions.depth = null;
util.inspect.defaultOptions.colors = true;
```

## 异步操作工具

### `util.promisify(original)` {#util.promisify}

将使用回调风格的函数（通常是 Node.js 标准库的函数）转换为返回 Promise 的函数。

```js
const util = require('node:util');
const fs = require('node:fs');

// 将 fs.readFile 转换为返回 Promise 的函数
const readFilePromise = util.promisify(fs.readFile);

readFilePromise('example.txt', 'utf8')
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error(err);
  });

// 也可以直接使用 async/await
async function readExample() {
  try {
    const data = await readFilePromise('example.txt', 'utf8');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
```

### `util.promisify.custom` {#util.promisify.custom}

可以为函数定义自定义的 promisified 版本。

```js
const util = require('node:util');

function doSomethingAsync(a, b, callback) {
  // 执行异步操作
  setTimeout(() => {
    callback(null, a + b);
  }, 100);
}

doSomethingAsync[util.promisify.custom] = function(a, b) {
  return new Promise((resolve, reject) => {
    doSomethingAsync(a, b, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

const promisified = util.promisify(doSomethingAsync);

promisified(1, 2).then(result => {
  console.log(result); // 3
});
```

### `util.callbackify(original)` {#util.callbackify}

将返回 Promise 的异步函数转换为回调风格的函数。

```js
const util = require('node:util');

async function asyncFn(value) {
  return value * 2;
}

const callbackFn = util.callbackify(asyncFn);

callbackFn(4, (err, result) => {
  if (err) throw err;
  console.log(result); // 8
});
```

## 类型检查

`util.types` 提供了对对象类型的检查方法。

### 基本类型检查 {#basic-type-checking}

```js
const util = require('node:util');

// 检查基本类型
console.log(util.types.isDate(new Date())); // true
console.log(util.types.isRegExp(/abc/)); // true
console.log(util.types.isNativeError(new Error())); // true
console.log(util.types.isPromise(Promise.resolve())); // true

// 检查数组相关类型
console.log(util.types.isArrayBuffer(new ArrayBuffer())); // true
console.log(util.types.isTypedArray(new Uint8Array())); // true
console.log(util.types.isInt8Array(new Int8Array())); // true
console.log(util.types.isUint8Array(new Uint8Array())); // true
console.log(util.types.isFloat32Array(new Float32Array())); // true
```

### 对象类型检查

```js
const util = require('node:util');
const { EventEmitter } = require('node:events');

// 检查对象类型
console.log(util.types.isNativeError(new TypeError())); // true
console.log(util.types.isBoxedPrimitive(new Number(42))); // true
console.log(util.types.isBoxedPrimitive(new String('abc'))); // true
console.log(util.types.isProxy(new Proxy({}, {}))); // true

// 检查函数类型
console.log(util.types.isAsyncFunction(async () => {})); // true
console.log(util.types.isGeneratorFunction(function* () {})); // true
console.log(util.types.isGeneratorObject((function* () {})())); // true
```

## 继承相关

### `util.inherits(constructor, superConstructor)` {#util.inherits}

实现对象间原型继承的函数。注意：在新代码中已不推荐使用，建议使用 ES6 的 `class` 和 `extends`。

```js
const util = require('node:util');
const EventEmitter = require('node:events');

// 不推荐的用法
function MyStream() {
  EventEmitter.call(this);
}

util.inherits(MyStream, EventEmitter);

MyStream.prototype.write = function(data) {
  this.emit('data', data);
};

// 推荐的 ES6 用法
class MyStreamES6 extends EventEmitter {
  write(data) {
    this.emit('data', data);
  }
}
```

## 调试工具

### `util.debuglog(section)` {#util.debuglog}

用来创建一个条件写入到 stderr 的函数，基于 `NODE_DEBUG` 环境变量。

```js
const util = require('node:util');

// 创建调试日志函数
const debuglog = util.debuglog('foo');

debuglog('hello from foo [%d]', 123);

// 运行时设置 NODE_DEBUG=foo node script.js
// 将会输出: FOO 3245: hello from foo [123]
```

### `util.debug(section)` {#util.debug}

已废弃，使用 [util.debuglog()](#util.debuglog) 代替。

## 文本解码

### `util.TextDecoder` {#util.TextDecoder}

WHATWG 的 TextDecoder 类的实现。用于解码 TypedArray 实例为字符串。

```js
const util = require('node:util');

const decoder = new util.TextDecoder('utf-8');
const text = decoder.decode(new Uint8Array([72, 101, 108, 108, 111]));
console.log(text); // 'Hello'
```

### `util.TextEncoder` {#util.TextEncoder}

WHATWG 的 TextEncoder 类的实现。用于将字符串编码为 Uint8Array 实例。

```js
const util = require('node:util');

const encoder = new util.TextEncoder();
const uint8array = encoder.encode('Hello');
console.log(uint8array); // Uint8Array [72, 101, 108, 108, 111]
```

## 实际应用示例

### 对象深度检查工具

```js
const util = require('node:util');

function deepInspect(obj, options = {}) {
  const defaultOptions = {
    depth: null,
    colors: true,
    showHidden: false,
    compact: false
  };
  
  const inspectOptions = { ...defaultOptions, ...options };
  return util.inspect(obj, inspectOptions);
}

// 使用示例
const complexObj = {
  name: 'example',
  data: {
    numbers: [1, 2, 3],
    nested: {
      value: 'deep'
    }
  },
  func: function() { return 'test'; }
};

console.log(deepInspect(complexObj));
```

### 自定义 Promise 化函数

```js
const util = require('node:util');

// 为不支持 Promise 化的函数创建 Promise 版本
function timeout(ms, callback) {
  setTimeout(() => {
    callback(null, `等待了 ${ms} 毫秒`);
  }, ms);
}

// 添加自定义 Promise 化支持
timeout[util.promisify.custom] = function(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`等待了 ${ms} 毫秒`);
    }, ms);
  });
};

const timeoutPromise = util.promisify(timeout);

// 使用回调版本
timeout(1000, (err, result) => {
  console.log('回调版本:', result);
});

// 使用 Promise 版本
timeoutPromise(1000).then(result => {
  console.log('Promise 版本:', result);
});

// 使用 async/await
async function asyncExample() {
  const result = await timeoutPromise(1000);
  console.log('async/await 版本:', result);
}

asyncExample();
```

### 类型检查工具

```js
const util = require('node:util');

function getType(value) {
  // 基本类型检查
  if (value === null) return 'null';
  if (value === undefined) return 'undefined';
  
  // 使用 util.types 进行详细检查
  if (util.types.isDate(value)) return 'Date';
  if (util.types.isRegExp(value)) return 'RegExp';
  if (util.types.isPromise(value)) return 'Promise';
  if (util.types.isArrayBuffer(value)) return 'ArrayBuffer';
  if (util.types.isTypedArray(value)) return 'TypedArray';
  if (util.types.isNativeError(value)) return 'Error';
  
  // 基本类型
  return typeof value;
}

// 使用示例
console.log(getType(new Date())); // 'Date'
console.log(getType(/abc/)); // 'RegExp'
console.log(getType(Promise.resolve())); // 'Promise'
console.log(getType(new ArrayBuffer(8))); // 'ArrayBuffer'
console.log(getType(new Uint8Array())); // 'TypedArray'
```

## 最佳实践

1. **使用 ES6 类继承**：对于新代码，推荐使用 ES6 的 `class` 和 `extends`，而不是 [util.inherits()](#util.inherits)
2. **合理使用 inspect 选项**：
   ```js
   // 在生产环境中避免深度检查大对象
   if (process.env.NODE_ENV === 'development') {
     console.log(util.inspect(largeObject, { depth: null, colors: true }));
   }
   ```
3. **正确使用 promisify**：
   ```js
   // 对于 Node.js 内置模块，promisify 很有用
   const fs = require('node:fs');
   const { promisify } = require('node:util');
   
   const readFile = promisify(fs.readFile);
   const writeFile = promisify(fs.writeFile);
   ```
4. **调试日志的使用**：
   ```js
   // 使用 debuglog 进行条件调试
   const debug = util.debuglog('my-module');
   
   function processData(data) {
     debug('Processing data: %o', data);
     // 处理逻辑
   }
   
   // 通过 NODE_DEBUG=my-module 启用调试
   ```

## 注意事项

1. **性能考虑**：[util.inspect()](#util.inspect) 对于大型对象可能较慢，应谨慎使用
2. **废弃的 API**：注意避免使用已废弃的 API，如 [util.debug()](#util.debug)
3. **继承方式**：推荐使用 ES6 的类继承而不是 [util.inherits()](#util.inherits)
4. **类型检查**：对于复杂的类型检查，`util.types` 提供了比 `typeof` 更准确的方法
## 相关链接 {#related-links}

- [Node.js Util 官方文档](https://nodejs.org/api/util.html)
- [Events](./events.md)
- [Buffer](./buffer.md)
