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

<style scoped lang="scss"></style>
