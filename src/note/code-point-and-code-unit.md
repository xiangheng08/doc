# 码元和码点

```js
const str = '😊👌🙌🤣🥱';

console.log(str.length); // 10
console.log(str[0]); // �
console.log(str.slice(1, 3)); // ��
console.log(str.slice(0, 2)); // 😊
```

在上面的代码中，str 是一个由 emoji 组成的字符串，你会发现它的长度是 10，而不是 5，而输出第一个字符是一个乱码。

为什么呢？

这就得提到了**码元**和**码点**了。

在 js 中，字符是以 UTF-16 的格式存储的，也就是说，一个字符是 2 字节（0 ~ 65535, 0x0000 ~ 0xffff），而一个码元就是 2 字节。但是 0 ~ 65535 之间的码元并不能表示所有的字符，像 emoji 一般都是两个码元，而一个字符真正占用的空间就是码点。

知道这个概念后，我们知道一个码点对一个字符，但是一个码元不一定对应一个字符。所以，在 js 中，字符串的 length 属性返回的是码元的个数，而不是码点的个数。

而输出字符串的第一个字符，实际上是输出它的码点，所以输出的是乱码。第三个 log 是则是输出第一个字符的第二个码点和第二个字符第一个码点，所以是乱码。第四个 log 则是输出第一个字符的第一个码点和第二个字符的第一个码点，所以是正确的。

## codePointAt 方法

`codePointAt` 方法接收一个索引作为参数，返回该索引的码点的值。

```js
const str = '😊';

console.log(str.codePointAt(0)); // 122852
```

通过 `codePointAt` 方法返回值的大小，可以一个字符是否为两个码元组成。从而判断是否为 emoji 等。

```js
const str = '😊a';

console.log(str.codePointAt(0) > 0xffff); // true
console.log(str.codePointAt(2) > 0xffff); // false
```

注意：`codePointAt` 如果取的是码点的第二部分，以上判断字符是否为两个码元组成的方式将会不准

```js
const str = '😊';

console.log(str.codePointAt(1)); // 56842
```

## fromCodePoint 方法

`fromCodePoint` 方法接收一个或多个码点值作为参数，返回对应的字符串。

```js
console.log(String.fromCodePoint(128522)); // 😊

console.log(String.fromCodePoint(128522, 97)); // 😊a
```

## 自定义方法

### 获取字符串码点数量

通过 `length` 属性获取字符串长度，是不准的，字符串码点数量才是正确的字符串长度。

```js
/**
 * 获取字符串码点数量
 * @param {String} str
 */
function pointLength(str) {
	let len = 0;
	for (let i = 0; i < str.length; ) {
		len++;
		i += str.codePointAt(i) > 0xffff ? 2 : 1;
	}
	return len;
}

const str = '😊👌🙌🤣🥱';

console.log(str.length); // 10
console.log(pointLength(str)); // 5
```

### 获取对应码点索引的字符

```js
/**
 * 获取对应码点索引的字符
 * @param {string} str
 * @param {number} index 码点的索引
 * @returns {string | undefined}
 */
function pointAt(str, index) {
	let pointIdex = 0;
	for (let i = 0; i < str.length; ) {
		if (pointIdex === index) {
			return String.fromCodePoint(str.codePointAt(i));
		}
		pointIdex++;
		i += str.codePointAt(i) > 0xffff ? 2 : 1;
	}
}

const str = '😊👌🙌🤣🥱';

console.log(pointAt(str, 0)); // 😊
console.log(pointAt(str, 2)); // 🙌
console.log(pointAt(str, 4)); // 🥱
```

### 基于码点的截取

```js
/**
 * 基于码点的截取
 * @param {string} str
 * @param {number} start 码点起始索引
 * @param {number} end 码点结束索引（不包含结束索引的值）
 * @returns {string}
 */
function pointSlice(str, start, end) {
	let result = '';
	let pointIdex = 0;
	for (let i = 0; i < str.length; ) {
		if (pointIdex >= start && pointIdex < end) {
			result += String.fromCodePoint(str.codePointAt(i));
		}
		pointIdex++;
		i += str.codePointAt(i) > 0xffff ? 2 : 1;
	}
	return result;
}

const str = '😊👌🙌🤣🥱';

console.log(pointSlice(str, 0, 1)); // 😊
console.log(pointSlice(str, 2, 5)); // 🙌🤣🥱
```

### 退格

如果简单的使用 `str.slice(0, -1)`，是不准的，如下。

```js
const str = '😊👌🙌🤣🥱';
console.log(str.slice(0, -1)); // 😊👌🙌🤣�
```

因为 `slice` 是基于码元的

```js
/**
 * 退格
 * @param {string} str
 * @returns {string}
 */
function backspace(str) {
	if (str.length > 1) {
		const pos = str.length - 2;
		const len = str.codePointAt(pos) > 0xffff ? 2 : 1;
		return str.slice(0, str.length - len);
	} else {
		return '';
	}
}

console.log(backspace('a')); // ''
console.log(backspace('abc')); // ab
console.log(backspace('abc😊')); // abc
console.log(backspace('😊a')); // 😊
console.log(backspace('😊👌🙌🤣🥱')); // 😊👌🙌🤣
```

更简单的

```js
/**
 * 退格
 * @param {string} str
 * @returns {string}
 */
function backspace(str) {
	return Array.from(str).slice(0, -1).join('');
}

console.log(backspace('a')); // ''
console.log(backspace('abc')); // ab
console.log(backspace('abc😊')); // abc
console.log(backspace('😊a')); // 😊
console.log(backspace('😊👌🙌🤣🥱')); // 😊👌🙌🤣
```

以上方法也可以使用 Array.from 替代。
