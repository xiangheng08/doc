<template>
	<css-demo :values="values" @change="change" height="300">
		<div class="ct flex-center">
			<div class="box" :style="styles">
				<div class="flex-center face front">1</div>
				<div class="flex-center face back">2</div>
				<div class="flex-center face right">3</div>
				<div class="flex-center face bottom">6</div>
			</div>
		</div>
	</css-demo>
</template>

<script setup lang="ts">
import { ref, CSSProperties } from 'vue';
const values: CSSProperties[] = [
	{
		backfaceVisibility: 'visible',
	},
	{
		backfaceVisibility: 'hidden',
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
	text-align: center;
	background: linear-gradient(skyblue, khaki);
	perspective: 800px;
	.box {
		width: 100px;
		height: 100px;
		transform-style: preserve-3d;
		perspective: 550px;
		perspective-origin: 220% 220%;
		transition: all 0.3s;
		.face {
			width: 100%;
			height: 100%;
			position: absolute;
			backface-visibility: inherit;
			background: rgba(0, 0, 0, 0.4);
			font-size: 60px;
			color: #fff;
			&.front {
				transform: translateZ(50px);
			}
			&.back {
				transform: rotateY(180deg) translateZ(50px);
				background: #e60000;
			}
			&.right {
				transform: rotateY(90deg) translateZ(50px);
			}
			&.bottom {
				transform: rotateX(-90deg) translateZ(50px);
			}
		}
	}
}
</style>
