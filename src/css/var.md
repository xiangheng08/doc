# CSS 变量

CSS变量（也称为自定义属性）允许开发者在文档中定义可重用的值，并在整个CSS中使用它们。

## 基本用法

### 声明变量

CSS 变量以两个减号开头（`--`），可以在根选择器（如 `:root` ）中声明全局变量，或在任何选择器中声明局部变量：

```css
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
}

.container {
  --container-padding: 20px;
}
```

::: warning 
注意：CSS 变量大小写敏感的，`--my-color` 和 `--My-color` 会被认为是两个不同 CSS 变量
:::

### 使用变量

使用`var()`函数来引用变量：

```css
.element {
  color: var(--primary-color);
  padding: var(--container-padding, 10px); /* 第二个参数为备用值 */
}
```

## 特性

### 继承性

CSS变量具有继承性。如果在元素上未定义变量，它将继承父元素的值。

### 备用值

当使用 `var()` 函数引用变量时，可以提供一个备用值（fallback value），在引用的变量未定义时或者无效时，将使用备用值。语法如下：

```css
.two {
  color: var(--my-var, red);
}

.three {
  background-color: var(
    --my-var,
    var(--my-background, pink)
  );
}

.three {
  background-color: var(
    --my-var,
    --my-background,
    pink
  );
}
```

### 动态更新

变量值可以通过 JavaScript 动态更新：

```js
document.documentElement.style.setProperty('--primary-color', '#e74c3c');
```

### 在calc()中使用

变量可以与 `calc()` 函数结合使用：

```css
.element {
  width: calc(var(--base-width) * 2);
}
```

## 示例

### 基础示例

```css
:root {
  --main-bg-color: coral;
}

div {
  background-color: var(--main-bg-color);
}
```

### 主题切换示例

通过改变根元素上的变量值，实现主题切换：

```css
:root {
  --theme-bg: white;
  --theme-text: black;
}

.dark-theme {
  --theme-bg: black;
  --theme-text: white;
}

body {
  background: var(--theme-bg);
  color: var(--theme-text);
}
```

## 注意事项

1. 变量名区分大小写
2. 当变量值无效时，将使用继承值或初始值
3. 可以使用 `@supports` 检测浏览器支持：
   ```css
   @supports (--css: variables) {
     /* 支持CSS变量时的样式 */
   }
   ```

## 参考
- [MDN: 使用CSS自定义属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_cascading_variables/Using_CSS_custom_properties)
- [MDN: 自定义属性（--*）：CSS 变量](https://developer.mozilla.org/zh-CN/docs/Web/CSS/--*)
