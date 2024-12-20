# 轮廓样式

轮廓（outline）是绘制于元素周围的一条线，位于边框边缘的外围，轮廓线不会占据空间，可起到突出元素的作用。

## 轮廓与边框的区别

-   **占据空间**： 边框占据元素的空间，而轮廓不占据空间。
-   **影响布局**： 边框可能会影响元素的布局，而轮廓不会。
-   **样式**： 边框通常用于定义元素的外观，而轮廓通常用于视觉上的强调或交互效果。

## outline 轮廓

<script setup>
import OutlineDemo from './outline-demo.vue'
import OutlineStyleDemo from './outline-style-demo.vue'
import OutlineWidthDemo from './outline-width-demo.vue'
import OutlineOffsetDemo from './outline-offset-demo.vue'
</script>

<OutlineDemo />

```css
div {
	/* 样式 */
	outline: solid;

	/* 颜色 | 样式 */
	outline: #f66 dashed;

	/* 样式 | 宽度 */
	outline: inset thick;

	/* 颜色 | 样式 | 宽度 */
	outline: green solid 3px;
}
```

## outline-style 轮廓样式

```css
div {
	outline-style: auto; /* 浏览器自动选择 */
	outline-style: none; /* 无轮廓 */
	outline-style: dotted; /* 点线轮廓 */
	outline-style: dashed; /* 虚线轮廓 */
	outline-style: solid; /* 实线轮廓 */
	outline-style: double; /* 双实线轮廓 */
	outline-style: groove; /* 凹下状轮廓 */
	outline-style: ridge; /* 与 groove 相反，凸起状轮廓 */
	outline-style: inset; /* 嵌入状轮廓 */
	outline-style: outset; /* 与 inset 相反，突出状轮廓 */
}
```

<OutlineStyleDemo />

## outline-width 轮廓宽度

```css
div {
	/* 薄的，通常为 1px  */
	outline-width: thin;
	/* 中等的，通常为 3px  */
	outline-width: medium;
	/* 厚的，通常为 5px  */
	outline-width: thick;

	outline-width: 1px;
	outline-width: 0.1em;
}
```

<OutlineWidthDemo />

## outline-color 轮廓颜色

```css
div {
	outline-color: red;
	outline-color: #ff0000;
	outline-color: rgb(255, 0, 0);
	outline-color: rgba(255, 0, 0, 1);
}
```

## outline-offset 轮廓偏移

```css
div {
	outline-offset: 10px; /* 向外偏移10px */
	outline-offset: -10px; /* 向内偏移10px */
}
```

<OutlineOffsetDemo />
