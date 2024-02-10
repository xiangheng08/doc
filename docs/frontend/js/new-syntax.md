# 新语法

## let 和 const 声明

`let` 和 `const` 是在 ECMAScript 2015（也就是 ES6）中引入的两个新的变量声明关键字，用于解决 `var` 声明变量时存在的一些问题。

`let` 和 `const` 声明的变量具有块级作用域，暂时性死区，不允许重复声明的特性。

`const` 除了以上特性，还具有必须初始化、不可修改的特性，一旦声明，就不能再次赋值。

```js
let x = 10;
const PI = 3.14;
```

### 名词解释

在了解它们的区别之前，我们需要先了解一些基本的概念。

#### 变量提升

JavaScript 中的变量提升（Hoisting）是指在代码执行前，**变量**和**函数**的声明会被提升到其所在作用域的顶部。这意味着你可以在声明变量或函数之前使用它们，而不会引发错误。

```js
console.log(x); // undefined
var x;
```

在上面的代码中，变量 `x` 在定义之前被使用，但不会引发错误，因为变量 `x` 被提升到了顶部，但因为未始化为所以得到 `undefined`。

变量提升对于理解 JavaScript 代码的执行顺序很重要，但它并不表示变量的初始化也会被提升。只有声明会被提升，而初始化仍然保留在原始位置。

```js
console.log(x); // undefined
var x = 5;
console.log(x); // 5
```

在上面的例子中，var x 的声明会被提升到作用域的顶部，但初始化 x = 5 仍然在原始位置。

```js
foo(); // "Hello, World!"
function foo() {
	console.log('Hello, World!');
}
```

函数声明也会被提升，因此在调用 foo() 之前声明 foo 并不会引发错误。

#### 暂时性死区

暂时性死区（Temporal Dead Zone，简称 TDZ）是指在代码中使用 `let` 或 `const` 声明变量时，变量虽然已经被提升到作用域的顶部，但在实际声明语句之前，这些变量是不可访问的，访问会引发 `ReferenceError` 错误。

这意味着在变量声明语句之前，对变量的任何访问都会导致暂时性死区。这是因为变量虽然存在于作用域中，但在执行到实际声明语句之前，JavaScript 引擎不允许对这些变量进行访问。

```js
console.log(x); // ReferenceError: Cannot access 'x' before initialization
let x = 5;
```

在上面的例子中，第一行试图在访问变量 x，但由于 x 在此时处于暂时性死区，引发了 ReferenceError。

暂时性死区的引入是为了帮助开发者避免在变量还未初始化的情况下使用变量，提高代码的健壮性。使用 `let` 或 `const` 声明变量时，最好将变量的声明放在其实际使用之前，以避免死区错误。

#### 重复声明

在 JavaScript 中，重复声明是指在同一作用域内对同一个变量名进行多次声明。

使用 `let` 或 `const` 声明的变量在同一作用域内重复声明会引发语法错误。这是因为 `let` 和 `const` 不允许在同一作用域内重复声明同一个变量。这样的限制有助于避免由于变量名冲突而引发的错误，并提高了代码的可维护性。

```js
let y = 10;
let y = 20; // 重复声明，会引发语法错误
```

或者

```js
const z = 30;
const z = 40; // 重复声明，会引发语法错误
```

使用 `var` 声明的变量在同一作用域内重复声明是允许的，但重复声明的变量会覆盖之前的声明。

```js
var x = 10;
var x = 20; // 重复声明，不会引发错误，但会覆盖之前的声明
console.log(x); // 输出 20
```

> 注意：`let`、`const` 和 `var` 混着声明同一变量，也是不行的哦

#### 函数作用域和块级作用域

在 JavaScript 中，作用域是指变量在代码中的可访问范围。作用域规定了在代码的不同部分中变量的可见性和生命周期。JavaScript 中有两种主要的作用域：函数作用域和块级作用域。

**函数作用域**

在函数作用域中，变量的可见性仅限于声明它的函数内部。这意味着在函数内声明的变量在函数外部是不可访问的，称为局部变量。

```js
function exampleFunction() {
	var localVar = 'I am a local variable';
	console.log(localVar);
}

exampleFunction(); // 输出 "I am a local variable"
console.log(localVar); // ReferenceError: localVar is not defined
```

**块级作用域**

块级作用域是由花括号 {} 创建的区域（代码快），例如条件语句和循环。在块级作用域中声明的变量只在该块内部可见，称为块级变量。

```js
if (true) {
	let blockVar = 'I am a block-level variable';
	console.log(blockVar);
}

console.log(blockVar); // ReferenceError: blockVar is not defined
```

#### 初始化

在 JavaScript 中，变量在声明时可以被初始化。如果一个变量在声明时没有初始化，那么它的值将是 `undefined`。

而使用 `const` 声明的变量在声明时必须被初始化，否则会引发语法错误。

```js
const a; // SyntaxError: Missing initializer in const declaration
```

#### 不可变性

在 JavaScript 中，`const` 声明的变量是不可变的。这意味着它们的值不能被更改。如果尝试修改一个不可变变量，将会引发类型错误。

```js
const a = 1;

a = 2; // TypeError: Assignment to constant variable.
```

#### 挂载 window

在 JavaScript 中，使用 `var` 关键字在全局作用域中声明的变量会自动挂载到 `window` 对象上。

如果是函数作用域，则不会挂载到 `window` 对象上。

```js
var a = 1;
console.log(window.a); // 1

function foo() {
	var b = 2;
	console.log(window.b); // undefined
}

foo();
```

### var、let、const 的区别

| 特性\声明方式 |    var     |    let     |   const    |
| :-----------: | :--------: | :--------: | :--------: |
|   变量提升    |     ✓      |     ✓      |     ✓      |
|  暂时性死区   |     ✗      |     ✓      |     ✓      |
| 允许重复声明  |     ✓      |     ✗      |     ✗      |
|    作用域     | 函数作用域 | 块级作用域 | 块级作用域 |
|  必须初始化   |     ✗      |     ✗      |     ✓      |
|   不可变性    |     ✗      |     ✗      |     ✓      |
|  挂载 window  |     ✓      |     ✗      |     ✗      |

## 可选链运算符（?.）

> ES2020 加入，也就是 ES11

可选链运算符（`?.`）允许读取位于连接对象链深处的属性的值，而不必明确验证链中的每个引用是否有效。`?.` 运算符的功能类似于 . 链式运算符，不同之处在于，在引用为空 (`nullish`)、`null` 或者 `undefined` 的情况下不会引起错误，该表达式短路返回值是 `undefined`。与函数调用一起使用时，如果给定的函数不存在，则返回 `undefined`。

语法：

-   `obj.val?.prop;`
-   `obj.val?.[expr];`
-   `obj.func?.(args);`

对象链深处的属性的值时，如果中间的某个对象是 `null` 或 `undefined`，那么这个语句就会报错。而 `?.` 运算符会短路运算，不会进行后续操作，并返回 `undefined`。

```js
const obj = {};

obj.a.b; // TypeError: Cannot read properties of undefined (reading 'b')
```

上面的代码中，`obj.a` 是一个 `undefined`，所以会报错。

```js
const obj = {};

obj.a?.b; // undefined
```

还是一样的代码，但是使用了 `?.` 运算符，`obj.a` 的值为 `undefined`，不会进行后续操作，并返回 `undefined`。

`?.` 运算符在读取对象链深处的属性的值时，能够很好的简化代码。

```js
obj.a.b.c.d.e.f;
```

如上面的代码，如果防止代码报错，而一个一个的判断，那么代码将会非常冗余。

<!-- prettier-ignore -->
```js
if (
  obj && 
  obj.a && 
  obj.a.b && 
  obj.a.b.c && 
  obj.a.b.c.d && 
  obj.a.b.c.d.e && 
  obj.a.b.c.d.e.f
  ) {
	// ...
}
```

使用 `?.` 运算符，可以简化上面的代码。

```js
obj?.a?.b?.c?.d?.e?.f;
```

### 可选链与函数调用

当尝试调用一个可能不存在的方法时也可以使用可选链。这将是很有帮助的，比如，当使用一个 API 的方法可能不可用时，要么因为实现的版本问题要么因为当前用户的设备不支持该功能。

函数调用时如果被调用的方法不存在，使用可选链可以使表达式自动返回 `undefined` 而不是抛出一个异常。

```js
let result = someInterface.customMethod?.();
```

> 如果 `someInterface.customMethod` 不是一个函数，使用 `?.` 仍然会产生一个 TypeError 异常 (x.y is not a function).

函数参数调用时，如果被调用的函数不存在，使用可选链可以使表达式自动返回 `undefined` 而不是抛出一个异常。

```js
// 使用可选链进行函数调用
function doSomething(onContent, onError) {
	try {
		// ... do something with the data
	} catch (err) {
		onError?.(err.message); // 如果 onError 是 undefined 也不会有异常
	}
}
```

### 可选链和表达式

当使用方括号与属性名的形式来访问属性时，你也可以使用可选链运算符：

```js
let nestedProp = obj?.['prop' + 'Name'];
```

### 可选链不能用于赋值

```js
let object = {};
object?.property = 1; // Uncaught SyntaxError: Invalid left-hand side in assignment
```

### 可选链访问数组元素

```js
let arrayItem = arr?.[42];
```

### 短路计算

当在表达式中使用可选链时，如果左操作数是 null 或 undefined，表达式将不会被计算，例如：

```js
let potentiallyNullObj = null;
let x = 0;
let prop = potentiallyNullObj?.[x++];

console.log(x); // x 将不会被递增，依旧输出 0
```

## 空值合并运算符（??）

> ES2020 加入，也就是 ES11

空值合并运算符（`??`）是一个逻辑运算符，当左侧的操作数为 `null` 或者 `undefined` 时，返回其右侧操作数，否则返回左侧操作数。

```js
const foo = null ?? 'default string';
console.log(foo); // 'default string'

const baz = 0 ?? 42;
console.log(baz); // 0
```

与逻辑或运算符（`||`）不同，逻辑或运算符会在左侧操作数为假值时返回右侧操作数。也就是说，如果使用 `||` 来为某些变量设置默认值，可能会遇到意料之外的行为。比如为假值（例如，`''` 或 `0`）时。

```js
const foo = '' || 'default string';
console.log(foo); // 'default string'

const baz = '' ?? 'default string';
console.log(baz); // ''
```

### 短路

与 OR 和 AND 逻辑运算符相似，当左表达式不为 `null` 或 `undefined` 时，不会对右表达式进行求值。

```js
function A() {
	console.log('函数 A 被调用了');
	return undefined;
}
function B() {
	console.log('函数 B 被调用了');
	return false;
}
function C() {
	console.log('函数 C 被调用了');
	return 'foo';
}

console.log(A() ?? C());
// 依次打印 "函数 A 被调用了"、"函数 C 被调用了"、"foo"
// A() 返回了 undefined，所以运算符两边的表达式都被执行了

console.log(B() ?? C());
// 依次打印 "函数 B 被调用了"、"false"
// B() 返回了 false（既不是 null 也不是 undefined）
// 所以右侧表达式没有被执行
```

### 不能与 AND 或 OR 运算符共用

将 `??` 直接与 AND（`&&`）和 OR（`||`）运算符组合使用是不可取的。（译者注：应当是因为空值合并运算符和其他逻辑运算符之间的运算优先级/运算顺序是未定义的）这种情况下会抛出 SyntaxError 。

```js
null || undefined ?? "foo"; // 抛出 SyntaxError
true || undefined ?? "foo"; // 抛出 SyntaxError
```

但是，如果使用括号来显式表明运算优先级，是没有问题的：

```js
(null || undefined) ?? 'foo'; // 返回 "foo"
```

### 与可选链式运算符（?.）共用

和可选链式运算符（`?.`）一起用，可以在使用可选链时设置一个默认值

```js
const obj = {};

const value = obj.foo?.bar ?? 'default value';
console.log(value); // 输出 "default value"
```
