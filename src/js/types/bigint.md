# BigInt

## 简介

JavaScript 使用 64 位浮点数表示数字，存在两个主要限制：
1. 精度仅限于 53 个二进制位（约 16 个十进制位）
2. 大于或等于 2^1024 的数值会返回 `Infinity`

```js
// 超过 53 位的数值无法保持精度
Math.pow(2, 53) === Math.pow(2, 53) + 1; // true

// 超过 2^1024 的数值无法表示
Math.pow(2, 1024); // Infinity
```

ES2020 引入了 BigInt 数据类型，用于表示任意大小的整数，解决了上述问题。

```js
const a = 2172141653n;
const b = 15346349309n;

// BigInt 可以保持精度
a * b; // 33334444555566667777n

// 普通整数会丢失精度
Number(a) * Number(b); // 33334444555566670000
```

BigInt 必须以 `n` 结尾：

```js
1234;  // 普通整数
1234n; // BigInt

// 运算示例
1n + 2n; // 3n

// 支持多种进制
0b1101n; // 二进制
0o777n;  // 八进制
0xffn;   // 十六进制
```

BigInt 与普通数字不相等：

```js
42n === 42; // false
typeof 123n; // 'bigint'
```

BigInt 支持负号但不支持正号（避免与 [asm.js](http://asmjs.org/) 冲突）：

```js
-42n; // 正确
+42n; // 报错
```

使用 BigInt 计算大数：

```js
let p = 1n;
for (let i = 1n; i <= 70n; i++) {
  p *= i;
}
console.log(p); // 精确的大数结果
```

## BigInt 函数

使用 `BigInt()` 创建 BigInt 值：

```js
BigInt(123);     // 123n
BigInt('123');   // 123n
BigInt(false);   // 0n
BigInt(true);    // 1n
```

注意事项：
- 必须提供参数
- 参数必须能转换为有效数值
- 小数会报错

```js
BigInt(undefined); // TypeError
BigInt('123n');    // SyntaxError
BigInt(1.5);       // RangeError
```

常用静态方法：

```js
// 位数限制转换
const max = 2n ** (64n - 1n) - 1n;
BigInt.asIntN(64, max);     // 9223372036854775807n
BigInt.asIntN(64, max + 1n); // -9223372036854775808n

// 字符串转换
BigInt.parseInt('9007199254740993', 10); // 9007199254740993n
```

## 类型转换

转换为其他类型：

```js
Boolean(0n);  // false
Boolean(1n);  // true
Number(1n);   // 1
String(1n);   // "1" (n 后缀消失)

!0n; // true
!1n; // false
```

## 数学运算

支持的基本运算：

```js
1n + 2n;   // 3n
10n - 5n;  // 5n
2n * 3n;   // 6n
2n ** 3n;  // 8n
9n / 5n;   // 1n (舍去小数)
```

不支持的运算：
- 无符号右移 `>>>`
- 一元正号 `+`

```js
9n >>> 2n; // 报错
+1n;       // 报错
```

不能与普通数值混合运算：

```js
1n + 1.3;    // 报错
Math.sqrt(4n); // 报错

// 需要先转换
Math.sqrt(Number(4n)); // 2
```

## 比较运算

比较运算允许混合类型：

```js
0n < 1;      // true
0n < true;   // true
0n == 0;     // true
0n == false; // true
0n === 0;    // false

'' + 123n;   // "123"
```

## 布尔值转换

规则与 Number 一致：

```js
if (0n) {
  console.log('if');
} else {
  console.log('else'); // 执行这里
}
```

[参考: 数值的扩展 - ES6 教程 - 网道](https://wangdoc.com/es6/number)
