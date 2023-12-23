# 值与单位

所有的 CSS 声明都包括一个“属性/值”对。由于属性不同，对应的值可能是单个整数或关键字，也可能是一串包含或不包含单位的关键字和值的集合。CSS 属性接受一组共同的数据类型（属性的值和对应的单位）。

## 全局值

-   `inherit`: 继承父元素该属性的值。
-   `initial`: 属性的初始值。
-   `unset`: 表示如果属性有继承值，则使用继承值；否则，使用初始值。
-   `revert`: 重置属性为用户代理样式表的默认值。

```css
p {
	color: inherit;
	color: initial;
	color: unset;
	color: revert;
}
```

::: warning
并非所有属性都支持所有的全局值。
:::

## 文本数据类型

-   `<custom-ident>` [mdn](https://developer.mozilla.org/zh-CN/docs/Web/CSS/custom-ident)
-   作为 `<ident>` 预定义的关键字
-   [`<string>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/string)
-   [`<url>()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/url)

文本数据类型要么是 `<string>`，要么是一系列字符的合集，或者是 `<ident>` —— 一个实质上是不带引号的字符串的"CSS 标识符"。一个 `<string>` 必须被单引号或者双引号所包围。CSS 标识符，在标准中所列出的 `<ident>` 或者 `<custom-ident>` 则必须不带引号。

在 CSS 标准中，属性的值可以由 Web 开发者指定，例如关键帧动画（keyframe animations），字体的名称（font-family names），或者是被列为 [`<custom-ident>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/custom-ident) 和 / 或 [`<string>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/string) 的栅格区域（grid-areas）。

当允许使用带引号或者不带引号的两种用户定义的文本属性值时，标准列出为 `<custom-ident> | <string>`，也就是说引号是可选的。例如在指定动画的名称时：

```css
@keyframe validIdent {
	/* keyframes go here */
}
@keyframe 'validString' {
	/* keyframes go here */
}
```

有些文本属性值不允许被引号包围。例如， [`grid-area`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-area) 属性对应的值可以是`<custom-ident>`，所以假设有一个栅格区域名为 `content` ，我们必须不带引号地使用：

```css
.item {
	grid-area: content;
}
```

相比之下，另一种数据类型是 [`<string>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/string)，例如 [`content`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/content) 属性的值则必须被引号包围：

```css
.item::after {
	content: 'This is my content.';
}
```

大多数时候你可以随心所欲地创建任何名称作为标识符，甚至包括使用 emoji 表情。然而标识符不能是 `none`，`unset`，`initial`，或者 `inherit`，以两条短横线开头。并且，你也不可以使用任何已经预定义的 CSS 关键字。查看 [`<custom-ident>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/custom-ident) 和 [`<string>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/string) 页面了解更多信息。

## 预定义的关键值

预定义的关键值是由 CSS 标准为属性定义的文本值。这些关键字也属于 CSS 标识符，因此在使用时无需用引号包围。

当在 CSS 标准或者 MDN 属性页面中查看某个 CSS 属性时，该属性所有允许的取值都会以下面表格的形式列出。下面的值是 [`float`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/float) 属性可以取的预定义值：

```
left | right | none | inline-start | inline-end
```

这些值在使用时不需要引号：

```css
.box {
	float: left;
}
```

## CSS 全局范围内的值

预定义的关键值往往是针对某一个属性的。作为补充，所有 CSS 属性都可以接受 CSS 全局范围内的值：[`initial`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/initial)，[`inherit`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/inherit) 和 [`unset`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/unset)。这些全局范围的值往往指定了一种默认的行为。

`initial`指定了当前值作为属性的初始值。`inherit`关键字则指定当前元素的属性值基于父元素进行计算，即继承。

`unset`关键字的作用是`inherit`或`initial`中的一者，取决于某个 CSS 属性是否可以自父元素继承。

[`revert` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/revert) 在 Cascade Level 4 标准中被引入，但这一属性值还没有较好的浏览器支持现状。

## URLs

[`<url>()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/url) 类型使用一个函数符号，接收一个`<string>`类型的 URL。这个 URL 可以是绝对地址或者相对地址。例如，如果你想要设置一张背景图片，那么你可以采用如下两种做法：

```css
.box {
	background-image: url('images/my-background.png');
}

.box {
	background-image: url('https://www.exammple.com/images/my-background.png');
}
```

`url()`的参数可以也可以不使用引号。如果使用引号包围了 URL，那么它会被解析为一个`<url-token>`，包含对某些字符的额外转义。查看 [`<url>()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/url) 以获取更多信息。

## 数值数据类型

-   [`<integer>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/integer)
-   [`<number>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/number)
-   [`<dimension>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/dimension)
-   [`<percentage>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/percentage)

## 整数

一个整数包含 `0` 到 `9`的一个或多个十进制数字，例如 `1024` 或 `-55`。一个整数可能额外包含 `+` 或 `-` 前缀，在正负号和数值之间没有任何空格。

## 数值

[`<number>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/number) 表示一个真正的数，有可能又或者没有小数点和小数部分。例如 `0.255`，`128` 或 `-1.2`。数值也可能包含前缀 `+` 或 `-` 标识正负。

## 尺寸

[`<dimension>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/dimension) 是一个包含单位的 `<number>`，例如 `45deg`，`100ms`，或者 `10px`。单位是大小写敏感的，且数值和单位之间不允许有任何的空格或其他字符。例如 `1 cm` 不是一个合法的值。

## 长度单位

一个距离单位，或这也称为长度（length），允许作为属性的值。它被描述为`<length>`类型。CSS 中有两种长度：相对和绝对。

相对长度单位基于其他元素的长度。例如 `em` 基于该元素的字号大小，`vh` 则与设备视口的高度有关。

| 单位   | 等价于                                                                   |
| :----- | :----------------------------------------------------------------------- |
| `em`   | 元素的字号                                                               |
| `ex`   | 字体的 X 字高（x-height）                                                |
| `cap`  | 字体中大写字母的标称高度                                                 |
| `ch`   | 元素字体中窄字符的平均字符前进量，由“0”（ZERO，U+0030）字符表示          |
| `ic`   | 元素字体中全宽字符的平均字符前进量，由“水”（CJK 水字形，U+6C34）字符表示 |
| `rem`  | 根元素的字体大小                                                         |
| `lh`   | 元素的行高                                                               |
| `rlh`  | 根元素的行高                                                             |
| `vw`   | 视口宽度的 1%                                                            |
| `vh`   | 视口高度的 1%                                                            |
| `vi`   | 根元素内联轴上视口大小的 1%                                              |
| `vb`   | 根元素块轴上视口大小的 1%。                                              |
| `vmin` | 视口较小维度的 1%                                                        |
| `vmax` | 视口较大维度的 1%                                                        |

绝对长度单位固定到物理长度：英寸或厘米。因此，这些单位在输出为固定大小媒体（如打印品）时更有用。例如，mm 是物理毫米，相当于一厘米的十分之一。

| 单位 | 名称                              | 等价于              |
| :--- | :-------------------------------- | :------------------ |
| `cm` | Centimeters(厘米)                 | 1cm = 96px/2.54     |
| `mm` | Millimeters(毫米)                 | 1mm = 1/10 厘米     |
| `Q`  | Quarter-millimeters(四分之一毫米) | 1Q = 1/40 厘米      |
| `in` | Inches(英寸)                      | 1in = 2.54cm = 96px |
| `pc` | Picas(派卡)                       | 1pc = 1/16 英寸     |
| `pt` | Points(点)                        | 1pt = 1/72 英寸     |
| `px` | Pixels(像素)                      | 1px = 1/96 英寸     |

## 角度单位

当包含长度值时，如果长度为 0，则不需要单位标识符。否则，单位标识符是必需的，不区分大小写，并且必须紧跟在值的数字部分之后，中间不能有空格。

角度单位 角度值由[`<angle>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/angle)类型表示，接受以下值：

| 单位   | 名称             | 描述                      |
| :----- | :--------------- | :------------------------ |
| `deg`  | Degrees(度)      | 一个完整圆中有 360 度     |
| `grad` | Gradians(百分度) | 一个完整圆中有 400 百分度 |
| `rad`  | Radians(弧度)    | 一个完整圆中有 2π 弧度    |
| `turn` | Turns(圈)        | 一个完整圆中有 1 圈       |

## 时间单位

时间值由[`<time>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/time)类型表示。在包含时间值时，单位标识符（s 或 ms）是必需的。它接受以下值：

| 单位 | 名称               | 描述                |
| :--- | :----------------- | :------------------ |
| `s`  | Seconds(秒)        |                     |
| `ms` | Milliseconds(毫秒) | 一秒中有 1,000 毫秒 |

## 频率单位

频率值由类型[`<frequency>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/frequency)表示。它接受以下值。

| 单位  | 名称              | 描述                   |
| :---- | :---------------- | :--------------------- |
| `Hz`  | Hertz(赫兹)       | 表示每秒发生的次数     |
| `kHz` | KiloHertz(千赫兹) | 1 千赫兹等于 1000 赫兹 |

1Hz，也可以写作 1hz 或 1HZ，表示每秒一个周期。

## 分辨率单位

分辨率单位由类型[`<resolution>`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/resolution)表示。它表示图形表示（如屏幕）中的单个点的大小，通过指示这些点适合 CSS 英寸、厘米或像素的数量来表示。它接受以下值：

| 单位        | 描述             |
| :---------- | :--------------- |
| `dpi`       | 每英寸点数       |
| `dpcm`      | 每厘米点数       |
| `dppx`, `x` | 每像素单位的点数 |
