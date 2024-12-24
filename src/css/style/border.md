# 边框样式

## border-style

`border-style` 是一个简写属性，用来设定元素所有边框的样式。

<script setup>
import BorderStyleDemo from './components/border-style-demo.vue'
import BorderWidthDemo from './components/border-width-demo.vue'
import BorderColorDemo from './components/border-color-demo.vue'
import BorderRadiusDemo from './components/border-radius-demo.vue'
import BorderCollapseDemo from './components/border-collapse-demo.vue'
import BorderBlockDemo from './components/border-block-demo.vue'
import BorderInlineDemo from './components/border-inline-demo.vue'
</script>

<BorderStyleDemo />

```css
div {
	/* 上下左右的边框 */
	border-style: dashed;

	/* 上下 | 左右 */
	border-style: dotted solid;

	/* 上 | 左右 | 下 */
	border-style: hidden double dashed;

	/* 上 | 右 | 下 | 左 */
	border-style: none solid dotted dashed;
}
```

取值：

| `none`   | 和关键字 `hidden` 类似，不显示边框。在这种情况下，如果没有设定背景图片，[`border-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-width) 计算后的值将是 `0`，即使先前已经指定过它的值。在单元格边框重叠情况下，`none` 值优先级最低，意味着如果存在其他的重叠边框，则会显示为那个边框。 |
| :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hidden` | 和关键字 `none` 类似，不显示边框。在这种情况下，如果没有设定背景图片，[`border-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-width) 计算后的值将是 `0`，即使先前已经指定过它的值。在单元格边框重叠情况下，`hidden` 值优先级最高，意味着如果存在其他的重叠边框，边框不会显示。       |
| `dotted` | 显示为一系列圆点。标准中没有定义两点之间的间隔大小，视不同实现而定。圆点半径是 [`border-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-width) 计算值的一半。                                                                                                                         |
| `dashed` | 显示为一系列短的方形虚线。标准中没有定义线段的长度和大小，视不同实现而定。                                                                                                                                                                                                                            |
| `solid`  | 显示为一条实线。                                                                                                                                                                                                                                                                                      |
| `double` | 显示为一条双实线，宽度是 [`border-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-width) 。                                                                                                                                                                                           |
| `groove` | 显示为有雕刻效果的边框，样式与 `ridge` 相反。                                                                                                                                                                                                                                                         |
| `ridge`  | 显示为有浮雕效果的边框，样式与 `groove` 相反。                                                                                                                                                                                                                                                        |
| `inset`  | 显示为有陷入效果的边框，样式与 `outset` 相反。当它指定到 [`border-collapse`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-collapse) 为 `collapsed` 的单元格时，会显示为 `groove` 的样式。                                                                                                  |
| `outset` | 显示为有突出效果的边框，样式与 `inset` 相反。当它指定到 [`border-collapse`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-collapse) 为 `collapsed` 的单元格时，会显示为 `ridge` 的样式。                                                                                                    |

以下属性和 `border-style` 的取值一样

-   `border-top-style`
-   `border-right-style`
-   `border-bottom-style`
-   `border-left-style`
-   `border-block-style `
-   `border-block-start-style`
-   `border-block-end-style`
-   `border-inline-style`
-   `border-inline-start-style`
-   `border-inline-end-style`

`border-style` 也是以下属性的简写

-   `border-top-style`
-   `border-right-style`
-   `border-bottom-style`
-   `border-left-style`

[参考](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-style)

## border-width

`border-width` 属性用于设置盒子模型的边框宽度。

<BorderWidthDemo />

```css
div {
	/* 上下左右的边框 */
	border-width: 5px;
	/* 上下 | 左右 */
	border-width: 2px 1.5em;
	/* 上 | 左右 | 下 */
	border-width: 1px 2em 1.5cm;
	/* 上 | 右 | 下 | 左 */
	border-width: 1px 2em 0 4rem;
}
```

取值：

-   `thin`: 细边线
-   `medium`: 中等边线
-   `thick`: 宽边线
-   `<length>`: 长度值

以下属性和 `border-width` 的取值一样

-   `border-top-width`
-   `border-right-width`
-   `border-bottom-width`
-   `border-left-width`
-   `border-block-width `
-   `border-block-start-width`
-   `border-block-end-width`
-   `border-inline-width`
-   `border-inline-start-width`
-   `border-inline-end-width`

`border-width` 也是以下属性的简写

-   `border-top-width`
-   `border-right-width`
-   `border-bottom-width`
-   `border-left-width`

[参考](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-width)

## border-color

`border-color` 属性用于设置盒子模型的边框颜色。

<BorderColorDemo />

```css
div {
	/* 上下左右的边框 */
	border-color: red;
	/* 上下 | 左右 */
	border-color: red #f015ca;
	/* 上 | 左右 | 下 */
	border-color: red yellow green;
	/* 上 | 右 | 下 | 左 */
	border-color: red yellow green blue;
}
```

以下属性和 `border-color` 的取值一样

-   `border-top-color`
-   `border-right-color`
-   `border-bottom-color`
-   `border-left-color`
-   `border-block-color `
-   `border-block-start-color`
-   `border-block-end-color`
-   `border-inline-color`
-   `border-inline-start-color`
-   `border-inline-end-color`

`border-color` 也是以下属性的简写

-   `border-top-color`
-   `border-right-color`
-   `border-bottom-color`
-   `border-left-color`

## border-radius

`border-radius` 属性用于设置元素的外边框圆角。当使用一个半径时确定一个圆形，当使用两个半径时确定一个椭圆。这个（椭）圆与边框的交集形成圆角效果。

<BorderRadiusDemo />

```css
div {
	/* 四个角 */
	border-radius: 4px;
	/* 左上/右下 | 右上/左下 */
	border-radius: 2px 4px;
	/* 左上 | 右上/左下 | 右下 */
	border-radius: 4px 3px 6px;
	/* 左上 | 右上 | 右下 | 左下 */
	border-radius: 10% 30% 50% 70%;

	/* --------分隔线-------- */

	border-radius: 1em / 5em;

	/* 等价于： */

	border-top-left-radius: 1em 5em;
	border-top-right-radius: 1em 5em;
	border-bottom-right-radius: 1em 5em;
	border-bottom-left-radius: 1em 5em;

	/* --------分隔线-------- */

	border-radius: 4px 3px 6px / 2px 4px;

	/* 等价于： */

	border-top-left-radius: 4px 2px;
	border-top-right-radius: 3px 4px;
	border-bottom-right-radius: 6px 2px;
	border-bottom-left-radius: 3px 4px;
}
```

取值

-   `<length>`: 长度值。负值无效。

-   `<percentage>`: 百分比值。水平半轴相对于盒模型的宽度；垂直半轴相对于盒模型的高度。负值无效。

`border-radius` 是以下属性的简写

-   `border-top-left-radius`
-   `border-top-right-radius`
-   `border-bottom-right-radius`
-   `border-bottom-left-radius`

## border-collapse

`border-collapse` 属性是用来决定表格的边框是分开的还是合并的。在分隔模式下，相邻的单元格都拥有独立的边框。在合并模式下，相邻单元格共享边框。

<BorderCollapseDemo />

```css
div {
	border-collapse: collapse;
	border-collapse: separate;
}
```

取值

-   `collapse`: 相邻的单元格共用同一条边框（采用 collapsed-border 表格渲染模型）。

-   `separate`: 默认值。每个单元格拥有独立的边框（采用 separated-border 表格渲染模型）。

::: tip
这个属性对非表格元素是不生效的，它只应用于具有表格布局的元素，如 `<table>`、`<thead>`、`<tbody>`、`<tfoot>`、`<tr>`、`<th>` 和 `<td>` 等。
:::

## border-spacing

border-spacing 属性指定相邻单元格边框之间的距离（只适用于 边框分离模式 ）。相当于 HTML 中的 cellspacing 属性，但是第二个可选的值可以用来设置不同于水平间距的垂直间距。

border-spacing 值也适用于表格的外层边框上，即表格的边框和第一行的、第一列的、最后一行的、最后一列的单元格之间的间距是由表格相应的（水平的或垂直的）边框间距（border-spacing）和相应的（上，右，下或左）内边距之和。

## border-block

`border-block` 为简写属性，用于在样式表中的某处同时设置**逻辑块**向边框的各属性值。

<BorderBlockDemo />

`border-block` 是以下属性的简写

-   `border-block-color`: 亦是以下属性的简写
    -   `border-block-start-color`
    -   `border-block-end-color`
-   `border-block-style`: 亦是以下属性的简写
    -   `border-block-start-style`
    -   `border-block-end-style`
-   `border-block-width`: 亦是以下属性的简写
    -   `border-block-start-width`
    -   `border-block-end-width`

## border-inline

`border-inline` 为简写属性，用于在样式表中的某处同时设置**逻辑行**向边框的各属性值。

<BorderInlineDemo />

`border-inline` 是以下属性的简写

-   `border-inline-color`: 亦是以下属性的简写
    -   `border-inline-start-color`
    -   `border-inline-end-color`
-   `border-inline-style`: 亦是以下属性的简写
    -   `border-inline-start-style`
    -   `border-inline-end-style`
-   `border-inline-width`: 亦是以下属性的简写
    -   `border-inline-start-width`
    -   `border-inline-end-width`
