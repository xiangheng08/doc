# 拖拉事件

## 拖拉事件的种类

拖拉（drag）指的是，用户在某个对象上按下鼠标键不放，拖动它到另一个位置，然后释放鼠标键，将该对象放在那里。

拖拉的对象有好几种，包括元素节点、图片、链接、选中的文字等等。在网页中，除了元素节点默认不可以拖拉，其他（图片、链接、选中的文字）都可以直接拖拉。为了让元素节点可拖拉，可以将该节点的`draggable`属性设为`true`。

```html
<div draggable="true">此区域可拖拉</div>
```

上面代码的`div`区块，在网页中可以直接用鼠标拖动。松开鼠标键时，拖动效果就会消失，该区块依然在原来的位置。

`draggable`属性可用于任何元素节点，但是图片（`<img>`）和链接（`<a>`）不加这个属性，就可以拖拉。对于它们，用到这个属性的时候，往往是将其设为`false`，防止拖拉这两种元素。

注意，一旦某个元素节点的`draggable`属性设为`true`，就无法再用鼠标选中该节点内部的文字或子节点了。

当元素节点或选中的文本被拖拉时，就会持续触发拖拉事件，包括以下一些事件。

-   `drag`：拖拉过程中，在被拖拉的节点上持续触发（相隔几百毫秒）。
-   `dragstart`：用户开始拖拉时，在被拖拉的节点上触发，该事件的`target`属性是被拖拉的节点。通常应该在这个事件的监听函数中，指定拖拉的数据。
-   `dragend`：拖拉结束时（释放鼠标键或按下 ESC 键）在被拖拉的节点上触发，该事件的`target`属性是被拖拉的节点。它与`dragstart`事件，在同一个节点上触发。不管拖拉是否跨窗口，或者中途被取消，`dragend`事件总是会触发的。
-   `dragenter`：拖拉进入当前节点时，在当前节点上触发一次，该事件的`target`属性是当前节点。通常应该在这个事件的监听函数中，指定是否允许在当前节点放下（drop）拖拉的数据。如果当前节点没有该事件的监听函数，或者监听函数不执行任何操作，就意味着不允许在当前节点放下数据。在视觉上显示拖拉进入当前节点，也是在这个事件的监听函数中设置。
-   `dragover`：拖拉到当前节点上方时，在当前节点上持续触发（相隔几百毫秒），该事件的`target`属性是当前节点。该事件与`dragenter`事件的区别是，`dragenter`事件在进入该节点时触发，然后只要没有离开这个节点，`dragover`事件会持续触发。
-   `dragleave`：拖拉操作离开当前节点范围时，在当前节点上触发，该事件的`target`属性是当前节点。如果要在视觉上显示拖拉离开操作当前节点，就在这个事件的监听函数中设置。
-   `drop`：被拖拉的节点或选中的文本，释放到目标节点时，在目标节点上触发。注意，如果当前节点不允许`drop`，即使在该节点上方松开鼠标键，也不会触发该事件。如果用户按下 ESC 键，取消这个操作，也不会触发该事件。该事件的监听函数负责取出拖拉数据，并进行相关处理。

下面的例子展示，如何动态改变被拖动节点的背景色。

```js
div.addEventListener(
	'dragstart',
	function (e) {
		this.style.backgroundColor = 'red';
	},
	false
);

div.addEventListener(
	'dragend',
	function (e) {
		this.style.backgroundColor = 'green';
	},
	false
);
```

上面代码中，`div`节点被拖动时，背景色会变为红色，拖动结束，又变回绿色。

下面是一个例子，展示如何实现将一个节点从当前父节点，拖拉到另一个父节点中。

```js
/* HTML 代码如下
 <div class="dropzone">
   <div id="draggable" draggable="true">
     该节点可拖拉
   </div>
 </div>
 <div class="dropzone"></div>
 <div class="dropzone"></div>
 <div class="dropzone"></div>
*/

// 被拖拉节点
var dragged;

document.addEventListener(
	'dragstart',
	function (event) {
		// 保存被拖拉节点
		dragged = event.target;
		// 被拖拉节点的背景色变透明
		event.target.style.opacity = 0.5;
	},
	false
);

document.addEventListener(
	'dragend',
	function (event) {
		// 被拖拉节点的背景色恢复正常
		event.target.style.opacity = '';
	},
	false
);

document.addEventListener(
	'dragover',
	function (event) {
		// 防止拖拉效果被重置，允许被拖拉的节点放入目标节点
		event.preventDefault();
	},
	false
);

document.addEventListener(
	'dragenter',
	function (event) {
		// 目标节点的背景色变紫色
		// 由于该事件会冒泡，所以要过滤节点
		if (event.target.className === 'dropzone') {
			event.target.style.background = 'purple';
		}
	},
	false
);

document.addEventListener(
	'dragleave',
	function (event) {
		// 目标节点的背景色恢复原样
		if (event.target.className === 'dropzone') {
			event.target.style.background = '';
		}
	},
	false
);

document.addEventListener(
	'drop',
	function (event) {
		// 防止事件默认行为（比如某些元素节点上可以打开链接），
		event.preventDefault();
		if (event.target.className === 'dropzone') {
			// 恢复目标节点背景色
			event.target.style.background = '';
			// 将被拖拉节点插入目标节点
			dragged.parentNode.removeChild(dragged);
			event.target.appendChild(dragged);
		}
	},
	false
);
```

关于拖拉事件，有以下几个注意点。

-   拖拉过程只触发以上这些拖拉事件，尽管鼠标在移动，但是鼠标事件不会触发。
-   将文件从操作系统拖拉进浏览器，不会触发`dragstart`和`dragend`事件。
-   `dragenter`和`dragover`事件的监听函数，用来取出拖拉的数据（即允许放下被拖拉的元素）。由于网页的大部分区域不适合作为放下拖拉元素的目标节点，所以这两个事件的默认设置为当前节点不允许接受被拖拉的元素。如果想要在目标节点上放下的数据，首先必须阻止这两个事件的默认行为。

```html
<div ondragover="return false">
	<div ondragover="event.preventDefault()"></div>
</div>
```

上面代码中，如果不取消拖拉事件或者阻止默认行为，就不能在`div`节点上放下被拖拉的节点。

## DragEvent 接口

拖拉事件都继承了`DragEvent`接口，这个接口又继承了`MouseEvent`接口和`Event`接口。

浏览器原生提供一个`DragEvent()`构造函数，用来生成拖拉事件的实例对象。

```js
new DragEvent(type, options);
```

`DragEvent()`构造函数接受两个参数，第一个参数是字符串，表示事件的类型，该参数必须；第二个参数是事件的配置对象，用来设置事件的属性，该参数可选。配置对象除了接受`MouseEvent`接口和`Event`接口的配置属性，还可以设置`dataTransfer`属性要么是`null`，要么是一个`DataTransfer`接口的实例。

`DataTransfer`的实例对象用来读写拖拉事件中传输的数据，详见下文《DataTransfer 接口》的部分。

## DataTransfer 接口概述

所有拖拉事件的实例都有一个`DragEvent.dataTransfer`属性，用来读写需要传递的数据。这个属性的值是一个`DataTransfer`接口的实例。

浏览器原生提供一个`DataTransfer()`构造函数，用来生成`DataTransfer`实例对象。

```js
var dataTrans = new DataTransfer();
```

`DataTransfer()`构造函数不接受参数。

拖拉的数据分成两方面：数据的种类（又称格式）和数据的值。数据的种类是一个 MIME 字符串（比如`t
