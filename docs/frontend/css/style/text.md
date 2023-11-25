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

