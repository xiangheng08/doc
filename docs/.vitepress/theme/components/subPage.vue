<template>
	<demo :title="props.title" padding="0" :shadow="props.shadow">
		<template #right>
			<a v-if="props.url" :href="props.url" target="_blank">打开页面</a>
		</template>
		<iframe
			v-if="props.url"
			:src="props.url"
			:sandbox="sandbox"
			:width="_width"
			:height="_height"
			frameborder="0"></iframe>
	</demo>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import { formatCSSlength } from '@/utils/format';

const _sandbox = reactive<string[]>([]);

const props = defineProps({
	url: String,
	width: {
		type: [Number, String],
		default: '100%',
	},
	height: {
		type: [Number, String],
		default: 400,
	},
	title: {
		type: String,
		default: '子页面',
	},
	shadow: {
		type: Boolean,
		default: true,
	},
	// 同源
	sameOrigin: {
		type: Boolean,
		default: false,
	},
	scripts: {
		type: Boolean,
		default: false,
	},
});

// 沙盒属性
if (props.sameOrigin) _sandbox.push('allow-same-origin');
if (props.scripts) _sandbox.push('allow-scripts');

const _width = computed(() => formatCSSlength(props.width));
const _height = computed(() => formatCSSlength(props.height));
const sandbox = computed(() => _sandbox.join(' '));
</script>

<style scoped lang="scss">
iframe {
	max-width: 100%;
}
</style>
