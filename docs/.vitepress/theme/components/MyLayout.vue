<template>
	<Layout>
		<template #doc-bottom>
			<image-viewer />
		</template>
		<template #aside-outline-after>
			<outline-auto-scroll />
		</template>
		<template #layout-bottom>
			<run-vue />
      <corner-buttons />
		</template>
	</Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme';
import imageViewer from './imageViewer.vue';
import outlineAutoScroll from './outlineAutoScroll.vue';
import runVue from './run.vue';
import CornerButtons from './CornerButtons.vue'

const { Layout } = DefaultTheme;
</script>
