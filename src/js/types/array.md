# 数组

## 定义

数组（array）是按次序排列的一组值，每个值的位置都有编号（从 0 开始），用方括号表示。

```js
const arr = ['a', 'b', 'c'];
```

任何类型的数据都可以放入数组：

```js
const arr = [
  { a: 1 },
  [1, 2, 3],
  function () { return true; }
];

arr[0]; // Object {a: 1}
arr[1]; // [1, 2, 3]
arr[2]; // function (){return true;}
```

数组的元素也可以是数组，形成多维数组：

```js
const a = [[1, 2], [3, 4]];
a[0][1]; // 2
a[1][1]; // 4
```

## 数组的本质

数组是一种特殊的对象，`typeof` 运算符返回 `object`：

```js
typeof [1, 2, 3]; // "object"
```

数组的键名是按次序排列的整数（0, 1, 2...）：

```js
const arr = ['a', 'b', 'c'];
Object.keys(arr); // ["0", "1", "2"]

arr['0']; // 'a'
arr[0]; // 'a'
```

数组成员只能用方括号表示法访问：

```js
const arr = [1, 2, 3];
arr[0]; // 正确
arr.0; // SyntaxError
```

## length 属性

`length` 属性返回数组的成员数量，是一个动态值：

```js
['a', 'b', 'c'].length; // 3

const arr = ['a', 'b'];
arr.length; // 2

arr[2] = 'c';
arr.length; // 3

arr[9] = 'd';
arr.length; // 10
```

`length` 属性可写，设置值小于数据实际长度会截断数组，设置为 0 可清空数组：

```js
const arr = ['a', 'b', 'c'];
arr.length = 2;
arr; // ["a", "b"]

arr.length = 0;
arr; // []
```

设置值大于数据实际长度会增加数组长度，新增位置为空位：

```js
const a = ['a'];
a.length = 3;
a[1]; // undefined
```

## 数组检测

使用 `in` 运算符检查数组是否包含某个键名：

```js
const arr = ['a', 'b', 'c'];
2 in arr; // true
'2' in arr; // true
4 in arr; // false
```

注意，如果数组的某个位置是空位，`in` 运算符返回 `false`：

```js
const arr = [];
arr[100] = 'a';
100 in arr; // true
1 in arr; // false
```

## 数组遍历

推荐使用 `for` 循环、`for...of` 循环或 `forEach` 方法遍历数组：

```js
const a = [1, 2, 3];

// for循环
for (let i = 0; i < a.length; i++) {
  console.log(a[i]);
}

// for...of循环 (ES6)
for (const value of a) {
  console.log(value);
}

// forEach方法
a.forEach(function (value, index) {
  console.log(index + ': ' + value);
});
```

不推荐使用 `for...in` 遍历数组，因为它会遍历非数字键：

```js
const a = [1, 2, 3];
a.foo = true;

for (const key in a) {
  console.log(key); // 会输出 "foo"
}
```

## 数组空位

数组中两个逗号之间没有任何值，称为"空位"：

```js
const a = [1, , 1];
a.length; // 3
a[1]; // undefined
```

空位与 `undefined` 不同，空位在遍历时会被跳过：

```js
const a = [, , ,];
a.forEach(function (x, i) {
  console.log(i); // 不会产生任何输出
});

const b = [undefined, undefined];
b.forEach(function (x, i) {
  console.log(i); // 输出 0 和 1
});
```

使用 `delete` 命令删除数组成员会形成空位：

```js
const a = [1, 2, 3];
delete a[1];
a[1]; // undefined
a.length; // 3
```

## 类似数组的对象

具有 `length` 属性和数字键的对象称为"类似数组的对象"：

```js
const obj = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
};

obj[0]; // 'a'
obj.length; // 3
```

常见的类似数组的对象包括函数的 `arguments` 对象、DOM 元素集和字符串。

可以使用 `Array.prototype.slice.call()` 将类似数组的对象转为真正的数组：

```js
const arr = Array.prototype.slice.call(arrayLike);
```

也可以通过 `call()` 方法在类似数组的对象上调用数组方法：

```js
Array.prototype.forEach.call(arrayLike, function (value, index) {
  console.log(index + ': ' + value);
});
```

[参考: 数组 - JavaScript 教程 - 网道](https://wangdoc.com/javascript/types/array)