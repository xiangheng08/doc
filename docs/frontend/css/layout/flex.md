# flex（弹性盒）布局

CSS Flex 布局（Flexbox，弹性盒子布局）是一种用于设计和定位页面布局的 CSS 模块。它提供了一种更加高效和可预测的方式来组织、对齐和分布容器内的子元素，特别适用于构建复杂的页面结构和灵活的响应式设计。

Flex 布局的主要特点包括：

- **容器和项目**： Flex 布局涉及到两个主要概念，即容器和项目。容器是应用 Flex 布局的父元素，而项目则是容器的子元素。
- **主轴和交叉轴**： Flex 容器有一个主轴和一个交叉轴。主轴是 Flex 容器的主要方向，而交叉轴是垂直于主轴的方向。
- **弹性容器**： 使用 `display: flex;` 或 `display: inline-flex;` 将一个元素设置为 Flex 容器。这使得其子元素成为弹性项目，可以通过弹性布局来排列。
- **弹性项目**： Flex 容器内的每个子元素都是一个弹性项目，可以通过一系列的 Flex 属性来调整其在容器中的表现。
- **主轴对齐和交叉轴对齐**： 可以使用不同的属性来控制弹性项目在主轴和交叉轴上的对齐方式，例如 `justify-content` 和 `align-items`。
- **弹性增长和缩小**： 弹性项目可以根据可用空间自动调整大小，以适应容器的变化。
- **顺序调整**： 可以通过 `order` 属性调整弹性项目在 Flex 容器中的显示顺序。

```css
div {
  display: flex;
  /* 或者 */
  display: inline-flex;
}
```

- ` display: flex;`: 将元素设置为块级 Flex 容器。
- ` display: inline-flex;`: 将元素设置为行内级 Flex 容器。

::: tip
需要注意的是，设为 Flex 布局后，子元素的 `float`、`clear`、`vertical-align` 属性将失效。
:::

## flex 模型说明

<img src="/images/frontend/css/flex_terms.png" alt="flex_terms" style="margin: auto;"/>

- **主轴**（main axis）是沿着 flex 元素放置的方向延伸的轴（比如页面上的横向的行、纵向的列）。该轴的开始和结束被称为 main start 和 main end。
- **交叉轴**（cross axis）是垂直于 flex 元素放置方向的轴。该轴的开始和结束被称为 cross start 和 cross end。

## flex 属性

### flex

`flex` 属性是一个简写属性，用于设置在弹性容器如何增大或缩小以适应其弹性容器中可用的空间。

### flex-basis 初始大小

`flex-basis` 指定了 flex 元素在主轴方向上的初始大小。如果不使用 `box-sizing` 改变盒模型的话，那么这个属性就决定了 flex 元素的内容盒（content-box）的尺寸。

<flex-basis />

```css
div {
  /* 指定<'width'> */
  flex-basis: 10em;
  flex-basis: 3px;
  flex-basis: auto;

  /* 固有的尺寸关键词 */
  flex-basis: fill;
  flex-basis: max-content;
  flex-basis: min-content;
  flex-basis: fit-content;

  /* 在 flex item 内容上的自动尺寸 */
  flex-basis: content;
}
```

### flex-direction 主轴方向

`flex-direction` 属性指定了内部元素是如何在 flex 容器中布局的，定义了主轴的方向 (正方向或反方向)。

<flex-direction />

```css
div {
  /* flex 容器的主轴被定义为与文本方向相同。主轴起点和主轴终点与内容方向相同 */
  flex-direction: row;

  /* 和 row 相同，但是置换了主轴起点和主轴终点 */
  flex-direction: row-reverse;

  /* flex 容器的主轴和块轴相同。主轴起点与主轴终点和书写模式的前后点相同 */
  flex-direction: column;

  /* 和 column 相同，但是置换了主轴起点和主轴终点 */
  flex-direction: column-reverse;
}
```

### flex-wrap 换行

`flex-wrap` 属性指定 flex 元素单行显示还是多行显示。如果允许换行，这个属性允许你控制行的堆叠方向。

<flex-wrap />

```css
div {
  /* flex 的元素被摆放到到一行，这可能导致 flex 容器溢出。
     cross-start 会根据 flex-direction 的值等价于 start 或 before。
     为该属性的默认值。 */
  flex-wrap: nowrap;

  /* flex 元素 被打断到多个行中。
     cross-start 会根据 flex-direction 的值等价于 start 或before。
     cross-end 为确定的 cross-start 的另一端。 */
  flex-wrap: wrap;

  /* 和 wrap 的行为一样，但是 cross-start 和 cross-end 互换。 */
  flex-wrap: wrap-reverse;
}
```

### flex-flow 主轴方向和换行

`flex-flow` 属性是 `flex-direction` 和 `flex-wrap` 的简写。

```css
div {
  flex-flow: row nowrap; /* 默认值 */
  flex-flow: column-reverse wrap;
}
```

取值参考上方。

### flex-grow 增长系数

`flex-grow` 用于设置 flex 项 主尺寸的 flex 增长系数。

<flex-grow />

```css
div {
  flex-grow: 3;
  flex-grow: 0.6;
}
```

`flex-grow` 的属性接受为一个 `<number>`。负值无效，默认为 0。

### flex-shrink 收缩规则

`flex-shrink` 属性指定了 flex 元素的收缩规则。flex 元素仅在默认宽度之和大于容器的时候才会发生收缩，其收缩的大小是依据 `flex-shrink` 的值。

```css
div {
  flex-shrink: 2;
  flex-shrink: 0.6;
}
```

`flex-shrink` 的属性接受为一个 `<number>`。负值无效。

### order 顺序

`order` 属性规定了弹性容器中的可伸缩项目在布局时的顺序。元素按照 `order` 属性的值的增序进行布局。拥有相同 `order` 属性值的元素按照它们在源代码中出现的顺序进行布局。

```css
div {
  order: 0; /* 默认值 */
  order: 5;
  order: -5;
}
```

## 对齐属性

### justify-content 主轴对齐

### align-content 纵轴对齐

```css
div {
  align-content: center; /* 将项目放置在中点 */
  align-content: start; /* 最先放置项目 */
  align-content: end; /* 最后放置项目 */
  align-content: flex-start; /* 从起始点开始放置 flex 元素 */
  align-content: flex-end; /* 从终止点开始放置 flex 元素 */
}
```

### align-items

```css
div {
  /* 基本关键字 */
  align-items: normal;
  align-items: stretch;

  /* 定位对齐 */
  /* align-items 不能设置为 left 和 right */
  align-items: center;
  align-items: start;
  align-items: end;
  align-items: flex-start;
  align-items: flex-end;
  align-items: self-start;
  align-items: self-end;

  /* 基线对齐 */
  align-items: baseline;
  align-items: first baseline;
  align-items: last baseline; /* 溢出对齐（仅用于位置对齐） */
  align-items: safe center;
  align-items: unsafe center;
}
```

### align-self

```css
div {
  align-self: auto;
  align-self: normal;

  /* Positional alignment */
  /* align-self does not take left and right values */
  align-self: center; /* Put the item around the center */
  align-self: start; /* Put the item at the start */
  align-self: end; /* Put the item at the end */
  align-self: flex-start; /* Put the flex item at the start */
  align-self: flex-end; /* Put the flex item at the end */
}
```

### place-content

### row-gap

### column-gap

### gap
