# 选择器

选择器：规范了页面中哪些元素能够使用当前设置的样式，简单说就是一个条件，符合这个条件的元素都可以使用这个样式

## 标签选择器

匹配指定元素，一般用来设置某一元素的默认样式

用法：`标签关键字{样式声明;}`

```css
p {
	color: yellow;
}
```

## ID 选择器（#）

id 选择器可以为标有特定 id 的 HTML 元素指定特定的样式，一般来说，一个页面中标签的 id 的名称，必须唯一且不能重复。

给元素设置 id：`<p id="xxx"></p>`

设置样式：`#id名{样式声明}`

```css
#text {
	color: red;
}
```

## class(类)选择器（.）

类选择器以一个句点（`.`）开头，会选择文档中应用了这个类的所有元素。

给元素设置类名：`<p class="类名"></p>`

设置样式：`.类名{样式声明}`

给元素设置多个类名：`<p class="类名1 类名2 类名3......."></p>` 类名之间使用空格分隔

```css
.text {
	color: green;
}
```

## 全局选择器（\*）

通配符选择器可以匹配任何标签，常用于统一页面样式、清除默认的样式等

用法：`* { 样式声明; }`

```css
* {
	color: red;
}
```

## 子代选择器（>）

子代选择器可以选择当前元素的所有子代元素（即第一层）。定义的时候用 > 隔开。

```css
/* 选择div里面第一层的h1标签 */
div > h1 {
	color: red;
}
```

## 后代选择器

后代选择器就是用于选择当前元素的所有后代元素。定义的时候用**空格**隔开。

```css
/* 选择div里面的a标签 */
div a {
	color: red;
}
```

## 兄弟选择器（~）

兄弟选择器选取所有指定元素之后的兄弟元素。定义的时候用 ~ 隔开

```css
/* 选择div后面的p标签 */
div ~ p {
	background-color: yellow;
}
```

## 相邻兄弟选择器（+）

相邻兄弟选择器可选择紧接在另一元素后的元素，且二者有相同父元素，定义的时候用 + 隔开。

```css
/* 选择div后面的p标签 */
div + p {
	background-color: yellow;
}
```

## 交集选择器

选择的元素必须同时满足多个条件才可以被选择，交集选择器就是干这个的。定义的时候用 标签名.ID 名/类名。选择器之间不用使用符号分隔

```css
/* 选择p标签且类名为part的元素 */
p.part {
	color: red;
}
```

## 并集选择器

当多个元素共享样式时，这时候就可以使用并集选择器。定义的时候每个选择器用逗号隔开。

```css
#d1,
.c1,
div,
p.c2,
p span {
	color: red;
	background-color: yellow;
}
```

## 属性选择器

这些选择器允许基于一个元素自身是否存在（例如`href`）或者基于各式不同的按属性值的匹配，来选取元素。

```css
/* 匹配input type等于radio的元素 */
input[type='radio'] {
	color: red;
	background-color: yellow;
}
```

| 选择器               | 示例                            | 描述                                                                                                                                                                           |
| :------------------- | :------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `[*attr*]`           | `a[title]`                      | 匹配带有一个名为*attr*的属性的元素——方括号里的值。                                                                                                                             |
| `[*attr*=*value*]`   | `a[href="https://example.com"]` | 匹配带有一个名为*attr*的属性的元素，其值正为*value*——引号中的字符串。                                                                                                          |
| `[*attr*~=*value*]`  | `p[class~="special"]`           | 匹配带有一个名为*attr*的属性的元素，其值正为*value*，或者匹配带有一个*attr*属性的元素，其值有一个或者更多，至少有一个和*value*匹配。注意，在一列中的好几个值，是用空格隔开的。 |
| `[_attr_\|=_value_]` | `div[lang\|="zh"]`              | 匹配带有一个名为*attr*的属性的元素，其值可正为*value*，或者开始为*value*，后面紧随着一个连字符。                                                                               |

## 子字符串匹配选择器

这些选择器让更高级的属性的值的子字符串的匹配变得可行。例如，如果你有`box-warning`和`box-error`类，想把开头为“box-”字符串的每个物件都匹配上的话，你可以用`[class^="box-"]`来把它们两个都选中。

| 选择器          | 示例                | 描述                                                                                          |
| :-------------- | :------------------ | :-------------------------------------------------------------------------------------------- |
| `[attr^=value]` | `li[class^="box-"]` | 匹配带有一个名为*attr*的属性的元素，其值开头为*value*子字符串。                               |
| `[attr$=value]` | `li[class$="-box"]` | 匹配带有一个名为*attr*的属性的元素，其值结尾为*value*子字符串                                 |
| `[attr*=value]` | `li[class*="box"]`  | 匹配带有一个名为*attr*的属性的元素，其值的字符串中的任何地方，至少出现了一次*value*子字符串。 |

下个示例展示了这些选择器的用法：

-   `li[class^="a"]`匹配了任何值开头为`a`的属性，于是匹配了前两项。
-   `li[class$="a"]`匹配了任何值结尾为`a`的属性，于是匹配了第一和第三项。
-   `li[class*="a"]`匹配了任何值的字符串中出现了`a`的属性，于是匹配了所有项。

## 伪类和伪元素选择器

-   伪类（pseudo class）：以冒号(:)开头，用于选择处于特定状态的元素。

-   伪元素（pseudo element）：以双冒号(::)开头，用于在文档中插入虚构的元素。

-   他们之间区别：

    -   伪类用于**向某些已经存在的选择器添加特殊效果（当状态改变时）**

-   伪元素用于**将特殊效果添加到不存在的虚拟元素中（浏览器自动创建）**

也就是说伪类的本质还是类（class），作用于标签本身，只不过限定了状态条件；而伪元素的本质是元素（element），作用于该虚拟元素的内容本身。

示例：

```css
/*伪类：p标签鼠标悬浮的样式*/
p:hover {
	color: red;
}

/*伪元素：p标签里面首字的颜色为红色*/
p::first-letter {
	color: red;
}
```

### 伪类

| 选择器               | 描述                                                                                                                                                                                                            | mdn                                                                                       |
| :------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------- |
| `:active`            | 在用户激活（例如点击）元素的时候匹配。                                                                                                                                                                          | [:active](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:active)                       |
| `:any-link`          | 匹配一个链接的`:link`和`:visited`状态。                                                                                                                                                                         | [:any-link](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:any-link)                   |
| `:blank`             | 匹配空输入值的`<input>`元素。                                                                                                                                                                                   | [:blank](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:blank)                         |
| `:checked`           | 匹配处于选中状态的单选或者复选框。                                                                                                                                                                              | [:checked](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:checked)                     |
| `:current`           | 匹配正在展示的元素，或者其上级元素。                                                                                                                                                                            | [:current (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/:current)             |
| `:default`           | 匹配一组相似的元素中默认的一个或者更多的 UI 元素。                                                                                                                                                              | [:default](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:default)                     |
| `:dir`               | 基于其方向性（HTML[`dir`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/dir)属性或者 CSS[`direction`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/direction)属性的值）匹配一个元素。 | [:dir](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:dir)                             |
| `:disabled`          | 匹配处于关闭状态的用户界面元素                                                                                                                                                                                  | [:disabled](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:disabled)                   |
| `:empty`             | 匹配除了可能存在的空格外，没有子元素的元素。                                                                                                                                                                    | [:empty](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:empty)                         |
| `:enabled`           | 匹配处于开启状态的用户界面元素。                                                                                                                                                                                | [:enabled](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:enabled)                     |
| `:first`             | 匹配[分页媒体](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_paged_media)的第一页。                                                                                                                      | [:first](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:first)                         |
| `:first-child`       | 匹配兄弟元素中的第一个元素。                                                                                                                                                                                    | [:first-child](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:first-child)             |
| `:first-of-type`     | 匹配兄弟元素中第一个某种类型的元素。                                                                                                                                                                            | [:first-of-type](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:first-of-type)         |
| `:focus`             | 当一个元素有焦点的时候匹配。                                                                                                                                                                                    | [:focus](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:focus)                         |
| `:focus-visible`     | 当元素有焦点，且焦点对用户可见的时候匹配。                                                                                                                                                                      | [:focus-visible](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:focus-visible)         |
| `:focus-within`      | 匹配有焦点的元素，以及子代元素有焦点的元素。                                                                                                                                                                    | [:focus-within](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:focus-within)           |
| `:future`            | 匹配当前元素之后的元素。                                                                                                                                                                                        | [:future (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/:future)               |
| `:hover`             | 当用户悬浮到一个元素之上的时候匹配。                                                                                                                                                                            | [:hover](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:hover)                         |
| `:indeterminate`     | 匹配未定态值的 UI 元素，通常为[复选框](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input/checkbox)。                                                                                              | [:indeterminate](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:indeterminate)         |
| `:in-range`          | 用一个区间匹配元素，当值处于区间之内时匹配。                                                                                                                                                                    | [:in-range](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:in-range)                   |
| `:invalid`           | 匹配诸如`<input>`的位于不可用状态的元素。                                                                                                                                                                       | [:invalid](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:invalid)                     |
| `:lang`              | 基于语言（HTML[lang](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/lang)属性的值）匹配元素。                                                                                              | [:lang](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:lang)                           |
| `:last-child`        | 匹配兄弟元素中最末的那个元素。                                                                                                                                                                                  | [:last-child](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:last-child)               |
| `:last-of-type`      | 匹配兄弟元素中最后一个某种类型的元素。                                                                                                                                                                          | [:last-of-type](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:last-of-type)           |
| `:left`              | 在[分页媒体](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_paged_media)中，匹配左手边的页。                                                                                                              | [:left](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:left)                           |
| `:link`              | 匹配未曾访问的链接。                                                                                                                                                                                            | [:link](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:link)                           |
| `:local-link`        | 匹配指向和当前文档同一网站页面的链接。                                                                                                                                                                          | [:local-link (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/:local-link)       |
| `:is()`              | 匹配传入的选择器列表中的任何选择器。                                                                                                                                                                            | [:is()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:is)                             |
| `:not`               | 匹配作为值传入自身的选择器未匹配的物件。                                                                                                                                                                        | [:not](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:not)                             |
| `:nth-child`         | 匹配一列兄弟元素中的元素——兄弟元素按照*an+b*形式的式子进行匹配（比如 2n+1 匹配元素 1、3、5、7 等。即所有的奇数个）。                                                                                            | [:nth-child](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-child)                 |
| `:nth-of-type`       | 匹配某种类型的一列兄弟元素（比如，`<p>`元素）——兄弟元素按照*an+b*形式的式子进行匹配（比如 2n+1 匹配元素 1、3、5、7 等。即所有的奇数个）。                                                                       | [:nth-of-type](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-of-type)             |
| `:nth-last-child`    | 匹配一列兄弟元素，从后往前倒数。兄弟元素按照*an+b*形式的式子进行匹配（比如 2n+1 匹配按照顺序来的最后一个元素，然后往前两个，再往前两个，诸如此类。从后往前数的所有奇数个）。                                    | [:nth-last-child](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-last-child)       |
| `:nth-last-of-type`  | 匹配某种类型的一列兄弟元素（比如，`<p>`元素），从后往前倒数。兄弟元素按照*an+b*形式的式子进行匹配（比如 2n+1 匹配按照顺序来的最后一个元素，然后往前两个，再往前两个，诸如此类。从后往前数的所有奇数个）。       | [:nth-last-of-type](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-last-of-type)   |
| `:only-child`        | 匹配没有兄弟元素的元素。                                                                                                                                                                                        | [:only-child](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:only-child)               |
| `:only-of-type`      | 匹配兄弟元素中某类型仅有的元素。                                                                                                                                                                                | [:only-of-type](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:only-of-type)           |
| `:optional`          | 匹配不是必填的 form 元素。                                                                                                                                                                                      | [:optional](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:optional)                   |
| `:out-of-range`      | 按区间匹配元素，当值不在区间内的的时候匹配。                                                                                                                                                                    | [:out-of-range](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:out-of-range)           |
| `:past`              | 匹配当前元素之前的元素。                                                                                                                                                                                        | [:past (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/:past)                   |
| `:placeholder-shown` | 匹配显示占位文字的 input 元素。                                                                                                                                                                                 | [:placeholder-shown](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:placeholder-shown) |
| `:playing`           | 匹配代表音频、视频或者相似的能“播放”或者“暂停”的资源的，且正在“播放”的元素。                                                                                                                                    | [:playing](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:playing)                     |
| `:paused`            | 匹配代表音频、视频或者相似的能“播放”或者“暂停”的资源的，且正在“暂停”的元素。                                                                                                                                    | [:paused](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:paused)                       |
| `:read-only`         | 匹配用户不可更改的元素。                                                                                                                                                                                        | [:read-only](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:read-only)                 |
| `:read-write`        | 匹配用户可更改的元素。                                                                                                                                                                                          | [:read-write](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:read-write)               |
| `:required`          | 匹配必填的 form 元素。                                                                                                                                                                                          | [:required](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:required)                   |
| `:right`             | 在[分页媒体](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_paged_media)中，匹配右手边的页。                                                                                                              | [:right](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:right)                         |
| `:root`              | 匹配文档的根元素。                                                                                                                                                                                              | [:root](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:root)                           |
| `:scope`             | 匹配任何为参考点元素的的元素。                                                                                                                                                                                  | [:scope](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:scope)                         |
| `:valid`             | 匹配诸如`<input>`元素的处于可用状态的元素。                                                                                                                                                                     | [:valid](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:valid)                         |
| `:target`            | 匹配当前 URL 目标的元素（例如如果它有一个匹配当前[URL 分段](https://en.wikipedia.org/wiki/Fragment_identifier)的元素）。                                                                                        | [:target](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:target)                       |
| `:visited`           | 匹配已访问链接。                                                                                                                                                                                                | [:visited](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:visited)                     |

### 伪元素

| 选择器             | 描述                                                 | mdn                                                                                   |
| :----------------- | :--------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `::after`          | 匹配出现在原有元素的实际内容之后的一个可样式化元素。 | [::after](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::after)                   |
| `::before`         | 匹配出现在原有元素的实际内容之前的一个可样式化元素。 | [::before](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::before)                 |
| `::first-letter`   | 匹配元素的第一个字母。                               | [::first-letter](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::first-letter)     |
| `::first-line`     | 匹配包含此伪元素的元素的第一行。                     | [::first-line](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::first-line)         |
| `::grammar-error`  | 匹配文档中包含了浏览器标记的语法错误的那部分。       | [::grammar-error](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::grammar-error)   |
| `::selection`      | 匹配文档中被选择的那部分。                           | [::selection](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::selection)           |
| `::spelling-error` | 匹配文档中包含了浏览器标记的拼写错误的那部分。       | [::spelling-error](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::spelling-error) |

### 属性选择器

属性选择器可以根据元素的属性及属性值来选择元素。

```css
/* 选择input标签的type为text的 */
input[type='text'] {
	width: 150px;
}
```

## 子串匹配属性选择器

一个高级的选择器模块，它是 CSS2 完成之后发布的，其中包含了更多的部分值属性选择器。按照规范的说法，应该称之为“子串匹配属性选择器”。很多现代浏览器都支持这些选择器，包括 IE7。

下表是对这些选择器的简单总结：

| 类型         | 描述                                       |
| ------------ | ------------------------------------------ |
| [abc^=“def”] | 选择 abc 属性值以 “def” 开头的所有元素     |
| [abc$=“def”] | 选择 abc 属性值以 “def” 结尾的所有元素     |
| [abc*=“def”] | 选择 abc 属性值中包含子串 “def” 的所有元素 |

```css
/* 选择指向 baidu 的所有链接 */
a[href*='baidu.com'] {
	color: red;
}
```

## 选择器权值

CSS 严格来说没有选择器权值的概念，而是选择器的**特定性**或**特殊性**这里以特殊性称呼。

一个元素的样式确定下来要比较：**重要性**、**特殊性**、**原次序**

-   **重要性**：这个就是比较**浏览器默认样式表**和**作者样式表**（自己写的），假如浏览器默认样式表和你自己写的样式冲突了，那生效的一定是你的样式

-   **特殊性**：每一个选择器都会有一个四位数字组成特殊性的值

    -   第一位：就是元素的内联样式，写了就是 1 没写就是 0
    -   第二位：是 id 选择器的数量
    -   第三位：类选择器，伪类选择器，属性选择器的数量
    -   第四位：元素选择器，伪元素选择器的数量

    特殊性一般只取**后三位**，因为内联样式严格来说不算一个选择器，而且内联样式有且只有一个，只要写了内联样式在特殊性上就一定大于其他的选择器特殊性，所以一般不需要考虑内联样式的特殊性

    浏览器会依次比较的每一位的值，假如第一位就比较出来了大小，那么后面的就忽略。
    
    > 星号选择器（\*）的特殊性为 0

    ```css
    /* 0, 0, 0 */
    * {} 
    /* 0, 0, 1 */
    body {} 
    /* 0, 1, 0 */
    .text {} 
    /* 1, 0, 0 */
    #box {} 
    /* 1, 2, 1 */
    body #box .text:hover {} 
    ```

    > 其实选择器的特殊性，在 vscode 中把鼠标放到选择器上就显示特殊性，浏览通同样适用（不能太老）

-   **原次序**：这个就是当重要性和特殊性一致时才会比较，即：书写的先后顺序，后写的生效

注意 `!important `它比较特殊，不属于选择器，一旦给某个属性设置了 `!important` 那就意味着这个属性一定生效，但若是多个 `!important` 同样会比较：重要性、特殊性、原次序

## 常用选择器

-   选择第一个：`div:first-child`
-   选择最后一个：`div:last-child`
-   选择某一个：`div:first:nth-child(3)` 或 `div:nth-of-type(3)`
-   每 3 个的第 2 个：`div:nth-child(3n+2)` 或 `div:nth-of-type(3n+2)`
-   选择除最后一个元素以外的其他元素：`div:not(:last-child)`
-   选择除第一个元素以外的其他元素：`div:not(:first-child)`
-   选择除第一个和最后一个以外的其他元素：`div:not(:first-child, :last-child)`
-   选择所有奇数元素：`div:nth-child(odd)`
-   选择所有偶数元素：`div:nth-child(even)`
