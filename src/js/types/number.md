# 数值

## 概述

JavaScript 内部所有数字都以 64 位浮点数形式储存，即使整数也是如此。所以，`1` 与 `1.0` 是相同的。

```js
1 === 1.0; // true
```

由于浮点数不是精确的值，涉及小数的比较和运算要特别小心：

```js
0.1 + 0.2 === 0.3; // false
0.3 / 0.1; // 2.9999999999999996
(0.3 - 0.2) === (0.2 - 0.1); // false
```

### 数值精度

根据 IEEE 754 标准，JavaScript 浮点数由三部分组成：
- 第 1 位：符号位（0 表示正数，1 表示负数）
- 第 2-12 位（11 位）：指数部分
- 第 13-64 位（52 位）：小数部分

JavaScript 提供的有效数字最长为 53 个二进制位，意味着绝对值小于 2 的 53 次方的整数（-2^53 到 2^53）都可以精确表示。

```js
Math.pow(2, 53); // 9007199254740992
Math.pow(2, 53) + 1; // 9007199254740992
Math.pow(2, 53) + 2; // 9007199254740994
```

### 数值范围

JavaScript 能表示的数值范围约为 2^-1023 到 2^1024。超出范围的处理：
- 超过 2^1024：返回 `Infinity`
- 小于 2^-1075：返回 0

```js
Math.pow(2, 1024); // Infinity
Math.pow(2, -1075); // 0

Number.MAX_VALUE; // 1.7976931348623157e+308
Number.MIN_VALUE; // 5e-324
```

## 数值表示法

JavaScript 数值可以用多种方式表示：

```js
35; // 十进制
0xff; // 十六进制
123e3; // 科学计数法：123000
123e-3; // 科学计数法：0.123
```

以下情况会自动转为科学计数法：
1. 小数点前数字多于 21 位
2. 小数点后零多于 5 个

## 数值进制

JavaScript 支持四种进制表示法：
- 十进制：无前导 0
- 八进制：前缀 `0o` 或 `0O`
- 十六进制：前缀 `0x` 或 `0X`
- 二进制：前缀 `0b` 或 `0B`

```js
0xff; // 255（十六进制）
0o377; // 255（八进制）
0b11; // 3（二进制）
```

## 特殊数值

### 正零和负零

JavaScript 内部存在 +0 和 -0，它们在大多数情况下被视为相同：

```js
-0 === +0; // true
0 === -0; // true

// 唯一区别是作为分母时
1 / +0 === 1 / -0; // false（Infinity !== -Infinity）
```

### `NaN`

`NaN` 表示"非数字"（Not a Number），类型仍是 `Number`：

```js
5 - 'x'; // NaN
typeof NaN; // 'number'

// NaN 不等于任何值，包括自身
NaN === NaN; // false

// 与任何数运算都得 NaN
NaN + 32; // NaN
```

### `Infinity`

`Infinity` 表示"无穷"：

```js
Math.pow(2, 1024); // Infinity
1 / 0; // Infinity
-1 / 0; // -Infinity

// 运算规则
5 * Infinity; // Infinity
Infinity + Infinity; // Infinity
Infinity - Infinity; // NaN
```

## 全局方法

### `parseInt()`

将字符串转为整数：

```js
parseInt('123'); // 123
parseInt('8a'); // 8（遇到非数字字符停止）
parseInt('0x10'); // 16（十六进制）
parseInt('1000', 2); // 8（指定进制）
```

### `parseFloat()`

将字符串转为浮点数：

```js
parseFloat('3.14'); // 3.14
parseFloat('314e-2'); // 3.14
parseFloat('3.14more'); // 3.14
```

### `isNaN()`

判断值是否为 `NaN`：

```js
isNaN(NaN); // true
isNaN('Hello'); // true（先转为数值）
isNaN([]); // false（[] 转为 0）
Number.isNaN(NaN); // true (Number.isNaN() 是 isNaN 更健壮的版本)
```

注意：`isNaN()` 与 `Number.isNaN()` 略有不同，具体点击[这里](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN#number.isnan_%E5%92%8C%E5%85%A8%E5%B1%80_isnan_%E4%B9%8B%E9%97%B4%E7%9A%84%E5%8C%BA%E5%88%AB)查看。

也可以利用 `NaN` 是唯一不等于自身的值的这个特点，进行判断：
```js
function myIsNaN(value) {
  return value !== value;
}
```

### `isFinite()`

判断值是否为正常数值：

```js
isFinite(Infinity); // false
isFinite(-Infinity); // false
isFinite(NaN); // false
isFinite(-1); // true
Number.isFinite(Infinity); // false
```

注意：`isFinite()` 与 `Number.isFinite()` 略有不同，具体点击[这里](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite#number.isfinite_%E5%92%8C%E5%85%A8%E5%B1%80_isfinite_%E4%B9%8B%E9%97%B4%E7%9A%84%E4%B8%8D%E5%90%8C)查看。

[参考: 数值 - JavaScript 教程 - 网道](https://wangdoc.com/javascript/types/number)
