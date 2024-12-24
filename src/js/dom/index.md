# DOM

**文档对象模型**（*Document Object Model* 简称 *DOM*）是 web 上构成文档结构和内容的对象的数据表示。DOM 也是一个网络文档的编程接口。它代表页面，以便程序可以改变文档的结构、风格和内容。DOM 将文档表示为节点和对象；这样，编程语言就可以与页面交互。

DOM 提供很多的 API，使用 DOM 可以做很多事情，例如：获取元素、改变元素的内容、改变元素的样式、添加元素、删除元素、移动元素、添加事件监听器等。

```js
// 创建一个 h1 元素
document.createElement("h1");

// 创建一个文本节点
document.createTextNode("Big Head!");

// 获取页面中所有 p 元素
document.querySelectorAll("p");

// 获取 id 为 text 的元素
const element = document.getElementById("text");

// 改变元素的内容
element.innerHTML = "新的内容";

// 改变元素的样式
element.style.color = "red";
element.style.fontSize = "24px";

// 添加新元素
const newElement = document.createElement("p");
newElement.innerHTML = "这是新添加的元素";
document.body.appendChild(newElement);

// 删除元素
const elementToRemove = document.getElementById("demoElement");
elementToRemove.parentNode.removeChild(elementToRemove);

// 移动元素到新的位置
const elementToMove = document.getElementById("demoElement");
const newParent = document.getElementById("newParentElement");
newParent.appendChild(elementToMove);

// 添加事件监听器
element.addEventListener("click", function() {
  alert("元素被点击了！");
});
```
