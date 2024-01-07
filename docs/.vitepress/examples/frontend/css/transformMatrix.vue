<template>
	<css-demo :values="values" @change="change" height="300" property="outline-offset" :column-mode-threshold="600">
		<div class="ct">
			<div class="content">
				<div class="box flex-center static">这是一个盒子</div>
				<div class="box flex-center" :style="styles">这是一个盒子</div>
			</div>
		</div>
	</css-demo>
</template>

<script setup lang="ts">
import { ref, CSSProperties } from 'vue';
const values: CSSProperties[] = [
	{
		transform: 'matrix(0.866, 0.5, -0.5, 0.866, 0, 0)',
	},
	{
		transform: 'matrix(1, 2, 3, 4, 5, 6)',
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
	.content {
		width: 50%;
		height: 50%;
		position: relative;
	}
	.box {
		background-color: plum;
		padding: 0.75em;
		width: 100%;
		height: 100%;
		transition: all 0.3s;
		position: absolute;
		left: 0;
		top: 0;
		&.static {
			opacity: 0.4;
		}
	}
}
</style>
