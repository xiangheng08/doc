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
		transform: 'translate(0, 0)',
	},
	{
		transform: 'translate(20px, -20px)',
	},
	{
		transform: 'translateX(20px)',
	},
	{
		transform: 'translateY(-20px)',
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
	.content{
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
