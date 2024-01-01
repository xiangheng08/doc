<template>
	<css-demo :values="values" @change="change" height="300">
		<div class="ct">
			<div class="box" :style="styles">
				Michaelmas term lately over, and the Lord Chancellor sitting in Lincoln's Inn Hall. Implacable November
				weather. As much mud in the streets as if the waters had but newly retired from the face of the earth.
			</div>
		</div>
	</css-demo>
</template>

<script setup lang="ts">
import { ref, CSSProperties } from 'vue';
const values: CSSProperties[] = [
	{
		overflow: `visible`
	},
	{
		overflow: `hidden`
	},
	{
		overflow: `clip`
	},
	{
		overflow: `scroll`
	},
	{
		overflow: `auto`
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
	overflow: hidden;
	.box {
		width: 15em;
    height: 9em;
    border: medium dotted;
    padding: 0.75em;
    text-align: left;
	}
}
</style>
