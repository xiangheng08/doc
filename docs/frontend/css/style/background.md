# 背景样式

[参考](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background)

### background-color 背景颜色

`background-color` 属性用于设置元素的背景色，属性的值为颜色值或关键字 `transparent` 二者选其一

```css
.box {
	/* 透明（默认值） */
	background-color: transparent;

	/* 颜色关键字值 */
	background-color: red;

	/* 十六进制值 */
	background-color: #bbff00;

	/* RGB值 */
	background-color: rgb(255, 255, 128);

	/* HSLA值 */
	background-color: hsla(50, 33%, 25%, 0.75);

	/* 当前文本颜色，currentcolor 关键字表示元素的 color 属性的值 */
	background-color: currentcolor;
}
```

### background-image 背景图片

**`background-image`** 属性用于为一个元素设置一个或者多个背景图像（或渐变背景）。

多个值使用逗号分隔。

多值情况下第一个图像会在第二个图像上面，以此类推，类似图层结构。

如果同时还设置了 `background-color`，不用担心 `background-color` 被覆盖，背景图像会显示在背景颜色之上，`background-color` 相当于底色一样，在图层的最底层。

```css
.box {
	/* 无背景图 */
	background-image: none;

	/* 单值 */
	background-image: url('./images/catfront.png');

	/* 多值 */
	background-image: linear-gradient(to bottom, red, blue), url('./images/catfront.png');
}
```
### background-repeat 背景重复

**`background-repeat`** 属性定义背景图像的重复方式。背景图像可以沿着水平轴，垂直轴，两个轴重复，或者不重复

默认情况下，重复的图像被剪裁为元素的大小，但它们可以缩放 (使用 `round`) 或者均匀地分布 (使用 `space`)

```css
.box {
	/* 水平垂直方向都重复 */
	background-repeat: repeat;
	/* 不重复 */
	background-repeat: no-repeat;
	/* 只在水平方向都重复 */
	background-repeat: repeat-x;
	/* 只在垂直方向都重复 */
	background-repeat: repeat-y;
	/* 保证图像尺寸和比例，图像不会超出（例如宽度不能容纳两张图片，
	   那就只显示一张），其他区域留白 */
	background-repeat: space;
	/* 保证填充完整，图像可能变形，且均匀的分布 */
	background-repeat: round;
}
```

各个值解释（来自[MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-repeat)）

| 值          | 描述                                                                                                                                                                                                                                                                                                                                                         |
| :---------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `repeat`    | 图像会按需重复来覆盖整个背景图片所在的区域。最后一个图像会被裁剪，如果它的大小不合适的话。                                                                                                                                                                                                                                                                   |
| `space`     | 图像会尽可能得重复，但是不会裁剪。第一个和最后一个图像会被固定在元素 (element) 的相应的边上，同时空白会均匀地分布在图像之间。[`background-position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-position)属性会被忽视，除非只有一个图像能被无裁剪地显示。只在一种情况下裁剪会发生，那就是图像太大了以至于没有足够的空间来完整显示一个图像。 |
| `round`     | 随着允许的空间在尺寸上的增长，被重复的图像将会伸展 (没有空隙), 直到有足够的空间来添加一个图像。当下一个图像被添加后，所有的当前的图像会被压缩来腾出空间。例如，一个图像原始大小是 260px, 重复三次之后，可能会被伸展到 300px, 直到另一个图像被加进来。这样他们就可能被压缩到 225px.译者注：关键是浏览器怎么计算什么时候应该添加一个图像进来，而不是继续伸展。 |
| `no-repeat` | 图像不会被重复 (因为背景图像所在的区域将可能没有完全被覆盖). 那个没有被重复的背景图像的位置是由[`background-position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-position)属性来决定。                                                                                                                                                     |

> 是不是感觉看不懂，看不懂就对了，我也看不懂。上面的代码会比较通俗易懂点，但是不全面，也可以去 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-repeat) 看看，哪里有 demo

单值语法是完整的双值语法的简写：

| **单值**    | **等价于双值**        |
| :---------- | :-------------------- |
| `repeat-x`  | `repeat no-repeat`    |
| `repeat-y`  | `no-repeat repeat`    |
| `repeat`    | `repeat repeat`       |
| `space`     | `space space`         |
| `round`     | `round round`         |
| `no-repeat` | `no-repeat no-repeat` |

在双值语法中，第一个值表示水平重复行为，第二个值表示垂直重复行为。

参考：

-   [MDN background-repeat （里面有例子）](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-repeat)

### background-attachment 背景附着

设置背景图像是否随着滚动。

```css
.box{
	/* 背景相对于元素本身固定，而不是随着它的内容滚动（默认值） */
	background-attachment: scroll;
	/* 背景相对于视口固定 */
	background-attachment: fixed;
	/* 背景随着元素的内容滚动 */
	background-attachment: local;

	/* 多值，如果设置多个背景图片，每个值对应按照 background-image 设置的值一一对应 */
	background-attachment: fixed, local;
}
```

### background-origin 原点位置

`background-origin` 规定了指定背景图片`background-image`属性的原点位置的背景相对区域。

::: tip 注意
当使用 `background-attachment` 为 fixed 时，该属性将被忽略不起作用。
:::

```css
.box{
	/* 背景图片的位置以 border 区域为参考 */
	background-origin: border-box;
	/* 背景图片的位置以 padding 区域为参考（默认值） */
	background-origin: padding-box;
	/* 背景图片的位置以 content 区域为参考 */
	background-origin: content-box;
}
```

### background-position 背景图初始位置

设置背景图片设置初始位置。位置相对于由 `background-origin` 指定区域。

```css
.box{
	
	background-position: top; /* 贴着顶部，左右居中 */
	background-position: bottom; /* 贴着底部，左右居中 */
	background-position: left; /* 贴着左边，上下居中 */
	background-position: right; /* 贴着右边，上下居中 */
	background-position: center; /* 上下左右居中 */

	/* 百分比 x 轴相对于宽度，y 轴相对于高度 */
	background-position: 25% 75%;

	/* 长度单位 */
	background-position: 0 0;
	background-position: 1cm 2cm;
	background-position: 10ch 8em;

	/* 多值就是设置多张背景图，每个值对应按照 background-image 设置的值一一对应 */
	background-position: 0 0, center;

	/* 距离底部 10px，距离右边 20px */
	background-position: bottom 10px right 20px;
	background-position: right 3em bottom 10px;
	/* 距离底部 10px，贴着右边 */
	background-position: bottom 10px right;
	background-position: top right 10px;
}
```

也可以使用 `background-position-x` 和 `background-position-y` 分别（单独）设置 x 轴和 y 轴的位置。

### background-blend-mode 混合

定义该元素的背景图片，以及背景色如何混合。

取值：[`<blend-mode>`](/frontend/css/types/blend-mode)

```css
.box {
  background-blend-mode: multiply;
}
```

### background-clip 绘制区域

`background-clip` 用于指定背景的绘制区域，即决定背景是绘制在元素的哪个区域。

```css
.box{
	/* 背景将绘制在元素的边框框的区域，包括内边距框和边框（默认值） */
	background-clip: border-box;

	/* 背景将绘制在元素的内边距框的区域，不包括边框 */
	background-clip: padding-box;
	
	/* 背景将绘制在元素的内容框的区域，不包括内边距和边框 */
	background-clip: content-box;
	
	/* 背景被裁剪成文字的前景色（实验性） */
	background-clip: text;
}
```

### background-size

`background-size` 设置背景图片大小。图片可以保有其原有的尺寸，或者拉伸到新的尺寸，或者在保持其原有比例的同时缩放到元素的可用空间的尺寸

```css
.box{
	/* 原始大小（默认值） */
	background-size: auto;
	/* 缩放到覆盖整个背景区域，可能会裁剪部分图像 */
	background-size: cover;
	/* 缩放到整个图像都完全显示在背景区域内，可能会留有空白 */
	background-size: contain;

	/* 单值，同时设置宽高 */
	background-size: 50%;
	background-size: 3em;
	background-size: 12px;

	/* 双值，宽和高 */
	background-size: 50% auto;
	background-size: 3em 25%;
	background-size: auto 6px;
	background-size: auto auto;

	/* 设置多个背景图像，使用逗号分隔 */
	background-size: auto, auto;
	background-size: 50%, 25%, 25%;
	background-size: 6px, auto, contain;
}
```
