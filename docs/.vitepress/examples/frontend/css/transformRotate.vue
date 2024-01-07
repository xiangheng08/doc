<template>
	<css-demo :values="values" @change="change" height="300" property="outline-offset" :column-mode-threshold="600">
		<div class="ct">
			<div class="content">
				<div class="box flex-center static">这是一个盒子</div>
				<div class="box flex-center" :style="styles">
					这是一个盒子
					<img src="/images/crosshair.svg" alt="crosshair" class="crosshair" :style="crosshairStyles" />
				</div>
			</div>
		</div>
	</css-demo>
</template>

<script setup lang="ts">
import { ref, CSSProperties } from 'vue';
const values: CSSProperties[] = [
	{
		transform: 'rotate(0deg)',
	},
	{
		transform: 'rotate(90deg)',
	},
	{
		transform: 'rotate(-90deg)',
	},
	{
		transform: 'rotate(90deg)',
		transformOrigin: 'top left',
	},
	{
		transform: 'rotate(-90deg)',
		transformOrigin: '80% 80%',
	},
	{
		transform: 'rotate(-0.25turn)',
	},
	{
		transform: 'rotate(3.142rad)',
	},
];

const styles = ref(values[0]);
const crosshairStyles = ref<CSSProperties>({});

function change(value: string | CSSProperties, index: number) {
	styles.value = value as CSSProperties;

	if (index > 2) {
		switch (index) {
			case 3:
				crosshairStyles.value = { left: '0', top: '0' };
				break;
			case 4:
				crosshairStyles.value = { left: '80%', top: '80%' };
				break;
		}
	} else {
		crosshairStyles.value = {};
	}
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
		top: 0;
		left: 0;
		.crosshair {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 2em;
			height: 2em;
		}
		&.static {
			opacity: 0.4;
		}
	}
}
</style>
