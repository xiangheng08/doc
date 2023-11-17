<template>
	<demo :title="props.title" padding="0" :shadow="props.shadow">
		<template #right>
			<a v-if="url" :href="url" target="_blank">打开页面</a>
		</template>
		<iframe
			v-if="url"
			ref="iframeRef"
			@load="onLoad"
			:src="url"
			:sandbox="sandbox"
			:width="_width"
			:height="_height"
			frameborder="0"></iframe>
	</demo>
</template>

<script setup lang="ts">
import { computed, reactive, watch, nextTick } from 'vue';
import { formatCSSlength } from '@/utils/format';
import { useData, withBase } from 'vitepress';

const { isDark } = useData();

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
		default: true,
	},
	scripts: {
		type: Boolean,
		default: false,
	},
});

const url = computed(() => (props.url ? withBase(props.url) : ''));

// 沙盒属性
if (props.sameOrigin) _sandbox.push('allow-same-origin');
if (props.scripts) _sandbox.push('allow-scripts');

const _width = computed(() => formatCSSlength(props.width));
const _height = computed(() => formatCSSlength(props.height));
const sandbox = computed(() => _sandbox.join(' '));

const iframeRef = ref<HTMLIFrameElement | null>(null);

const subWindow = ref<Window | null>(null);
const subDocument = ref<Document | null>(null);

const onLoad = () => {
	if (props.sameOrigin && iframeRef.value && iframeRef.value.contentWindow) {
		subWindow.value = iframeRef.value.contentWindow;
		subDocument.value = iframeRef.value.contentWindow.document;

		nextTick(toggleSubPageMode);
	}
};

const toggleSubPageMode = () => {
	if (subDocument.value) {
		subDocument.value.documentElement.style.colorScheme = isDark.value ? 'dark' : 'light';
	}
};

watch(isDark, toggleSubPageMode);
</script>

<style scoped lang="scss">
iframe {
	max-width: 100%;
}
</style>
