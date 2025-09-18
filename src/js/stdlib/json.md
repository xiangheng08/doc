# JSON 对象

## JSON 格式

JSON 格式（JavaScript Object Notation 的缩写）是一种用于数据交换的文本格式，2001 年由 Douglas Crockford 提出，目的是取代繁琐笨重的 XML 格式。

相比 XML 格式，JSON 格式有两个显著的优点：书写简单，一目了然；符合 JavaScript 原生语法，可以由解释引擎直接处理，不用另外添加解析代码。所以，JSON 迅速被接受，已经成为各大网站交换数据的标准格式，并被写入标准。

每个 JSON 对象就是一个值，可能是一个数组或对象，也可能是一个原始类型的值。总之，只能是一个值，不能是两个或更多的值。

JSON 对值的类型和格式有严格的规定。

> 1. 复合类型的值只能是数组或对象，不能是函数、正则表达式对象、日期对象。
> 2. 原始类型的值只有四种：字符串、数值（必须以十进制表示）、布尔值和`null`（不能使用`NaN`, `Infinity`, `-Infinity`和`undefined`）。
> 3. 字符串必须使用双引号表示，不能使用单引号。
> 4. 对象的键名必须放在双引号里面。
> 5. 数组或对象最后一个成员的后面，不能加逗号。

以下都是合法的 JSON。

```js
["one", "two", "three"]

{ "one": 1, "two": 2, "three": 3 }

{"names": ["张三", "李四"] }

[ { "name": "张三"}, {"name": "李四"} ]
```

以下都是不合法的 JSON。

```js
{ name: "张三", 'age': 32 }  // 属性名必须使用双引号

[32, 64, 128, 0xFFF] // 不能使用十六进制值

{ "name": "张三", "age": undefined } // 不能使用 undefined

{ "name": "张三",
  "birthday": new Date('Fri, 26 Aug 2011 07:13:10 GMT'),
  "getName": function () {
      return this.name;
  }
} // 属性值不能使用函数和日期对象
```

注意，`null`、空数组和空对象都是合法的 JSON 值。

## JSON 对象

`JSON` {#JSON}

用于解析和序列化 JSON 数据的全局对象。

## 静态方法 {#static-methods}

### `JSON.parse(text[, reviver])` {#JSON.parse}

解析 JSON 字符串并返回对应的 JavaScript 值或对象。

```js
JSON.parse('{}'); // {}
JSON.parse('"foo"'); // "foo"
JSON.parse('123'); // 123
JSON.parse('true'); // true
JSON.parse('null'); // null
JSON.parse('{"name": "Alice", "age": 30}'); // { name: "Alice", age: 30 }

// 使用 reviver 函数
JSON.parse('{"p": 5}', (key, value) => {
  if (typeof value === 'number') {
    return value * 2;
  }
  return value;
}); // { p: 10 }
```

### `JSON.stringify(value[, replacer[, space]])` {#JSON.stringify}

将 JavaScript 值转换为 JSON 字符串。

```js
JSON.stringify({}); // '{}'
JSON.stringify(true); // 'true'
JSON.stringify('foo'); // '"foo"'
JSON.stringify([1, 'false', false]); // '[1,"false",false]'
JSON.stringify({ x: 5 }); // '{"x":5}'

// 使用 replacer 数组
JSON.stringify({ x: 1, y: 2 }, ['x']); // '{"x":1}'

// 使用 replacer 函数
JSON.stringify({ x: 1, y: 2 }, (key, value) => {
  if (typeof value === 'number') {
    return value * 2;
  }
  return value;
}); // '{"x":2,"y":4}'

// 使用 space 参数格式化输出
JSON.stringify({ x: 1, y: 2 }, null, 2);
// {
//   "x": 1,
//   "y": 2
// }

// toJSON 方法
const obj = {
  data: 'test',
  toJSON() {
    return 'serialized';
  }
};
JSON.stringify(obj); // '"serialized"'
```

## JSON 语法规则 {#syntax-rules}

1. 数据类型：字符串、数值、布尔值、null、对象、数组
2. 字符串必须使用双引号
3. 对象键名必须使用双引号
4. 禁止尾随逗号
5. 禁止 undefined、函数、Symbol
6. 禁止 NaN 和 Infinity

```js
// 合法的 JSON
'{"name": "Alice", "age": 30}'
'[1, 2, 3]'
'{"items": ["a", "b"]}'

// 不合法的 JSON
"{name: 'Alice'}" // 键名和字符串值必须使用双引号
'{"age": undefined}' // undefined 不被支持
'{"fn": function() {}}' // 函数不被支持
```

## 注意事项 {#notes}

1. 不是所有 JavaScript 值都能被序列化为 JSON：

```js
// 会被忽略或转换的值
JSON.stringify(undefined); // undefined
JSON.stringify(function() {}); // undefined
JSON.stringify(Symbol('foo')); // undefined

// 包含这些值的对象
JSON.stringify({ x: undefined, y: 1 }); // '{"y":1}'
JSON.stringify([undefined, 1]); // '[null,1]'
```

2. 循环引用会导致错误：

```js
const obj = {};
obj.self = obj;
// JSON.stringify(obj); // TypeError: Converting circular structure to JSON
```

3. Date 对象会被转换为字符串：

```js
JSON.stringify({ now: new Date() }); 
// '{"now":"2022-01-01T00:00:00.000Z"}'
```

