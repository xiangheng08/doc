# 标签

## 图片标签

```html
<img src="图像URL" />
```

image 的缩写，单标签，src 是 `<img>` 标签的必须属性，他用于指定图像文件的路径和文件名

| 属性   | 属性值 | 描述                     |
| ------ | ------ | ------------------------ |
| `src`  | URL    | 图像的路径               |
| alt    | 文本   | 图像不能显示时的替换文本 |
| title  | 文本   | 鼠标悬停时显示的内容     |
| width  | 像素   | 设置图像的宽度           |
| height | 像素   | 设置图像的高度           |
| border | 数字   | 设置图像边框的宽度       |

## 超链接标签

```html
<a href="跳转目标" target="目标窗口的弹出方式">文本或图像</a>
<!-- target="_self"  默认窗口弹出方式 -->
<!-- target="_blank" 新窗口弹出 -->
```

| 属性     | 作用                                                                                                                                |     |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------- | --- |
| `href`   | 用于指定链接目标的 url 地址，当为标签应用 href 属性时，它就具有了超链接的功能                                                       |     |
| `target` | 用于指定链接页面的打开方式，其取值有 `_self` 和 `_blan` 两种，其中`_self` 表示在当前窗口打开（默认值），`_blank` 表示新窗口中打开。 |     |

## 注释标签

```html
<!-- 注释内容 -->
```

## 转义字符

| 字符 | 十进制   | 转义字符   | 描述           |
| :--- | :------- | :--------- | :------------- |
|      | \&#8194; | \&ensp;    | 半方大的空白   |
|      | \&#8195; | \&emsp;    | 全方大的空白   |
|      | \&#160;  | \&nbsp;    | 不断行的空白格 |
| "    | \&#34;   | \&quot;    | 双引号         |
| @    | \&#64;   | \&commat;  | at 符号        |
| ©    | \&#169;  | \&copy;    | 版权符号       |
| ™    | \&#8482; | \&trade;   | 商标（美国）   |
| !    | \&#33;   | \&excl;    | 感叹号         |
| ¡    | \&#161;  | \&iexcl;   | 倒置感叹号     |
| :    | \&#58;   | \&colon;   | 冒号           |
| ,    | \&#44;   | \&comma;   | 逗号           |
| ·    | \&#183;  | \&middot;  | 中间点         |
| ‘    | \&#39;   | \&apos;    | 撇号           |
| ‘    | \&#8216; | \&lsquo;   | 左单引号       |
| “    | \&#8220; | \&ldquo;   | 左双引号       |
| (    | \&#40;   | \&lpar;    | 左括号         |
| )    | \&#41;   | \&rpar;    | 右括号         |
| \[   | \&#91;   | \&lsqb;    | 左方括号       |
| \]   | \&#93;   | \&rsqb;    | 右方括号       |
| \{   | \&#123;  | \&lcub;    | 左花括号       |
| \}   | \&#125;  | \&rcub;    | 右花括号       |
| §    | \&#167;  | \&sect;    | 分节符号       |
| \|   | \&#124;  | \&verbar;  | 竖线           |
| ‖    | \&#8214; | \&Verbar;  | 双竖线         |
| ∠    | \&#8736; | \&ang;     | 角             |
| #    | \&#35;   | \&num;     | 数字标志       |
| $    | \&#36;   | \&dollar;  | 美元符号       |
| %    | \&#37;   | \&percnt;  | 百分号         |
| ‰    | \&#8240; | \&permil;  | 千分号         |
| ‱    | \&#8241; | \&pertenk; | 万分号         |
| /    | \&#47;   | \&sol;     | 斜线符号       |
| \    | \&#92;   | \&bsol;    | 反斜线符号     |
| &    | \&#38;   | \&amp;     | and 符号       |
| ®    | \&#174;  | \&reg;     | 注册商标符     |
| ?    | \&#63;   | \&quest;   | 问号           |
| ¿    | \&#191;  | \&iquest;  | 倒置问号       |
| ¹    | \&#185;  | \&sup1;    | 上标 1         |
| ²    | \&#178;  | \&sup2;    | 上标 2         |
| ³    | \&#179;  | \&sup3;    | 上标 3         |
| ;    | \&#59;   | \&semi;    | 分号           |
| .    | \&#46;   | \&period;  | 句号           |
| •    | \&#8226; | \&bull;    | 加重号         |
| “    | \&#34;   | \&quot;    | 引号           |
| ”    | \&#8221; | \&rdquo;   | 右双引号       |
| ’    | \&#8217; | \&rsquo;   | 右单引号       |
| ¶    | \&#182;  | \&para;    | 段落符号       |
| …    | \&#8230; | \&hellip;  | 三点省略号     |
| ¥    | \&#165;  | \&yen;     | 元符号         |
| °    | \&#176;  | \&deg;     | 度符号         |
| ¦    | \&#166;  | \&brvbar;  | 间断竖线       |
| +    | \&#43;   | \&plus;    | 加号           |
| ×    | \&#215;  | \&times;   | 乘号           |
| =    | \&#61;   | \&equals;  | 等于号         |
| ≈    | \&#8776; | \&asymp;   | 约等于         |
| <    | \&#60;   | \&lt;      | 小于号         |
| ≤    | \&#8804; | \&le;      | 小于等于       |
| >    | \&#62;   | \&gt;      | 大于号         |
| ≥    | \&#8805; | \&ge;      | 大于等于       |
| ≠    | \&#8800; | \&ne;      | 不等于         |
| –    | \&#8211; | \&ndash;   | 减号           |
| ≡    | \&#8801; | \&equiv;   | 相当于         |
| ^    | \&#94;   | \&Hat;     | hat 符号       |
| π    | \&#961;  | \&pi;      | 圆周率         |
| √    | \&#8730; | \&radic;   | 平方根         |
| ∞    | \&#8734; | \&infin;   | 正无穷         |
| ±    | \&#177;  | \&plusmn;  | 加减符号       |
| ÷    | \&#247;  | \&divide;  | 除号           |
| ¼    | \&#188;  | \&frac14;  | 四分之一       |
| ½    | \&#189;  | \&frac12;  | 二分之一       |
| ¾    | \&#190;  | \&frac34;  | 四分之三       |

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

### `<td>` 表格主体单元格

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

| 属性名      | 属性值              | 描述                                             |
| ----------- | ------------------- | ------------------------------------------------ |
| align       | left、center、right | 规定表格相对周围元素的对齐方式                   |
| border      | “1"或”"             | 规定表格单元是否拥有边框，默认为""，表示没有边框 |
| cellpadding | 像素值              | 规定单元边沿与其内容之间的空白，默认 1 像素      |
| cellspacing | 像素值              | 规定单元格之间的空白，默认 2 像素                |
| width       | 像素值或百分比      | 规定表格的宽度                                   |
| height      | 像素值或百分比      | 规定表格的高度                                   |

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

<sub-page url="/examples/frontend/iframe/html/tag/table-property.html" height="160px" />

## 表单元素

在 HTML 中，一个完整的表单通常由表单控件（也称为表单元素）、提示信息和表单域 3 个部分构成。

-   表单控件：包含了具体的表单功能项，如单行文本输入框、密码输入框、复选框、提交按钮、重置按钮等。

-   提示信息：一个表单中通常还需要包含一些说明性的文字，提示用户进行填写和操作。

-   表单域：它相当于一个容器，用来容纳所有的表单控件和提示信息，可以通过他定义处理表单数据所用程序的 url 地址，以及数据提交到服务器的方法。如果不定义表单域，表单中的数据就无法传送到后台服务器。

```html
<form action="url地址" method="提交方式" name="表单域名称">各种表单元素控件</form>
```

### 表单属性

| 属性   | 属性值   | 作用                                                |
| ------ | -------- | --------------------------------------------------- |
| action | url 地址 | 用于指定接收并处理表单数据的服务器程序的 url 地址。 |
| method | get/post | 用于设置表单数据的提交方式，其取值为 get 或 post。  |
| name   | 名称     | 用于指定表单的名称，以区分同一个页面中的多个表单。  |

### 表单控件

#### input 控件

```html
<input type="属性值" value="你好" />
```

<table>
	<thead>
		<tr>
			<th>属性</th>
			<th>属性值</th>
			<th>说明</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td rowspan="9">type</td>
			<td>text</td>
			<td>单行文本输入框</td>
		</tr>
		<tr>
			<td>password</td>
			<td>密码输入框</td>
		</tr>
		<tr>
			<td>radio</td>
			<td>单选按钮</td>
		</tr>
		<tr>
			<td>checkbox</td>
			<td>复选框</td>
		</tr>
		<tr>
			<td>button</td>
			<td>普通按钮</td>
		</tr>
		<tr>
			<td>submit</td>
			<td>提交按钮</td>
		</tr>
		<tr>
			<td>reset</td>
			<td>重置按钮</td>
		</tr>
		<tr>
			<td>image</td>
			<td>图像形式的提交按钮</td>
		</tr>
		<tr>
			<td>file</td>
			<td>文件域</td>
		</tr>
		<tr>
			<td>name</td>
			<td>由用户自定义</td>
			<td>控件的名称</td>
		</tr>
		<tr>
			<td>value</td>
			<td>由用户自定义</td>
			<td>input控件中的默认文本值</td>
		</tr>
		<tr>
			<td>size</td>
			<td>正整数</td>
			<td>input控件在页面中的显示宽度</td>
		</tr>
		<tr>
			<td>checked</td>
			<td>boolean</td>
			<td>定义选择控件默认被选中的项</td>
		</tr>
		<tr>
			<td>maxlength</td>
			<td>正整数</td>
			<td>控件允许输入的最多字符数</td>
		</tr>
		<tr>
			<td>minlength</td>
			<td>正整数</td>
			<td>控件允许输入的最小字符数</td>
		</tr>
	</tbody>
</table>




