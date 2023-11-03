<template>
	<div class="_version">
		<span class="prefix">{{ props.prefix }}</span>
		<span class="content"><slot></slot></span>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	prefix: {
		type: String,
		default: 'v',
	},
});
</script>

<style scoped lang="scss">
._version {
	border-radius: 4px;
	padding: 3px 6px;
	background-color: var(--vp-c-indigo-soft);
	transition: color 0.25s, background-color 0.5s;
	font-size: var(--vp-code-font-size);
	color: var(--vp-c-indigo-1);
	white-space: nowrap;
  margin: 1em 0;
  display: inline-block;
}
</style>
