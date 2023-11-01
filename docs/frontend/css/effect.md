# CSS 效果

## 平滑滚动

```css
/* 根元素 */
html {
	scroll-behavior: smooth;
}
/* 指定元素 */
.scroll-container {
	scroll-behavior: smooth;
}
```

这种方式非常适合在使用锚点链接来滚动的页面上

<script setup>
import subPage from '@theme/components/subPage.vue'
</script>

<sub-page url="/examples/iframe/css/smoothScroll.html" height="360" title="效果"/>

[scroll-behavior 属性 MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-behavior)

## 超出文字省略

```css
p {
	overflow: hidden; /* 溢出部分隐藏 */
	text-overflow: ellipsis; /* 超出部分省略号表示 */
	white-space: nowrap; /* 防止文本换行 */

	/* 没有注释的 */
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
```

## 超过两行文字省略

::: warning 注意
这是一个非标属性，兼容性不太好
:::

```css
p {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;

	/* 重点 */
	display: -webkit-box;
	-webkit-box-orient: vertical;
	/* 设置需要的行数 */
	-webkit-line-clamp: 2;

	/* 没有注释的 */
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
}
```

## 超出文字省略前面部分

```css
p {
	/* 正常设置隐藏 */
	overflow: hidden; /* 溢出部分隐藏 */
	text-overflow: ellipsis; /* 超出部分省略号表示 */
	white-space: nowrap; /* 防止文本换行 */
	/* 然后设置让文本从右到左显示 */
	direction: rtl;
	unicode-bidi: bidi-override;

	/* 没有注释的 */
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	direction: rtl;
	unicode-bidi: bidi-override;
}
```

最后使用 js 颠倒文字原本的顺序，并显示颠倒后的结果即可：

```js
const str = 'hello world！';
const result = str.split('').reverse().join('');
```

<demo>
  源文本：{{ str }}
  <div class="box">省略前面的：<span class="text-overflow-ellipsis-reverse">{{ str.split('').reverse().join('') }}</span></div>
</demo>

<script>
export default { data(){ return { str: 'Aliquip est nulla ex ullamco velit ad irure.' } } }

const myDocument = globalThis.document

myDocument?.addEventListener('copy', (e) => {
  // 判断目标元素是否包含 data-reverse-copy-text 属性，从而判断是否需要执行反转操作
	if(e.target && e.target.hasAttribute('data-reverse-copy-text')){
    // 是否复制成功
    if(e.clipboardData){
      // 获取需要复制的内容
      let text = window.getSelection().toString();
      if(text){
        console.log('反转前：' + text);
			  // 如果文本存在，则取消默认行为
        e.preventDefault();
        // 反转文本
        text = text.split('').reverse().join('');
        console.log('反转后：' + text);
        // 放入剪贴板
        e.clipboardData.setData('text/plain', text)
      }
    }
  }
})
</script>

<style>
  .box{
    display: flex;
    align-items: center;
  }
  .text-overflow-ellipsis-reverse {
    width: 274px;
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    direction: rtl;
    unicode-bidi: bidi-override;
  }
</style>

::: warning 注意
这样虽然实现了超出文字省略前面部分，但是也存在一个问题，复制文字时，复制的是颠倒后的文字，而不是原本的文字。

解决办法：监控复制 (copy) 事件，将复制的内容还原为原本的文字。演示如下
:::

<demo>
  <p style="margin-top: 0;">可在控制台查看输出</p>
  <div class="box">未加反转：<span class="text-overflow-ellipsis-reverse">{{ str.split('').reverse().join('') }}</span></div>
  <div class="box">加了反转：<span class="text-overflow-ellipsis-reverse" data-reverse-copy-text>{{ str.split('').reverse().join('') }}</span></div>
</demo>

实现代码：

```js
document.addEventListener('copy', (e) => {
	// 判断目标元素是否包含 data-reverse-copy-text 属性，从而判断是否需要执行反转操作
	if (e.target && e.target.hasAttribute('data-reverse-copy-text')) {
		// 是否复制成功
		if (e.clipboardData) {
			// 获取需要复制的内容
			let text = window.getSelection().toString();
			if (text) {
				console.log('反转前：' + text);
				// 如果文本存在，则取消默认行为
				e.preventDefault();
				// 反转文本
				text = text.split('').reverse().join('');
				console.log('反转后：' + text);
				// 放入剪贴板
				e.clipboardData.setData('text/plain', text);
			}
		}
	}
});
```

## 设置文字不可选中

```css
.un-selectable {
	user-select: none;
}
```

<demo>
  <span style="user-select: none;">这行文字不能选中</span>
</demo>

## 内容适应宽度

```css
.fit-width {
	width: fit-content;
	width: -moz-fit-content;
	width: -webkit-fit-content;
}
```

```html
<div class="fit-width">这行文字会根据内容自动适应宽度</div>
```

<demo>
  <div class="fit-width">这行文字会根据内容自动适应宽度</div>
</demo>

<style>
.fit-width {
	width: fit-content;
	width: -moz-fit-content;
	width: -webkit-fit-content;
	border: 1px solid pink;
}
</style>
