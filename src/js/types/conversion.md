# 数据类型的转换

## 概述

JavaScript 是一种动态类型语言，变量没有类型限制，可以随时赋予任意值。

```js
let x = y ? 1 : 'a';
```

变量 `x` 的类型取决于变量 `y` 的值，这种类型不确定性使得 JavaScript 在运行时需要进行类型转换。

当运算符发现运算子的类型与预期不符时，会自动转换类型：

```js
'4' - '3'; // 1
```

虽然两个操作数都是字符串，但减法运算符预期数值，所以 JavaScript 自动将它们转为数值。

## 强制转换

使用 `Number()`、`String()` 和 `Boolean()` 函数手动转换数据类型。

### Number()

将任意类型的值转换成数值。

**原始类型值转换规则：**

```js
// 数值：转换后还是原来的值
Number(324); // 324

// 字符串：如果可以被解析为数值，则转换为相应的数值
Number('324'); // 324

// 字符串：如果不可以被解析为数值，返回 NaN
Number('324abc'); // NaN

// 空字符串转为 0
Number(''); // 0

// 布尔值：true 转成 1，false 转成 0
Number(true); // 1
Number(false); // 0

// undefined：转成 NaN
Number(undefined); // NaN

// null：转成 0
Number(null); // 0
```

`Number` 函数比 `parseInt` 严格，只要有一个字符无法转成数值，整个字符串就会被转为 `NaN`：

```js
parseInt('42 cats'); // 42
Number('42 cats'); // NaN
```

**对象转换规则：**

`Number` 方法的参数是对象时，将返回 `NaN`，除非是包含单个数值的数组：

```js
Number({ a: 1 }); // NaN
Number([1, 2, 3]); // NaN
Number([5]); // 5
```

对象转数值的步骤：
1. 调用对象的 `valueOf` 方法，如果返回原始类型的值，则使用 `Number` 函数转换
2. 如果 `valueOf` 方法返回的还是对象，则调用 `toString` 方法，如果返回原始类型的值，则使用 `Number` 函数转换
3. 如果 `toString` 方法返回的还是对象，则报错

```js
Number({
  valueOf: function () {
    return 2;
  }
}); // 2

Number({
  toString: function () {
    return 3;
  }
}); // 3
```

### String()

将任意类型的值转换成字符串。

**原始类型值转换规则：**

```js
String(123); // "123"
String('abc'); // "abc"
String(true); // "true"
String(undefined); // "undefined"
String(null); // "null"
```

**对象转换规则：**

```js
String({ a: 1 }); // "[object Object]"
String([1, 2, 3]); // "1,2,3"
```

对象转字符串的步骤：
1. 先调用对象的 `toString` 方法，如果返回原始类型的值，则使用 `String` 函数转换
2. 如果 `toString` 方法返回的是对象，再调用 `valueOf` 方法，如果返回原始类型的值，则使用 `String` 函数转换
3. 如果 `valueOf` 方法返回的还是对象，则报错

### Boolean()

将任意类型的值转换为布尔值。

除了以下五个值转换结果为 `false`，其他值都为 `true`：
- `undefined`
- `null`
- `0`（包含 `-0` 和 `+0`）
- `NaN`
- `''`（空字符串）

```js
Boolean(undefined); // false
Boolean(null); // false
Boolean(0); // false
Boolean(NaN); // false
Boolean(''); // false

Boolean(true); // true
Boolean(false); // false

// 所有对象（包括空对象）都转为 true
Boolean({}); // true
Boolean([]); // true
```

## 自动转换

JavaScript 在以下三种情况下会自动转换数据类型：

1. 不同类型的数据互相运算
2. 对非布尔值类型的数据求布尔值
3. 对非数值类型的值使用一元运算符（`+` 和 `-`）

### 自动转换为布尔值

在预期为布尔值的地方（如 `if` 语句的条件部分），JavaScript 会自动调用 `Boolean()` 函数：

```js
if ('abc') {
  console.log('hello');
} // "hello"
```

以下写法可用于将表达式转为布尔值：

```js
expression ? true : false;
!!expression;
```

### 自动转换为字符串

在预期为字符串的地方，JavaScript 会自动转换为字符串，主要发生在字符串的加法运算时：

```js
'5' + 1; // '51'
'5' + true; // "5true"
'5' + {}; // "5[object Object]"
```

需要注意自动转换可能引起的错误：

```js
const obj = {
  width: '100',
};

obj.width + 20; // "10020" 而不是 120
```

### 自动转换为数值

在预期为数值的地方，JavaScript 会自动调用 `Number()` 函数。除加法运算符外，其他运算符都会把运算子自动转成数值：

```js
'5' - '2'; // 3
'5' * '2'; // 10
true - 1; // 0
'1' - 1; // 0
null + 1; // 1
undefined + 1; // NaN
```

注意：`null` 转为数值时为 `0`，而 `undefined` 转为数值时为 `NaN`。

一元运算符也会把运算子转成数值：

```js
+'abc'; // NaN
-'abc'; // NaN
+true; // 1
-false; // 0
```
