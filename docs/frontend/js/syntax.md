# JavaString 语法

## 输出

在了解 JavaString 语法前，应该先了解下 JavaString 的[输出方式](/frontend/js/output)，毕竟没有输出，就看不来到效果。

[前往](/frontend/js/output)

## 标识符

标识符，顾名思义，就是用于标识的符号，比如变量名，函数名，类名等等。

标识符的命名规则：

-   开头只能由字母，下划线（`_`），美元符（`$`）组成。
-   只能由字母，数字，下划线组成，并且不能以数字开头。
-   字母区分大小写。
-   标识符不能是 JavaString 中的关键字或保留字。

在开发中除了以上的规则，还有一些**约定俗成的命名规范**

1.  **小驼峰命名法（camelCase）：**

    -   第一个单词的首字母小写，后续单词的首字母大写。
    -   例如：`myVariable, calculateTotal, updateUser`

2.  **大驼峰命名法（PascalCase）：**

    -   每个单词的首字母都大写。
    -   例如：`MyClass, CalculateTotal, UpdateUser`

3.  **下划线命名法（Snake_case）：**

    -   所有字母小写，单词之间用下划线分隔。
    -   例如：`my_variable, calculate_total, update_user`

4.  **匈牙利命名法（Hungarian Notation）：**

    -   在变量名前加上表示类型的前缀，如 `strName` 表示字符串，`nCount` 表示整数（这在现代语言中已经不太常见了）。

5.  **常量命名：**

    -   常量通常使用全大写字母，单词之间用下划线分隔。
    -   例如：`MAX_VALUE, PI, DEFAULT_TIMEOUT`

6.  **有意义的命名：**

    -   变量名应该具有描述性，能够清晰地表达变量的用途。
    -   例如：`customerName` 比 `a`、`b`、`c` 更容易理解。

## 关键字、保留字、其他不建议使用的标识符

<table class="stretch title-center">
	<thead>
		<tr>
			<th colspan="5">关键字</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>do</td>
			<td>while</td>
			<td>instanceof</td>
			<td>typeof</td>
			<td>break</td>
		</tr>
		<tr>
			<td>continue</td>
			<td>case</td>
			<td>new</td>
			<td>var</td>
			<td>catch</td>
		</tr>
		<tr>
			<td>finally</td>
			<td>return</td>
			<td>void</td>
			<td>for</td>
			<td>switch</td>
		</tr>
		<tr>
			<td>default</td>
			<td>if</td>
			<td>else</td>
			<td>throw</td>
			<td>delete</td>
		</tr>
		<tr>
			<td>in</td>
			<td>try</td>
			<td>function</td>
			<td>this</td>
			<td>with</td>
		</tr>
		<tr>
			<td>debugger</td>
			<td>false</td>
			<td>true</td>
			<td>null</td>
			<td>const (ES6)</td>
		</tr>
		<tr>
			<td>let (ES6)</td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
	</tbody>
</table>

<table class="stretch title-center">
	<thead>
		<tr>
			<th colspan="5">保留字符</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>class</td>
			<td>enum</td>
			<td>extends</td>
			<td>super</td>
			<td>const</td>
		</tr>
		<tr>
			<td>export</td>
			<td>import</td>
			<td>implements</td>
			<td>let</td>
			<td>private</td>
		</tr>
		<tr>
			<td>public</td>
			<td>yield</td>
			<td>interface</td>
			<td>package</td>
			<td>protected</td>
		</tr>
		<tr>
			<td>static</td>
			<td></td>
			<td></td>
			<td></td>
			<td></td>
		</tr>
	</tbody>
</table>

<table class="stretch title-center">
	<thead>
		<tr>
			<th colspan="5">其他不建议使用的标识符</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>abstract</td>
			<td>double</td>
			<td>goto</td>
			<td>native</td>
			<td>static</td>
		</tr>
		<tr>
			<td>boolean</td>
			<td>enum</td>
			<td>implements</td>
			<td>package</td>
			<td>super</td>
		</tr>
		<tr>
			<td>byte</td>
			<td>export</td>
			<td>import</td>
			<td>private</td>
			<td>synchronize</td>
		</tr>
		<tr>
			<td>char</td>
			<td>extends</td>
			<td>int</td>
			<td>protected</td>
			<td>throws</td>
		</tr>
		<tr>
			<td>class</td>
			<td>final</td>
			<td>interface</td>
			<td>public</td>
			<td>transient</td>
		</tr>
		<tr>
			<td>const</td>
			<td>float</td>
			<td>long</td>
			<td>short</td>
			<td>volatile</td>
		</tr>
		<tr>
			<td>arguments</td>
			<td>encodeURI</td>
			<td>Infinity</td>
			<td>Number</td>
			<td>RegExp</td>
		</tr>
		<tr>
			<td>undefined</td>
			<td>isFinite</td>
			<td>Object</td>
			<td>String</td>
			<td>Boolean</td>
		</tr>
		<tr>
			<td>Error</td>
			<td>RangeError</td>
			<td>parseFloat</td>
			<td>SyntaxError</td>
			<td>Date</td>
		</tr>
		<tr>
			<td>eval</td>
			<td>JSON</td>
			<td>TypeError</td>
			<td>decodeURI</td>
			<td>ReferenceError</td>
		</tr>
		<tr>
			<td>EvalError</td>
			<td>Math</td>
			<td>URIError</td>
			<td>Function</td>
			<td>decodeURIComponent</td>
		</tr>
		<tr>
			<td>NaN</td>
			<td>isNaN</td>
			<td>parselnt</td>
			<td>Array</td>
			<td>encodeURICOmponent</td>
		</tr>
	</tbody>
</table>

## 字面量和变量

字面量是代码中直接写的值。比如：`1`、`2`、`3`、`true`、`false`、`null`、`NaN`、`"hello"`，这个都是字面量。字面量是不可变的

变量顾名思义，它的值可变的。在 js 中可以使用 `var`、`let`、`const` 关键字来声明变量。

> JavaString 是一个弱类型的语言，所以在声明变量时不需要指定类型。

```js
var a = 1;
let a = 1;
const a = 1;
```

### `var`、`let`、`const` 的区别

1. **作用域**：
    - `var` 声明的变量是函数作用域（function-scoped），而不是块级作用域（block-scoped）。这意味着`var`声明的变量在整个函数内都是可见的。
    - `let` 和 `const` 声明的变量是块级作用域（block-scoped），在声明它们的块（例如，if 语句、for 循环等）内可见。
    - `var` 全局作用域中会挂载到 `window`上，`var` 在函数作用域中则不会挂载到 `window`上。`let` 和 `const` 在任何作用域中不会挂在到 `window`上

		```js
		function example() {
			if (true) {
				var x = 10; // 在整个函数内可见
				let y = 20; // 仅在if块内可见
				const z = 30; // 仅在if块内可见
			}

			console.log(x); // 可以访问
			console.log(y); // 错误，y未定义
			console.log(z); // 错误，z未定义
		}

		// var 的全局作用域和函数作用域
		var a = 1;

		function example2() {
			console.log(a); // undefined
			console.log(window.a); // 1

			var a = 2;
			console.log(a); // 2
			console.log(window.a); // 1
		}

		example2();
		```

2. **变量提升**：

    - 使用 `var` 声明的变量会被提升到函数的顶部，意味着你可以在声明之前访问这个变量（但它的值会是 `undefined` ）。
    - 使用 `let` 和 `const` 声明的变量也会被提升，但在会有暂时性死区，也就是声明之前访问会导致 `ReferenceError`。

		```js
		console.log(a); // undefined
		var a = 5;

		console.log(b); // ReferenceError: b is not defined
		let b = 10;

		console.log(c); // ReferenceError: c is not defined
		const c = 15;
		```

3. **重复声明**：

    - 使用 `var` 可以重复声明同一个变量，而不会抛出错误。
    - 使用 `let` 和 `const` 在同一个作用域内重复声明同一个变量会导致 `SyntaxError`。
    - `var`、`let` 和 `const` 如果混着用，在同一个作用域中也不能重复声明。

		```js
		var x = 5;
		var x = 10; // 合法

		let y = 15;
		let y = 20; // 错误

		const z = 25;
		const z = 30; // 错误
		```

4. **初始化**：

    - 使用 `var` 声明的变量会被默认初始化为 `undefined`。
    - 使用 `let` 和 `const` 声明的变量在声明之前是不可访问的。

		```js
		console.log(a); // undefined
		var a;

		console.log(b); // Error: b is not defined
		let b;

		console.log(c); // Error: c is not defined
		const c;
		```

5. **不可变性**：

    - 使用 `const` 声明的变量是常量，一旦赋值就不能再修改。
    - 使用 `let`和`var` 声明的变量是可变的。
    - 但是 `const` 声明的常量，之如果是对象/数组等引用类型，可以修改对象内部的属性。

		```js
		const PI = 3.14;
		PI = 3.14159; // 错误，不能重新分配常量
		```

在现代 JavaScript 中应该使用 `let` 和 `const`，避免使用`var`，因为 `var` 它具有变量提升和挂载到 `window` 的特性，可能会出现变量冲突等问题。所以更加推荐使用 `let` 和 `const`。

能使用 `const` 就使用 `const`，不行再用 `let`，实在不行才用 `var`。

所以使用的优先级：`const` > `let` > `var`
