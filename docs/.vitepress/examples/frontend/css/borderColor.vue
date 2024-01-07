<template>
	<css-demo :values="values" @change="change" height="300" property="outline-offset" :column-mode-threshold="600">
		<div class="ct">
			<div class="box" :style="styles">这是一个有边框的盒子</div>
		</div>
	</css-demo>
</template>

<script setup lang="ts">
import { ref, CSSProperties } from 'vue';
const values: CSSProperties[] = [
	{
		borderColor: 'red',
	},
	{
		borderColor: 'red #f015ca',
	},
	{
		borderColor: 'red yellow green',
	},
	{
		borderColor: 'red yellow green blue',
	},
];

const styles = ref(values[0]);

function change(value: string | CSSProperties) {
	styles.value = value as CSSProperties;
}
</script>

<style scoped lang="scss">
.ct {
	display: flex;
	align-items: center;
	justify-content: center;
  height: 100%;
	.box {
		padding: 0.75em;
		width: 80%;
		height: 100px;
    text-align: center;
    transition: all 0.3s;
    border-width: 0.75em;
		border-style: solid;
    background-color: plum;
	}
}
</style>
