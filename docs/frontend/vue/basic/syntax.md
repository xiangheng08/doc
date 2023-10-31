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
export default { data() { return {num: 1} } }
</script>

<demo>
<t-button size="small" @click="num++">改变值</t-button>
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

<script setup>
let rawHtml = ref('<span style="color: red">This should be red.</span>')
</script>

<demo>
<p>使用插值语法: {{ rawHtml }}</p>
<p>使用 v-html 指令: <span v-html="rawHtml"></span></p>
</demo>
