# null 和 undefined

## 概述

`null` 与 `undefined` 都表示"无"，含义非常相似。

```js
var a = undefined;
// 或者
var a = null;
```

在 `if` 语句中，它们都会被自动转为 `false`，相等运算符（`==`）甚至直接报告两者相等。

```js
if (!undefined) {
	console.log('undefined is false');
}
// undefined is false

if (!null) {
	console.log('null is false');
}
// null is false

undefined == null;
// true
```

## 历史原因

JavaScript 诞生时，最初像 Java 一样，只设置了 `null` 表示"无"。根据 C 语言的传统，`null` 可以自动转为 `0`。

```js
Number(null); // 0
5 + null; // 5
```

但 JavaScript 的设计者 [Brendan Eich](https://zh.wikipedia.org/wiki/%E5%B8%83%E8%98%AD%E7%99%BB%C2%B7%E8%89%BE%E5%85%8B) 认为这样还不够。他觉得表示"无"的值最好不是对象，而且如果 `null` 自动转为 0，不容易发现错误。

因此，他又设计了一个 `undefined`：

- `null` 是一个表示"空"的对象，转为数值时为 `0`
- `undefined` 是一个表示"此处无定义"的原始值，转为数值时为 `NaN`

```js
Number(undefined); // NaN
5 + undefined; // NaN
```

## 用法和含义

`null` 表示空值，即该处的值现在为空。调用函数时，某个参数未设置任何值，这时可以传入 `null`，表示该参数为空。

`undefined` 表示"未定义"，下面是返回 `undefined` 的典型场景：

```js
// 变量声明了，但没有赋值
var i;
i; // undefined

// 调用函数时，应该提供的参数没有提供，该参数等于 undefined
function f(x) {
	return x;
}
f(); // undefined

// 对象没有赋值的属性
var o = new Object();
o.p; // undefined

// 函数没有返回值时，默认返回 undefined
function f() {}
f(); // undefined
```

[参考: null, undefined 和布尔值 - JavaScript 教程 - 网道](https://wangdoc.com/javascript/types/null-undefined-boolean)
