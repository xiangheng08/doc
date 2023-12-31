# 浮动

`float` 属性指定一个元素应沿其容器的左侧或右侧放置，允许文本和内联元素环绕它。该元素从网页的正常流动（文档流）中移除，但是仍然保持部分的流动性（与绝对定位相反）。

<float-examples />

浮动元素是 `float` 的计算值非 `none` 的元素。

```css
div {
	float: left; /* 左浮动 */
	float: right; /* 左浮动 */
	float: none; /* 不浮动 */
	float: inline-start; /* 向开始侧浮动 */
	float: inline-end; /* 向结束侧浮动 */
}
```

## 取值

-   `left`: 表明元素必须浮动在其所在的块容器左侧的关键字。

-   `right`: 表明元素必须浮动在其所在的块容器右侧的关键字。

-   `none`: 表明元素不进行浮动的关键字。

-   `inline-start`: 关键字，表明元素必须浮动在其所在块容器的开始一侧，在 `ltr` 脚本中是左侧，在 `rtl` 脚本中是右侧。

-   `inline-end`: 关键字，表明元素必须浮动在其所在块容器的结束一侧，在 `ltr` 脚本中是右侧，在 `rtl` 脚本中是左侧。

## 修改布局

由于 `float` 意味着使用块布局，它在某些情况下会修改 `display` 值的计算值：

| 指定值               | 计算值      |
| :------------------- | :---------- |
| `inline`             | `block`     |
| `inline-block`       | `block`     |
| `inline-table`       | `table`     |
| `table-row`          | `block`     |
| `table-row-group`    | `block`     |
| `table-column`       | `block`     |
| `table-column-group` | `block`     |
| `table-cell`         | `block`     |
| `table-caption`      | `block`     |
| `table-header-group` | `block`     |
| `table-footer-group` | `block`     |
| `inline-flex`        | `flex`      |
| `inline-grid`        | `grid`      |
| _other_              | _unchanged_ |

## 浮动的影响

-   **脱离文档流**： 浮动的元素会脱离正常的文档流，周围的元素会围绕浮动元素。

-   **宽度收缩**： 浮动的元素宽度会收缩到其内容的宽度。

-   **高度塌陷**： 包含浮动元素的容器可能会发生高度塌陷，因为浮动元素被移出了正常文档流。

-   **父元素无法自适应高度**: 浮动元素脱离文档流，父元素无法正确包裹浮动元素。这意味着父元素的高度不会自动适应其包含的浮动元素的高度，可能导致布局混乱。

-   **相邻元素重叠**: 如果相邻元素没有足够的空间，可能会发生重叠，因为浮动元素会尽量靠近其容器的顶部。

## 清除浮动

### 使用 clear fix 技巧

在父容器的 CSS 样式中使用 clear fix 技巧。这是一种通过在父元素的伪元素中设置 `clear: both;` 来清除浮动的方法。

```html
<div class="clearfix">
	<!-- 包含浮动元素的内容 -->
</div>
```

```css
.clearfix::after {
	content: '';
	display: table;
	clear: both;
}
```

### 使用 overflow 属性

将包含浮动元素的容器的 `overflow` 属性设置为 `hidden` 或 `auto`，这也会触发 BFC（Block Formatting Context），从而清除浮动。

```html
<div class="container">
	<!-- 包含浮动元素的内容 -->
</div>
```

```css
.container {
	overflow: hidden; /* 或 overflow: auto; */
}
```

### 父容器设置高度

显式地为包含浮动元素的父容器设置一个高度。这个方法比较死板，一般不太推荐，因为容器内的内容可能会动态变化。

```html
<div class="container">
	<!-- 包含浮动元素的内容 -->
</div>
```

```css
.container {
	height: 100px; /* 适当设置一个高度 */
}
```

### 使用 flex box 布局

如果你可以使用 flex box 布局，那是一个更现代、更灵活的方式，不仅能解决清除浮动的问题，还可以轻松实现复杂的布局。

```html
<div class="container">
	<!-- 包含浮动元素的内容 -->
</div>
```

```css
.container {
	display: flex;
	flex-wrap: wrap; /* 如果希望子元素换行 */
}
```

[参考](https://developer.mozilla.org/zh-CN/docs/Web/CSS/float)
