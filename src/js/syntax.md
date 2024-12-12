# JavaString 语法

## 输出

在了解 JavaString 语法前，应该先了解下 JavaString 的[输出方式](/js/output)，毕竟没有输出，就看不来到效果。

[前往](/js/output)

## 标识符

标识符，顾名思义，就是用于标识的符号，比如变量名，函数名，类名等等。

标识符的命名规则：

-   开头只能由字母，下划线（`_`），美元符（`$`）组成。
-   只能由字母，数字，下划线组成，并且不能以数字开头。
-   字母区分大小写。
-   标识符不能是 JavaString 中的关键字或保留字。

在开发中除了以上的规则，还有一些**约定俗成的命名规范**

1.  **小驼峰命名法（camelCase）：**

    -   第一个单词的首字母小写，后续单词的首字母大写。
    -   例如：`myVariable, calculateTotal, updateUser`

2.  **大驼峰命名法（PascalCase）：**

    -   每个单词的首字母都大写。
    -   例如：`MyClass, CalculateTotal, UpdateUser`

3.  **下划线命名法（Snake_case）：**

    -   所有字母小写，单词之间用下划线分隔。
    -   例如：`my_variable, calculate_total, update_user`

4.  **匈牙利命名法（Hungarian Notation）：**

    -   在变量名前加上表示类型的前缀，如 `strName` 表示字符串，`nCount` 表示整数（这在现代语言中已经不太常见了）。

5.  **常量命名：**

    -   常量通常使用全大写字母，单词之间用下划线分隔。
    -   例如：`MAX_VALUE, PI, DEFAULT_TIMEOUT`

6.  **有意义的命名：**

    -   变量名应该具有描述性，能够清晰地表达变量的用途。
    -   例如：`customerName` 比 `a`、`b`、`c` 更容易理解。

## 字面量和变量

字面量是代码中直接写的值。比如：`1`、`2`、`3`、`true`、`false`、`null`、`NaN`、`"hello"`，这个都是字面量。字面量是不可变的

变量顾名思义，它的值可变的。在 js 中可以使用 `var`、`let`、`const` 关键字来声明变量，它们的[区别](#var、let、const-的区别)。

> JavaString 是一个弱类型的语言，所以在声明变量时不需要指定类型。

变量的声明，使用 var 关键字声明一个变量。

```js
var a;
```

变量的赋值，使用 **=** 为变量赋值。

```js
a = 123;
```

声明和赋值同时进行。

```js
var a = 123;
```

::: warning
使用 `const` 声明常量必须赋值。
:::

## 数据类型

### 类型分类

-   基本类型：`undefined`、`null`、`Boolean`、`Number`、`String`、`Symbol`（ES6 新增）、`BigInt`（ES10 新增）。
-   引用类型：`Object`、`Function`、`Array`、`Date`、`RegExp`、`Error`、`Math` 等。

### 基本类型

-   基本类型存储在栈中，占据空间小、大小固定，属于被频繁使用的数据，所以放入栈中存储以减少内存的开销。
-   基本类型存储的是值，值存在栈中，而栈中的数据是存在在内存中的。
-   基本类型复制时，会创建一个完全独立的变量。

### 引用类型

-   引用类型存储在堆中，占据空间大、大小不固定。引用类型的值是存储在堆中的对象，包含引用类型（数组、函数等）的变量都是保存的堆中的地址，存储在栈中的只是该地址的引用。复制时，复制的是栈中的地址，两个变量指向同一个堆中的对象。
-   引用类型存储的是地址，地址存在栈中，而栈中的数据是存在在内存中的。
-   引用类型复制时，复制的是栈中的地址，两个变量指向同一个堆中的对象。

### 类型判断

-   `typeof` 操作符可以判断基本类型，但是不能判断引用类型。
-   `instanceof` 操作符可以判断引用类型，但是不能判断基本类型。
-   `Object.prototype.toString.call()` 方法可以判断基本类型和引用类型。
-   `Array.isArray()` 方法可以判断数组类型。

**typeof**

`typeof` 操作符可以准确判断以下类型（object 除外）。

-   `bigint`
-   `boolean`
-   `function`
-   `number`
-   `object`
-   `string`
-   `symbol`
-   `undefined`

```js
console.log(typeof 123); // number
console.log(typeof 'Hello,World!'); // string
console.log(typeof true); // boolean
console.log(typeof undefined); // undefined
console.log(typeof null); // object
// typeof 操作符判断 null，会返回 object。
```

**instanceof**

`instanceof` 操作符可以判断引用类型，但是不能判断基本类型。

```js
console.log(123 instanceof Number); // false
console.log('Hello,World!' instanceof String); // false
console.log(true instanceof Boolean); // false
console.log(undefined instanceof Undefined); // false
console.log(null instanceof Null); // false
console.log([] instanceof Array); // true
console.log(function () {} instanceof Function); // true
```

`instanceof` 操作符不仅会检查变量，还会检测原型链。

```js
const date = new Date();

console.log(date instanceof Object); // true
// Data 对象的原型是 Object，所以 date instanceof Object 会返回 true。
```

**Object.prototype.toString.call()**

`Object.prototype.toString.call()` 方法可以判断基本类型和引用类型。

```js
console.log(Object.prototype.toString.call(123)); // [object Number]
console.log(Object.prototype.toString.call('Hello,World!')); // [object String]
console.log(Object.prototype.toString.call(true)); // [object Boolean]
console.log(Object.prototype.toString.call(undefined)); // [object Undefined]
console.log(Object.prototype.toString.call(null)); // [object Null]
console.log(Object.prototype.toString.call([])); // [object Array]
console.log(Object.prototype.toString.call(function () {})); // [object Function]
```

### String

`String` 用于表示一个字符序列，即字符串。字符串需要使用 **单引号**、 **双引号** 或 **反引号**（ES6 加入） 括起来。

转义字符:

| 转义字符 | 含义   | 转义字符 | 含义   |
| -------- | ------ | -------- | ------ |
| \n       | 换行   | \\\\     | 斜杠   |
| \t       | 制表符 | \\'      | 单引号 |
| \b       | 空格   | \\"      | 双引号 |
| \r       | 回车   |          |        |

### Number

Number 类型用来表示整数和浮点数，最常用的功能就是用来表示 10 进制的整数和浮点数。

Number 表示的数字大小是有限的，如果超过了这个范围，则会返回 ±Infinity。

-   最大值：+1.7976931348623157e+308
-   最小值：-1.7976931348623157e+308
-   0 以上的最小值：5e-324

**特殊的数字：**

-   `Infinity`：正无穷
-   `-Infinity`：负无穷
-   `NaN`：非法数字（Not A Number）

**其它的进制：**

-   二进制：0b 开头表示二进制，但是，并不是所有的浏览器都支持
-   八进制：0 开头表示八进制
-   十六进制：0x 开头表示十六进制

> 使用 `typeof` 检查一个 `Number` 类型的数据时（包括 `NaN` 和 `Infinity`），会返回 `"number"`。

### Boolean

布尔型也被称为逻辑值类型或者真假值类型。

布尔型只能够取真（`true`）和假（`false`）两种数值。除此以外， 其它的值都不被支持。

### Undefined

Undefined 类型只有一个值，即特殊的 `undefined`。

在使用 var 声明变量但未对其加以初始化时，这个变量的值就是 `undefined`。

`undefined` 是 `window` 的一个属性，可通过 `window.undefined` 获取。

`undefined` 并不是在关键字、保留字之列，这也意味着可以以`undefined` 作为变量名。这也会导致一个问题，即 `undefined` 可能会被重新赋值。

```js
// 直接对 window.undefined 赋值时无效的
window.undefined = 1; // 无效
undefined = 1; // 无效

console.log(undefined); // undefined

function fn() {
	/* 
		但是为局部变量赋值时，可以顶一个名为 undefined 的变量，
		而在这个局部作用域内 undefined 已经被赋值了
	*/
	let undefined = 2;

	console.log(undefined); // 2
}

fn();
```

### Null

Null 类型是第二个只有一个值的数据类型，这个特殊的值是 `null`。

`undefined` 值实际上是由 `null` 值衍生出来的，所以如果比较 `undefined` 和 `null` 是否相等，会返回 `true`。

### Symbol

Symbol 类型是 ES6 新增的数据类型，它表示独一无二的值。

Symbol 类型的值是通过 Symbol 函数来生成的。

```js
let s1 = Symbol();
let s2 = Symbol(); // 没有参数时，Symbol 函数会返回两个相同的值
let s3 = Symbol('foo');
let s4 = Symbol('foo');

console.log(s1 === s2); // false
```

### BigInt

BigInt 类型是 ES2020 引入的新的数据类型，它允许我们安全地存储和操作大整数，甚至可以超过 JavaScript 中 Number 类型的范围。

BigInt 类型的值是通过 BigInt 函数来生成的。

```js
let bigInt = BigInt(123456789012345678901234567890);
console.log(typeof bigInt); // bigint
```

## 强制类型转换

## var、let、const 的区别

### 作用域

-   `var` 声明的变量是函数作用域（function-scoped），而不是块级作用域（block-scoped）。这意味着`var`声明的变量在整个函数内都是可见的。
-   `let` 和 `const` 声明的变量是块级作用域（block-scoped），在声明它们的块（例如，if 语句、for 循环等）内可见。
-   `var` 全局作用域中会挂载到 `window`上，`var` 在函数作用域中则不会挂载到 `window`上。`let` 和 `const` 在任何作用域中不会挂在到 `window`上

```js
function example() {
	if (true) {
		var x = 10; // 在整个函数内可见
		let y = 20; // 仅在if块内可见
		const z = 30; // 仅在if块内可见
	}

	console.log(x); // 可以访问
	console.log(y); // 错误，y未定义
	console.log(z); // 错误，z未定义
}

// var 的全局作用域和函数作用域
var a = 1;

function example2() {
	console.log(a); // undefined
	console.log(window.a); // 1

	var a = 2;
	console.log(a); // 2
	console.log(window.a); // 1
}

example2();
```

### 变量提升

-   使用 `var` 声明的变量会被提升到函数的顶部，意味着你可以在声明之前访问这个变量（但它的值会是 `undefined` ）。
-   使用 `let` 和 `const` 声明的变量也会被提升，但在会有暂时性死区，也就是声明之前访问会导致 `ReferenceError`。

```js
console.log(a); // undefined
var a = 5;

console.log(b); // ReferenceError: b is not defined
let b = 10;

console.log(c); // ReferenceError: c is not defined
const c = 15;
```

### 重复声明

-   使用 `var` 可以重复声明同一个变量，而不会抛出错误。
-   使用 `let` 和 `const` 在同一个作用域内重复声明同一个变量会导致 `SyntaxError`。
-   `var`、`let` 和 `const` 如果混着用，在同一个作用域中也不能重复声明。

```js
var x = 5;
var x = 10; // 合法

let y = 15;
let y = 20; // 错误

const z = 25;
const z = 30; // 错误
```

### 初始化

-   使用 `var` 声明的变量会被默认初始化为 `undefined`。
-   使用 `let` 和 `const` 声明的变量在声明之前是不可访问的。

```js
console.log(a); // undefined
var a;

console.log(b); // Error: b is not defined
let b;

console.log(c); // Error: c is not defined
const c;
```

### 不可变性

-   使用 `const` 声明的变量是常量，一旦赋值就不能再修改。
-   使用 `let`和`var` 声明的变量是可变的。
-   但是 `const` 声明的常量，之如果是对象/数组等引用类型，可以修改对象内部的属性。

```js
const PI = 3.14;
PI = 3.14159; // 错误，不能重新分配常量
```

在现代 JavaScript 中应该使用 `let` 和 `const`，避免使用`var`，因为 `var` 它具有变量提升和挂载到 `window` 的特性，可能会出现变量冲突等问题。所以更加推荐使用 `let` 和 `const`。

能使用 `const` 就使用 `const`，不行再用 `let`，实在不行才用 `var`。

所以使用的优先级：`const` > `let` > `var`
