# 数据类型概述

JavaScript 语言的每一个值，都属于某一种数据类型。JavaScript 的基本数据类型，共有八种（包括 ES6 的 Symbol，和 ES11 的 BigInt）。

-   数值（`number`）：整数和小数（比如 `1` 和 `3.14`）。
-   字符串（`string`）：文本（比如 `Hello World`）。
-   布尔值（`boolean`）：表示真伪的两个特殊值，即 `true`（真）和 `false`（假）。
-   `undefined`：表示“未定义”或不存在，即由于目前没有定义，所以此处暂时没有任何值。
-   `null`：表示空值，即此处的值为空。
-   `symbol`： 用于创建唯一的标识符，不会与其他任何值相等。
-   `BigInt`: 表示任意精度整数的数据类型。
-   对象（`object`）：各种值组成的集合。

通常，数值、字符串、布尔值这三种类型，合称为原始类型（primitive type）的值，即它们是最基本的数据类型，不能再细分了。对象则称为合成类型（complex type）的值，因为一个对象往往是多个原始类型的值的合成，可以看作是一个存放各种值的容器。至于 `undefined` 和 `null`，一般将它们看成两个特殊值。

对象是最复杂的数据类型，又可以分成三个子类型。

-   狭义的对象（object）
-   数组（array）
-   函数（function）

数组个函数都是在对象的基础上发展起来的，所以有时会简单地把它们归为一类，即“数组和函数都是对象”。

## 判断数据类型

JavaScript 有三种方法，可以确定一个值到底是什么类型。

-   `typeof` 运算符
-   `instanceof` 运算符
-   `Object.prototype.toString` 方法

除了以上方法还有一个 `Array.isArray` 方法，用来判断一个值是否为数组。

### typeof

typeof 运算符可以返回一个值的数据类型。

数值、字符串、布尔值分别返回`number`、`string`、`boolean`。

```js
typeof 123; // "number"
typeof '123'; // "string"
typeof false; // "boolean"
```

函数返回`function`。

```js
function f() {}
typeof f;
// "function"
```

`undefined`返回`undefined`。

```js
typeof undefined;
// "undefined"
```

利用这一点，`typeof`可以用来检查一个没有声明的变量，而不报错。

```js
v;
// ReferenceError: v is not defined

typeof v;
// "undefined"
```

上面代码中，变量`v`没有用`var`命令声明，直接使用就会报错。但是，放在`typeof`后面，就不报错了，而是返回`undefined`。

实际编程中，这个特点通常用在判断语句。

```js
// 错误的写法
if (v) {
	// ...
}
// ReferenceError: v is not defined

// 正确的写法
if (typeof v === 'undefined') {
	// ...
}
```

对象返回`object`。

```js
typeof window; // "object"
typeof {}; // "object"
typeof []; // "object"
```

上面代码中，空数组（`[]`）的类型也是`object`，这表示在 JavaScript 内部，数组本质上只是一种特殊的对象。

`null`返回`object`。

```js
typeof null; // "object"
```

`null`的类型是`object`，这是由于历史原因造成的。1995 年的 JavaScript 语言第一版，只设计了五种数据类型（对象、整数、浮点数、字符串和布尔值），没考虑`null`，只把它当作`object`的一种特殊值。后来`null`独立出来，作为一种单独的数据类型，为了兼容以前的代码，`typeof null`返回`object`就没法改变了。

typeof 的返回值如下

-   `bigint`
-   `boolean`
-   `function`
-   `number`
-   `object`
-   `string`
-   `symbol`
-   `undefined`

### instanceof

`instanceof` 运算符返回一个布尔值，表示对象是否为某个构造函数的实例。

```js
const obj = {};
obj instanceof Object; // true

const arr = [];
arr instanceof Array; // true
```

`instanceof` 运算符的左边是实例对象，右边是构造函数。它会检查右边构造函数的原型对象（prototype），是否在左边对象的原型链上。因此，下面两种写法是等价的。

```js
v instanceof Object;
// 等同于
Object.prototype.isPrototypeOf(v);
```

上面代码中，`Object` 是对象 `v` 的构造函数，它的原型对象是 `Object.prototype.isPrototypeOf()` 方法是 JavaScript 提供的原生方法，用于检查某个对象是否为另一个对象的原型，详细解释见后文。

由于 `instanceof` 检查整个原型链，因此同一个实例对象，可能会对多个构造函数都返回 `true`。

```js
var d = new Date();
d instanceof Date; // true
d instanceof Object; // true
```

上面代码中，`d` 同时是 `Date` 和 `Object` 的实例，因此对这两个构造函数都返回 `true`。

由于任意对象（除了 `null`）都是 `Object` 的实例，所以 `instanceof` 运算符可以判断一个值是否为非 `null` 的对象。

```js
var obj = { foo: 123 };
obj instanceof Object; // true

null instanceof Object; // false
```

上面代码中，除了 `null`，其他对象的 `instanceOf Object` 的运算结果都是 `true`。

`instanceof` 的原理是检查右边构造函数的 `prototype` 属性，是否在左边对象的原型链上。有一种特殊情况，就是左边对象的原型链上，只有 `null` 对象。这时，`instanceof` 判断会失真。

```js
var obj = Object.create(null);
typeof obj; // "object"
obj instanceof Object; // false
```

上面代码中，`Object.create(null)` 返回一个新对象 `obj`，它的原型是 `null`（`Object.create()`的详细介绍见后文）。右边的构造函数 `Object` 的 `prototype` 属性，不在左边的原型链上，因此 `instanceof` 就认为 `obj` 不是 `Object` 的实例。这是唯一的 `instanceof` 运算符判断会失真的情况（一个对象的原型是 `null`）。

`instanceof` 运算符的一个用处，是判断值的类型。

```js
var x = [1, 2, 3];
var y = {};
x instanceof Array; // true
y instanceof Object; // true
```

上面代码中，`instanceof` 运算符判断，变量 x 是数组，变量 y 是对象。

注意，`instanceof` 运算符只能用于对象，不适用原始类型的值。

```js
var s = 'hello';
s instanceof String; // false
```

上面代码中，字符串不是 `String` 对象的实例（因为字符串不是对象），所以返回 `false`。

此外，对于 `undefined` 和 `null`，`instanceof` 运算符总是返回 `false`。

```js
undefined instanceof Object; // false
null instanceof Object; // false
```

利用 `instanceof` 运算符，还可以巧妙地解决，调用构造函数时，忘了加 `new` 命令的问题。

```js
function Fubar(foo, bar) {
	if (this instanceof Fubar) {
		this._foo = foo;
		this._bar = bar;
	} else {
		return new Fubar(foo, bar);
	}
}
```

上面代码使用 `instanceof` 运算符，在函数体内部判断 `this` 关键字是否为构造函数 `Fubar` 的实例。如果不是，就表明忘了加 `new` 命令。

### Object.prototype.toString

`Object.prototype.toString()` 方法几乎可以判断所有的数据类型，`Object.prototype.toString()` 会返回一个形如 `"[object XXX]"` 的字符串。

如果对象的 `toString()` 方法未被重写，就会返回如上面形式的字符串。

```js
({}).toString(); // => "[object Object]"
Math.toString(); // => "[object Math]"
```

但是，大多数对象，`toString()` 方法都是重写了的，这时，需要用 `call()` 或 `Reflect.apply()` 等方法来调用。

```js
var x = {
	toString() {
		return 'X';
	},
};

x.toString(); // X

Object.prototype.toString.call(x); // [object Object]

Reflect.apply(Object.prototype.toString, x, []); // [object Object]
```

对于 `Object.prototype.toString.call(arg)`，若参数为 `null` 或 `undefined`，直接返回结果。

```js
Object.prototype.toString.call(null); // [object Null]

Object.prototype.toString.call(undefined); // [object Undefined]
```

若参数不为`null`或`undefined`，则将参数转为对象，再作判断。对于原始类型，转为对象的方法即装箱，此处不赘述。

转为对象后，取得该对象的 `[Symbol.toStringTag]` 属性值（可能会遍历原型链）作为 `tag`，如无该属性，或该属性值不为字符串类型，则依下表取得 `tag`, 然后返回 `"[object " + tag + "]"` 形式的字符串。

```js
Object.prototype.toString.call(true); // [object Boolean]

Object.prototype.toString.call(1); // [object Number]

Object.prototype.toString.call(''); // [object String]

Object.prototype.toString.call([]); // [object Array]

Object.prototype.toString.call(
	(function () {
		return arguments;
	})()
); // [object Arguments]

Object.prototype.toString.call(function () {}); // [object Function]

Object.prototype.toString.call(new Error()); // [object Error]

Object.prototype.toString.call(/\d+/); // [object RegExp]

Object.prototype.toString.call(new Date()); // [object Date]

Object.prototype.toString.call(new (class {})()); // [object Object]
```

下面为部署了 `Symbol.toStringTag` 的例子。可以看出，属性值期望是一个字符串，否则会被忽略。

```js
var o1 = { [Symbol.toStringTag]: 'A' };
var o2 = { [Symbol.toStringTag]: null };

Object.prototype.toString.call(o1); // => "[object A]"
Object.prototype.toString.call(o2); // => "[object Object]"
```

`Symbol.toStringTag` 也可以部署在原型链上：

```js
class A {}
A.prototype[Symbol.toStringTag] = 'A';
Object.prototype.toString.call(new A()); // => "[object A]"
```

新标准引入了 `[Symbol.toStringTag]` 属性，是为了把此方法接口化，用于规范新引入的对象对此方法的调用。但对于“老旧”的对象，就只能直接输出值，以保证兼容性。

### Array.isArray

`Array.isArray` 用于确定传递的值是否是一个 `Array`。

```js
Array.isArray([]); // true
Array.isArray({}); // false
```

[参考：数据类型概述 - JavaScript 教程 - 网道](https://wangdoc.com/javascript/types/general)
