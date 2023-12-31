<template>
	<css-demo :values="values" @change="change" height="300" property="outline-offset" :column-mode-threshold="600">
		<div class="ct">
			<div class="box" :style="styles"></div>
			Far out in the uncharted backwaters of the unfashionable end of the western spiral arm of the
			Galaxy lies a small unregarded yellow sun. Orbiting this at a distance of roughly ninety-two million miles
			is an utterly insignificant little blue green planet whose ape-descended life forms are so amazingly
			primitive that they still think digital watches are a pretty neat idea.
		</div>
	</css-demo>
</template>

<script setup lang="ts">
import { ref, CSSProperties } from 'vue';
const values: CSSProperties[] = [
	{
		float: 'none',
	},
	{
		float: 'left',
	},
	{
		float: 'right',
	},
	{
		float: 'inline-start',
	},
	{
		float: 'inline-end',
	},
];

const styles = ref(values[0]);

function change(value: string | CSSProperties) {
	styles.value = value as CSSProperties;
}
</script>

<style scoped lang="scss">
.ct {
	.box {
		width: 70px;
		height: 70px;
		background-color: pink;
	}
}
</style>
