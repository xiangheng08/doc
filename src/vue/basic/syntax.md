# 模板语法

Vue.js 使用了基于 HTML 的模板语法，可以非常方便地插入数据、操作 DOM 等。

## 插值

### 文本

最常见的形式就是使用“Mustache”语法 (双大括号) 的文本插值：

```html
<span>Message: {{ msg }}</span>
```

Mustache 标签中的内容会被当做 JavaScript 表达式进行解析，最终将解析的结果放入插值处。使用“Mustache”语法，可以直接访问实例上的属性、方法等，当对应数据更新时，插值处也会随之更新。

如果你想一次性地插值，当数据改变时，插值处的内容不会更新，可以使用 v-once 指令：

```html
<span v-once>这个将不会改变: {{ msg }}</span>
```

<script>
export default { data() { return {num: 1, counter: 0 } } }
</script>

<demo>
<button @click="num++">改变值</button>
<p>普通的: {{ num }}</p>
<p v-once>使用 v-once 指令: {{ num }}</p>
</demo>

### 原始 HTML

双大括号会将数据解释为普通文本，而非 HTML 代码。为了输出真正的 HTML，你需要使用 `v-html` 指令：

```js
new Vue({
	data: {
		rawHtml: '<span style="color: red">This should be red.</span>',
	},
});
```

```html
<p>使用插值语法: {{ rawHtml }}</p>
<p>使用 v-html 指令: <span v-html="rawHtml"></span></p>
```

<!-- <script setup>
let rawHtml = ref('<span style="color: red">This should be red.</span>')
</script>

<demo>
	<p>使用插值语法: {{ rawHtml }}</p>
	<p>使用 v-html 指令: <span v-html="rawHtml"></span></p>
</demo> -->

这个 `span` 的内容将会被替换成为 `rawHtml` 的值，直接作为 HTML，相当于把 `rawHtml` 给这个元素的 `innerHTML` 属性。注意，不能在 `v-html` 中使用模板语法或组件，Vue 不会解析其中的 DOM 模板或组件。

### Attribute

如果我们想在元素上绑定一些属性，可以使用 `v-bind` 指令：

```html
<div v-bind:id="dynamicId"></div>
```

现在这个 div 元素的 id 已经被动态绑定到数据 `dynamicId` 上了，会随着 `dynamicId` 的值变化而变化。

```html
<button v-bind:disabled="isDisabled">Button</button>
```

使用 `v-bind` 指令绑定的数据为 `null`、`undefined`、`false` 时，该属性不会渲染到元素上，这让控制一个元素的属性是否存在变得非常简单。

### 使用 JavaScript 表达式

除了在 `v-bind` 和“Mustache”语法中使用数据外，在插值语法中也可以使用 JavaScript 表达式。

```html
<p>{{ number + 1 }}</p>

<p>{{ bool ? 'YES' : 'NO' }}</p>

<p>{{ message.split('').reverse().join('') }}</p>

<div v-bind:id="'list-' + id"></div>
```

这些表达式会在所属 Vue 实例的数据作用域下作为 JavaScript 被解析。

注意：每个绑定都只能包含**单个表达式** ，所以下面的例子都不会生效。

```html
<!-- 这是语句，不是表达式 -->
<p>{{ var a = 1 }}</p>

<!-- 流控制也不会生效，请使用三元表达式 -->
<p>{{ if (ok) { return message } }}</p>
```

## 指令

指令 (Directives) 是带有 `v-` 前缀的特殊 attribute。指令 attribute 的值预期是**单个 JavaScript 表达式** (`v-for` 是例外情况)。指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM。

```html
<p v-if="seen">现在你看到我了</p>
```

这里，v-if 指令将根据表达式 seen 的值的真假来插入/移除 \<p\> 元素。

与 `v-if` 对应的还有 `v-else-if` 和 `v-else`，它们所在的元素或组件必须紧跟在有 `v-if` 或者 `v-else-if` 的元素或组件后面，不能单独使用。

```html
<div v-if="type === 'A'">A</div>
<div v-else-if="type === 'B'">B</div>
<div v-else-if="type === 'C'">C</div>
<div v-else>Not A/B/C</div>
```

还有 `v-on` 指令，它用于绑定 DOM 事件。

```html
<div id="example-1">
	<button v-on:click="counter += 1">Add 1</button>
	<p>The button above has been clicked {{ counter }} times.</p>
</div>
```

<!-- <demo>
	<div id="example-1">
		<t-button size="small" v-on:click="counter += 1">Add 1</t-button>
		<p>The button above has been clicked {{ counter }} times.</p>
	</div>
</demo> -->

### 动态参数 <version text="2.6.0+" />

从 2.6.0 开始，可以用方括号括起来的 JavaScript 表达式作为一个指令的参数：

```html
<a v-bind:[attributeName]="url"> ... </a>
```

这里的 `attributeName` 会被作为一个 JavaScript 表达式进行动态求值，求得的值将会作为最终的参数来使用。
例如，`attributeName` 其值为 `"href"`，那么这个绑定将等价于 `v-bind:href`。

同样地，你可以使用动态参数为一个动态的事件名绑定处理函数：

```html
<a v-on:[eventName]="doSomething"> ... </a>
```

在这个示例中，当 `eventName` 的值为 `"focus"` 时，将等价于 `v-on:focus`。

#### 对动态参数的值的约束

动态参数预期会求出一个字符串，异常情况下值为 null。这个特殊的 null 值可以被显性地用于移除绑定。任何其它非字符串类型的值都将会触发一个警告。

#### 对动态参数表达式的约束

动态参数表达式有一些语法约束，因为某些字符，如空格和引号，放在 HTML attribute 名里是无效的。例如：

```html
<!-- 这会触发一个编译警告 -->
<a v-bind:['foo' + bar]="value"> ... </a>
```

解决的办法是使用没有空格或引号的表达式，或用计算属性替代这种复杂表达式。

在 DOM 中使用模板时 (直接在一个 HTML 文件里撰写模板)，还需要避免使用大写字符来命名键名，因为浏览器会把 attribute 名全部强制转为小写：

```html
<a v-bind:[someAttr]="value"> ... </a>
<!--
在这个 a 元素中使用模板时这段代码会被转换为 `v-bind:[someattr]`。
注意在实例中必须有一个名为“someattr”的示例，否则代码不会工作。
-->
```

### 修饰符

修饰符 (modifier) 是以半角句号 . 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。例如，.prevent 修饰符告诉 v-on 指令对于触发的事件调用 event.preventDefault()：

```html
<form v-on:submit.prevent="onSubmit">...</form>
```

### 缩写

#### v-bind 缩写

```html
<!-- 完整语法 -->
<a v-bind:href="url">...</a>

<!-- 缩写 -->
<a :href="url">...</a>

<!-- 动态参数的缩写 (2.6.0+) -->
<a :[key]="url"> ... </a>
```

#### v-on 缩写

```html
<!-- 完整语法 -->
<a v-on:click="doSomething">...</a>

<!-- 缩写 -->
<a @click="doSomething">...</a>

<!-- 动态参数的缩写 (2.6.0+) -->
<a @[event]="doSomething"> ... </a>
```
