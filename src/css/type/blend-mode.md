# \<blend-mode\>

`<blend-mode>` 用于描述当元素重叠时，颜色应当如何呈现。它被用于 [`background-blend-mode`](/css/style/background#background-blend-mode-混合) 和 `mix-blend-mode` 属性。

取值：

- `normal`: 默认值，背景图像与背景颜色不进行混合。

- `multiply`: 背景颜色和背景图像的颜色相乘，产生较暗的效果。

- `screen`: 背景颜色和背景图像的颜色相加并减去相乘的结果，产生较亮的效果。

- `overlay`: 根据背景图像的颜色值的亮度来决定最终颜色，产生高对比度的效果。

- `darken`: 取背景颜色和背景图像的颜色中较暗的部分。

- `lighten`: 取背景颜色和背景图像的颜色中较亮的部分。

- `color-dodge`: 增加亮度，产生颜色较浅的效果。

- `color-burn`: 降低亮度，产生颜色较暗的效果。

- `hard-light`: 结合 `multiply` 和 `screen`，产生较强烈的对比度。

- `soft-light`: 根据背景图像的颜色值的亮度来决定最终颜色，产生柔和的效果。

- `difference`: 取两者颜色值的差的绝对值，产生高对比度的效果。

- `exclusion`: 产生一种颜色接近于灰色的效果。

- `hue`: 保留背景颜色的亮度和饱和度，采用背景图像的色调。

- `saturation`: 保留背景颜色的亮度和色调，采用背景图像的饱和度。

- `color`: 保留背景颜色的亮度，采用背景图像的色调和饱和度。

- `luminosity`: 保留背景颜色的色调和饱和度，采用背景图像的亮度。

## 参考

[MDN \<blend-mode\>](https://developer.mozilla.org/zh-CN/docs/Web/CSS/blend-mode)
