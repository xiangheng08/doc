# Boolean

表示布尔值的包装对象。

## 构造函数 {#constructor}

创建 Boolean 对象。

```js
// 作为构造函数使用（不推荐）
const b1 = new Boolean(true);
const b2 = new Boolean(false);

// 作为转换函数使用（推荐）
const b3 = Boolean(0); // false
const b4 = Boolean(1); // true
```

## 静态属性 {#static-properties}

### `Boolean.length` {#Boolean.length}

值为 1。

### `Boolean.prototype` {#Boolean.prototype}

Boolean 构造函数的原型。

## 实例方法 {#instance-methods}

### `Boolean.prototype.toString()` {#Boolean.prototype.toString}

返回指定 Boolean 对象的字符串形式。

```js
const flag = new Boolean(true);
flag.toString(); // "true"

const flag2 = new Boolean(false);
flag2.toString(); // "false"
```

### `Boolean.prototype.valueOf()` {#Boolean.prototype.valueOf}

返回 Boolean 对象的原始值。

```js
const flag = new Boolean(true);
flag.valueOf(); // true

const flag2 = new Boolean(false);
flag2.valueOf(); // false
```

## 转换规则 {#conversion-rules}

以下值被转换为 `false`：

```js
Boolean(undefined); // false
Boolean(null); // false
Boolean(0); // false
Boolean(-0); // false
Boolean(NaN); // false
Boolean(''); // false
Boolean(false); // false
```

其他所有值都被转换为 `true`：

```js
Boolean('false'); // true
Boolean('0'); // true
Boolean([]); // true
Boolean({}); // true
Boolean(function() {}); // true
Boolean(/regexp/); // true
```

## 注意事项 {#notes}

1. 使用 Boolean 构造函数创建的对象始终为真值：

```js
const flag = new Boolean(false);
if (flag) {
  // 这段代码会执行，因为 flag 是一个对象
  console.log('执行了');
}
```

2. 推荐使用 Boolean 函数或双非运算符进行类型转换：

```js
// 推荐方式
const flag1 = Boolean(expression);
const flag2 = !!expression;

// 不推荐方式
const flag3 = new Boolean(expression);
```
