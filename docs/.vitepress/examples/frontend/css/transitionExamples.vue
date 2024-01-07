<template>
	<css-demo :values="values" @change="change" height="300">
		<div class="ct flex-center">
			<div class="box" :style="styles">悬浮以查看过渡效果</div>
		</div>
	</css-demo>
</template>

<script setup lang="ts">
import { ref, CSSProperties } from 'vue';
const values: CSSProperties[] = [
	{
		transition: 'margin-right 2s',
	},
	{
		transition: 'margin-right 2s .5s',
	},
	{
		transition: 'transition: margin-right 2s ease-in-out',
	},
	{
		transition: 'transition: margin-right 2s ease-in-out .5s',
	},
	{
		transition: 'transition: margin-right 2s, color 1s',
	},
	{
		transition: 'all 1s ease-out',
	},
];

const styles = ref(values[0]);
function change(value: string | CSSProperties) {
	styles.value = value as CSSProperties;
}
</script>

<style scoped lang="scss">
.ct {
	height: 100%;
	overflow: hidden;
	.box {
		background-color: #e4f0f5;
		padding: 1rem;
		border-radius: 0.5rem;
		width: 100%;
		text-align: center;
		color: #000;
	}
	&:hover .box {
		background-color: #909;
		color: #fff;
		margin-right: 40%;
	}
}
</style>
