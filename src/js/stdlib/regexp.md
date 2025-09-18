# RegExp

表示正则表达式的对象。

## 构造函数 {#constructor}

创建正则表达式对象。

```js
// 字面量语法（推荐）
const regex1 = /pattern/flags;

// 构造函数语法
const regex2 = new RegExp('pattern', 'flags');
const regex3 = new RegExp(/pattern/, 'flags');

// 示例
const re1 = /ab+c/i;
const re2 = new RegExp('ab+c', 'i');
const re3 = new RegExp(/ab+c/, 'i');
```

## 静态属性 {#static-properties}

### `RegExp.lastIndex` {#RegExp.lastIndex}

指定下一次匹配开始的索引。

```js
const regex = /test/g;
console.log(regex.lastIndex); // 0
```

## 实例属性 {#instance-properties}

### `RegExp.prototype.dotAll` {#RegExp.prototype.dotAll}

表示是否使用了 s 标志。

```js
const regex1 = /foo.bar/;
const regex2 = /foo.bar/s;
console.log(regex1.dotAll); // false
console.log(regex2.dotAll); // true
```

### `RegExp.prototype.flags` {#RegExp.prototype.flags}

返回正则表达式的标志。

```js
const regex = /foo/gi;
console.log(regex.flags); // "gi"
```

### `RegExp.prototype.global` {#RegExp.prototype.global}

表示是否使用了 g 标志。

```js
const regex1 = /foo/;
const regex2 = /foo/g;
console.log(regex1.global); // false
console.log(regex2.global); // true
```

### `RegExp.prototype.ignoreCase` {#RegExp.prototype.ignoreCase}

表示是否使用了 i 标志。

```js
const regex1 = /foo/;
const regex2 = /foo/i;
console.log(regex1.ignoreCase); // false
console.log(regex2.ignoreCase); // true
```

### `RegExp.prototype.multiline` {#RegExp.prototype.multiline}

表示是否使用了 m 标志。

```js
const regex1 = /foo/;
const regex2 = /foo/m;
console.log(regex1.multiline); // false
console.log(regex2.multiline); // true
```

### `RegExp.prototype.source` {#RegExp.prototype.source}

返回当前正则表达式的模式文本。

```js
const regex = /fooBar/gi;
console.log(regex.source); // "fooBar"
```

### `RegExp.prototype.sticky` {#RegExp.prototype.sticky}

表示是否使用了 y 标志。

```js
const regex1 = /foo/;
const regex2 = /foo/y;
console.log(regex1.sticky); // false
console.log(regex2.sticky); // true
```

### `RegExp.prototype.unicode` {#RegExp.prototype.unicode}

表示是否使用了 u 标志。

```js
const regex1 = /foo/;
const regex2 = /foo/u;
console.log(regex1.unicode); // false
console.log(regex2.unicode); // true
```

## 实例方法 {#instance-methods}

### `RegExp.prototype.exec(str)` {#RegExp.prototype.exec}

在字符串中执行匹配项的搜索。

```js
const regex = /foo/;
const str = 'table football, foosball';
const result = regex.exec(str);
console.log(result[0]); // "foo"
console.log(result.index); // 6
```

### `RegExp.prototype.test(str)` {#RegExp.prototype.test}

测试正则表达式是否匹配字符串。

```js
const regex = /foo/;
console.log(regex.test('table football')); // true
console.log(regex.test('Table Football')); // false
console.log(regex.test('bar')); // false
```

### `RegExp.prototype.toString()` {#RegExp.prototype.toString}

返回表示正则表达式的字符串。

```js
const regex = /foo/gi;
console.log(regex.toString()); // "/foo/gi"
```

### `RegExp.prototype[Symbol.match](str)` {#RegExp.prototype[Symbol.match]}

对给定字符串执行匹配并返回匹配结果。

```js
const regex = /foo/g;
const str = 'table football, foosball';
const result = str.match(regex);
console.log(result); // ["foo", "foo"]
```

### `RegExp.prototype[Symbol.matchAll](str)` {#RegExp.prototype[Symbol.matchAll]

对给定字符串执行匹配，返回所有匹配结果。

```js
const regex = /foo/g;
const str = 'table football, foosball';
const result = [...str.matchAll(regex)];
console.log(result); // [["foo", index: 6, ...], ["foo", index: 16, ...]]
```

### `RegExp.prototype[Symbol.replace](str, newSubstr|function)` {#RegExp.prototype[Symbol.replace]

替换匹配的子字符串。

```js
const regex = /apples/g;
const str = 'I like apples and apples';
const newstr = str.replace(regex, 'oranges');
console.log(newstr); // "I like oranges and oranges"
```

### `RegExp.prototype[Symbol.search](str)` {#RegExp.prototype[Symbol.search]

搜索匹配项并返回索引。

```js
const regex = /foo/;
const str = 'table football';
const index = str.search(regex);
console.log(index); // 6
```

### `RegExp.prototype[Symbol.split](str[, limit])` {#RegExp.prototype[Symbol.split]

通过匹配项分割字符串。

```js
const regex = /\s+/;
const str = 'Oh brave new world';
const result = str.split(regex);
console.log(result); // ["Oh", "brave", "new", "world"]
```

## 标志 {#flags}

### `g` (全局) {#g-flag}

查找所有匹配项，而不是在第一个匹配项后停止。

```js
const regex = /test/g;
const str = 'test test test';
console.log(str.match(regex)); // ["test", "test", "test"]
```

### `i` (忽略大小写) {#i-flag}

执行不区分大小写的匹配。

```js
const regex = /test/i;
console.log(regex.test('TEST')); // true
console.log(regex.test('Test')); // true
```

### `m` (多行) {#m-flag}

执行多行匹配。

```js
const regex = /^test/m;
const str = 'test\nanothertest\ntest';
console.log(str.match(regex)); // ["test", "test"]
```

### `s` (dotAll) {#s-flag}

允许 . 匹配换行符。

```js
const regex = /test.*end/s;
const str = 'test\nmiddle\nend';
console.log(regex.test(str)); // true
```

### `u` (Unicode) {#u-flag}

使用 Unicode 码点进行匹配。

```js
const regex = /\u{1F600}/u;
const str = '😀';
console.log(regex.test(str)); // true
```

### `y` (sticky) {#y-flag}

执行"sticky"匹配，从 lastIndex 指定的位置开始。

```js
const str = 'hello world';
const regex = /world/y;
regex.lastIndex = 6;
console.log(regex.test(str)); // true

regex.lastIndex = 0;
console.log(regex.test(str)); // false
```
