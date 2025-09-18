# String

表示和操作字符序列的对象。

## 构造函数 {#constructor}

创建字符串对象。

```js
// 字符串字面量（推荐）
const str1 = 'hello';
const str2 = "world";
const str3 = `template`;

// 构造函数
const str4 = new String('hello');
typeof str4; // "object"

// 转换函数
const str5 = String(123); // "123"
const str6 = String(true); // "true"
```

## 静态方法 {#static-methods}

### `String.fromCharCode(...codeUnits)` {#String.fromCharCode}

根据 UTF-16 码元序列返回字符串。

```js
String.fromCharCode(65); // "A"
String.fromCharCode(72, 101, 108, 108, 111); // "Hello"
String.fromCharCode(); // ""
```

### `String.fromCodePoint(...codePoints)` {#String.fromCodePoint}

根据 Unicode 码点序列返回字符串。

```js
String.fromCodePoint(65); // "A"
String.fromCodePoint(0x1F600); // "😀"
```

### `String.raw(callSite, ...substitutions)` {#String.raw}

获取模板字符串的原始字符串形式。

```js
String.raw`Hi\n${2+3}!`; // "Hi\\n5!"
String.raw({ raw: ['foo', 'bar'] }, 1, 2); // "foo1bar"
```

## 实例属性 {#instance-properties}

### `String.prototype.length` {#String.prototype.length}

返回字符串中的字符数。

```js
const str = 'Hello';
str.length; // 5

''.length; // 0
'中文'.length; // 2
```

## 实例方法 {#instance-methods}

### `String.prototype.at(index)` {#String.prototype.at}

返回指定索引处的字符。

```js
const str = 'Hello';
str.at(0); // "H"
str.at(-1); // "o"
str.at(10); // undefined
```

### `String.prototype.charAt(index)` {#String.prototype.charAt}

返回指定索引处的字符。

```js
const str = 'Hello';
str.charAt(0); // "H"
str.charAt(4); // "o"
str.charAt(10); // ""
```

### `String.prototype.charCodeAt(index)` {#String.prototype.charCodeAt}

返回指定索引处字符的 UTF-16 码元值。

```js
const str = 'ABC';
str.charCodeAt(0); // 65
str.charCodeAt(1); // 66
str.charCodeAt(2); // 67
```

### `String.prototype.codePointAt(index)` {#String.prototype.codePointAt}

返回指定索引处字符的 Unicode 码点值。

```js
const str = 'A😀';
str.codePointAt(0); // 65
str.codePointAt(1); // 128512
```

### `String.prototype.concat(str1[, ...strN])` {#String.prototype.concat}

连接两个或多个字符串。

```js
const str1 = 'Hello';
const str2 = 'World';
str1.concat(' ', str2); // "Hello World"
'abc'.concat('d', 'e', 'f'); // "abcdef"
```

### `String.prototype.endsWith(searchString[, length])` {#String.prototype.endsWith}

判断字符串是否以指定的子字符串结尾。

```js
const str = 'Hello World';
str.endsWith('World'); // true
str.endsWith('Hello'); // false
str.endsWith('Hello', 5); // true
```

### `String.prototype.includes(searchString[, position])` {#String.prototype.includes}

判断字符串是否包含指定的子字符串。

```js
const str = 'Hello World';
str.includes('World'); // true
str.includes('world'); // false
str.includes('Hello', 1); // false
```

### `String.prototype.indexOf(searchValue[, fromIndex])` {#String.prototype.indexOf}

返回指定值在字符串中首次出现的索引。

```js
const str = 'Hello World';
str.indexOf('World'); // 6
str.indexOf('o'); // 4
str.indexOf('o', 5); // 7
str.indexOf('xyz'); // -1
```

### `String.prototype.isWellFormed()` {#String.prototype.isWellFormed}

判断字符串是否格式良好（不包含单独代理项）。

```js
'\u{1F600}'.isWellFormed(); // true
'\uD83D\uDE00'.isWellFormed(); // true
'\uD83D'.isWellFormed(); // false
```

### `String.prototype.lastIndexOf(searchValue[, fromIndex])` {#String.prototype.lastIndexOf}

返回指定值在字符串中最后一次出现的索引。

```js
const str = 'Hello World Hello';
str.lastIndexOf('Hello'); // 12
str.lastIndexOf('o'); // 15
str.lastIndexOf('xyz'); // -1
```

### `String.prototype.localeCompare(compareString[, locales[, options]])` {#String.prototype.localeCompare}

返回一个数字表示字符串在排序中是否排在给定字符串之前、之后或相同位置。

```js
'a'.localeCompare('b'); // -1
'a'.localeCompare('a'); // 0
'b'.localeCompare('a'); // 1

// 中文排序
'张三'.localeCompare('李四'); // 1
```

### `String.prototype.match(regexp)` {#String.prototype.match}

使用正则表达式匹配字符串。

```js
const str = 'The quick brown fox';
str.match(/quick/); // ["quick", index: 4, ...]
str.match(/lazy/); // null

// 全局匹配
const str2 = 'test test test';
str2.match(/test/g); // ["test", "test", "test"]
```

### `String.prototype.matchAll(regexp)` {#String.prototype.matchAll}

返回所有匹配正则表达式的迭代器。

```js
const str = 'test test test';
const matches = str.matchAll(/test/g);
[...matches]; // [["test", index: 0, ...], ["test", index: 5, ...], ["test", index: 10, ...]]
```

### `String.prototype.normalize([form])` {#String.prototype.normalize}

返回字符串的 Unicode 标准化形式。

```js
const str = '\u1E9B\u0323';
str.normalize(); // "ẛ̣"
str.normalize('NFC'); // "ẛ̣"
str.normalize('NFD'); // "ẛ̣"
```

### `String.prototype.padEnd(maxLength[, fillString])` {#String.prototype.padEnd}

在字符串末尾填充指定字符直到达到指定长度。

```js
'hello'.padEnd(10); // "hello     "
'hello'.padEnd(10, '.'); // "hello....."
'hello'.padEnd(3, '.'); // "hello"
```

### `String.prototype.padStart(maxLength[, fillString])` {#String.prototype.padStart}

在字符串开头填充指定字符直到达到指定长度。

```js
'5'.padStart(3, '0'); // "005"
'hello'.padStart(10); // "     hello"
'hello'.padStart(10, '.'); // ".....hello"
```

### `String.prototype.repeat(count)` {#String.prototype.repeat}

返回重复指定次数的字符串。

```js
'abc'.repeat(3); // "abcabcabc"
'abc'.repeat(0); // ""
'abc'.repeat(1); // "abc"
```

### `String.prototype.replace(searchValue, replaceValue)` {#String.prototype.replace}

替换字符串中第一个匹配的子字符串。

```js
const str = 'Hello World Hello';
str.replace('Hello', 'Hi'); // "Hi World Hello"
str.replace(/Hello/g, 'Hi'); // "Hi World Hi"

// 使用函数
str.replace('Hello', (match) => match.toUpperCase()); // "HELLO World Hello"
```

### `String.prototype.replaceAll(searchValue, replaceValue)` {#String.prototype.replaceAll}

替换字符串中所有匹配的子字符串。

```js
const str = 'Hello World Hello';
str.replaceAll('Hello', 'Hi'); // "Hi World Hi"

// 使用正则表达式（必须全局标志）
str.replaceAll(/Hello/g, 'Hi'); // "Hi World Hi"
```

### `String.prototype.search(regexp)` {#String.prototype.search}

搜索匹配正则表达式的子字符串并返回索引。

```js
const str = 'The quick brown fox';
str.search(/quick/); // 4
str.search(/lazy/); // -1
```

### `String.prototype.slice(startIndex[, endIndex])` {#String.prototype.slice}

提取字符串的一部分并返回新字符串。

```js
const str = 'Hello World';
str.slice(0, 5); // "Hello"
str.slice(6); // "World"
str.slice(-5); // "World"
str.slice(-5, -1); // "Worl"
```

### `String.prototype.split([separator[, limit]])` {#String.prototype.split}

使用指定分隔符将字符串分割成数组。

```js
const str = 'Hello World';
str.split(' '); // ["Hello", "World"]
str.split(''); // ["H", "e", "l", "l", "o", " ", "W", "o", "r", "l", "d"]
str.split(' ', 1); // ["Hello"]

// 使用正则表达式
'1, 2, 3'.split(/,\s*/); // ["1", "2", "3"]
```

### `String.prototype.startsWith(searchString[, position])` {#String.prototype.startsWith}

判断字符串是否以指定的子字符串开头。

```js
const str = 'Hello World';
str.startsWith('Hello'); // true
str.startsWith('World'); // false
str.startsWith('World', 6); // true
```

### `String.prototype.substring(indexStart[, indexEnd])` {#String.prototype.substring}

返回字符串两个索引之间的子字符串。

```js
const str = 'Hello World';
str.substring(0, 5); // "Hello"
str.substring(6); // "World"
str.substring(6, 11); // "World"
```

### `String.prototype.toLocaleLowerCase([locales])` {#String.prototype.toLocaleLowerCase}

根据本地化规则将字符串转换为小写。

```js
const str = 'HELLO';
str.toLocaleLowerCase(); // "hello"
str.toLocaleLowerCase('tr'); // "hello" (土耳其语)
```

### `String.prototype.toLocaleUpperCase([locales])` {#String.prototype.toLocaleUpperCase}

根据本地化规则将字符串转换为大写。

```js
const str = 'hello';
str.toLocaleUpperCase(); // "HELLO"
str.toLocaleUpperCase('tr'); // "HELLO" (土耳其语)
```

### `String.prototype.toLowerCase()` {#String.prototype.toLowerCase}

将字符串转换为小写。

```js
const str = 'Hello World';
str.toLowerCase(); // "hello world"
```

### `String.prototype.toString()` {#String.prototype.toString}

返回字符串对象的字符串表示。

```js
const str = new String('Hello');
str.toString(); // "Hello"
```

### `String.prototype.toUpperCase()` {#String.prototype.toUpperCase}

将字符串转换为大写。

```js
const str = 'Hello World';
str.toUpperCase(); // "HELLO WORLD"
```

### `String.prototype.toWellFormed()` {#String.prototype.toWellFormed}

返回格式良好的字符串版本。

```js
'\uD83D'.toWellFormed(); // ""
'\uD83D\uDE00'.toWellFormed(); // "😀"
```

### `String.prototype.trim()` {#String.prototype.trim}

去除字符串开头和结尾的空白字符。

```js
const str = '  Hello World  ';
str.trim(); // "Hello World"
```

### `String.prototype.trimEnd()` {#String.prototype.trimEnd}

去除字符串结尾的空白字符。

```js
const str = '  Hello World  ';
str.trimEnd(); // "  Hello World"
```

### `String.prototype.trimStart()` {#String.prototype.trimStart}

去除字符串开头的空白字符。

```js
const str = '  Hello World  ';
str.trimStart(); // "Hello World  "
```

### `String.prototype.valueOf()` {#String.prototype.valueOf}

返回字符串对象的原始值。

```js
const str = new String('Hello');
str.valueOf(); // "Hello"
```

## 模板字符串 {#template-strings}

### 多行字符串 {#multiline-strings}

```js
const multiline = `这是第一行
这是第二行
这是第三行`;
```

### 表达式插值 {#expression-interpolation}

```js
const name = 'Alice';
const age = 30;
const greeting = `Hello, ${name}! You are ${age} years old.`;
// "Hello, Alice! You are 30 years old."
```

### 嵌套模板 {#nested-templates}

```js
const classes = `header ${isLargeScreen() ? '' : `icon-${item.isCollapsed ? 'expand' : 'collapse'}`}`;
```

### 带标签的模板 {#tagged-templates}

```js
function highlight(strings, ...values) {
  let result = '';
  strings.forEach((string, i) => {
    result += string + (values[i] || '');
  });
  return result;
}

const name = 'Alice';
const age = 30;
const message = highlight`Hello, ${name}! You are ${age} years old.`;
```
