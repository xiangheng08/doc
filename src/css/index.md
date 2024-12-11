# CSS 起步

## 什么是 CSS

CSS 指层叠样式表 (**C**ascading **S**tyle **S**heets，缩写为 **CSS**) 是一种样式表语言,用于描述以 HTML 或 XML 编写的文档的表示形式。CSS 描述了元素应该如何在屏幕、纸张、语音或其他媒体上呈现。和 HTML 类似，CSS 也不是真正的编程语言，甚至不是标记语言。

若将 HTML 网页比作一幢宏伟的建筑，CSS 则类似于巧妙的内饰设计，为建筑主体赋予生机。CSS 的作用犹如在建筑的框架上施以绚烂的涂饰，添置精致的家具，从而赋予整体更为引人入胜的外观。

## 书写 / 引入方式

### 内联样式（Inline Styles）

在 HTML 标签中使用 style 属性直接定义样式。

```html
<p style="color: red; font-size: 16px;">这是一段文本</p>
```

### 内部样式表（Internal Styles）

在 HTML 文档的 `<head>` 标签中使用 `<style>` 标签定义样式。

```html
<!DOCTYPE html>
<html lang="zh-CN">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />

		<style>
			body {
				background-color: #f0f0f0;
				font-family: Arial, sans-serif;
			}

			h1 {
				color: blue;
			}

			/* 其他样式规则 */
		</style>

		<title>Document</title>
	</head>
	<body>
		<!-- 页面内容 -->
	</body>
</html>
```

### 外部样式表（External Styles）

将样式规则放在一个独立的 CSS 文件中，然后在 HTML 中通过 `<link>` 标签引入。

```html
<!DOCTYPE html>
<html lang="zh-CN">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<!-- 通过 link 标签引入外部样式表 -->
		<link rel="stylesheet" href="styles.css" />
		<title>Document</title>
	</head>
	<body>
		<!-- 页面内容 -->
	</body>
</html>
```

```css
/* styles.css 文件中的样式规则 */
body {
	background-color: #f0f0f0;
	font-family: Arial, sans-serif;
}

h1 {
	color: blue;
}

/* 其他样式规则 */
```
