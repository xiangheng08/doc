# 表单数据收集

## v-model

`v-model` 指令在表单 `<input>`、`<textarea>` 及 `<select>` 元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。

`v-model` 会忽略所有表单元素的 `value`、`checked`、`selected` `attribute` 的初始值，而是使用 `v-model` 绑定的值，作为表单元素的初始值。

-   `text` 和 `textarea` 元素使用 `value` `property` 和 `input` 事件；
-   `checkbox` 和 `radio` 使用 `checked` `property` 和 `change` 事件；
-   `select` 字段将 `value` 作为 `prop` 并将 `change` 作为事件。

::: tip
对于输入中文、日文、韩文等，需要输入拼音再选择候选字，`v-model` 不会在输入法组合文字过程中更新数据。
:::

## 文本收集

```html
<input v-model="text" type="text" />

<input v-model="text" type="email" />

<input v-model="text" type="search" />

<textarea v-model="text"></textarea>
```

像以上的文本输入框，`v-model` 会自动将输入的值以**字符串**的形式赋给绑定的 `text`。

## 复选框

```html
<input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
<label for="jack">Jack</label>

<input type="checkbox" id="john" value="John" v-model="checkedNames" />
<label for="john">John</label>

<input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
<label for="mike">Mike</label>
```

### 初始值为数组

```js
new Vue({
	data: {
		checkedNames: [],
	},
});
```

对于复选框，`v-model` 绑定初始值是数组，`v-model` 会自动将勾选元素的 `value` 添加到数组中。

例如选择了 Jack 和 Mike，`checkedNames` 的值就是 `['Jack', 'Mike']`。

### 初始值为 `boolean` 类型

```js
new Vue({
	data: {
		checkedNames: false,
	},
});
```

但如果`checkedNames` 的初始值是 `boolean` 类型，那么 `v-model` 绑定的就是元素的 `checked` 属性。这也意味着勾选了其中一个，剩下的都会勾选，一个取消勾选，所有的都会取消勾选。同时`v-model` 会以**布尔**的形式赋给绑定的 `checkedNames`。

::: tip
如果绑定的不是 `boolean` 和 `array` 类型，`v-model` 则会以 `boolean` 的形式绑定。
:::

## 单选框

```html
<input type="radio" id="one" value="One" v-model="picked" />
<label for="one">One</label>
<br />
<input type="radio" id="two" value="Two" v-model="picked" />
<label for="two">Two</label>
<br />
<span>Picked: {{ picked }}</span>
```
