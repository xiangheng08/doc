<template>
	<div class="_version" v-if="slots.default || props.text">
		<slot v-if="slots.default"></slot>
		<template v-else-if="props.text">{{ props.text }}</template>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({
	text: String,
});

const slots = defineSlots();
</script>

<style scoped lang="scss">
._version {
	border-radius: 30px;
	border: 1px solid var(--version);
	line-height: 20px;
	padding: 0 6px;
	transition: color 0.25s, border-color 0.5s;
	font-size: 12px;
	color: var(--version);
	white-space: nowrap;
	margin: 1em 0;
	display: inline-block;
}
</style>
