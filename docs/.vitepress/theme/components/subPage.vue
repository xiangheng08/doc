<template>
	<div class="sub-page">
		<div class="header">
			<div class="title">{{ props.title }}</div>
			<div class="link">
        <a v-if="props.url" :href="props.url" target="_blank">打开页面</a>
      </div>
		</div>
		<iframe
			v-if="props.url"
			:src="props.url"
			:sandbox="sandbox"
			:width="_width"
			:height="_height"
			frameborder="0"></iframe>
	</div>
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
.sub-page {
	position: relative;
	border: 1px solid var(--sub-page-border-color);
	border-radius: var(--sub-page-radius);
  box-shadow: var(--sub-page-shadow);
	overflow: hidden;
	margin: 1rem 0;
	box-sizing: border-box;
	.header {
		height: 2rem;
		padding: 0 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: var(--sub-page-header-bg);
    font-size: smaller;
    .title{
      color: var(--vp-c-text-1);
    }
	}
	iframe {
		max-width: 100%;
	}
}
</style>
