<template>
	<div class="image-viewer">
		<t-image-viewer
			v-model:visible="show"
			:images="previewImageInfo.list"
			:default-index="previewImageInfo.idx"
			:key="previewImageInfo.idx"
			:image-scale="{
				max: 5,
				min: 0.1,
				step: 0.2
			}"
			closeOnOverlay
			title="图片预览"
			@close="show = false">
		</t-image-viewer>
	</div>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import tdesignDark_h from '@/utils/hooks/tdesignDark'
import { ImageViewer as TImageViewer } from 'tdesign-vue-next';

tdesignDark_h()

const show = ref(false);
const previewImageInfo = reactive<{ url: string; list: string[]; idx: number }>({
	url: '',
	list: [],
	idx: 0,
});
function previewImage(e: Event) {
	const target = e.target as HTMLElement;
	const currentTarget = e.currentTarget as HTMLElement;
	if (target.tagName.toLowerCase() === 'img') {
		const imgs = currentTarget.querySelectorAll<HTMLImageElement>('.content-container .main img');
		const idx = Array.from(imgs).findIndex((el) => el === target);
		const urls = Array.from(imgs).map((el) => el.src);

		const url = target.getAttribute('src');
		previewImageInfo.url = url!;
		previewImageInfo.list = urls;
		previewImageInfo.idx = idx;

		// 兼容点击main之外的图片
		if (idx === -1 && url) {
			previewImageInfo.list.push(url);
			previewImageInfo.idx = previewImageInfo.list.length - 1;
		}
		show.value = true;
	}
}
// 防止打包报错
const myDocument = globalThis.document

onMounted(() => {
	const docDomContainer = myDocument?.querySelector('#VPContent');
	docDomContainer?.addEventListener('click', previewImage);
});

onUnmounted(() => {
	const docDomContainer = myDocument?.querySelector('#VPContent');
	docDomContainer?.removeEventListener('click', previewImage);
});
</script>
