# 函数

函数是一段可以反复调用的代码块，能接受参数并返回值。

## 概述

### 函数声明方式

JavaScript 有三种声明函数的方法：

1. **function 命令**
```js
function print(s) {
  console.log(s);
}
```

2. **函数表达式**
```js
var print = function (s) {
  console.log(s);
};
```

3. **Function 构造函数**
```js
var add = new Function('x', 'y', 'return x + y');
```

### 函数调用与返回值

使用圆括号调用函数，通过 `return` 语句返回值：

```js
function add(x, y) {
  return x + y;
}

add(1, 1); // 2
```

函数可以调用自身，形成递归：

```js
function fib(num) {
  if (num === 0) return 0;
  if (num === 1) return 1;
  return fib(num - 2) + fib(num - 1);
}

fib(6); // 8
```

### 第一等公民

JavaScript 中函数是第一等公民，可以赋值给变量、作为参数传递、作为返回值：

```js
function add(x, y) {
  return x + y;
}

// 赋值给变量
var operator = add;

// 作为参数和返回值
function a(op) {
  return op;
}
a(add)(1, 1); // 2
```

### 函数提升

使用 `function` 命令声明的函数会被提升到代码头部：

```js
f(); // 正常执行

function f() {}
```

函数表达式不会提升：

```js
f(); // TypeError: undefined is not a function
var f = function () {};
```

## 函数属性和方法

### name 属性

返回函数的名字：

```js
function f1() {}
f1.name; // "f1"

var f2 = function () {};
f2.name; // "f2"
```

### length 属性

返回函数预期传入的参数个数：

```js
function f(a, b) {}
f.length; // 2
```

### toString()

返回函数的源码：

```js
function f() {
  a();
  b();
}

f.toString();
// function f() {
//  a();
//  b();
// }
```

## 函数作用域

JavaScript 有两种作用域：全局作用域和函数作用域。

```js
var v = 1; // 全局变量

function f() {
  var v = 2; // 局部变量
  console.log(v);
}

f(); // 2
console.log(v); // 1
```

函数执行时的作用域是其定义时的作用域，不是调用时的作用域：

```js
var a = 1;
var x = function () {
  console.log(a);
};

function f() {
  var a = 2;
  x();
}

f(); // 1
```

## 参数

### 参数传递

函数参数不是必需的，JavaScript 允许省略参数：

```js
function f(a, b) {
  return a;
}

f(1, 2, 3); // 1
f(1); // 1
f(); // undefined
```

参数传递方式：
- 原始类型：传值传递
- 复合类型：传址传递

```js
// 传值传递
var p = 2;
function f(p) {
  p = 3;
}
f(p);
p; // 2

// 传址传递
var obj = { p: 1 };
function f(o) {
  o.p = 2;
}
f(obj);
obj.p; // 2
```

### arguments 对象

`arguments` 对象包含函数运行时的所有参数：

```js
var f = function (one) {
  console.log(arguments[0]);
  console.log(arguments[1]);
};

f(1, 2); 
// 1
// 2
```

将 `arguments` 转为数组：

```js
var args = Array.prototype.slice.call(arguments);
// 或者
var args = [];
for (var i = 0; i < arguments.length; i++) {
  args.push(arguments[i]);
}
```

## 重要概念

### 闭包

闭包是能够读取其他函数内部变量的函数：

```js
function f1() {
  var n = 999;
  function f2() {
    console.log(n);
  }
  return f2;
}

var result = f1();
result(); // 999
```

闭包的用途：
1. 读取外层函数内部的变量
2. 让变量始终保持在内存中

```js
function createIncrementor(start) {
  return function () {
    return start++;
  };
}

var inc = createIncrementor(5);
inc(); // 5
inc(); // 6
```

### 立即调用的函数表达式（IIFE）

立即调用的函数表达式避免污染全局变量：

```js
// 报错
function(){ /* code */ }();

// 正确写法
(function () {
  /* code */
})();

// 用途：避免污染全局变量
(function () {
  var tmp = newData;
  processData(tmp);
  storeData(tmp);
})();
```

### eval 命令

`eval` 将字符串当作语句执行：

```js
eval('var a = 1;');
a; // 1
```

由于安全风险，一般不推荐使用 `eval`，应使用 `JSON.parse` 解析 JSON 数据。

[参考：函数 - JavaScript 教程 - 网道](https://wangdoc.com/javascript/types/function)
