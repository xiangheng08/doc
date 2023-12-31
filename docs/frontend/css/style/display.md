# 显示特性

`display` 属性设置元素是否被视为块或者内联元素以及用于子元素的布局，例如流式布局、网格布局或弹性布局。

```css
div {
	/* 预设值 */
	display: block; /* 块级元素 */
	display: inline; /* 行内元素 */
	display: inline-block; /* 行内块级元素 */
	display: flex; /* 弹性布局容器 */
	display: inline-flex; /* 行内弹性布局容器 */
	display: grid; /* 网格布局容器 */
	display: inline-grid; /* 行内网格布局容器 */
	display: flow-root; /* 创建块级格式上下文 */

	/* 盒子生成 */
	display: none; /* 不显示元素 */
	display: contents; /* 使用子元素替代自身 */

	/* 两值语法 */
	display: block flow; /* 块级元素内联格式上下文 */
	display: inline flow; /* 行内元素内联格式上下文 */
	display: inline flow-root; /* 行内元素创建块级格式上下文 */
	display: block flex; /* 块级元素弹性布局容器 */
	display: inline flex; /* 行内元素弹性布局容器 */
	display: block grid; /* 块级元素网格布局容器 */
	display: inline grid; /* 行内元素网格布局容器 */
	display: block flow-root; /* 块级元素创建块级格式上下文 */

	/* 其他值 */
	display: table; /* 表格元素 */
	display: table-row; /* 表格行元素（所有表格元素都有等效的CSS显示值） */
	display: list-item; /* 列表项元素 */
}
```

关键值可以被分组为六个种类。

## 外部表现

这些关键字规定元素的外部显示类型，实际上就是其在流式布局中的角色：

-   `block`: 该元素生成一个块级元素盒，在正常的流中，该元素之前和之后产生换行。

-   `inline`: 该元素生成一个或多个内联元素盒，它们之前或者之后并不会产生换行。在正常的流中，如果有空间，下一个元素将会在同一行上。

## 内部表现

这些关键字规定了元素的内部显示类型，其定义了该内容布局时的格式上下文的类型（假设它是一个非替换元素）

-   `flow` (实验性): 该元素使用流式布局（块和内联布局）来排布它的内容。

    如果它的外部显示类型是 `inline` 或 `run-in`，并且它参与一个块或者内联格式上下文，那么它将生成一个内联盒子。否则它将生成一个块容器盒。

    根据其他属性的值（例如 `position`、`float` 或 `overflow`）以及它自身是否参与到块或者内联格式化上下文，它要么为它的内容建立新的块级格式化上下文（BFC），要么将其内容集成到其父元素的格式化上下文中。

-   `flow-root`: 该元素生成一个块级元素盒，其会建立一个新的块级格式化上下文，定义格式化上下文的根元素。

-   `table`: 该元素的行为类似于 HTML 中的 `<table>` 元素。它定义了一个块级别的盒子。

-   `flex`: 该元素的行为类似块级元素并且根据弹性盒模型布局它的内容。

-   `grid`: 该元素的行为类似块级元素并且根据网格模型布局它的内容。

-   `ruby` (实验性): 该元素的行为类似内联元素并且根据 ruby 格式化模型布局它的内容。它的行为像关联的 HTML 的 `<ruby>` 元素。

## 列表元素

-   `list-item`: 该元素为内容生成一个块级盒子和一个单独的列表元素内联盒子
    -   `list-item` 的单独值将导致元素的行为类似于一个列表元素。其可以与 `list-style-type` 和 `list-style-position` 一起使用。
    -   `list-item` 也可以与任意的 `block`、`inline`、`flow` 和 `flow-root` 关键字组合。

## 内部

一些布局模型，例如 table 和 ruby 有一个复杂的内置结构，它们的子孙后代可以扮演几个不同的角色。本节定义的这些“内部”display 值，仅在特定的布局模式下有用。

-   `table-row-group`: 该元素的行为类似于 HTML 的 `<tbody>` 元素。

-   `table-header-group`: 该元素的行为类似于 HTML 的 `<thead>` 元素。

-   `table-footer-group`: 该元素的行为类似于 HTML 的 `<tfoot>` 元素。

-   `table-row`: 该元素的行为类似于 HTML 的 `<tr>` 元素。

-   `table-cell`: 该元素的行为类似于 HTML 的 `<td>` (en-US) 元素。

-   `table-column-group`: 该元素的行为类似于 HTML 的 `<colgroup>` 元素。

-   `table-column`: 该元素的行为类似于 HTML `<col>` 元素。

-   `table-caption`: 该元素的行为类似于 HTML 的 `<caption>` 元素。

-   `ruby-base` (实验性): 该元素的行为类似于 HTML 的 `<rb>` 元素。

-   `ruby-text` (实验性): 该元素的行为类似于 HTML 的 `<rt>` 元素。

-   `ruby-base-container` (实验性): 该元素是作为匿名盒子生成的。

-   `ruby-text-container` (实验性): 该元素的行为类似于 HTML 的 `<rtc>` 元素。

## 盒

这些关键词定义一个元素到底是否产生 display 盒。

-   `contents`: 这些元素自身不会产生特定的盒子。它们被伪盒子（pseudo-box）和子盒子取代。请注意，CSS Display Level 3 规范中定义了 contents 值如何影响“异常元素”——这些元素不是纯粹由 CSS 盒模型概念呈现的（例如替换元素）。更多的细节请参见[附录 B：display 的影响：异常元素的内容](https://drafts.csswg.org/css-display/#unbox)。

    由于浏览器的一个错误，该元素目前不会被添加到无障碍树中——屏幕阅读器将不会看到里面的内容。更多细节，参见下面的[无障碍问题](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display#%E6%97%A0%E9%9A%9C%E7%A2%8D%E9%97%AE%E9%A2%98)。

-   `none`: 使元素不再显示，其对布局不会有影响（文档渲染得好像这个元素并不存在）。所有的后代元素也不会再显示。为了使元素占据一个它通常占据的空间，但实际上没有渲染任何东西，应该使用 `visibility` 属性。

## 预组合

CSS 2 为 `display` 属性使用单关键字的预组合的语法，对相同布局模式的块级和内联级变体需要单独的关键字。

-   `inline-block`: 该元素生成块级元素盒，如果它是一个单独的内联盒，它将和周围的内容一起流动（行为类似于替换元素）。

    它等同于 `inline flow-root`。

-   `inline-table`: inline-table 值在 HTML 中没有直接的映射。它行为类似于 HTML 的 `<table>` 元素，但实际是一个内联盒，而不是一个块级盒子。table 盒内部是一个块级上下文。

    它等同于 `inline table`。

-   `inline-flex`: 元素的行为类似于内联元素并且它的内容根据弹性盒模型布局。

    它等同于 `inline flex`。

-   `inline-grid`: 元素的行为类似于内联元素并且它的内容根据网格盒模型布局。

    它等同于 `inline grid`。

## visibility

`visibility` 属性显示或隐藏元素而不更改文档的布局。该属性还可以隐藏 `<table>` 中的行或列。

要隐藏并从文档布局中移除元素，请将 `display` 属性设置为 `none` 来代替 `visibility` 属性。

```css
div {
	visibility: visible; /* 元素可见 */
	visibility: hidden; /* 元素不可见（不绘制） */
	visibility: collapse;
}
```

取值：

-   `visible`: 元素框可见。

-   `hidden`: 元素框不可见（不绘制），但仍然影响常规的布局。如果将其子元素的 `visibility` 设置为 `visible`，则该子元素依然可见。元素无法获得焦点（例如通过 tab 索引进行键盘导航）。

-   `collapse`: `collapse` 关键字对于不同的元素有不同的效果：

    用于 `<table>` 行、列、列组和行组，将隐藏表格的行或列，并且不占用任何空间（与将 `display: none` 用于表格的行/列上的效果相当）。但是，计算其他行和列的大小时，仍会像显示折叠行或列中的单元格一样进行计算。此值允许从表中快速删除行或列，而不强制重新计算整个表的宽度和高度。

    折叠的弹性元素和 `ruby` 元素会被隐藏，它们本来将要占用的空间会被移除。

    对于其他元素，`collapse` 被视为与 `hidden` 相同。

参考：

-   [display - CSS：层叠样式表 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display)

-   [visibility - CSS：层叠样式表 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/visibility)
