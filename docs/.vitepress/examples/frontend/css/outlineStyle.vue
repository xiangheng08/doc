<template>
	<css-demo
		:values="values"
		@change="change"
		height="300"
		property="outline-style"
		:column-mode-threshold="600"
		:default="active">
		<div class="ct">
			<div :style="{ outlineStyle: active }"></div>
		</div>
	</css-demo>
</template>

<script setup lang="ts">
import { CSSProperties } from 'vue';
const values = ['auto', 'none', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'];

const active = ref(values[0]);

function change(value: string | CSSProperties) {
	active.value = value as string;
}
</script>

<style scoped lang="scss">
.ct {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	div {
		width: 100px;
		height: 60px;
		background-color: red;
		outline-width: medium;
	}
}
</style>
