# 字符串

## 概述

字符串是零个或多个字符的序列，用单引号或双引号包裹：

```js
'abc';
"abc";
'key = "value"';
"It's a long journey";
```

### 转义字符

使用反斜杠（\）转义特殊字符：

```js
'Did she say \'Hello\'?'; 
// "Did she say 'Hello'?"

"Did she say \"Hello\"?";
// "Did she say "Hello"?"
```

常用转义字符：
- `\n`：换行符
- `\r`：回车符
- `\t`：制表符
- `\\`：反斜杠
- `\'`：单引号
- `\"`：双引号

```js
console.log('1\n2');
// 1
// 2
```

### 多行字符串

字符串默认只能写在一行内，分成多行会报错。可以使用以下方法处理长字符串：

1. 使用反斜杠续行：
```js
var longString = 'Long \
long \
long \
string';
```

2. 使用连接运算符：
```js
var longString = 'Long ' +
  'long ' +
  'long ' +
  'string';
```

### 字符串访问

字符串可以像字符数组一样访问：

```js
var s = 'hello';
s[0]; // "h"
s[1]; // "e"

'hello'[1]; // "e"
```

如果索引超出范围或无效，返回 `undefined`：

```js
'abc'[3]; // undefined
'abc'[-1]; // undefined
```

注意：字符串是不可变的，无法修改单个字符：

```js
var s = 'hello';
s[1] = 'a';
s; // "hello"（不变）
```

### length 属性

`length` 属性返回字符串的长度：

```js
var s = 'hello';
s.length; // 5
```

## 字符集

JavaScript 使用 Unicode 字符集，内部以 UTF-16 格式存储字符。

可以直接使用 Unicode 码点表示字符：

```js
var s = '\u00A9';
s; // "©"
```

对于码点在 `U+10000` 到 `U+10FFFF` 之间的字符（如 `𝌆`），JavaScript 会认为是两个字符：

```js
'𝌆'.length; // 2
```

关于码元和码点请点这里：[码元和码点](/note/code-point-and-code-unit)

## Base64 转码

使用 `btoa()` 和 `atob()` 进行 Base64 编码和解码：

```js
var string = 'Hello World!';
btoa(string); // "SGVsbG8gV29ybGQh"
atob('SGVsbG8gV29ybGQh'); // "Hello World!"
```

处理非 ASCII 字符需要先转码：

```js
function b64Encode(str) {
  return btoa(encodeURIComponent(str));
}

function b64Decode(str) {
  return decodeURIComponent(atob(str));
}

b64Encode('你好'); // "JUU0JUJEJUEwJUU1JUE1JUJE"
b64Decode('JUU0JUJEJUEwJUU1JUE1JUJE'); // "你好"
```

## 模板字符串

模板字符串用反引号包裹，支持嵌入表达式和多行文本：

```js
const name = 'John';
const age = 30;

const greeting = `Hello, my name is ${name} and I am ${age} years old.`;
console.log(greeting);

// 多行文本
const multiLineString = `
  This is a
  multi-line
  string.
`;
```

优势：
- 变量插值：直接插入变量
- 多行字符串：原生支持
- 标签模板：可自定义处理函数

[参考: 字符串 - JavaScript 教程 - 网道](https://wangdoc.com/javascript/types/string)
