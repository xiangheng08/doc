# 数据类型概述

JavaScript 有八种基本数据类型：

-   数值（`number`）：整数和小数（如 `1` 和 `3.14`）
-   字符串（`string`）：文本（如 `Hello World`）
-   布尔值（`boolean`）：`true` 或 `false`
-   `undefined`：表示"未定义"
-   `null`：表示空值
-   `symbol`：ES6 新增，用于创建唯一标识符
-   `BigInt`：ES11 新增，表示任意精度整数
-   对象（`object`）：各种值组成的集合

前七种类型统称为原始类型（primitive type），对象称为合成类型（complex type）。

对象包括：
-   普通对象（object）
-   数组（array）
-   函数（function）

## 判断数据类型

JavaScript 提供了四种判断数据类型的方法：

-   `typeof` 运算符
-   `instanceof` 运算符
-   `Object.prototype.toString` 方法
-   `Array.isArray()` 方法（专门用于判断数组）

### typeof

返回值的数据类型字符串：

```js
typeof 123; // "number"
typeof '123'; // "string"
typeof false; // "boolean"
typeof undefined; // "undefined"
typeof function f() {}; // "function"
typeof {}; // "object"
typeof []; // "object"
typeof null; // "object"
```

注意：`typeof null` 返回 `"object"` 是历史原因导致的。建议用下面的方式判断是否为对象：

```js
if (typeof a === 'object' && a !== null){
  // a 是对象
}
```


`typeof` 可以安全检测未声明的变量：

```js
typeof v; // "undefined"，不会报错
```

### instanceof

判断对象是否为某个构造函数的实例：

```js
const obj = {};
obj instanceof Object; // true

const arr = [];
arr instanceof Array; // true

// 检查原型链
var d = new Date();
d instanceof Date; // true
d instanceof Object; // true
```

`instanceof` 只适用于对象，对原始类型无效：

```js
'hello' instanceof String; // false
```

### Object.prototype.toString

最准确的类型判断方法，返回 `"[object Type]"` 格式：

```js
Object.prototype.toString.call(true); // "[object Boolean]"
Object.prototype.toString.call(1); // "[object Number]"
Object.prototype.toString.call(''); // "[object String]"
Object.prototype.toString.call([]); // "[object Array]"
Object.prototype.toString.call({}); // "[object Object]"
Object.prototype.toString.call(null); // "[object Null]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
```

对于自定义对象，可通过 `[Symbol.toStringTag]` 设置标签：

```js
var o1 = { [Symbol.toStringTag]: 'A' };
Object.prototype.toString.call(o1); // "[object A]"
```

### Array.isArray

专门用于判断数组：

```js
Array.isArray([]); // true
Array.isArray({}); // false
```

[参考：数据类型概述 - JavaScript 教程 - 网道](https://wangdoc.com/javascript/types/general)
