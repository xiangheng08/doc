# 标签列表

## 图片标签

```html
<img src="图像URL" />
```

image 的缩写，单标签，src 是 `<img>` 标签的必须属性，他用于指定图像文件的路径和文件名

| 属性     | 属性值/单位 | 描述                     |
| -------- | ----------- | ------------------------ |
| `src`    | URL         | 图像的路径               |
| `alt`    | string      | 图像不能显示时的替换文本 |
| `title`  | string      | 鼠标悬停时显示的内容     |
| `width`  | px          | 设置图像的宽度           |
| `height` | px          | 设置图像的高度           |
| `border` | number      | 设置图像边框的宽度       |

## 超链接标签

```html
<a href="跳转目标" target="目标窗口的弹出方式">文本或图像</a>
<!-- target="_self"  默认窗口弹出方式 -->
<!-- target="_blank" 新窗口弹出 -->
```

| 属性     | 作用                                                                          |     |
| -------- | ----------------------------------------------------------------------------- | --- |
| `href`   | 用于指定链接目标的 url 地址，当为标签应用 href 属性时，它就具有了超链接的功能 |     |
| `target` | 用于指定链接页面的打开方式，其取值请看下方表格                                |     |

| target 属性值 | 说明                                   |
| :------------ | :------------------------------------- |
| `_self`       | 默认方式，即在当前窗口打开链接         |
| `_blank`      | 在一个全新窗口中打开链接               |
| `_top`        | 在顶层框架（iframe）中打开链接         |
| `_parent`     | 在当前框架（iframe）的上一层里打开链接 |

超链接根据链接对象的不同分为：

-   外部链接: `<a href="http://www.baidu.com">百度</a >`。
-   内部链接: `<a href="/index.html">首页</a >`。
-   锚点链接: `<a href="#two">跳转到第二段</a >`。

    通过 # 加 id 的方式实现滚动到，id 为 two 的标签位置。

-   空链接: `<a href="#">空链接</a >`。
-   下载文件: `<a href="img/1.jpg" download="1.jpg">下载图片</a >`。

## 注释标签

```html
<!-- 注释内容 -->
```

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

<div v-pre><big>大号</big></div>

### `<q>` 引用

<q>引用</q>

### `<code>` 代码

<!-- <code>代码</code> -->

<sub-page url="/examples/frontend/iframe/html/tag/code.html" height="40px" />

### `<pre>` 预格式化

保留空格和换行。

### `<var>` 变量

用于标记方程中的变量

<var>变量</var>

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

<sub-page url="/examples/frontend/iframe/html/tag/ul.html" height="100px" />

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

<sub-page url="/examples/frontend/iframe/html/tag/ol.html" height="100px" />

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

### `<caption>` 表格标题

表格标题，一般包含表格的标题。

```html
<table>
	<caption>
		表格标题
	</caption>
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

<sub-page url="/examples/frontend/iframe/html/tag/caption.html" height="120px" />

### `<colgroup>` 表格列分组

表格列分组，一般包含多个列。

```html
<table>
	<colgroup>
		<col style="background-color: pink;" />
		<col style="background-color: coral" />
	</colgroup>
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

<sub-page url="/examples/frontend/iframe/html/tag/colgroup.html" height="120px" />

### `<col>` 表格列

表格列，一般包含一个列。

### `<thead>` 表格头部

表格头部，一般放用于标题。

### `<tbody>` 表格主体

表格主体，放数据本体。

### `<tfoot>` 表格底部

表格底部，一般表格的脚注之类。

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
	<tfoot>
		<tr>
			<td>表格底部 1</td>
			<td>表格底部 2</td>
		</tr>
	</tfoot>
</table>
```

<sub-page url="/examples/frontend/iframe/html/tag/tfoot.html" height="120px" />

### `<tr>` 表格行

表格行，一般包含多个表格行。

### `<th>` 表格头部单元格

表格头部单元格，一般包含多个表格头部单元格。

### `<td>` 表格单元格

表格主体单元格，一般包含多个表格主体单元格。

### 显示边框

```html
<table border="1">
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

<sub-page url="/examples/frontend/iframe/html/tag/table-border.html" height="120px" />

### 合并单元格

-   跨行合并：`rowspan="合并单元格的个数"`
-   跨列合并：`colspan="合并单元格的个数"`

```html
<table border="1" style="text-align: center;">
	<tbody>
		<tr>
			<td>表格内容 1</td>
			<td colspan="2">表格内容 2</td>
		</tr>
		<tr>
			<td rowspan="2">表格内容 4</td>
			<td>表格内容 5</td>
			<td>表格内容 6</td>
		</tr>
		<tr>
			<td>表格内容 8</td>
			<td>表格内容 9</td>
		</tr>
	</tbody>
</table>
```

<sub-page url="/examples/frontend/iframe/html/tag/merge-cells.html" height="120px" />

### 表格属性

这些属性要写到标签 table 中

| 属性名      | 属性值              | 描述                                    |
| ----------- | ------------------- | --------------------------------------- |
| align       | left、center、right | 表格相对周围元素的对齐方式              |
| border      | 像素值 或 不写      | 表格边框大小，默认为不写，表示没有边框  |
| cellpadding | 像素值              | 单元边沿与其内容之间的空白，默认 1 像素 |
| cellspacing | 像素值              | 单元格之间的间距，默认 2 像素           |
| width       | 像素值或百分比      | 表格的宽度                              |
| height      | 像素值或百分比      | 表格的高度                              |

```html
<table align="center" border="1" cellpadding="10" cellspacing="0">
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

<sub-page url="/examples/frontend/iframe/html/tag/table-attribute.html" height="160px" />

## 表单元素

在 HTML 中，一个完整的表单通常由表单控件（也称为表单元素）、提示信息和表单域 3 个部分构成。

-   表单控件：包含了具体的表单功能项，如单行文本输入框、密码输入框、复选框、提交按钮、重置按钮等。

-   提示信息：一个表单中通常还需要包含一些说明性的文字，提示用户进行填写和操作。

-   表单域：它相当于一个容器，用来容纳所有的表单控件和提示信息，可以通过他定义处理表单数据所用程序的 url 地址，以及数据提交到服务器的方法。如果不定义表单域，表单中的数据就无法传送到后台服务器。

```html
<form action="url地址" method="提交方式" name="表单域名称">各种表单元素控件</form>
```

### 表单属性

| 属性    | 说明                                                |
| ------- | --------------------------------------------------- |
| action  | 用于指定接收并处理表单数据的服务器程序的 url 地址。 |
| method  | 用于设置表单数据的提交方式，其取值为 get 或 post。  |
| name    | 用于指定表单的名称，以区分同一个页面中的多个表单。  |
| enctype | 提交数据的 `MIME` 类型                              |

enctype 常用类型

| 值                                | 说明                                             |
| --------------------------------- | ------------------------------------------------ |
| application/x-www-form-urlencoded | 查询字符串（默认）                               |
| multipart/form-data               | 可以同时容纳二进制和文本数据（通常用于文件上传） |
| text/plain                        | 纯文本                                           |

### input 控件

```html
<input type="属性值" value="你好" />
```

#### input 类型

| 属性值           | 说明                                                           |
| ---------------- | -------------------------------------------------------------- |
| `text`           | 单行的文本输入框                                               |
| `password`       | 密码输入框                                                     |
| `email`          | 邮箱输入框                                                     |
| `number`         | 数字输入框                                                     |
| `tel`            | 电话号码输入框                                                 |
| `url`            | URL 输入框                                                     |
| `hidden`         | 隐藏域                                                         |
| `radio`          | 单选按钮                                                       |
| `checkbox`       | 复选框                                                         |
| `button`         | 按钮                                                           |
| `image`          | 图像形式的提交按钮，将提交到 action 属性所指定的地址。         |
| `reset`          | 重置按钮，重置按钮会清除表单中的所有数据。                     |
| `submit`         | 提交按钮，提交按钮会把表单数据发送到 action 属性所指定的地址。 |
| `file`           | 输入框用于上传文件                                             |
| `date`           | 日期选择器                                                     |
| `color`          | 颜色选择/拾色器                                                |
| `datetime-local` | 日期和时间的输入控件                                           |
| `month`          | 月份的输入控件                                                 |
| `time`           | 时间的输入控件                                                 |
| `week`           | 周的输入控件                                                   |
| `range`          | 滑块（firefox 不兼容）                                         |

#### input （表单元素）属性

| 属性名           | 属性说明                                                                                 | 可用类型                                                |
| ---------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `type`           | 规定输入字段的类型                                                                       | 共有                                                    |
| `placeholder`    | 提示用户在输入字段中输入什么                                                             | `text`, `search`, `url` 等输入类型                      |
| `readonly`       | 规定输入字段只读                                                                         | 共有                                                    |
| `disabled`       | 规定输入字段被禁用                                                                       | 共有                                                    |
| `accept`         | 规定文件上传的 MIME 类型                                                                 | `file`                                                  |
| `required`       | 规定输入字段必须被填写                                                                   | 共有                                                    |
| `autofocus`      | 规定在页面加载时输入字段应该自动获得焦点                                                 | 共有                                                    |
| `maxlength`      | 规定输入字段的最大长度                                                                   | `text`, `search`, `url` 等输入类型                      |
| `minlength`      | 规定输入字段的最小长度                                                                   | `text`, `search`, `url` 等输入类型                      |
| `value`          | 规定输入字段的初始值                                                                     | 共有                                                    |
| `max`            | 规定输入字段的最大合法值                                                                 | `number`, `date`, `time`, `datetime-local`              |
| `min`            | 规定输入字段的最小合法值                                                                 | `number`, `date`, `time`, `datetime-local`              |
| `alt`            | 规定图像的替代文本                                                                       | `image`                                                 |
| `size`           | 规定输入字段多少个字符宽度                                                               | `text`, `search`, `url` 等输入类型                      |
| `autocomplete`   | 规定是否启用输入字段的自动完成功能（比如浏览器的记忆功能自动填充文本），值：`off` / `on` | 共有                                                    |
| `checked`        | 规定默认情况下输入字段应该被选中                                                         | `checkbox`, `radio`                                     |
| `formaction`     | 提交表单时覆盖表单的 action 属性                                                         | `submit`, `image`                                       |
| `formenctype`    | 提交表单时覆盖表单的 enctype 属性                                                        | `submit`, `image`                                       |
| `formmethod`     | 提交表单时覆盖表单的 method 属性                                                         | `submit`, `image`                                       |
| `formnovalidate` | 提交表单时不应该验证输入字段                                                             | `submit`, `image`                                       |
| `formtarget`     | 提交表单时覆盖表单的 target 属性                                                         | `submit`, `image`                                       |
| `height`         | 规定图像的高度                                                                           | `image`                                                 |
| `list`           | 规定与输入字段关联的 `<datalist>` 元素的 id                                              | `text`, `search`, `url` 等输入类型                      |
| `multiple`       | 规定用户是否可多选文件                                                                   | `file`, `email`（是否可以输入多个邮箱地址，由逗号分隔） |
| `pattern`        | 规定输入字段的模式（正则表达式）                                                         | `text`, `search`, `url` 等输入类型                      |
| `src`            | 规定图像的 URL                                                                           | `image`                                                 |
| `step`           | 规定输入字段的合法数字间隔（步长）                                                       | `number`, `date`, `time`, `datetime-local`              |
| `width`          | 规定图像的宽度                                                                           | `image`                                                 |

以上表格并不全面，具体的还需查看官方文档

#### input number 数字输入框限制，最小值，最大值，步长

```html
<input type="number" step="2" min="1" max="20" />
```

<sub-page url="/examples/frontend/iframe/html/tag/input-number.html" height="60px"/>

#### input file 选择文件

```html
<p>
	<label for="file1">选择多文件</label>
	<input type="file" multiple id="file1" />
</p>

<p>
	<label for="file2">限制为图片</label>
	<input type="file" multiple id="file2" accept="image/*" />
</p>

<p>
	<label for="file3">限制后缀为 png，jpg 的图片</label>
	<input type="file" multiple id="file3" accept=".png, .jpg" />
</p>
```

`accept` 属性可以限制文件类型，多个用逗号分隔。每个值为文件的后缀或文件的 MIME 类型。但是这只是的进行了一下了过滤，并不能真正的阻止用户选择不符合要求的文件，真正的限制类型的还是需要自行判断。

<sub-page url="/examples/frontend/iframe/html/tag/input-file.html" height="140px"/>

#### pattern 正则表达式

```html
<!DOCTYPE html>
<html lang="zh-CN">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>input-pattern</title>
		<style>
			label {
				display: block;
				margin-top: 1em;
			}

			input:valid {
				background-color: palegreen;
			}

			input:invalid {
				background-color: lightpink;
			}
		</style>
	</head>
	<body>
		<form id="my_form">
			<label for="username">Username: (3-16 characters)</label>
			<input name="username" type="text" value="Sasha" pattern="\w{3,16}" required />

			<label for="pin">PIN: (4 digits)</label>
			<input name="pin" type="password" pattern="\d{4,4}" required />

			<br />
			<br />

			<button type="submit">submit</button>
		</form>

		<script>
			const form = document.getElementById('my_form');
			const password = document.querySelector('input[type="password"]');

			form.addEventListener('submit', (event) => {
				event.preventDefault();

				console.log('submit');
			});

			password.addEventListener('invalid', (event) => {
				console.log('password invalid');
			});
		</script>
	</body>
</html>
```

<sub-page url="/examples/frontend/iframe/html/tag/input-pattern.html" height="200px"/>

对于设置了验证规则的表单元素，如果验证失败，那么整个表单的 `submit` 事件就不会触发，而验证失败的表单元素会触发 `invalid` 事件。

同时，验证通过的表单元素，可以通过 `:valid` 伪类选择器来设置样式。而没有验证通过的表单元素则可以通过 `:invalid` 伪类选择器来设置样式。

#### inout 结合 datalist

```html
<form method="post">
	<input list="browsers" name="browser" />

	<datalist id="browsers">
		<option value="Internet Explorer"></option>
		<option value="Firefox"></option>
		<option value="Chrome"></option>
		<option value="Opera"></option>
		<option value="Safari"></option>
	</datalist>

	<input type="submit" value="提交" />
</form>
```

inout 结合 datalist 可以让用户通过下拉框来选择内容，同时带有一定的模糊搜索的功能。

<sub-page url="/examples/frontend/iframe/html/tag/input-datalist.html" height="200px"/>

### textarea 多行文本输入框

```html
<textarea name="content" rows="5" cols="50"> </textarea>
```

|  属性  |                描述                 |
| :----: | :---------------------------------: |
| `cols` | 文本域的可视宽度，默认为 20 (HTML5) |
| `rows` | 元素的输入文本的行数（显示的高度）  |

同时对于其他属性比如：`name`、`readonly`、`maxlength` 等，都是可以使用的。

### select 下拉列表框

`select` 属性

|    属性    |   描述   |
| :--------: | :------: |
| `multiple` | 是否多选 |

`option` 属性

|    属性    |                         描述                         |
| :--------: | :--------------------------------------------------: |
|  `value`   |                       选项的值                       |
| `selected` | 设置默认选中的选项（没有设置的情况下第一个默认选中） |

```html
<!DOCTYPE html>
<html lang="zh-CN">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>select</title>
	</head>
	<body>
		<select name="city">
			<option value="0">请选择</option>
			<option value="bj">北京</option>
			<option value="sh">上海</option>
			<option value="gz">广州</option>
		</select>
	</body>
</html>
```

<sub-page url="/examples/frontend/iframe/html/tag/select.html" height="200px"/>

#### 多选

声明这个属性后，大多数浏览器都会显示一个可滚动的列表框，而非一个下拉菜单。

注意：设置了多选，通过 `select` 元素的 `value` 属性来获取选中的选项的值，是不准确的，应该使用 `select` 元素的 `options` 属性，`options` 属性是一个伪数组，数组中的每个元素都是一个 `option` 元素，通过 `option` 元素的 `selected` 属性来判断是否选中，再通过 `option` 元素的 `value` 属性来获取选项的值。

<sub-page url="/examples/frontend/iframe/html/tag/select-multiple.html" height="200px"/>

#### 默认选中

<sub-page url="/examples/frontend/iframe/html/tag/select-selected.html" height="200px"/>

### label 元素说明

`label` 元素表示用户界面中某个元素的说明。可以通过 `for` 属性来指定关联元素的 id，当点击 `label` 元素时，浏览器就会自动将焦点转到与 `for` 属性相符的元素上。

比如：`label` 关联 `type` 等于 `checkbox` 的 `input` 元素，当点击 `label` 元素时关联的 `checkbox` 就会选中/取消选中。

<sub-page url="/examples/frontend/iframe/html/tag/label.html" height="200px"/>

另外，你也可以将元素直接放在 `<label>` 里，此时则不需要 `for` 和 `id` 属性，因为关联已隐式存在

```html
<label>
	复选框
	<input type="checkbox" name="peas" />
</label>
```
