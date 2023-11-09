# 侧栏大纲自动滚动

## 效果

![](/public/images/frontend/vitepress/outline-auto-scroll-demo.gif)

## 实现

```vue
<!-- .vitepress/theme/components/outlineAutoScroll.vue -->
<template>
	<div class="outline-auto-scroll"></div>
</template>

<script setup lang="ts">
const asideContainerDom = ref<HTMLDivElement | null>(null);
const outlineMarkerDom = ref<HTMLDivElement | null>(null);
const showOutline = ref(true);

let timer: NodeJS.Timeout;
// 防止打包报错
const myDocument = globalThis.document;

function onScroll() {
	clearTimeout(timer);
	if (!showOutline.value) return;
	// 防抖
	timer = setTimeout(() => {
		if (!asideContainerDom.value) return;
		if (!outlineMarkerDom.value) return;

		const scrollHeight = asideContainerDom.value.scrollHeight;
		const height = asideContainerDom.value.clientHeight;
		const markerHeight = outlineMarkerDom.value.clientHeight; // 标记元素高度
		const offsetTop = outlineMarkerDom.value.offsetTop; // 标记元素的 y
		const paddingTop = Number(getComputedStyle(asideContainerDom.value)['paddingTop'].replace('px', '')); // 侧栏容器 padding-top 值
		const contentHeight = height - paddingTop; // 侧栏容器内容高度
		// 判断是否需要滚动
		if (scrollHeight > height) {
			const y = offsetTop - contentHeight / 2 + markerHeight + 28; // 计算需要滚动的距离

			asideContainerDom.value.scrollTo(0, y);
		}
	}, 50);
}

function onResize() {
	// vitepress 在屏幕小于 1280 时，会隐藏侧边栏，此时不需要自动滚动
	showOutline.value = myDocument.body.clientWidth > 1280;
}

onMounted(() => {
	asideContainerDom.value = myDocument?.querySelector('.aside-container');
	outlineMarkerDom.value = myDocument?.querySelector('.VPDocAsideOutline.has-outline .outline-marker');

	if (!outlineMarkerDom.value) {
		// 第一次没获取到，再获取一次
		setTimeout(() => {
			outlineMarkerDom.value = myDocument?.querySelector('.VPDocAsideOutline.has-outline .outline-marker');
		}, 1000);
	}

	// 监听滚动事件
	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onResize);

	onResize();
});

onBeforeUnmount(() => {
	window.removeEventListener('scroll', onScroll);
	window.removeEventListener('resize', onResize);
});
</script>
```

```ts
// .vitepress/theme/index.ts
import { h } from 'vue';
import DefaultTheme from 'vitepress/theme';
import outlineAutoScroll from './components/outlineAutoScroll.vue';

export default {
	...DefaultTheme,
	Layout: () => {
		return h(DefaultTheme.Layout, null, {
			// 通过布局插槽插入页面
			'aside-outline-after': () => h(outlineAutoScroll),
		});
	},
};
```

```css
/* .vitepress/theme/style.css */
.aside-container {
	scroll-behavior: smooth;
}
```

## 原理

其实很简单，就是找到那个 `outline-marker`（那个绿色的条），通过监听滚动事件，实时获取 `outline-marker` 的 top 值，在计算需要的滚动距离，最后用 `scrollTo` 方法滚动到指定位置。
