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
		borderBlock: '1rem solid',
		writingMode: 'horizontal-tb',
	},
	{
		borderBlock: '1rem dashed red',
		writingMode: 'vertical-rl',
	},
	{
		borderBlock: '1rem solid',
		writingMode: 'horizontal-tb',
		direction: 'rtl',
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
		background-color: plum;
    padding: 0.75em;
    width: 80%;
    height: 100px;
    unicode-bidi: bidi-override;
		transition: all 0.3s;
		color: #8b008b;
	}
}
</style>
