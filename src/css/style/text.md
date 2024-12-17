# 文本样式

## color 颜色

设置文本颜色

```css
p {
	color: rebeccapurple; /* #663399 */
	color: #00a400;
	color: rgb(214, 122, 127);
	color: hsl(30deg 82% 43%);
	color: hsla(237deg 74% 33% / 61%);
	color: hwb(152deg 0% 58% / 70%);
}
```

## direction 文本方向

```css
p {
	direction: ltr; /* 设置文本方向为从左到右（默认值） */
	direction: rtl; /* 设置文本方向为从右到左 */
}
```

## letter-spacing 文本间距

正值（增加间距），负值（减少间距）

```css
p {
	letter-spacing: normal; /* 字体的正常间距（默认值） */
	letter-spacing: 2px; /* 增加间距 */
	letter-spacing: -1px; /* 减少间距 */
}
```

## line-height 行高

```css
p {
	line-height: normal; /* 默认值，浏览器会根据字体大小自动计算 */
	line-height: 3.5; /* 数字则是乘以该元素的字体大小 */
	line-height: 3em;
	line-height: 34%;
}
```

## text-align 文本水平对其

```css
p {
	text-align: start; /* 如果内容方向是左至右，则等于 left，反之则为 right */
	text-align: end; /* 如果内容方向是左至右，则等于 right。，反之则为 left */
	text-align: left; /* 行内内容向左侧边对齐 */
	text-align: right; /* 行内内容向右侧边对齐 */
	text-align: center; /* 行内内容居中 */
	text-align: justify; /* 文字向两侧对齐，对最后一行无效 */
	text-align: justify-all; /* 和 `justify` 一致，但是强制使最后一行两端对齐 */
	text-align: match-parent; /* 和 inherit 类似，区别在于 start 和 end 的值根据父元素的 direction 确定，并被替换为恰当的 left 或 right 值 */
	text-align: <string>; /* 应用在单元格时，指定单元格内容相对于哪个字符对齐 */
}
```

## text-align-last 文本最后一行对其方式

值和 `text-align` 一致

## vertical-align 文本垂直对其

```css
p {
	vertical-align: baseline; /* 使元素的基线与父元素的基线对齐 */
	vertical-align: sub; /* 使元素的基线与父元素的下标基线对齐 */
	vertical-align: super; /* 使元素的基线与父元素的上标基线对齐 */
	vertical-align: text-top; /* 使元素的顶部与父元素的字体顶部对齐 */
	vertical-align: text-bottom; /* 使元素的底部与父元素的字体底部对齐 */
	vertical-align: middle; /* 使元素的中部与父元素的基线加上父元素 x-height（字母 x 高度）的一半对齐 */
	vertical-align: top; /* 使元素及其后代元素的顶部与整行的顶部对齐 */
	vertical-align: bottom; /* 使元素及其后代元素的底部与整行的底部对齐 */
	/* 长度值：使元素的基线对齐到父元素的基线之上的给定长度。可以是负数 */
	vertical-align: 10em;
	vertical-align: 4px;
	/* 百分比：使元素的基线对齐到父元素的基线之上的给定百分比，该百分比是 line-height 属性的百分比。可以是负数 */
	vertical-align: 20%;
}
```

## text-decoration 文本装饰线条

`text-decoration` 是 `text-decoration-line`、`text-decoration-color`、`text-decoration-style` 和较新的 `text-decoration-thickness` 属性的缩写。

```css
p {
	text-decoration: none; /* 默认值，没有装饰线 */
	text-decoration: underline; /* 文本下划线 */
	text-decoration: overline; /* 文本上划线 */
	text-decoration: line-through; /* 文本删除线 */
	text-decoration: underline double red 0.2rem; /* 红色的下划双实线，宽度 0.2rem */
}
```

### text-decoration-color 修饰线颜色

用于设置文本修饰线的颜色

```css
p {
	text-decoration-color: currentColor;
	text-decoration-color: red;
	text-decoration-color: #00ff00;
	text-decoration-color: rgba(255, 128, 128, 0.5);
	text-decoration-color: transparent;
}
```

### text-decoration-line 修饰线类型

```css
p {
	text-decoration-line: none; /* 表示没有文本修饰效果 */
	text-decoration-line: underline; /* 在文本的下方有一条修饰线 */
	text-decoration-line: overline; /* 在文本的上方有一条修饰线 */
	text-decoration-line: line-through; /* 有一条贯穿文本中间的修饰线 */
	text-decoration-line: blink; /* 文本闪烁（文本交替处于显示与隐藏状态）（弃用） */
	text-decoration-line: underline overline; /* 两条装饰线 */
	text-decoration-line: overline underline line-through; /* 多条装饰线 */
}
```

<span style="text-decoration-line: underline;">文本的下方有一条修饰线</span>&nbsp;
<span style="text-decoration-line: overline;">文本的上方有一条修饰线</span>&nbsp;
<span style="text-decoration-line: line-through;">有一条贯穿文本中间的修饰线</span>&nbsp;
<span style="text-decoration-line: underline overline;">两条装饰线</span>

### text-decoration-style 修饰线样式

```css
p {
	text-decoration-style: none; /* 没有线   */
	text-decoration-style: solid; /* 实线 */
	text-decoration-style: double; /* 双实线 */
	text-decoration-style: dotted; /* 点划线 */
	text-decoration-style: dashed; /* 虚线 */
	text-decoration-style: wavy; /* 波浪线 */
}
```

<span style="text-decoration: underline red solid;">实线</span>&nbsp;
<span style="text-decoration: underline red double;">双实线</span>&nbsp;
<span style="text-decoration: underline red dotted;">点划线</span>&nbsp;
<span style="text-decoration: underline red dashed;">虚线</span>&nbsp;
<span style="text-decoration: underline red wavy;">波浪线</span>

### text-decoration-thickness 装饰线粗细

```css
p {
	text-decoration-thickness: auto; /* 由浏览器为文本装饰线选择合适的粗细 */
	text-decoration-thickness: from-font; /* 字体文件中包含了首选的厚度值，如果字体文件中没有，则效果和设置为 auto 一样 */
	text-decoration-thickness: 0.1em;
	text-decoration-thickness: 3px;
	text-decoration-thickness: 10%;
}
```

## text-indent 首行缩进

```css
p {
	text-indent: 40px;
	text-indent: 2em;
	text-indent: 10%; /* 相对于父元素的宽度 */
}
```

<div style="width: 300px; border: 1px solid red">
  <p style="text-indent: 40px;">
    Lorem ipsum dolor sit amet, consectetur tempus aliquet, erat urna egestas
    velit, sit amet varius nibh nisi vitae nunc. Suspendisse potenti. Nulla
    facilisi. Donec euismod, nibh in tempus aliquet, erat urna egestas
  </p>
</div>

## text-shadow 文字阴影

可以为文字与 `decoration` 添加多个阴影，阴影值之间用逗号隔开。每个阴影值由元素在 X 和 Y 方向的偏移量、模糊半径和颜色值组成。

两个数值为：x, y，三个数字为：x, y, 模糊半径

```css
p {
	/* x, y, 模糊半径，颜色 */
	text-shadow: 1px 1px 2px pink;
	/* 颜色，x, y, 模糊半径 */
	text-shadow: #fc0 1px 0 10px;

	text-shadow: 5px 5px #558abb;

	text-shadow: red 2px 5px;

	text-shadow: 5px 10px;
	/* 多个阴影 */
	text-shadow: 1px 1px 2px red, 0 0 1em blue, 0 0 0.2em blue;
}
```

<p style="text-shadow: 1px 1px 2px pink;">文字阴影1</p>
<p style="text-shadow: #FC0 1px 0 10px;">文字阴影2</p>
<p style="text-shadow: 5px 5px #558ABB;">文字阴影3</p>
<p style="text-shadow: red 2px 5px;">文字阴影4</p>
<p style="text-shadow: 5px 10px;">文字阴影5</p>
<p style="text-shadow: 1px 1px 2px red, 0 0 1em blue, 0 0 0.2em blue;">多个文字阴影</p>

## text-transform 文本大小写

`text-transform` 属性指定如何将元素的文本大写。它可以用于使文本显示为全大写

```css
p {
	text-transform: none;
	text-transform: capitalize; /* 首字母大写 */
	text-transform: uppercase; /* 全部大写 */
	text-transform: lowercase; /* 全部小写 */

	/* 是一个关键字，它强制将字符（主要是表意文字和拉丁文字））--写在一个正方形内，使它们能够在通常的东亚文字（如中文或日文）中对齐。 */
	text-transform: full-width;

	/* 通常用于 <ruby> 注释文本，该关键字将所有小假名字符转换为等效的全尺寸假名，以补偿在 ruby 中通常使用的小字体的可读性问题。 */
	text-transform: full-size-kana;
}
```

[参考](https://developer.mozilla.org/zh-CN/docs/Web/CSS/text-transform)

## white-space 空白字符

`white-space` 属性用于设置如何处理元素内的空白字符。

这个属性指定了两件事：

-   空白字符是否合并，以及如何合并。
-   是否换行，以及如何换行。

```css
p {
	/* 连续的空白符会被合并。源码中的换行符会被当作空白符来处理。并根据填充行框盒子的需要来换行。 */
	white-space: normal; /* 默认值 */

	/* 和 normal 一样合并空白符，但阻止源码中的文本换行。 */
	white-space: nowrap;

	/* 连续的空白符会被保留。仅在遇到换行符或 <br> 元素时才会换行。 */
	white-space: pre;

	/* 连续的空白符会被保留。在遇到换行符或 <br> 元素时，或者根据填充行框盒子的需要换行。 */
	white-space: pre-wrap;

	/* 连续的空白符会被合并。在遇到换行符或 <br> 元素时，或者根据填充行框盒子的需要换行。 */
	white-space: pre-line;

	/* 
      与 pre-wrap 的行为相同，除了：
        任何保留的空白序列总是占用空间，包括行末的。
        每个保留的空白字符后（包括空白字符之间）都可以被截断。
        这样保留的空间占用空间而不会挂起，从而影响盒子的固有尺寸（最小内容——min-content——大小和最大内容——max-content——大小）。
    */
	white-space: break-spaces;
}
```

下面的表格总结了各种 white-space 关键字值的行为：

| 换行符         | 空格和制表符 | 文本换行 | 行末空格 | 行末的其他空白分隔符 |        |
| :------------- | :----------- | :------- | :------- | :------------------- | ------ |
| `normal`       | 合并         | 合并     | 换行     | 移除                 | 挂起   |
| `nowrap`       | 合并         | 合并     | 不换行   | 移除                 | 挂起   |
| `pre`          | 保留         | 保留     | 不换行   | 保留                 | 不换行 |
| `pre-wrap`     | 保留         | 保留     | 换行     | 挂起                 | 挂起   |
| `pre-line`     | 保留         | 合并     | 换行     | 移除                 | 挂起   |
| `break-spaces` | 保留         | 保留     | 换行     | 换行                 | 换行   |

[参考](https://developer.mozilla.org/zh-CN/docs/Web/CSS/white-space)

## word-spacing 单词间距

`word-spacing` 属性用于设置标签、单词之间的空格长度。

```css
p {
	word-spacing: normal; /* 正常的单词间距，取决于当前字体和浏览器 */
	word-spacing: 4px;
	word-spacing: -0.4ch;
	word-spacing: 20%; /* 像对于字符宽度 */
}
```

<p>正常间距：<span>Lorem ipsum dolor sit amet, consectetur tempus aliquet, erat</span></p>
<p>10px 间距：<span style="word-spacing: 10px;">Lorem ipsum dolor sit amet, consectetur tempus aliquet, erat</span></p>

## word-break 单词换行

`word-break` 属性用于设置如何处理单词内的断行。

```css
p {
	word-break: normal; /* 默认，使用浏览器默认的换行规则 */
	word-break: keep-all; /* 不允许单词内断行 */
	word-break: break-all; /* 允许单词内断行 */
	word-break: keep-word; /* 允许在单词内断行，但只允许在半角空格或连字符处断行（已弃用） */
}
```
