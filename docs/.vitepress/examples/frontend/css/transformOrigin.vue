<template>
	<css-demo :values="values" @change="change" height="300" property="outline-offset" :column-mode-threshold="600">
		<div class="ct">
			<div class="box flex-center" :style="styles">
					这是一个盒子
					<img src="/images/crosshair.svg" alt="crosshair" class="crosshair" :style="crosshairStyles" />
				</div>
		</div>
	</css-demo>
</template>

<script setup lang="ts">
import { ref, CSSProperties } from 'vue';
const values: CSSProperties[] = [
	{
		transformOrigin: 'center',
  },
  {
		transformOrigin: 'top left',
  },
  {
		transformOrigin: '50px 50px',
  },
  {
		transformOrigin: 'bottom right 60px',
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
		background-color: plum;
		padding: 0.75em;
		width: 160px;
		height: 160px;
		transition: all 0.3s;
		position: relative;
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
	}
}
</style>
