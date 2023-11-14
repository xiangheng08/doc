# 选择元素

## 直接获取元素

```js
// 返回根元素（html）
document.documentElement;

// 返回 head 元素
document.head;

// 返回 body 元素
document.body;
```

## 选择的元素方法

### getElementById

返回 id 为 app 的元素（若多个元素 id 相同，则返回第一个匹配成功的）

```js
document.getElementById('app');
```

### getElementsByClassName

返回一个包含了所有指定类名的子元素的**类数组对象**[`HTMLCollection`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCollection)

```js
document.getElementsByClassName('box');
```

::: danger 注意
`HTMLCollection` 是动态的（假如：需要把所有类名为 item 的复制一份添加到页面上，代码如下）
:::

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

这是一份非常简单的代码，看着没啥问题，但是点击复制按钮后会发现，卡死了！而控制台死命输出。这些都是因为 `HTMLCollection` 是动态的，当你复制一个元素添加到页面时，`HTMLCollection` 中的元素个数也会增加一个，所以当你在遍历 `HTMLCollection` 时，会一直循环下去，造成死循环。

3. **getElementsByTagName:**

    ```javascript
    var elementsByTag = document.getElementsByTagName('yourTagName');
    ```

4. **getElementsByName:**

    ```javascript
    var elementsByName = document.getElementsByName('yourNameAttribute');
    ```

5. **querySelector:**

    ```javascript
    var element = document.querySelector('yourCSSSelector');
    ```

6. **querySelectorAll:**

    ```javascript
    var elements = document.querySelectorAll('yourCSSSelector');
    ```

7. **getElementsBySelector (custom function):**

    ```javascript
    function getElementsBySelector(selector) {
    	return Array.from(document.querySelectorAll(selector));
    }

    var elements = getElementsBySelector('yourCSSSelector');
    ```

8. **getElementsByTag and loop through them:**
    ```javascript
    var elements = document.getElementsByTagName('yourTagName');
    for (var i = 0; i < elements.length; i++) {
    	// Do something with elements[i]
    }
    ```
