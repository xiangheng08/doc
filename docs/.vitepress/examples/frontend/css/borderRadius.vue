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
		borderRadius: '30px',
	},
	{
		borderRadius: '25% 10%',
	},
	{
		borderRadius: '10px 20px 30px',
	},
	{
		borderRadius: '10% 30% 50% 70%',
	},
	{
		borderRadius: '10% / 50%',
	},
	{
		borderRadius: '10px 100px / 120px',
	},
	{
		borderRadius: '50% 20% / 10% 40%',
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
	.box{
		width: 80%;
    height: 80%;
    display: flex;
		align-items: center;
    justify-content: center;
    transition: all 0.3s;
		background-color: #5b6dcd;
    padding: 10px;
	}
}
</style>
