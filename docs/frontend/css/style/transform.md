# transform 变换

`transform` 属性允许旋转，缩放，倾斜或平移给定元素。这是通过修改 CSS 视觉格式化模型的坐标空间来实现的。

```css
div {
	/* 不变换 */
	transform: none;

	/* 变换函数 */
	transform: matrix(1, 2, 3, 4, 5, 6);
	transform: translate(12px, 50%);
	transform: translateX(2em);
	transform: translateY(3in);
	transform: scale(2, 0.5);
	transform: scaleX(2);
	transform: scaleY(0.5);
	transform: rotate(0.5turn);
	transform: skew(30deg, 20deg);
	transform: skewX(30deg);
	transform: skewY(1.07rad);
	transform: matrix3d(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16);
	transform: translate3d(12px, 50%, 3em);
	transform: translateZ(2px);
	transform: scale3d(2.5, 1.2, 0.3);
	transform: scaleZ(0.3);
	transform: rotate3d(1, 2, 3, 10deg);
	transform: rotateX(10deg);
	transform: rotateY(10deg);
	transform: rotateZ(10deg);
	transform: perspective(17px);

	/* 多个变换函数，每个函数用空格分隔 */
	transform: translateX(10px) rotate(10deg) translateY(5px);
}
```

## 2D 转换

### translate 移动

-   `translate(x, y)`: 定义 2D 转换。
-   `translateX(x)`: 用于设置 x 轴的移动。
-   `translateY(y)`: 用于设置 y 轴的移动。

<!-- -   `translate3d(x, y, z)`: 定义 3D 转换，需要开启 3D 转换。 -->
<!-- -   `translateZ(z)`: 用于设置 z 轴的移动，需要开启 3D 转换。 -->

<transform-translate />

[参考](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function/translate)

### rotate 旋转

-   `rotate(angle)`: 定义 2D 旋转。

默认的旋转原点为中心，可通过 [`transform-origin`](#transform-origin-变换原点) 属性设置旋转原点位置。

<transform-rotate />

[参考](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function/rotate)

### scale 缩放

-   `scale(xy)`: 同时设置 x, y 轴缩放。
-   `scale(x, y)`: 分别设置 x, y 轴缩放。
-   `scaleX(x)`: 单独设置 x 轴的缩放。
-   `scaleY(y)`: 单独设置 y 轴的缩放。

可以使用数字和百分比，1 相当于 100% 即原始大小。

<transform-scale />

[参考](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function/scale)

### skew 倾斜

-   `skew(x-angle, y-angle)`: 定义 2D 倾斜转换。
-   `skewX(x-angle)`: 定义沿着 X 轴的 2D 倾斜转换。
-   `skewY(y-angle)`: 定义沿着 Y 轴的 2D 倾斜转换。

<transform-skew />

[参考](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function/skew)

### matrix 矩阵

`matrix` 属性用于使用六个参数，定义 2D 转换，使用 `matrix()` 方法。

<transform-matrix />

```css
div {
	transform: matrix(0.866, 0.5, -0.5, 0.866, 0, 0);
	transform: matrix(1, 0.5, -0.5, 1, 0, 0);
}
```

`transform: matrix(a, b, c, d, e, f);`

这里的参数表示一个 2D 变换矩阵，其中：

-   `a`: 控制水平缩放
-   `b`: 控制水平倾斜
-   `c`: 控制垂直倾斜
-   `d`: 控制垂直缩放
-   `e`: 控制水平平移
-   `f`: 控制垂直平移

矩阵的计算方式如下：

```
[ a  b  0 ]
[ c  d  0 ]
[ e  f  1 ]
```

这个矩阵会应用在元素的坐标系统上，从而实现相应的变换效果。

[参考](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function/matrix)

## 3D 转换

3D 转换需要在其父元素添加 `transform-style: preserve-3d;` 属性。

### matrix3d 3D 矩阵

`matrix3d` 它允许你通过一个 4x4 矩阵来定义元素的变换效果。这个矩阵包含了平移、旋转、缩放和透视等变换信息。

`transform: matrix3d(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p);`

其中，a 到 p 是矩阵中的 16 个值，依次对应矩阵的各个元素。这些值的含义如下：

-   a, b, c, d: 缩放和旋转效果
-   e, f, g, h: 透视效果
-   i, j, k: 平移效果
-   l, m, n, o: 透明度和其他效果

```css
div {
	/* x 轴平移 100 像素，y 轴平移 50 像素。 */
	transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 100, 50, 0, 1);
}
```

### translate 移动

-   `translate3d(_x_, _y_, _z_)`: 同时设置 x, y, z 三个方向的平移。
-   `translateX(_x_)`: 单独设置 x 轴的平移。
-   `translateY(_y_)`: 单独设置 y 轴的平移。
-   `translateZ(_z_)`: 单独设置 z 轴的平移。

### scale 缩放

-   `scale3d(_x_, _y_, _z_)`: 同时设置 x, y, z 三个方向的缩放。
-   `scaleX(_x_)`: 单独设置 x 轴的缩放。
-   `scaleY(_y_)`: 单独设置 y 轴的缩放。
-   `scaleZ(_z_)`: 单独设置 z 轴的缩放。

### rotate 旋转

-   `rotate3d(_x_, _y_, _z_, _angle_)`: 同时设置 x, y, z 三个方向的旋转。
-   `rotateX(_angle_)`: 单独设置 x 轴的旋转。
-   `rotateY(_angle_)`: 单独设置 y 轴的旋转。
-   `rotateZ(_angle_)`: 单独设置 z 轴的旋转。

### perspective 透视

`perspective(_n_)` 属性用于设置元素的透视效果。

## transform-origin 变换原点

`transform-origin` 属性用于元素变形的原点。

<transform-origin />

```css
div {
	/* One-value syntax */
	transform-origin: 2px;
	transform-origin: bottom;

	/* x-offset | y-offset */
	transform-origin: 3cm 2px;

	/* x-offset-keyword | y-offset */
	transform-origin: left 2px;

	/* x-offset-keyword | y-offset-keyword */
	transform-origin: right top;

	/* y-offset-keyword | x-offset-keyword */
	transform-origin: top right;

	/* x-offset | y-offset | z-offset */
	transform-origin: 2px 30% 10px;

	/* x-offset-keyword | y-offset | z-offset */
	transform-origin: left 5px -3px;

	/* x-offset-keyword | y-offset-keyword | z-offset */
	transform-origin: right bottom 2cm;

	/* y-offset-keyword | x-offset-keyword | z-offset */
	transform-origin: bottom right 2cm;
}
```

[参考](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-origin)

## transform-style 变换样式

`transform-style` 属性用于设置元素的子元素是位于 3D 空间中还是平面中。

<transform-style />

```css
div {
	transform-style: flat;
	transform-style: preserve-3d;
}
```

取值：

-   `flat`: 设置元素的子元素位于该元素的平面中。

-   `preserve-3d`: 指示元素的子元素应位于 3D 空间中。

::: tip
如果一个元素的元素需要使用 3D 变换，则需要在其父元素上设置 `transform-style: preserve-3d`。
:::

[参考](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-style)

## transform-box

`transform-box` 属性定义了与 `transform`、`transform-origin` 这两个属性有关联的布局框

```css
div {
	transform-box: border-box;
	transform-box: fill-box;
	transform-box: view-box;
}
```

取值：

-   `border-box`: border box 是用作引用框，一个表格（table）的 border-box 是 table 包装盒的边框，而不是表的边框。

-   `fill-box`: 使用对象边界框作为参考框。

-   `view-box`: 使用最近的 SVG 视口作为参考框。如果为创建 SVG 视口的元素指定了 viewBox 属性，参考框将被定位在由 viewBox 属性建立的坐标系的原点上，并且参考框的尺寸将设置为 viewBox 属性的宽度和高度值。

[参考](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-box)

## perspective 透视

`perspective` 属性用于指定观察者与 z=0 平面的距离，使具有三维位置变换的元素产生透视效果。z>0 的三维元素比正常大，而 z<0 时则比正常小，大小程度由该属性的值决定。

<perspective-examples />

三维元素在观察者后面的部分不会绘制出来，即 z 轴坐标值大于 `perspective` 属性值的部分。

默认情况下，消失点位于元素的中心，但是可以通过设置 `perspective-origin` 属性来改变其位置。

当该属性值不为 `0` 和 `none` 时，会创建新的 **层叠上下文**。在这种情况下，容器内元素的层叠关系像是使用了 `position: fixed;` 一样。

```css
div {
	perspective: none; /* 默认值 */

	perspective: 20px;
	perspective: 3.5em;
}
```

[参考](https://developer.mozilla.org/zh-CN/docs/Web/CSS/perspective)

## perspective-origin 透视原点

`perspective-origin` 指定了观察者的位置，用作 perspective 属性的消失点。

<perspective-origin />

```css
div {
	/* One-value syntax */
	perspective-origin: x-position;

	/* Two-value syntax */
	perspective-origin: x-position y-position;

	/* When both x-position and y-position are keywords,
       the following is also valid */
	perspective-origin: y-position x-position;
}
```

[参考](https://developer.mozilla.org/zh-CN/docs/Web/CSS/perspective-origin)

## backface-visibility

`backface-visibility` 属性定义当元素背面朝向观察者时是否可见。

<backface-visibility />

元素的背面是其正面的镜像。虽然在 2D 中不可见，但是当变换导致元素在 3D 空间中旋转时，背面可以变得可见。 （此属性对 2D 变换没有影响，它没有透视。）

```css
div {
	backface-visibility: visible;
	backface-visibility: hidden;
}
```

取值：

-   `visible`: 背面朝向用户时可见。

-   `hidden`: 背面朝向用户时不可见。

[参考](https://developer.mozilla.org/zh-CN/docs/Web/CSS/backface-visibility)
