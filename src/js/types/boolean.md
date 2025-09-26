# 布尔值

布尔值代表"真"和"假"两个状态，分别用 `true` 和 `false` 表示。

## 返回布尔值的运算符

- 前置逻辑运算符：`!` (Not)
- 相等运算符：`===`，`!==`，`==`，`!=`
- 比较运算符：`>`，`>=`，`<`，`<=`

## 自动转换规则

JavaScript 会在需要布尔值的上下文中自动转换值的类型。以下六个值会被转换为 `false`，其他值都视为 `true`：

- `undefined`
- `null`
- `false`
- `0`
- `NaN`
- `""` 或 `''`（空字符串）

## 特殊情况

空数组（`[]`）和空对象（`{}`）对应的布尔值都是 `true`：

```js
if ('') {
	console.log('true');
}
// 没有任何输出

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
