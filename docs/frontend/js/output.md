# 输出

## console 对象

### console.log

输出日志（这应该是用的最多的了）。

```js
console.log(message1, message2, ..., messageN)
```

### console.info

输出通知信息（和 log 差不多，在某些浏览器可能样式会不一样）。

```js
console.log(message1, message2, ..., messageN)
```

### console.warn

输出警告信息（信息文字颜色为黄色）。

```js
console.log(message1, message2, ..., messageN)
```

### console.error

输出错误信息（信息文字颜色为红色）。

```js
console.log(message1, message2, ..., messageN)
```

### console.dir

输出对象的结构（在输出元素时 dir 比 log 要好用些，dir 可看到元素对象的结构，而 log 看不到）。

```js
console.dir(object);
```

### console.time 和 console.timeEnd

- `console.time(label)`: 用于开启一个计时器，每一个计时器必须拥有唯一的名字，页面中最多能同时运行 10000 个计时器。
- 
- `console.timeEnd(label)`: 停止一个通过 console.time() 启动的计时器，并输出时间信息。

用于计时，可以算出一个操作所花费的准确时间。

```js
const arr = new Array(1000000);

console.time('test');

for (let i = 0; i < arr.length; i++) {
	arr[i] = new Object();
}

console.timeEnd('test'); // test: 221.575ms
```

### console.assert

如果断言为 false，则将一个错误消息写入控制台。如果断言是 true，没有任何反应。

```js
console.assert(false, '1111'); // Assertion failed: 1111
console.assert(true, '2222');
```

### console.clear

清空控制台，但前提是该控制台允许清空。像浏览器运行的图形控制台就允许清空，而像 Node 运行的终端上显示的控制台则不支持它，调用该方法将不会产生任何效果（也不会报错）。


### console.trace

显示当前执行的代码在堆栈中的调用路径。

## document.write

`document.write()` 函数用于向文档写入 HTML 表达式或内容。这会在页面加载时将内容插入到文档中。

```js
document.write("Hello, World!");
```

注意：document.write() 的使用在现代开发中已经不太推荐，因为它可能会覆盖整个文档，导致意外的结果。

## alert

`alert()` 函数用于在浏览器中显示一个警告框，其中包含指定的消息。这通常用于调试或向用户显示一些信息。

```js
alert("Hello, World!");
```

<bottom onclick="alert('Hello, World!')">alert</bottom>