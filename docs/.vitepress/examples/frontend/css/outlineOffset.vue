<template>
	<css-demo
		:values="values"
		@change="change"
		height="300"
		property="outline-offset"
		:column-mode-threshold="600"
		:default="active">
		<div class="ct">
			<div :style="{ outlineOffset: active, outlineStyle: 'solid' }"></div>
		</div>
	</css-demo>
</template>

<script setup lang="ts">
import { CSSProperties } from 'vue';
const values = ['0px', '10px', '-10px'];

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
