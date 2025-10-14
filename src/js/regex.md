# 正则表达式

正则表达式（Regular Expression）是一种用来匹配字符串的模式。在 JavaScript 中，正则表达式是一个对象，可以通过它来执行模式匹配和搜索替换等操作。

## 特殊字符

### 断言

断言表示匹配发生的条件，它们不实际消耗字符。

| 字符 | 含义 |
| ---- | ---- |
| `^` | 匹配输入的开始。在多行模式下，也会匹配换行符后的位置。 |
| `$` | 匹配输入的结束。在多行模式下，也会匹配换行符前的位置。 |
| `\b` | 匹配单词边界，即单词字符与非单词字符之间的位置。 |
| `\B` | 匹配非单词边界。 |
| `x(?=y)` | 正向先行断言，匹配 `x` 仅当 `x` 后面跟着 `y`。 |
| `x(?!y)` | 负向先行断言，匹配 `x` 仅当 `x` 后面不跟着 `y`。 |
| `(?<=y)x` | 正向后行断言，匹配 `x` 仅当 `x` 前面是 `y`。 |
| `(?<!y)x` | 负向后行断言，匹配 `x` 仅当 `x` 前面不是 `y`。 |

### 字符类

字符类用于区分不同类型的字符。

| 字符 | 含义 |
| ---- | ---- |
| `.` | 默认匹配除换行符之外的任何单个字符。 |
| `\d` | 匹配一个数字字符，等价于 `[0-9]`。 |
| `\D` | 匹配一个非数字字符，等价于 `[^0-9]`。 |
| `\w` | 匹配一个单词字符（字母、数字、下划线），等价于 `[A-Za-z0-9_]`。 |
| `\W` | 匹配一个非单词字符，等价于 `[^A-Za-z0-9_]`。 |
| `\s` | 匹配一个空白字符，包括空格、制表符、换页符等。 |
| `\S` | 匹配一个非空白字符。 |
| `[\b]` | 匹配一个退格符（特殊情况）。 |
| `[xyz]` | 字符集合，匹配方括号中的任意字符。 |
| `[^xyz]` | 反向字符集合，匹配除了方括号中字符之外的任意字符。 |
| `[x-y]` | 字符范围，匹配指定范围内的任意字符。 |

### 组和反向引用

| 字符 | 含义 |
| ---- | ---- |
| `(x)` | 匹配 `x` 并捕获匹配项，称为捕获组。 |
| `(?<Name>x)` | 命名捕获组。 |
| `(?:x)` | 匹配 `x` 但不捕获匹配项，称为非捕获组。 |
| `\n` | 反向引用，匹配第 n 个捕获组匹配的文本。 |
| `\k<Name>` | 反向引用，匹配指定名称的捕获组匹配的文本。 |

### 量词

量词指定前面的字符或组应该匹配的次数。

| 字符 | 含义 |
| ---- | ---- |
| `x*` | 匹配前面的模式 `x` 0 次或多次。 |
| `x+` | 匹配前面的模式 `x` 1 次或多次。 |
| `x?` | 匹配前面的模式 `x` 0 次或 1 次。 |
| `x{n}` | 匹配前面的模式 `x` 恰好 `n` 次。 |
| `x{n,}` | 匹配前面的模式 `x` 至少 `n` 次。 |
| `x{n,m}` | 匹配前面的模式 `x` 至少 `n` 次，至多 `m` 次。 |
| `x*?` | 非贪婪匹配前面的模式 `x` 0 次或多次。 |
| `x+?` | 非贪婪匹配前面的模式 `x` 1 次或多次。 |
| `x??` | 非贪婪匹配前面的模式 `x` 0 次或 1 次。 |

### 其他特殊字符

| 字符 | 含义 |
| ---- | ---- |
| `x\|y` | 匹配 `x` 或 `y`。 |
| `\` | 转义符，用于转义后面的特殊字符，使其按字面意思匹配。 |


## 标志 {#flags}

正则表达式标志用于改变正则表达式的匹配行为。

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

执行多行匹配，改变 `^` 和 `$` 的行为，使它们分别匹配行的开始和结束，而不是整个字符串的开始和结束。

```js
const regex = /^test/m;
const str = 'test\nanothertest\ntest';
console.log(str.match(regex)); // ["test", "test"]
```

### `s` (dotAll) {#s-flag}

允许 `.` 匹配换行符。

```js
const regex = /test.*end/s;
const str = 'test\nmiddle\nend';
console.log(regex.test(str)); // true
```

### `u` (Unicode) {#u-flag}

使用 Unicode 码点进行匹配，支持 Unicode 字符处理。

```js
const regex = /\u{1F600}/u;
const str = '😀';
console.log(regex.test(str)); // true
```

### `y` (sticky) {#y-flag}

执行"sticky"匹配，从 [lastIndex](./stdlib/regexp.md#RegExp.prototype.lastIndex) 指定的位置开始。

```js
const str = 'hello world';
const regex = /world/y;
regex.lastIndex = 6;
console.log(regex.test(str)); // true

regex.lastIndex = 0;
console.log(regex.test(str)); // false
```

## 高级特性

### 环视（Lookahead 和 Lookbehind）

环视是一种零宽度断言，用于检查某个位置前后是否符合特定模式，但不消耗字符。

#### 先行断言（Lookahead）

先行断言检查某个模式后面是否跟着另一个模式。

```js
// 正向先行断言 - 匹配后面跟着数字的单词
const lookaheadRegex = /\w+(?=\d)/g;
const str1 = 'word1 word2 another3 word';
console.log(str1.match(lookaheadRegex)); // ["word", "word", "another"]

// 负向先行断言 - 匹配后面不跟数字的单词
const negativeLookaheadRegex = /\w+(?!\d)/g;
const str2 = 'word1 word2 another3 word';
console.log(str2.match(negativeLookaheadRegex)); // ["word", "word", "another", "word"]
```

#### 后行断言（Lookbehind）

后行断言检查某个模式前面是否有另一个模式。

```js
// 正向后行断言 - 匹配前面有美元符号的数字
const lookbehindRegex = /(?<=\$)\d+/g;
const str3 = '价格是$100和$200';
console.log(str3.match(lookbehindRegex)); // ["100", "200"]

// 负向后行断言 - 匹配前面没有美元符号的数字
const negativeLookbehindRegex = /(?<!\$)\d+/g;
const str4 = '价格是$100和200';
console.log(str4.match(negativeLookbehindRegex)); // ["200"]
```

### 命名捕获组

命名捕获组允许为捕获组指定名称，提高代码可读性。

```js
const dateRegex = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const dateStr = '2023-10-05';
const match = dateStr.match(dateRegex);

if (match) {
  console.log(match.groups.year);  // "2023"
  console.log(match.groups.month); // "10"
  console.log(match.groups.day);   // "05"
  
  // 在 replace 中使用命名捕获组
  const formatted = dateStr.replace(dateRegex, '$<day>.$<month>.$<year>');
  console.log(formatted); // "05.10.2023"
}
```

### 非贪婪匹配

默认情况下，量词是贪婪的，会尽可能多地匹配字符。使用 `?` 可以启用非贪婪匹配：

```js
const str = '<p>段落1</p><p>段落2</p>';
const greedy = /<p>.*<\/p>/g;
const nonGreedy = /<p>.*?<\/p>/g;

console.log(str.match(greedy));     // ["<p>段落1</p><p>段落2</p>"]
console.log(str.match(nonGreedy));  // ["<p>段落1</p>", "<p>段落2</p>"]
```
## 使用案例

### `exec` + `g` 标志搜索整个字符串

```js
// 搜索所有匹配项
const text = "abc123def456ghi789";
const regex = /\d+/g;  // 匹配数字，使用全局标志
let match;

while ((match = regex.exec(text)) !== null) {
    console.log(`找到匹配: ${match[0]}，位置: ${match.index}`);
}

// 输出:
// 找到匹配: 123，位置: 3
// 找到匹配: 456，位置: 9
// 找到匹配: 789，位置: 15
```

如果不止搜索一个字符串，需要将 `regex.lastIndex` 设置为 0，以便每次匹配从字符串的开头开始。

```js
// 重置 lastIndex，建议在每次搜索前重置
regex.lastIndex = 0;
```

> 注意：如果没有 `g` 标志，`lastIndex` 是无效的，始终为 0，`exec` 方法也将始终返回第一个匹配项。

## 常用正则表达式

[点击查看](./regexes)

## 性能提示

1. 尽可能使用字面量语法创建正则表达式，而不是构造函数
2. 避免在循环中重复创建相同的正则表达式
3. 对于复杂的正则表达式，考虑将其分解为多个简单的正则表达式
4. 注意回溯问题，特别是在处理大量数据时
5. 使用非捕获组 `(?:...)` 如果不需要捕获匹配的内容

```js
// 推荐：复用正则表达式
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validateEmail(email) {
  return emailRegex.test(email);
}

// 不推荐：每次调用都创建新的正则表达式
function validateEmail(email) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}
