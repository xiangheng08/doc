# 链接样式

```css
/* 未访问的链接样式 */
a {
	color: #007bff; /* 设置链接文本颜色为蓝色 */
	text-decoration: none; /* 移除下划线 */
}

/* 鼠标悬停时的链接样式 */
a:hover {
	text-decoration: underline; /* 在悬停时添加下划线 */
}

/* 已访问链接样式 */
a:visited {
	color: #purple; /* 设置已访问链接的颜色为紫色 */
}

/* 点击链接时的样式 */
a:active {
	color: #ff0000; /* 设置点击时的颜色为红色 */
}
```

<a class="my_link" href="https://www.baidu.com" target="_blink">www.baidu.com</a>

<style>
.my_link {
	color: #007bff !important;
	text-decoration: none !important;
}
.my_link:hover {
	text-decoration: underline !important;
}
.my_link:visited {
	color: purple !important;
}
.my_link:active {
	color: #ff0000 !important;
}
</style>
