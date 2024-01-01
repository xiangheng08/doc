<template>
	<css-demo :values="values" @change="change" height="300" property="outline-offset">
		<div class="ct">
			<div class="box" :style="styles">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
				dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
				ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
				fugiat nulla pariatur.
			</div>
		</div>
	</css-demo>
</template>

<script setup lang="ts">
import { ref, CSSProperties } from 'vue';
const values: CSSProperties[] = [
	{
		overflowClipMargin: '0px',
	},
	{
		overflowClipMargin: '10px',
  },
  {
		overflowClipMargin: '20px',
  },
  {
		overflowClipMargin: '-10px',
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
	.box {
		border: 3px solid;
		width: 250px;
		height: 100px;
		overflow: clip;
	}
}
</style>
