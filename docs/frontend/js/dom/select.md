# 选择元素

## 直接获取元素

```js
// 根元素（html）
document.documentElement;

// head 元素
document.head;

// body 元素
document.body;

// 当前获得焦点的元素 ，如果没有焦点元素，会返回 body 或者 null
document.activeElement;

// 前文档中的 form 元素的一个集合（类型： HTMLCollection）
document.forms;

// 文档中所有具有 href 属性值的 <area> 元素与 <a> 元素的集合（类型： HTMLCollection）
document.links;

// 当前文档中所有 image 元素的集合（类型： HTMLCollection）
document.images;

// 当前文档中所有 script 元素的集合（类型： HTMLCollection）
document.scripts;
```

## 选择的元素方法

### getElementById

返回 id 为 app 的元素（若多个元素 id 相同，则返回第一个匹配成功的）

```js
const element = document.getElementById('app');
```

### getElementsByClassName

返回一个包含了所有指定类名的子元素的**类数组对象**[`HTMLCollection`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCollection)

```js
const elements = document.getElementsByClassName('box');
```

::: danger 注意
`HTMLCollection` 是动态的，使用时需要注意（下面的示例，演示了 `HTMLCollection` 的动态性）
:::

示例：把所有类名为 item 的复制一份添加到页面上，代码如下

```html
<div class="item">1</div>
<div class="item">2</div>
<button onclick="copy()">复制</button>
<script>
	const domList = document.getElementsByClassName('item');

	function copy() {
		for (let i = 0; i < domList.length; i++) {
			const element = domList[i];
			const newDom = element.cloneNode(true);
			document.body.appendChild(newDom);
			console.log(i);
		}
	}
</script>
```

这是一份非常简单的代码，看着没啥问题，但是点击复制按钮后会发现，卡死了！而控制台死命输出。这些都是因为 `HTMLCollection` 是动态的，当你复制一个元素添加到页面时，`HTMLCollection` 中的元素个数也会增加一个，元素个数增加了，`length` 自然也会增加，这就造成了循环结束的条件就一直满足不了，所以当你在遍历 `HTMLCollection` 时，会一直循环下去，造成死循环。

### getElementsByTagName

根据元素标签名称获取元素，返回值类型为 `HTMLCollection`

```js
// 获取所有 p 元素
const elements = document.getElementsByTagName('p');

// 获取所有元素
const elementAll = document.getElementsByTagName('*');
```

### getElementsByName

根据元素的 `name` 属性获取元素，返回值类型为 `HTMLCollection`

```js
const elements = document.getElementsByName(name);
```

### querySelector

返回文档中匹配指定 CSS 选择器的第一个元素，没匹配到就返回 `null`。

`document.querySelector(selectors)`

- `selectors`: 必须是有效的 CSS 选择器字符串，如果不是，则引发SYNTAX_ERR异常。

```js
var element = document.querySelector('body .box');
```

### querySelectorAll

    ```javascript
    var elements = document.querySelectorAll('yourCSSSelector');
    ```

1. **getElementsBySelector (custom function):**

    ```javascript
    function getElementsBySelector(selector) {
    	return Array.from(document.querySelectorAll(selector));
    }

    var elements = getElementsBySelector('yourCSSSelector');
    ```

2. **getElementsByTag and loop through them:**
    ```javascript
    var elements = document.getElementsByTagName('yourTagName');
    for (var i = 0; i < elements.length; i++) {
    	// Do something with elements[i]
    }
    ```
