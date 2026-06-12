# CSS 效果

## 超出文字省略

```css
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

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

<style scoped>
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

<demo-iframe src="/css/smooth-scroll-demo.html" :height="360" title="平滑滚动 DEMO" open-page />

[scroll-behavior 属性 MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/scroll-behavior)

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

## 透明网格背景

```css
.grid-bg {
	background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
}
```

<demo>
  <div style="width: 100px; height: 100px; background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');"></div>
</demo>

## 顶部安全距离

```css
.container {
  padding-top: constant(safe-area-inset-top); /* 兼容 iOS < 11.2 */
  padding-top: env(safe-area-inset-top); /* 兼容 iOS >= 11.2 */

  /* 在安全距离基础上增加额外间距 */
  padding-top: calc(constant(safe-area-inset-top) + 20px);
  padding-top: calc(env(safe-area-inset-top) + 20px);
}
```

## 底部安全距离

```css
.container {
  padding-bottom: constant(safe-area-inset-bottom); /* 兼容 iOS < 11.2 */
  padding-bottom: env(safe-area-inset-bottom); /* 兼容 iOS >= 11.2 */

  /* 在安全距离基础上增加额外间距 */
  padding-bottom: calc(constant(safe-area-inset-bottom) + 20px);
  padding-bottom: calc(env(safe-area-inset-bottom) + 20px);
}
```

## Grid 自适应列布局

```css
.container {
  /* auto-fill：有固定列宽，空间不够时自动换行，剩余空间保留空轨道 */
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

  /* auto-fit：与 auto-fill 类似，但剩余空间会被已有列拉伸占满，不留空轨道 */
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
```

## 渐变文字

```css
.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

<demo>
  <span style="font-size: 24px; font-weight: bold; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;">这是一段渐变文字</span>
</demo>

## 首字下沉

```css
p::first-letter {
  float: left;
  font-size: 3em;
  font-weight: bold;
  line-height: 1;
  margin-right: 8px;
  color: #e74c3c;
}
```

<demo>
  <p class="demo-first-letter" style="width: 300px;">首字下沉效果常用于文章或杂志风格的排版中，让段落的第一个字显得更加突出，增强视觉吸引力。</p>
</demo>

<style>
.demo-first-letter::first-letter {
  float: left;
  font-size: 3em;
  font-weight: bold;
  line-height: 1;
  margin-right: 8px;
  color: #e74c3c;
}
</style>

## 选中文本样式

```css
::selection {
  background-color: #667eea;
  color: #fff;
}

/* 兼容 Firefox */
::-moz-selection {
  background-color: #667eea;
  color: #fff;
}
```

<demo>
  <p>选中这段文字试试，会看到自定义的选中颜色。</p>
</demo>

## 空状态占位

```css
/* 当元素内容为空时显示占位提示 */
.empty-placeholder:empty::after {
  content: '暂无数据';
  color: #999;
}
```

```html
<div class="empty-placeholder"></div>
```

<demo>
  <div class="empty-placeholder">该元素有内容，所以不显示占位</div>
  <div class="empty-placeholder"></div>
</demo>

<style>
.empty-placeholder:empty::after {
  content: '暂无数据';
  color: #999;
}
</style>

## 毛玻璃效果

```css
.glass {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px); /* 兼容 Safari */
  border: 1px solid rgba(255, 255, 255, 0.3);
}
```

<demo>
  <div style="position: relative; width: 200px; height: 100px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 8px; display: flex; align-items: center; justify-content: center;">
    <div style="background: rgba(255,255,255,0.25); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.3); padding: 16px 24px; border-radius: 8px; color: #fff; font-weight: bold;">毛玻璃效果</div>
  </div>
</demo>

## 自定义滚动条

```css
/* 自定义滚动条整体 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
```

<demo>
  <div class="custom-scrollbar" style="height: 80px; overflow-y: auto; border: 1px solid #ddd; padding: 8px; border-radius: 4px;">
    <p v-for="i in 5" :key="i">第 {{ i }} 行内容 — 滚动条已美化</p>
  </div>
</demo>

<style>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>

## 渐变边框

```css
.gradient-border {
  border: 2px solid transparent;
  background-clip: padding-box;
  border-image: linear-gradient(135deg, #667eea, #764ba2) 1;
}

/* 或者使用 background-clip 方式（推荐，支持 border-radius） */
.gradient-border-v2 {
  position: relative;
  background: #fff;
  border-radius: 8px;
}
.gradient-border-v2::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 2px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}
```

<demo>
  <div style="padding: 12px 24px; border-radius: 8px; background: #fff; position: relative; display: inline-block;">
    <span style="position: relative; z-index: 1;">渐变边框</span>
    <span style="position: absolute; inset: 0; border-radius: inherit; padding: 2px; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite: xor; mask-composite: exclude;"></span>
  </div>
</demo>

## 固定宽高比

```css
/* 现代写法 */
.aspect-ratio-box {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #667eea;
}

/* 兼容老浏览器的 padding-top 方式 */
.aspect-ratio-box-fallback {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 9 / 16 = 56.25% */
}
.aspect-ratio-box-fallback > .content {
  position: absolute;
  inset: 0;
}
```

<demo>
  <div style="width: 200px; aspect-ratio: 16 / 9; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: #fff;">16 : 9</div>
</demo>

## 居中大全

```css
/* Flexbox 居中 */
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Grid 居中 */
.grid-center {
  display: grid;
  place-items: center;
}

/* Absolute + Transform 居中 */
.absolute-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Absolute + margin 居中（需已知宽高） */
.absolute-margin-center {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

/* 行内/文字水平居中 */
.text-center {
  text-align: center;
}
```

<demo>
  <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px;">
    <div style="height: 60px; background: #f0f0f0; border-radius: 4px; display: flex; justify-content: center; align-items: center;">flex 居中</div>
    <div style="height: 60px; background: #f0f0f0; border-radius: 4px; display: grid; place-items: center;">grid 居中</div>
  </div>
</demo>

## 粘性定位

```css
.sticky-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: #fff;
}
```

<demo>
  <div style="height: 120px; overflow-y: auto; border: 1px solid #ddd; border-radius: 4px;">
    <div style="position: sticky; top: 0; background: #667eea; color: #fff; padding: 8px 12px; font-weight: bold;">吸顶标题</div>
    <p v-for="i in 6" :key="i" style="padding: 4px 12px; margin: 0;">列表项 {{ i }}</p>
  </div>
</demo>

## 粘性 Footer

```css
/* 内容不够时 footer 固定在底部 */
html, body {
  height: 100%;
  margin: 0;
}
.page-wrap {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
.page-content {
  flex: 1;
}
```

```html
<div class="page-wrap">
  <main class="page-content">页面内容</main>
  <footer>页脚 — 内容少时固定在底部</footer>
</div>
```

## 图片居中裁切

```css
/* 覆盖模式：铺满容器，裁切超出部分 */
.img-cover {
  width: 200px;
  height: 200px;
  object-fit: cover;
}

/* 包含模式：完整显示图片，留白 */
.img-contain {
  width: 200px;
  height: 200px;
  object-fit: contain;
}

/* 调整焦点位置（从顶部对齐） */
.img-cover-top {
  object-fit: cover;
  object-position: top;
}
```

<demo>
  <div style="display: flex; gap: 12px;">
    <div>
      <p style="margin: 0 0 4px; font-size: 12px; color: #888;">cover</p>
      <img src="https://picsum.photos/300/200" style="width: 100px; height: 80px; object-fit: cover; border-radius: 4px;" />
    </div>
    <div>
      <p style="margin: 0 0 4px; font-size: 12px; color: #888;">contain</p>
      <img src="https://picsum.photos/300/200" style="width: 100px; height: 80px; object-fit: contain; background: #f0f0f0; border-radius: 4px;" />
    </div>
  </div>
</demo>

## 暗色模式适配

```css
/* 系统暗色模式下自动切换样式 */
:root {
  --bg: #fff;
  --text: #333;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #1a1a2e;
    --text: #eee;
  }
}

body {
  background: var(--bg);
  color: var(--text);
}
```

## 焦点可见样式

```css
/* 鼠标点击时不显示焦点框，键盘 Tab 导航时显示 */
:focus:not(:focus-visible) {
  outline: none;
}

:focus-visible {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}
```

<demo>
  <div style="display: flex; gap: 8px;">
    <button style="padding: 6px 16px; border: 1px solid #ddd; border-radius: 4px; background: #fff; cursor: pointer;">按钮 1</button>
    <button style="padding: 6px 16px; border: 1px solid #ddd; border-radius: 4px; background: #fff; cursor: pointer;">按钮 2</button>
  </div>
  <p style="font-size: 12px; color: #888; margin-top: 8px;">试试用鼠标点击 vs 用 Tab 键切换焦点</p>
</demo>

## 修改输入光标颜色

```css
/* 修改输入框光标颜色 */
input {
  caret-color: #667eea;
}

/* 修改鼠标指针样式 */
.pointer {
  cursor: pointer;
}
.not-allowed {
  cursor: not-allowed;
}
.grab {
  cursor: grab;
}
```

<demo>
  <div>
    <input placeholder="光标颜色已修改" style="caret-color: #667eea; padding: 6px 12px; border: 1px solid #ddd; border-radius: 4px; outline: none;" />
  </div>
  <div style="display: flex; gap: 8px; margin-top: 8px;">
    <span style="padding: 4px 12px; background: #f0f0f0; border-radius: 4px; cursor: pointer;">pointer</span>
    <span style="padding: 4px 12px; background: #f0f0f0; border-radius: 4px; cursor: not-allowed;">not-allowed</span>
    <span style="padding: 4px 12px; background: #f0f0f0; border-radius: 4px; cursor: grab;">grab</span>
  </div>
</demo>

## 骨架屏 Loading

```css
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s ease-in-out infinite;
  border-radius: 4px;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
```

<demo>
  <div>
    <div style="width: 60%; height: 16px; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; animation: skeleton-loading 1.5s ease-in-out infinite; border-radius: 4px; margin-bottom: 8px;"></div>
    <div style="width: 80%; height: 14px; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; animation: skeleton-loading 1.5s ease-in-out infinite; border-radius: 4px; margin-bottom: 8px;"></div>
    <div style="width: 40%; height: 14px; background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; animation: skeleton-loading 1.5s ease-in-out infinite; border-radius: 4px;"></div>
  </div>
</demo>

<style>
@keyframes skeleton-loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
```

