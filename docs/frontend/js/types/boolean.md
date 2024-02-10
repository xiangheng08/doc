# 布尔值

布尔值代表“真”和“假”两个状态。“真”用关键字 `true` 表示，“假”用关键字 `false` 表示。布尔值只有这两个值。

下列运算符会返回布尔值：

-   前置逻辑运算符： `!` (Not)
-   相等运算符：`===`，`!==`，`==`，`!=`
-   比较运算符：`>`，`>=`，`<`，`<=`

如果 JavaScript 预期某个位置应该是布尔值，会将该位置上现有的值自动转为布尔值。转换规则是除了下面六个值被转为 `false`，其他值都视为 `true`。

-   `undefined`
-   `null`
-   `false`
-   `0`
-   `NaN`
-   `""`或`''`（空字符串）

布尔值往往用于程序流程的控制，请看一个例子。

```js
if ('') {
	console.log('true');
}
// 没有任何输出
```

上面代码中，`if`命令后面的判断条件，预期应该是一个布尔值，所以 JavaScript 自动将空字符串，转为布尔值`false`，导致程序不会进入代码块，所以没有任何输出。

注意，空数组（`[]`）和空对象（`{}`）对应的布尔值，都是`true`。

```js
if ([]) {
	console.log('true');
}
// true

if ({}) {
	console.log('true');
}
// true
```

[参考: null, undefined 和布尔值 - JavaScript 教程 - 网道](https://wangdoc.com/javascript/types/null-undefined-boolean)
