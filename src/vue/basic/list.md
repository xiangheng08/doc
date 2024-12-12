# 列表渲染

## v-for 基于数组渲染

`v-for` 指令基于一个数组来渲染一个列表。`v-for` 指令需要使用 `item in items` 形式的特殊语法，其中 `items` 是源数据数组，而 `item` 则是被迭代的数组元素的别名。

`key` 属性用于给每个元素做一个唯一标识，以保证渲染的安全、高效。当数据变化时，Vue 会比较 `key` 属性的值，相同则不会操作 dom，如果不同，才会重新渲染该元素。

```html
<ul id="app">
	<li v-for="item in items" :key="item.message">{{ item.message }}</li>
</ul>
```

```js
var vm = new Vue({
	data: {
		items: [{ message: 'Foo' }, { message: 'Bar' }],
	},
});
```

`v-for` 还支持一个可选的第二个参数，即当前项的索引。

```html
<ul id="app">
	<li v-for="(item, index) in items" :key="item.message">{{ parentMessage }} - {{ index }} - {{ item.message }}</li>
</ul>
```

你也可以用 `of` 替代 `in` 作为分隔符，因为它更接近 `JavaScript` 迭代器的语法：

```html
<div v-for="item of items"></div>
```

## 在 `v-for` 里使用对象

```html
<ul id="app" class="demo">
	<li v-for="value in object">{{ value }}</li>
</ul>
```

```js
new Vue({
	data: {
		object: {
			title: 'How to do lists in Vue',
			author: 'Jane Doe',
			publishedAt: '2016-04-10',
		},
	},
});
```

如果两个参数，第二个的参数为键名：

```html
<div v-for="(value, key) in object">
  {{ key }}: {{ value }}
</div>
```

还可以用第三个参数作为索引：

```html
<div v-for="(value, key, index) in object">
  {{ index }}. {{ key }}: {{ value }}
</div>
```

::: tip
在遍历对象时，会按 `Object.keys()` 的结果遍历，但是不能保证它的结果在不同的 `JavaScript` 引擎下都一致。
:::

## `v-for` 里的 `key` 属性

当 Vue 正在更新使用 `v-for` 渲染的元素列表时，它默认使用“就地更新”的策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是就地更新每个元素，并且确保它们在每个索引位置正确渲染。

这个默认的模式是高效的，但是**只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出**。

为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 `key` attribute：

```html
<div v-for="item in items" :key="item.id">
  <!-- 内容 -->
</div>
```

建议尽可能在使用 `v-for` 时提供 `key` attribute，除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升。

因为它是 Vue 识别节点的一个通用机制，`key` 并不仅与 `v-for` 特别关联。后面我们将在指南中看到，它还具有其它用途。

::: danger 注意
不要使用对象或数组之类的非基本类型值作为 `v-for` 的 `key`。请用字符串或数值类型的值。
:::

## 数组更新检测

### 变更方法

Vue 将被侦听的数组的变更方法进行了包裹，所以它们也将会触发视图更新。这些被包裹过的方法包括：

- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`

### 替换数组
变更方法，顾名思义，会变更调用了这些方法的原始数组。相比之下，也有非变更方法，例如 `filter()`、`concat()` 和 `slice()`。它们不会变更原始数组，而总是数组。当使用非变更方法时，可以用新数组替换旧数组：

```js
example1.items = example1.items.filter(function (item) {
  return item.message.match(/Foo/)
})
```

你可能认为这将导致 Vue 丢弃现有 DOM 并重新渲染整个列表。幸运的是，事实并非如此。Vue 为了使得 DOM 元素得到最大范围的重用而实现了一些智能的启发式方法，所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作。

### 注意事项

由于 JavaScript 的限制，Vue 不能检测数组和对象的变化。[响应式原理](/vue/basic/reactivity)
