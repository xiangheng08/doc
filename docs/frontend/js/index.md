# 起步

## 什么是 JavaScript

JavaScript 是一个解释型，弱类型，面向对象，跨平台的编程语言。通常用于在网页上添加交互性和动态内容。它是一种脚本语言，意味着它不需要编译，而是由浏览器在运行时解释执行。JavaScript 通常与 HTML 和 CSS 一起使用，构成现代 Web 开发的核心技术之一。

## JavaScript 的组成

JavaScript 由 **ECMAScript** 和 **WebAPI** 组成

-   ECMAScript: 这是 JavaScript 的核心，定义了语言的基本语法和数据类型。ECMAScript 规范由 Ecma 国际组织制定，它为 JavaScript 提供了基本的操作和控制结构，包括变量、函数、条件语句、循环语句等。

    像我们说的 ES5、ES6 都是 ECMAScript 的版本，ES5 就是 ECMAScript 2015 版本，ES6 就是 ECMAScript 2016 版本。

-   WebAPI: 这些 API 由运行环境提供，不同环境 API 也不同，一般 WebAPI 值浏览器环境提供的 API，比如 `DOM`（文档对象）、`BOM`（浏览器对象）、`XHR`（网络请求）等。

    -   浏览器环境: `DOM`, `BOM`, `XHR`, `fetch`, `WebSocket` 等
    -   Node.js 环境: `fs`、`http`、`process`, `child_process` 等

## JavaScript 书写和引入

JavaScript 代码可以通过内联脚本、外部脚本文件以及在 HTML 文档中的不同位置进行书写和引入。以下是一些常见的 JavaScript 书写和引入方式：

### 内联脚本（Inline Script）：

在 HTML 文档的 `<script>` 标签中直接编写 JavaScript 代码，通常放在 `<head>` 或 `<body>` 中。

```html
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Inline Script Example</title>
		<script>
			// 内联脚本
			function sayHello() {
				alert('Hello, World!');
			}
		</script>
	</head>
	<body>
		<button onclick="sayHello()">Click me</button>
	</body>
</html>
```

### 外部脚本文件（External Script）

将 JavaScript 代码保存在外部文件中，然后通过 `<script>` 标签的 `src` 属性引入。

```html
<!-- 在 HTML 文件中引入外部脚本文件 -->
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>External Script Example</title>
		<!-- 引入外部脚本文件 -->
		<script src="myscript.js"></script>
	</head>
	<body>
		<!-- 使用外部脚本中定义的函数 -->
		<button onclick="sayHello()">Click me</button>
	</body>
</html>
```

在上述例子中，`myscript.js` 是包含 JavaScript 代码的外部文件，其内容如下：

```javascript
// myscript.js
function sayHello() {
	alert('Hello, World!');
}
```

### 异步引入脚本

可以通过 `async` 和 `defer` 属性来异步加载脚本。这对于优化页面性能和加载顺序很有帮助。

```html
<!-- 异步加载脚本 -->
<script async src="myscript.js"></script>

<!-- 延迟加载脚本，等到文档解析完成后再执行 -->
<script defer src="myscript.js"></script>
```

浏览器在加载/解析 `script` 标签（js 脚本）时，会阻塞主进程（页面解析），直到脚本加载/解析完成，才会继续向下执行。而在 `script` 标签加上 `async` 属性后，浏览器会异步加载并执行脚本（不会阻塞主进程），加载完脚本立即执行。

`defer` 属性，与 `async` 类似，都是异步加载脚本，区别在于：

-   `async` 属性，一旦下载完，就立即执行；
-   `defer` 属性，在文档解析完成后，再执行（`load` 事件之前）。

### 模块化加载（ES6 Modules）

在支持 ES6 模块的环境中，可以使用 `<script type="module">` 标签引入模块化的 JavaScript 文件。

```html
<!-- 模块化加载脚本 -->
<script type="module" src="module.js"></script>
```

模块文件（`module.js`）可以包含导入和导出语句，以便更好地组织和复用代码。

```javascript
// module.js
export function sayHello() {
	alert('Hello, World!');
}
```

在开发中 “模块化加载” 用的不是很多，因为大部分的项目都需要做兼容，这种方式在一些老的浏览器是没有用的。

## 参考

js 相关笔记绝大部分来自于[MDN](https://developer.mozilla.org/zh-CN)、[网道](https://wangdoc.com)和网络。
