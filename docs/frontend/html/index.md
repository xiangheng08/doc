# 起步

HTML（Hypertext Markup Language）是一种标记语言，用于创建和组织网页的内容（以.html 的文件）。HTML 通过使用标签（tag）来描述文档的结构。每个 HTML 标签都是由尖括号（<>）括起来的关键字，如`<html>`，`<head>`，`<body>`等。

HTML 标签通常以成对的方式出现，包括一个开始标签和一个结束标签，它们之间包围着特定的内容。例如：

```html
<p>这是一个段落。</p>
```

在上面的例子中，`<p>`是一个表示段落的开始标签，`</p>`是相应的结束标签。文本内容（"这是一个段落。"）位于开始和结束标签之间。

HTML 被用于创建网页的基本结构，它定义了页面的标题、段落、链接、图像等元素。网页的外观和样式通常由 CSS（Cascading Style Sheets）来控制，而交互性和动态性则由 JavaScript 来实现。这三者（HTML、CSS、JavaScript）组成了现代 web 开发的基本技术栈。

## HTML 骨架格式

```html
<!-- 设置文档类型为 html -->
<!DOCTYPE html>
<!-- 根元素 lang 用于设置语言（中文：zh-CN） -->
<html lang="en">
	<head>
		<!-- head 标签内用于设置文档的元信息，如字符集、视口设置和页面标题等 -->

		<!-- 标题 -->
		<title>Document</title>
	</head>
	<body>
		<!-- 文档的主体部分 -->
	</body>
</html>
```

## 基本 HTML 模板

```html
<!DOCTYPE html>
<html lang="zh-CN">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
	</head>
	<body></body>
</html>
```

-   `<meta charset="UTF-8">`: 这个 meta 标签设置文档的字符集，指定为 UTF-8，以支持包含全球范围内各种语言字符的文本。
-   `<meta name="viewport" content="width=device-width, initial-scale=1.0">`：这个 meta 标签设置视口（viewport），以确保文档在各种设备上正确地显示。`width=device-width` 表示视口宽度等于设备宽度，`initial-scale=1.0` 表示初始缩放级别为 1.0。

## 路径

在 HTML 中，路径（path）用于指定资源的位置。路径分为**绝对路径**和**相对路径**两种。

-   绝对路径：以 `/` 开头的路径，表示从 web 服务器的根目录开始。

-   相对路径：不以 `/` 或 `../` 开头的路径，表示相对于当前文档的路径。

    | 相对路径分类 | 开头  | 说明                                                          |
    | ------------ | ----- | ------------------------------------------------------------- |
    | 同一级路径   |       | 图像文件位于 HTML 文件同一级 如`<img src="baidu.gif" />`      |
    | 下一级路径   | `/`   | 图像文件位于 HTML 文件下一级 如`<img src="images/img.jpg" />` |
    | 上一级路径   | `../` | 图像文件位于 HTML 文件上一级 如`<img src="../2.png" />`       |

### 路径示例

- `https://www.baidu.com/img/flexible/logo/pc/peak-result.png`: 完整路径（也可以说是绝对路径）
- `/img/flexible/logo/pc/peak-result.png`: 绝对路径
- `./img/flexible/logo/pc/peak-result.png`: 相对路径
- `../img/flexible/logo/pc/peak-result.png`: 相对路径
- `peak-result.png`: 相对路径（没有任何开头浏览器默认解析为相对路径）

### 路径解析说明

在页面中的路径，浏览器会自动解析为完整的路径。除非是完整的路径（比如：`https://developer.mozilla.org/zh-CN/docs/Web/HTML`）那浏览器会直接使用这个路径。

示例：（假设所处页面网址为：`https://www.baidu.com/doc/html`）

- `https://www.baidu.com/img/flexible/logo/pc/peak-result.png` -> 直接使用
- `/peak-result.png` -> `https://www.baidu.com/peak-result.png`
- `./peak-result.png` -> `https://www.baidu.com/doc/html/peak-result.png`
- `../peak-result.png` -> `https://www.baidu.com/doc/peak-result.png`
- `peak-result.png` -> `https://www.baidu.com/doc/html/peak-result.png`


## 标签属性

对于属性类型为 boolean 的属性，写了就是 true（无关乎值是什么），没写就是 false。

```html
<!-- true -->
<input type="checkbox" name="1" checked>
<!-- true -->
<input type="checkbox" name="1" checked="true">
<!-- true -->
<input type="checkbox" name="1" checked="false">
<!-- false -->
<input type="checkbox" name="1">
```


<sub-page>
<p>12121</p>
</sub-page>