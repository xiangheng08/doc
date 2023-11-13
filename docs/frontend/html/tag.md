# 标签

## 文本标签

### `<h1~h6>` 标题

标题标签，默认为块元素，字号逐渐变小，h1 最大，h6 最小。

```html
<h1>一级标题</h1>
<h2>二级标题</h2>
<h3>三级标题</h3>
<h4>四级标题</h4>
<h5>五级标题</h5>
<h6>六级标题</h6>
```

### `<p>` 段落

一段文本，默认为块元素，段落之间有间距。

```html
<p>段落1</p>
```

## 文本格式化标签

### `<br>` 换行

表示一个换行。

### `<hr>` 分割线

表示一个分割线。

<hr/>

### `<strong>` 加粗

<strong>加粗</strong>

### `<b>` 粗体

<b>粗体</b>

### `<em>` 斜体

<em>斜体</em>

### `<i>` 斜体

<i>斜体</i>

### `<cite>` 引用

<cite>引用</cite>

### `<sup>` 上标

文本<sup>上标</sup>

### `<sub>` 下标

文本<sub>下标</sub>

### `<del>` 删除线

<del>删除线</del>

### `<s>` 删除线

<s>删除线</s>

### `<u>` 下划线

<u>下划线</u>

### `<ins>` 插入

<ins>插入</ins>

### `<abbr>` 缩写

<abbr title="abbreviation">缩写</abbr>

### `<mark>` 标记

<mark>标记</mark>

### `<small>` 小号

<small>小号</small>

### `<big>` 大号

<big>大号</big>

### `<q>` 引用

<q>引用</q>

### `<code>` 代码

<!-- <code>代码</code> -->

<sub-page url="/examples/frontend/iframe/html/tag/code.html" height="40px" />

### `<pre>` 预格式化

保留空格和换行。

<pre>预格式化</pre>

### `<var>` 计算机变量

<var>计算机变量</var>

## 布局标签

### `<div>` 块元素

块元素，独占一行，可以设置宽高，默认宽度为 100%。

```html
<div>块元素</div>
```

### `<span>` 行内元素

行内元素，一行可以放多个，默认宽度为内容宽度。

```html
<span>行内元素</span>
```

### `<header>` 页眉

页眉，位于页面顶部，一般包含网站 logo、主导航、搜索框等。

```html
<header>页眉</header>
```

### `<nav>` 导航

导航，位于页眉之下，一般包含主导航、侧边导航、搜索框等。

```html
<nav>导航</nav>
```

### `<footer>` 页脚

页脚，位于页面底部，一般包含版权信息、友情链接、备案号等。

```html
<footer>页脚</footer>
```

### `<section>` 区块

区块，用于将页面内容进行分块，一般包含标题、段落、列表等内容。

```html
<section>区块</section>
```

### `<article>` 文章

文章，用于将页面内容进行分块，一般包含标题、段落、列表等内容。

```html
<article>文章</article>
```

### `<aside>` 侧边栏

侧边栏，位于页面主体内容之外，一般包含广告、友情链接、导航等内容。

```html
<aside>侧边栏</aside>
<!-- 侧边栏可以嵌套在区块、文章、侧边栏中 -->
<section>
	<aside>嵌套侧边栏</aside>
</section>
```

## 列表

### `<ul>` 无序列表

无序列表，列表项之间没有顺序，一般包含多个列表项。

默认标记（前缀）为实心圆点，可以设置为实心方块、实心圆、空心圆、空心方块等。

```html
<ul>
	<li>列表项 1</li>
	<li>列表项 2</li>
	<li>列表项 3</li>
</ul>
```

<sub-page url="/examples/frontend/iframe/html/tag/ul.html" height="90px" />

### `<ol>` 有序列表

有序列表，列表项之间有顺序，一般包含多个列表项。

默认标记（前缀）为数字，可以自定义设置。

```html
<ol>
	<li>列表项 1</li>
	<li>列表项 2</li>
	<li>列表项 3</li>
</ol>
```

<sub-page url="/examples/frontend/iframe/html/tag/ol.html" height="90px" />

### `<li>` 列表项

列表项，一般包含列表内容。

```html
<ul>
	<li>列表项 1</li>
	<li>列表项 2</li>
	<li>列表项 3</li>
</ul>
```

### `<dl>` 定义列表

定义列表，一般包含多个定义项，每个定义项包含名词和解释。

```html
<dl>
	<dt>名词</dt>
	<dd>解释</dd>
	<dt>名词</dt>
	<dd>解释</dd>
</dl>
```

<sub-page url="/examples/frontend/iframe/html/tag/dl.html" height="120px" />

## 表格

### `<table>` 表格

表格，用于在页面中展示数据。

```html
<table>
	<thead>
		<tr>
			<th>表头 1</th>
			<th>表头 2</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>表格内容 1</td>
			<td>表格内容 2</td>
		</tr>
		<tr>
			<td>表格内容 3</td>
			<td>表格内容 4</td>
		</tr>
	</tbody>
</table>
```

<sub-page url="/examples/frontend/iframe/html/tag/table.html" height="120px" />
