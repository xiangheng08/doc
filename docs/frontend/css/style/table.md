# 表格样式

::: details 表格结构：

```html
<table>
	<thead>
		<tr>
			<th>姓名</th>
			<th>年龄</th>
			<th>性别</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>张三</td>
			<td>20</td>
			<td>男</td>
		</tr>
		<tr>
			<td>李四</td>
			<td>25</td>
			<td>男</td>
		</tr>
		<tr>
			<td>王五</td>
			<td>30</td>
			<td>女</td>
		</tr>
		<tr>
			<td>赵六</td>
			<td>35</td>
			<td>男</td>
		</tr>
		<tr>
			<td>田七</td>
			<td>40</td>
			<td>女</td>
		</tr>
		<tr>
			<td>钱八</td>
			<td>45</td>
			<td>男</td>
		</tr>
		<tr>
			<td>孙九</td>
			<td>50</td>
			<td>女</td>
		</tr>
		<tr>
			<td>周十</td>
			<td>55</td>
			<td>男</td>
		</tr>
	</tbody>
</table>
```

:::

## 表格边框

```css
table,
th,
td {
	border: 1px solid;
}
```

<sub-page url="/examples/frontend/iframe/css/style/table-border.html" height="260px" />

## 折叠边框

通过将 `border-collapse` 属性设置为 `collapse` 可以相邻的边框何为一个边框。

```css
table {
	border-collapse: collapse;
}
table,
th,
td {
	border: 1px solid;
}
```

<sub-page url="/examples/frontend/iframe/css/style/table-collapse.html" height="260px" />

## 表格宽度和高度

```css
table {
	width: 100%;
}
th {
	height: 50px;
}
```

## 表格文字对齐

使用 [text-align](/frontend/css/style/text.html#text-align-文本水平对其) 可设置表格文字对齐。

```css
td {
	text-align: right;
}
```

## 条纹状表格

使用 `:nth-child(even)` 和 `:nth-child(odd)` 选择偶数列和奇数列来设置条纹状表格。

```css
tbody tr:nth-child(even) {
	background-color: pink;
}
tbody tr:nth-child(odd) {
	background-color: coral;
}
```

<sub-page url="/examples/frontend/iframe/css/style/table-striped.html" height="260px" />

## 表格列样式

使用 `colgroup` 和 `col` 标签来设置表格列样式。

```html
<table>
	<colgroup>
		<col class="col1" />
		<col class="col2" />
		<col class="col3" />
	</colgroup>
	<!-- 其他结构... -->
</table>
```

```css
.col1 {
	background-color: pink;
}
.col2 {
	background-color: coral;
}
.col3 {
	background-color: gold;
}
```

<sub-page url="/examples/frontend/iframe/css/style/table-col-style.html" height="260px" />
