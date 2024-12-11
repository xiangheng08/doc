# 输出

## document.write

`document.write()` 函数用于向文档写入 HTML 表达式或内容。这会在页面加载时将内容插入到文档中。

```js
document.write('Hello, World!');
```

注意：document.write() 的使用在现代开发中已经不太推荐，因为它可能会覆盖整个文档，导致意外的结果。

## alert

`alert()` 函数用于在浏览器中显示一个警告框，其中包含指定的消息。这通常用于调试或向用户显示一些信息。

```js
alert('Hello, World!');
```

<button onclick="alert('Hello, World!')">点我</button>

## console 对象

### console.log()

输出普通日志消息。

```js
console.log('Hello, World!');
```

### console.error()

输出错误消息。

```js
console.error('This is an error message.');
```

### console.warn()

输出警告消息。

```js
console.warn('This is a warning message.');
```

### console.info()

输出信息性消息（和 log 差不多，在某些浏览器可能样式会不一样）。

```js
console.info('This is an informative message.');
```

### console.debug()

输出调试信息，通常在开发环境中使用。

```js
console.debug('Debugging information');
```

### console.clear()

清除控制台上的所有输出，但前提是该控制台允许清空。像浏览器运行的图形控制台就允许清空，而像 Node 运行的终端上显示的控制台则不支持它，调用该方法将不会产生任何效果（也不会报错）。

```js
console.clear();
```

### console.group() 和 console.groupEnd()

创建一个分组，用于组织相关的日志输出。

```js
console.group('Group Title');
console.log('Log inside group');
console.groupEnd();
```

### console.table()

以表格形式输出数组或对象。

```js
const fruits = ['Apple', 'Banana', 'Orange'];
console.table(fruits);
```

### console.time() 和 console.timeEnd()

用于计算代码块的执行时间。

-   `console.time(label)`: 用于开启一个计时器，每一个计时器必须拥有唯一的名字，页面中最多能同时运行 10000 个计时器。

-   `console.timeEnd(label)`: 停止一个通过 console.time() 启动的计时器，并输出时间信息。

```js
const arr = new Array(1000000);

console.time('test');

for (let i = 0; i < arr.length; i++) {
	arr[i] = new Object();
}

console.timeEnd('test'); // test: 221.575ms
```

### console.count()

记录特定标签被调用的次数。

```js
for (let i = 0; i < 5; i++) {
	console.count('Loop iteration');
}
```

### console.dir()

以树状结构输出指定对象的属性和方法。在输出元素时 dir 比 log 要好用些，dir 可看到元素对象的结构，而某些时候 log 看不到。

```js
const myObject = { name: 'John', age: 30, job: 'Developer' };
console.dir(myObject);
```

### console.assert()

断言，如果条件为假，则输出错误消息。

```js
console.assert(2 + 2 === 5, 'Math is broken!');

console.assert(false, '1111'); // Assertion failed: 1111
console.assert(true, '2222');
```

### console.trace()

输出当前的函数调用栈，用于追踪函数的调用关系。

```js
function firstFunction() {
	secondFunction();
}

function secondFunction() {
	console.trace();
}

firstFunction();
```
