# Number

表示数字值的包装对象。

## 构造函数 {#constructor}

创建 Number 对象。

```js
// 作为构造函数使用（不推荐）
const num1 = new Number(123);
typeof num1; // "object"

// 作为转换函数使用（推荐）
const num2 = Number('123'); // 123
const num3 = Number(true); // 1
const num4 = Number(false); // 0
```

## 静态属性 {#static-properties}

### `Number.EPSILON` {#Number.EPSILON}

两个可表示数之间的最小间隔。

```js
Number.EPSILON; // 2.220446049250313e-16
```

### `Number.MAX_SAFE_INTEGER` {#Number.MAX_SAFE_INTEGER}

JavaScript 中最大的安全整数。

```js
Number.MAX_SAFE_INTEGER; // 9007199254740991
```

### `Number.MIN_SAFE_INTEGER` {#Number.MIN_SAFE_INTEGER}

JavaScript 中最小的安全整数。

```js
Number.MIN_SAFE_INTEGER; // -9007199254740991
```

### `Number.MAX_VALUE` {#Number.MAX_VALUE}

能表示的最大正数。

```js
Number.MAX_VALUE; // 1.7976931348623157e+308
```

### `Number.MIN_VALUE` {#Number.MIN_VALUE}

能表示的最小正数。

```js
Number.MIN_VALUE; // 5e-324
```

### `Number.NaN` {#Number.NaN}

特殊的"非数字"值。

```js
Number.NaN; // NaN
isNaN(Number.NaN); // true
```

### `Number.NEGATIVE_INFINITY` {#Number.NEGATIVE_INFINITY}

特殊的负无穷大值。

```js
Number.NEGATIVE_INFINITY; // -Infinity
```

### `Number.POSITIVE_INFINITY` {#Number.POSITIVE_INFINITY}

特殊的正无穷大值。

```js
Number.POSITIVE_INFINITY; // Infinity
```

## 静态方法 {#static-methods}

### `Number.isFinite(value)` {#Number.isFinite}

判断传入的值是否是有限数。

```js
Number.isFinite(123); // true
Number.isFinite(Infinity); // false
Number.isFinite(NaN); // false
```

### `Number.isInteger(value)` {#Number.isInteger}

判断传入的值是否为整数。

```js
Number.isInteger(123); // true
Number.isInteger(123.45); // false
Number.isInteger('123'); // false
```

### `Number.isNaN(value)` {#Number.isNaN}

判断传入的值是否为 NaN。

```js
Number.isNaN(NaN); // true
Number.isNaN(123); // false
Number.isNaN('NaN'); // false
```

### `Number.isSafeInteger(value)` {#Number.isSafeInteger}

判断传入的值是否为安全整数。

```js
Number.isSafeInteger(123); // true
Number.isSafeInteger(9007199254740992); // false
```

### `Number.parseFloat(string)` {#Number.parseFloat}

解析字符串并返回一个浮点数。

```js
Number.parseFloat('3.14159'); // 3.14159
Number.parseFloat('3.14some string'); // 3.14
Number.parseFloat('not a number'); // NaN
```

### `Number.parseInt(string[, radix])` {#Number.parseInt}

解析字符串并返回一个整数。

```js
Number.parseInt('123'); // 123
Number.parseInt('123', 10); // 123
Number.parseInt('0xFF', 16); // 255
Number.parseInt('1010', 2); // 10
```

## 实例方法 {#instance-methods}

### `Number.prototype.toExponential([fractionDigits])` {#Number.prototype.toExponential}

返回使用指数表示法表示的字符串。

```js
const num = 1234.5678;
num.toExponential(); // "1.2345678e+3"
num.toExponential(2); // "1.23e+3"
```

### `Number.prototype.toFixed([digits])` {#Number.prototype.toFixed}

返回使用定点表示法表示的字符串。

```js
const num = 123.456;
num.toFixed(); // "123"
num.toFixed(2); // "123.46"
num.toFixed(6); // "123.456000"
```

### `Number.prototype.toLocaleString([locales[, options]])` {#Number.prototype.toLocaleString}

返回一个表示该数字的字符串，该字符串格式因不同语言而不同。

```js
const num = 1234.5678;
num.toLocaleString('zh-CN'); // "1,234.568"
num.toLocaleString('en-US'); // "1,234.568"
```

### `Number.prototype.toPrecision([precision])` {#Number.prototype.toPrecision}

返回使用指定精度表示的字符串。

```js
const num = 123.456;
num.toPrecision(); // "123.456"
num.toPrecision(2); // "1.2e+2"
num.toPrecision(5); // "123.46"
```

### `Number.prototype.toString([radix])` {#Number.prototype.toString}

返回指定 Number 对象的字符串表示。

```js
const num = 255;
num.toString(); // "255"
num.toString(16); // "ff"
num.toString(2); // "11111111"
num.toString(8); // "377"
```

### `Number.prototype.valueOf()` {#Number.prototype.valueOf}

返回 Number 对象的原始值。

```js
const num = new Number(123);
num.valueOf(); // 123
```
