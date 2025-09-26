# 对象

## 概述

对象（object）是 JavaScript 的核心概念，是一组键值对的无序集合。

```js
var obj = {
  foo: 'Hello',
  bar: 'World'
};
```

对象中的每个成员都由键名和键值组成，键名与键值用冒号分隔，成员之间用逗号分隔。

### 键名规则

对象的键名都是字符串（ES6 后 Symbol 也可作为键名）。如果键名是数值，会被自动转为字符串：

```js
var obj = {
  1: 'a',
  3.2: 'b'
};

obj['1']; // "a"
```

不符合标识名规则的键名必须加引号：

```js
var obj = {
  '1p': 'Hello World',
  'h w': 'Hello World'
};
```

### 属性和方法

对象的键值可以是任意数据类型，如果值是函数，则称为方法：

```js
var obj = {
  p: function (x) {
    return 2 * x;
  }
};

obj.p(1); // 2
```

### 对象引用

多个变量指向同一对象时，它们都是该对象的引用：

```js
var o1 = {};
var o2 = o1;

o1.a = 1;
o2.a; // 1
```

对象属性可以动态创建：

```js
var obj = {};
obj.foo = 123;
obj.foo; // 123
```

### 对象字面量歧义

以大括号开头的语句可能被解释为代码块，为避免歧义，可在对象外加圆括号：

```js
({ foo: 123 }) // 正确
```

## 属性操作

### 读取属性

使用点运算符或方括号运算符读取属性：

```js
var obj = { p: 'Hello World' };

obj.p; // "Hello World"
obj['p']; // "Hello World"
```

方括号内可使用变量或表达式：

```js
var key = 'p';
obj[key]; // "Hello World"

obj['hello' + ' world'];
obj[3 + 3];
```

数值键名只能用方括号访问：

```js
var obj = { 123: 'hello world' };

obj[123]; // "hello world"
```

### 设置属性

可随时为对象添加新属性：

```js
var obj = {};
obj.foo = 'Hello';
obj['bar'] = 'World';
```

### 查看属性

使用 `Object.keys` 查看对象的所有属性：

```js
var obj = { key1: 1, key2: 2 };
Object.keys(obj); // ['key1', 'key2']
```

### 删除属性

使用 `delete` 命令删除属性：

```js
var obj = { p: 1 };
delete obj.p; // true
obj.p; // undefined
```

### 检查属性

使用 `in` 运算符检查属性是否存在：

```js
var obj = { p: 1 };
'p' in obj; // true
'toString' in obj; // true（继承的属性）
```

使用 `hasOwnProperty` 方法区分自身属性和继承属性：

```js
var obj = {};
obj.hasOwnProperty('toString'); // false
```

### 遍历属性

使用 `for...in` 循环遍历对象属性：

```js
var obj = { a: 1, b: 2 };

for (var i in obj) {
  console.log('键名：', i);
  console.log('键值：', obj[i]);
}
```

为只遍历对象自身属性，应结合使用 `hasOwnProperty` 方法：

```js
for (var key in obj) {
  if (obj.hasOwnProperty(key)) {
    console.log(key);
  }
}
```

## with 语句

`with` 语句用于简化对同一对象多个属性的操作：

```js
var obj = { p1: 1, p2: 2 };

// 使用 with
with (obj) {
  p1 = 4;
  p2 = 5;
}

// 等同于
obj.p1 = 4;
obj.p2 = 5;
```

但由于作用域不明确，不建议使用 `with` 语句，可用临时变量替代：

```js
// 不推荐
with (obj1.obj2.obj3) {
  console.log(p1 + p2);
}

// 推荐
var temp = obj1.obj2.obj3;
console.log(temp.p1 + temp.p2);
```

[参考：对象 - JavaScript 教程 - 网道](https://wangdoc.com/javascript/types/object)