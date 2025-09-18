# Math

提供数学常数和函数的内置对象。

## 静态属性 {#static-properties}

### `Math.E` {#Math.E}

欧拉常数，自然对数的底数。

```js
Math.E; // 2.718281828459045
```

### `Math.LN2` {#Math.LN2}

2 的自然对数。

```js
Math.LN2; // 0.6931471805599453
```

### `Math.LN10` {#Math.LN10}

10 的自然对数。

```js
Math.LN10; // 2.302585092994046
```

### `Math.LOG2E` {#Math.LOG2E}

以 2 为底的 e 的对数。

```js
Math.LOG2E; // 1.4426950408889634
```

### `Math.LOG10E` {#Math.LOG10E}

以 10 为底的 e 的对数。

```js
Math.LOG10E; // 0.4342944819032518
```

### `Math.PI` {#Math.PI}

圆周率。

```js
Math.PI; // 3.141592653589793
```

### `Math.SQRT1_2` {#Math.SQRT1_2}

1/2 的平方根。

```js
Math.SQRT1_2; // 0.7071067811865476
```

### `Math.SQRT2` {#Math.SQRT2}

2 的平方根。

```js
Math.SQRT2; // 1.4142135623730951
```

## 静态方法 {#static-methods}

### `Math.abs(x)` {#Math.abs}

返回一个数的绝对值。

```js
Math.abs(-5); // 5
Math.abs(3); // 3
```

### `Math.acos(x)` {#Math.acos}

返回一个数的反余弦值。

```js
Math.acos(0); // 1.5707963267948966 (π/2)
Math.acos(1); // 0
```

### `Math.acosh(x)` {#Math.acosh}

返回一个数的反双曲余弦值。

```js
Math.acosh(1); // 0
Math.acosh(2); // 1.3169578969248166
```

### `Math.asin(x)` {#Math.asin}

返回一个数的反正弦值。

```js
Math.asin(0); // 0
Math.asin(1); // 1.5707963267948966 (π/2)
```

### `Math.asinh(x)` {#Math.asinh}

返回一个数的反双曲正弦值。

```js
Math.asinh(0); // 0
Math.asinh(1); // 0.881373587019543
```

### `Math.atan(x)` {#Math.atan}

返回一个数的反正切值。

```js
Math.atan(0); // 0
Math.atan(1); // 0.7853981633974483 (π/4)
```

### `Math.atan2(y, x)` {#Math.atan2}

返回 y/x 的反正切值。

```js
Math.atan2(90, 15); // 1.4056476493802699
Math.atan2(15, 90); // 0.16514867741462683
```

### `Math.atanh(x)` {#Math.atanh}

返回一个数的反双曲正切值。

```js
Math.atanh(0); // 0
Math.atanh(0.5); // 0.5493061443340548
```

### `Math.cbrt(x)` {#Math.cbrt}

返回一个数的立方根。

```js
Math.cbrt(27); // 3
Math.cbrt(-8); // -2
```

### `Math.ceil(x)` {#Math.ceil}

向上取整。

```js
Math.ceil(4.2); // 5
Math.ceil(4.8); // 5
Math.ceil(-4.2); // -4
```

### `Math.clz32(x)` {#Math.clz32}

返回一个 32 位整数的前导零的数量。

```js
Math.clz32(1); // 31
Math.clz32(1000); // 22
```

### `Math.cos(x)` {#Math.cos}

返回一个数的余弦值（x 为弧度）。

```js
Math.cos(0); // 1
Math.cos(Math.PI); // -1
```

### `Math.cosh(x)` {#Math.cosh}

返回一个数的双曲余弦值。

```js
Math.cosh(0); // 1
Math.cosh(1); // 1.5430806348152437
```

### `Math.exp(x)` {#Math.exp}

返回 e^x，其中 e 是欧拉常数。

```js
Math.exp(1); // 2.718281828459045
Math.exp(0); // 1
```

### `Math.expm1(x)` {#Math.expm1}

返回 e^x - 1。

```js
Math.expm1(1); // 1.718281828459045
Math.expm1(0); // 0
```

### `Math.floor(x)` {#Math.floor}

向下取整。

```js
Math.floor(4.2); // 4
Math.floor(4.8); // 4
Math.floor(-4.2); // -5
```

### `Math.fround(x)` {#Math.fround}

返回最接近的单精度浮点数表示。

```js
Math.fround(1.5); // 1.5
Math.fround(1.337); // 1.3370000123977661
```

### `Math.hypot([x[, y[, ...]]])` {#Math.hypot}

返回所有参数平方和的平方根。

```js
Math.hypot(3, 4); // 5
Math.hypot(5, 12); // 13
Math.hypot(3, 4, 5); // 7.0710678118654755
```

### `Math.imul(x, y)` {#Math.imul}

返回两个参数的 32 位整数乘法结果。

```js
Math.imul(2, 4); // 8
Math.imul(-1, 8); // -8
```

### `Math.log(x)` {#Math.log}

返回一个数的自然对数。

```js
Math.log(Math.E); // 1
Math.log(10); // 2.302585092994046
```

### `Math.log1p(x)` {#Math.log1p}

返回 1 + x 的自然对数。

```js
Math.log1p(Math.E - 1); // 1
Math.log1p(0); // 0
```

### `Math.log10(x)` {#Math.log10}

返回一个数以 10 为底的对数。

```js
Math.log10(100000); // 5
Math.log10(1); // 0
```

### `Math.log2(x)` {#Math.log2}

返回一个数以 2 为底的对数。

```js
Math.log2(8); // 3
Math.log2(1); // 0
```

### `Math.max([x[, y[, ...]]])` {#Math.max}

返回零到多个数值中的最大值。

```js
Math.max(1, 2, 3); // 3
Math.max(-1, -2, -3); // -1
Math.max(1); // 1
```

### `Math.min([x[, y[, ...]]])` {#Math.min}

返回零到多个数值中的最小值。

```js
Math.min(1, 2, 3); // 1
Math.min(-1, -2, -3); // -3
Math.min(1); // 1
```

### `Math.pow(x, y)` {#Math.pow}

返回 x 的 y 次幂。

```js
Math.pow(2, 3); // 8
Math.pow(4, 0.5); // 2
Math.pow(10, 2); // 100
```

### `Math.random()` {#Math.random}

返回一个 0 到 1 之间的伪随机数。

```js
Math.random(); // 0.123456789 (示例)
Math.random(); // 0.987654321 (示例)

// 生成 min 到 max 之间的随机整数
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomInt(1, 10); // 1 到 10 之间的随机整数
```

### `Math.round(x)` {#Math.round}

四舍五入到最接近的整数。

```js
Math.round(2.3); // 2
Math.round(2.7); // 3
Math.round(2.5); // 3
Math.round(-2.5); // -2
```

### `Math.sign(x)` {#Math.sign}

返回一个数的符号：正数返回 1，负数返回 -1，0 返回 0。

```js
Math.sign(3); // 1
Math.sign(-3); // -1
Math.sign(0); // 0
Math.sign(-0); // -0
```

### `Math.sin(x)` {#Math.sin}

返回一个数的正弦值（x 为弧度）。

```js
Math.sin(0); // 0
Math.sin(Math.PI / 2); // 1
```

### `Math.sinh(x)` {#Math.sinh}

返回一个数的双曲正弦值。

```js
Math.sinh(0); // 0
Math.sinh(1); // 1.1752011936438014
```

### `Math.sqrt(x)` {#Math.sqrt}

返回一个数的平方根。

```js
Math.sqrt(9); // 3
Math.sqrt(2); // 1.4142135623730951
Math.sqrt(0); // 0
```

### `Math.tan(x)` {#Math.tan}

返回一个数的正切值（x 为弧度）。

```js
Math.tan(0); // 0
Math.tan(Math.PI / 4); // 0.9999999999999999 (理论上是 1)
```

### `Math.tanh(x)` {#Math.tanh}

返回一个数的双曲正切值。

```js
Math.tanh(0); // 0
Math.tanh(1); // 0.7615941559557649
```

### `Math.trunc(x)` {#Math.trunc}

返回一个数的整数部分。

```js
Math.trunc(13.37); // 13
Math.trunc(42.84); // 42
Math.trunc(-0.123); // -0
```
