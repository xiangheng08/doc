# 背景样式

### background-color 背景颜色

`background-color` 属性用于设置元素的背景色，属性的值为颜色值或关键字"transparent"二者选其一

```css
.box {
	/* 关键字值 */
	background-color: red;

	/* 十六进制值 */
	background-color: #bbff00;

	/* RGB值 */
	background-color: rgb(255, 255, 128);

	/* HSLA值 */
	background-color: hsla(50, 33%, 25%, 0.75);

	/* 当前文本颜色，currentcolor 关键字表示元素的 color 属性的值 */
	background-color: currentcolor;

	/* 透明 */
	background-color: transparent;
}
```

参考：

-   [MDN background-color](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-color)

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

参考：

-   [background-image](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-image)

### background-repeat 背景重复

**`background-repeat`** 属性定义背景图像的重复方式。背景图像可以沿着水平轴，垂直轴，两个轴重复，或者不重复

默认情况下，重复的图像被剪裁为元素的大小，但它们可以缩放 (使用 `round`) 或者均匀地分布 (使用 `space`)

```css
/* 单值语法 */
background-repeat: repeat-x;
background-repeat: repeat-y;

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

设置背景图像是否随着页面滚动。

可选值:

-   `fixed`

    此关键属性值表示背景相对于视口固定。即使一个元素拥有滚动机制，背景也不会随着元素的内容滚动。

-   `local`

    此关键属性值表示背景相对于元素的内容固定。如果一个元素拥有滚动机制，背景将会随着元素的内容滚动，并且背景的绘制区域和定位区域是相对于可滚动的区域而不是包含他们的边框。

-   `scroll`

    此关键属性值表示背景相对于元素本身固定，而不是随着它的内容滚动（对元素边框是有效的）。

```css
.box {
	/* 关键 属性值 */
	background-attachment: scroll;
	background-attachment: fixed;
	background-attachment: local;
	/* 多值，用于控制多个背景 */
	background-attachment: local, scroll;
	background-attachment: scroll, local;
}
```

### background-blend-mode

[`background-blend-mode`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-blend-mode) CSS 属性定义该元素的背景图片，以及背景色如何混合。

```css
background-attachment: scroll, local;
```

### background-clip 背景裁剪

`background-clip` 设置元素的背景（背景图片或颜色）是否延伸到边框、内边距盒子、内容盒子下面。

```css
background-clip: border-box;
background-clip: padding-box;
background-clip: content-box;
background-clip: text;
```

可选值：

-   `border-box`: 背景延伸至边框外沿（但是在边框下层）。
-   `padding-box`: 背景延伸至内边距（padding）外沿。不会绘制到边框处。
-   `content-box`: 背景被裁剪至内容区（content box）外沿。
-   `text`(实验性): 背景被裁剪成文字的前景色。

### background-origin

`background-origin` 规定了指定背景图片`background-image`属性的原点位置的背景相对区域。

注意：当使用 `background-attachment` 为 fixed 时，该属性将被忽略不起作用。

可选值：

-   `border-box`: 背景图片的摆放以 border 区域为参考
-   `padding-box`: 背景图片的摆放以 padding 区域为参考
-   `content-box`: 背景图片的摆放以 content 区域为参考

```css
/* 关键字值 */
background-position: top;
background-position: bottom;
background-position: left;
background-position: right;
background-position: center;

/* 百分比值 */
background-position: 25% 75%;

/* 长度值 */
background-position: 0 0;
background-position: 1cm 2cm;
background-position: 10ch 8em;

/* 多个图片 */
background-position: 0 0, center;

/* 边缘偏移值 */
background-position: bottom 10px right 20px;
background-position: right 3em bottom 10px;
background-position: bottom 10px right;
background-position: top right 10px;
```

### background-position-x

**`background-position-x`** 属性用于设置背景图片在水平方向上的位置，取值和`background-position`一样

### background-position-y

**`background-position-y`** 属性用于设置背景图片在垂直方向上的位置，取值和`background-position`一样

### background-size

`background-size` 设置背景图片大小。图片可以保有其原有的尺寸，或者拉伸到新的尺寸，或者在保持其原有比例的同时缩放到元素的可用空间的尺寸

```css
/* 关键字 */
background-size: cover
background-size: contain

/* 一个值：这个值指定图片的宽度，图片的高度隐式的为 auto */
background-size: 50%
background-size: 3em
background-size: 12px
background-size: auto

/* 两个值 */
/* 第一个值指定图片的宽度，第二个值指定图片的高度 */
background-size: 50% auto
background-size: 3em 25%
background-size: auto 6px
background-size: auto auto

/* 逗号分隔的多个值：设置多重背景 */
background-size: auto, auto     /* 不同于 background-size: auto auto */
background-size: 50%, 25%, 25%
background-size: 6px, auto, contain
```

可选值：

-   `<length>`: 指定背景图片大小，不能为负值。
-   `<percentage>`(百分比): 指定背景图片相对背景区（background positioning area）的百分比。背景区由[`background-origin`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-origin)设置，默认为盒模型的内容区与内边距，也可设置为只有内容区，或者还包括边框。如果[`attachment`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-attachment) 为`fixed`，背景区为浏览器可视区（即视口），不包括滚动条。不能为负值。
-   `auto` : 以背景图片的比例缩放背景图片。
-   `cover`: 缩放背景图片以完全覆盖背景区，可能背景图片部分看不见。和 `contain` 值相反，`cover` 值尽可能大的缩放背景图像并保持图像的宽高比例（图像不会被压扁）。该背景图以它的全部宽或者高覆盖所在容器。当容器和背景图大小不同时，背景图的 左/右 或者 上/下 部分会被裁剪。
-   `contain`: 缩放背景图片以完全装入背景区，可能背景区部分空白。`contain` 尽可能的缩放背景并保持图像的宽高比例（图像不会被压缩）。该背景图会填充所在的容器。当背景图和容器的大小的不同时，容器的空白区域（上/下或者左/右）会显示由 background-color 设置的背景颜色。
