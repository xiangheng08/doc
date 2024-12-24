# 事件处理

## 监听事件

可以用 v-on 指令监听 DOM 事件，并在触发时运行一些 JavaScript 代码。

```html
<div id="example-1">
	<button v-on:click="counter += 1">Add 1</button>
	<p>The button above has been clicked {{ counter }} times.</p>
</div>
```

```js
var example1 = new Vue({
	el: '#example-1',
	data: {
		counter: 0,
	},
});
```

## 事件回调

v-on 除了运行代码片段，还可以接收一个回调方法。

```html
<div id="example-2">
	<button v-on:click="greet">Greet</button>
</div>
```

```js
var example2 = new Vue({
	el: '#example-2',
	methods: {
		greet(event) {
			// `this` 在方法里指向当前 Vue 实例
			alert('Hello ' + this.name + '!');
			// `event` 是原生 DOM 事件的 event 对象
			if (event) {
				console.log(event);
			}
		},
	},
});
```

## 回调自定义参数

```html
<div id="example-3">
	<button v-on:click="say('hi')">Say hi</button>
	<button v-on:click="say('what')">Say what</button>
</div>
```

```js
new Vue({
	el: '#example-3',
	methods: {
		say: function (message) {
			alert(message);
		},
	},
});
```

如果需要原生的 event 对象，可以用特殊变量 `$event` 把它传入方法，

```html
<button v-on:click="warn('hello!', $event)">Submit</button>
```

```js
new Vue({
	methods: {
		warn: function (message, event) {
			// 现在我们可以访问原生事件对象
			if (event) {
				event.preventDefault();
			}
			alert(message);
		},
	},
});
```

## 事件修饰符

在事件处理程序中调用 `event.preventDefault()` 或 `event.stopPropagation()` 是非常常见的需求。尽管我们可以在方法中轻松实现这点，但更好的方式是：方法只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。

为了解决这个问题，Vue.js 为 v-on 提供了事件修饰符。之前提过，修饰符是由点开头的指令后缀来表示的。

-   `.stop`: 阻止事件冒泡。
-   `.prevent`: 阻止默认事件。
-   `.capture`: 使用事件的捕获模式。
-   `.self`: 只当事件是从侦听器绑定的元素本身触发时才触发回调。
-   `.once`: 只触发一次回调。
-   `.passive`: 事件的默认行为立即执行，无需等待事件回调执行完毕。

```html
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>
```

`.once` 不像其它只能对原生的 DOM 事件起作用的修饰符，`.once` 修饰符还能被用到自定义的组件事件上。

::: danger 注意
使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 `v-on:click.prevent.self` 会阻止所有的点击，而 `v-on:click.self.prevent` 只会阻止对元素自身的点击。

不要把 .passive 和 .prevent 一起使用，因为 .prevent 将会被忽略，同时浏览器可能会向你展示一个警告。请记住，.passive 会告诉浏览器你不想阻止事件的默认行为。
:::

## 按键修饰符

在监听键盘事件时，我们经常需要检查详细的按键。Vue 允许为 v-on 在监听键盘事件时添加按键修饰符：

```html
<!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
<input v-on:keyup.enter="submit" />
```

你可以直接将 [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) 暴露的任意有效按键名转换为 kebab-case 来作为修饰符。

```html
<input v-on:keyup.page-down="onPageDown" />
```

在上述示例中，处理函数只会在 $event.key 等于 PageDown 时被调用。

### 按键码

使用 `keyCode`

```html
<input v-on:keyup.13="submit" />
```

::: danger 注意
`keyCode` 的事件用法[已经被废弃了](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/keyCode)并可能不会被最新的浏览器支持。
:::

### 按键别名

-   `.enter`
-   `.tab`
-   `.delete`（捕获“删除”和“退格”键）
-   `.esc`
-   `.space`（空格）
-   `.up`
-   `.down`
-   `.left`
-   `.right`

你还可以通过全局 `config.keyCodes` 对象自定义按键修饰符别名：

```js
// 可以使用 `v-on:keyup.f1`
Vue.config.keyCodes.f1 = 112;
```

### 系统修饰键

-   `.ctrl`
-   `.alt`
-   `.shift`
-   `.meta`（windows 上对应 win 键，mac 上对应 command 键）

```html
<!-- Alt + C -->
<input v-on:keyup.alt.67="clear" />

<!-- Ctrl + Click -->
<div v-on:click.ctrl="doSomething">Do something</div>
```

::: danger 注意
请注意修饰键与常规按键不同，在和 `keyup` 事件一起用时，事件触发时修饰键必须处于按下状态。换句话说，只有在按住 `ctrl` 的情况下释放其它按键，才能触发 `keyup.ctrl`。而单单释放 `ctrl` 也不会触发事件。如果你想要这样的行为，请为 `ctrl` 换用 `keyCode`：`keyup.17`。
:::

### `.exact` 修饰符 <version text="2.5.0+"/>

`.exact` 修饰符允许你控制由精确的系统修饰符组合触发的事件。

```html
<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
<button v-on:click.ctrl="onClick">A</button>

<!-- 有且只有 Ctrl 被按下的时候才触发 -->
<button v-on:click.ctrl.exact="onCtrlClick">A</button>

<!-- 没有任何系统修饰符被按下的时候才触发 -->
<button v-on:click.exact="onClick">A</button>
```

### 鼠标按钮修饰符

-  `.left` 左键
-  `.right` 右键
-  `.middle` 中键

这些修饰符会限制处理函数仅响应特定的鼠标按钮。