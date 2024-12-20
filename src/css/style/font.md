# 字体样式

## font-family 字体

`font-family` 属性，用于定义文本的字体。可以定义一个或多个字体，字体之间用逗号分隔。每个字体为字体名或者字体族名。

浏览器会选择列表中第一个该计算机上有安装的字体，或者是通过 [`@font-face`](#font-face-自定义字体) 指定的可以直接下载的字体。

```css
p {
	font-family: Georgia, serif;
	font-family: 'Gill Sans', sans-serif;
	font-family: sans-serif;
	font-family: serif;
	font-family: cursive;
	font-family: system-ui;
}
```

## @font-face 自定义字体

`@font-face` 用于定义自定义字体，可以引入远程或本地的字体文件。

```css
@font-face {
	font-family: 'MyFont'; /* 字体名称，用于后续引用 */
	src: url('path/to/your/font.woff2') format('woff2'); /* 字体文件的路径和格式 */
	/* 可选属性，根据需要设置字体的其他属性，如 font-weight、font-style 等 */
	font-weight: normal;
	font-style: normal;
}
```

引用字体：

```css
p {
	font-family: 'MyFont';
}
```

加载本地字体：

```css
@font-face {
	font-family: 'MyFont';
	src: local('YourFontName'), url('path/to/your/font.woff2') format('woff2');
	/* 其他字体属性... */
}
```

首先，尝试从本地计算机上查找已安装的字体（YourFontName）。如果找不到，它将使用 url 提供的路径加载字体文件。

## font-size 字体大小

`font-size` 属性用于设置字体大小。接受绝对单位、相对单位、百分比和关键字。

```css
p {
	/*
      关键字
      xx-small, x-small, small, medium, large, x-large, xx-large
      基于浏览器默认字体大小的关键字。从小到大。
    */
	font-size: xx-small;
	font-size: x-small;
	font-size: small;
	font-size: medium;
	font-size: large;
	font-size: x-large;
	font-size: xx-large;

	/* 相对关键字 */
	font-size: smaller; /* 相对于父元素更小 */
	font-size: larger; /* 相对于父元素更大 */

	/* 绝对长度单位 */
	font-size: 14px;
	font-size: 12pt;
	font-size: 2cm;

	/* 相对长度单位 */
	font-size: 1.2em; /* 相对于父元素的字体大小 */
	font-size: 1.5rem; /* 相对于根元素（html）的字体大小 */
	font-size: 5vw; /* 相对于视口宽度的百分比 */

	/* 百分比：相对于父元素的字体大小的百分比 */
	font-size: 80%;
	font-size: 150%;
}
```

## font-style 字体样式

`font-style` 用于设置字体样式。

```css
p {
	font-style: normal; /* 正常（默认值） */
	font-style: italic; /* 斜体 */
	font-style: oblique; /* 倾斜 */
}
```

`oblique` 类似于斜体，但它是一种倾斜的样式，而不是真正的斜体。如果字体本身没有明确的斜体版本，浏览器可能会模拟斜体，这就是 `oblique` 的作用。

## font-weight 字体粗细

`font-weight` 属性用于指定字体的粗细程度。一些字体只提供 `normal` 和 `bold` 两种值。

```css
p {
	font-weight: normal; /* 正常 */
	font-weight: bold; /* 粗体 */

	font-weight: lighter; /* 相对于父元素的字体更细。 */
	font-weight: bolder; /* 相对于父元素的字体更粗 */

	/* 数字值：使用数字值可以直接指定字体的相对粗细，
	   范围从 100 到 900。常见的取值包括 100、200、...、900。 */
	font-weight: 1;
	font-weight: 100;
	font-weight: 100.6;
	font-weight: 123;
	font-weight: 200;
	font-weight: 300;
	font-weight: 321;
	font-weight: 400;
	font-weight: 500;
	font-weight: 600;
	font-weight: 700;
	font-weight: 800;
	font-weight: 900;
	font-weight: 1000;
}
```

## font-variant

`font-variant` 属性用于设置字体变体（variant）的属性。它允许你控制字体的不同变体效果，如小型大写字母、全角字符等。

```css
p {
	/* 表示使用标准的字体（默认值） */
	font-variant: normal;

	/* 将字母显示为小型大写字母，而不是普通的小写字母 */
	font-variant: small-caps;

	/* 类似于 small-caps，但所有字母都显示为小型大写字母，包括原本的大写字母 */
	font-variant: all-small-caps;

	/* 类似于 small-caps，但使用更细的小型大写字母 */
	font-variant: petite-caps;

	/* 类似于 all-small-caps，但使用更细的小型大写字母 */
	font-variant: all-petite-caps;

	/* 字母将以一种混合大小写样式呈现 */
	font-variant: unicase;

	/* 将字母显示为大型字母，适合用于标题 */
	font-variant: titling-caps;
}
```

## font-variant-caps

## font-variant-numeric

## font-variant-alternates

## font-variant-ligatures

## font-variant-east-asian
