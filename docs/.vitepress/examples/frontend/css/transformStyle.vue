<template>
	<css-demo :values="values" @change="change" height="300" property="outline-offset" :column-mode-threshold="600">
		<div class="ct flex-center">
			<div class="box" :style="styles">
				<p>父盒子</p>
				<div class="child">
					<code>rotate3d(1, 1, 1, 45deg)</code>
				</div>
			</div>
		</div>
	</css-demo>
</template>

<script setup lang="ts">
import { ref, CSSProperties } from 'vue';
const values: CSSProperties[] = [
	{
		transformStyle: 'flat',
	},
	{
		transformStyle: 'preserve-3d',
	},
];

const styles = ref(values[0]);
const crosshairStyles = ref<CSSProperties>({});

function change(value: string | CSSProperties, index: number) {
	styles.value = value as CSSProperties;

	switch (index) {
		case 0:
			crosshairStyles.value = { left: '50%', top: '50%' };
			break;
		case 1:
			crosshairStyles.value = { left: '0%', top: '0%' };
			break;
		case 2:
			crosshairStyles.value = { left: '50px', top: '50px' };
			break;
		case 3:
			crosshairStyles.value = { left: '100%', top: '100%' };
			break;
	}
}
</script>

<style scoped lang="scss">
.ct {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	.box {
		background: #623e3f;
		border-radius: 0.75rem;
		color: #fff;
		transform: perspective(200px) rotateY(30deg);
		p {
			text-align: center;
			width: 100%;
		}
		.child {
			background-color: #ffba08;
			border-radius: 0.2rem;
			margin: 1rem;
			padding: 0.2rem;
			transform: rotate3d(1, 1, 1, 45deg);
			code {
				color: #000;
			}
		}
	}
}
</style>
