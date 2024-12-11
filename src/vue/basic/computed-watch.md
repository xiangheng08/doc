# 计算属性和侦听器

## 计算属性

模板内的表达式应该是非常便利的、简洁的，如果在模板中放入太多的逻辑会让模板过重且难以维护。例如：

```html
<div id="example">{{ message.split('').reverse().join('') }}</div>
```

对于任何复杂逻辑的属性，都应当使用计算属性。

上面的例子可以这样写：

```html
<div id="example">使用计算属性：{{ reversedMessage }}</div>
```

```js
var vm = new Vue({
	el: '#example',
	data: {
		message: 'Hello world!`',
	},
	computed: {
		// 计算属性的 getter
		reversedMessage: function () {
			// `this` 指向 vm 实例
			return this.message.split('').reverse().join('');
		},
	},
});
```

计算属性的依赖发送变化是，计算属性会自动重新计算。

例如上面的例子中计算属性 `reversedMessage` 依赖于 `message`，当 `message` 发生改变时，`reversedMessage` 也会更新。

计算属性相较于方法，**计算属性是基于它们的响应式依赖进行缓存的**。只在相关响应式依赖发生改变时它们才会重新求值。而方法在重新渲染总会再次执行。

应为计算属性需要响应式依赖，所以下面例子的计算属性将不再更新，因为 Date.now() 不是响应式依赖：

```js
var vm = new Vue({
	computed: {
		now: function () {
			return Date.now();
		},
	},
});
```

### 计算属性的 setter

当计算属性的定义为函数时，其实就计算属性的 `getter`，是无法改变的计算属性值的，如果需要改变计算属性值，则需要将计算属性定义为对象，并提供 `getter`、`setter`。

```js
var vm = new Vue({
	data: {
		firstName: 'Foo',
		lastName: 'Bar',
	}
	computed: {
		fullName: {
			// getter
			get: function () {
				return this.firstName + ' ' + this.lastName;
			},
			// setter
			set: function (newValue) {
        // 注意这里改变的是依赖的值
				var names = newValue.split(' ');
				this.firstName = names[0];
				this.lastName = names[names.length - 1];
			},
		},
	},
});
```

运行 `vm.fullName = 'John Doe'` 时，`setter` 会被调用，`vm.firstName` 和 `vm.lastName` 也会相应地被更新，而 `getter` 也会重新计算。

## 侦听器

当一个响应数据变化时，需要执行一些代码，可以使用 `watch` 选项。

例如：搜索框输入时，需要实时搜索。

```js
var vm = new Vue({
	el: '#watch-example',
	data: {
		keyword: '',
	},
	watch: {
		// 属性名和监听的属性需要同名
		keyword(newval, oldval) {
			console.log('新值：', newval, '旧值：', oldval);

			// 在这里可以做防抖，调用请求方法
		},
	},
});
```

### 对象写法

`watch` 选项也可以接受一个对象，用于配置 `watch`。

```js
var vm = new Vue({
	watch: {
		keyword: {
			// 是否在初始化时调用处理函数
			immediate: true,
			// 是否开启深度监视
			deep: true,
			// 处理函数
			handler(newval, oldval) {
				console.log('新值：', newval, '旧值：', oldval);
			},
		},
	},
});
```

对于对象和数组 `watch` 默认事件监视不到里面值的变化，需要使用 `deep` 选项开启深度监视。

当 `immediate` 为 `true` 时，初始化时调用处理函数，`newval` 是 u`ndefined`，`oldval` 是初始值，因为监视的值还没有被改变。

::: tip 注意
在监视对象或数组时，旧值将与新值相同，因为它们的引用指向同一个对象/数组。Vue 不会保留变更之前值的副本。
:::

### $watch

除了用配置项设置 `watch`，还可以使用 `vm$watch()` 方法。

语法：`vm.$watch(expOrFn, callback[, options])`

-   `expOrFn`：要观测的属性或则属性的键路径
-   `callback`：可以是一个回调函数, 也可以是一个对象(但是这个对象需要包含 `handle` 属性，就和 `watch` 选项的对象写法一样)
-   `options`：一个对象，这里可以配置 `deep` 和 `immediate`

```js
var vm = new Vue({
	el: '#app',
	data: {
		name,
	},
});

vm.$watch('name', function (newVal, oldVal) {
	console.log(newVal);
	console.log(oldVal);
});
```
键路径：

```js
var vm = new Vue({
	el: '#app',
	data: {
		obj: {
			a: 1
		},
	},
});
// 使用 obj.a 就可观察到 obj 中 a 的变化
vm.$watch('obj.a', function (newVal, oldVal) {
	console.log(newVal);
	console.log(oldVal);
});
```
