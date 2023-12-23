# 列表样式

## list-style

`list-style` 是 `list-style-type`, `list-style-image`, 和 `list-style-position`，属性的简写，每个属性的取值请看下面。

```css
ul {
	list-style: inside url('sqpurple.gif');
}
```

## list-style-image

`list-style-image` 属性用来指定一个能用来作为列表元素标记的图片。

```css
.list {
	list-style-image: none; /* 默认值 */
	list-style-image: url('starsolid.gif');
}
```

## list-style-position

`list-style-position` 属性指定标记框在主体块框中的位置。

```css
.list {
	/* 标记盒在主块盒的外面（默认值） */
	list-style-position: outside;
	/* 标记盒是主要块盒中的第一个行内盒，处于元素的内容流之后 */
	list-style-position: inside;
}
```

<ul class="list_style_position">
  <li class="item1">Item 1（outside）</li>
  <li class="item2">Item 2（inside）</li>
</ul>

<style>
.list_style_position li{
  border: 1px solid red;
}
.list_style_position .item1{
  list-style-position: outside;
}
.list_style_position .item2{
  list-style-position: inside;
}
</style>

## list-style-type

`list-style-type` 属性用于设置列表元素的 marker（比如圆点、符号、或者自定义计数器样式）。

-   ul 元素下 li 元素的 `list-style-type` 默认值 `disc`。
-   ol 元素下 li 元素的 `list-style-type` 默认值 `decimal`。

```css
.list {
	list-style-type: disc; /* 实心圆 */
	list-style-type: circle; /* 空心圆 */
	list-style-type: square; /* 方块 */
	list-style-type: decimal; /* 数字 */
	list-style-type: georgian; /* 格鲁吉亚数字 */
	list-style-type: trad-chinese-informal; /* 中文数字 */
	list-style-type: kannada; /* 埃纳德语数字 */
}
```

更多取值请看下面的 demo

<listStyleType />
