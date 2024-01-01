<template>
	<css-demo
		:values="values"
		@change="change"
		height="300"
		property="outline"
		:column-mode-threshold="600">
		<div class="ct">
			<div :style="styles"></div>
		</div>
	</css-demo>
</template>

<script setup lang="ts">
import { reactive, CSSProperties } from 'vue';
const values: (string | CSSProperties)[] = ['solid', 'dashed green', '1rem solid', 'thick double #32a1ce', {
  outline: '8px ridge rgba(170, 50, 220, .6)',
  borderRadius: '1rem'
}];

const active = ref(values[0]);
const styles = reactive<CSSProperties>({
  outline: active.value as string,
})


function change(value: string | CSSProperties) {
  if (typeof value === 'string') {
    styles.outline = value;
    styles.borderRadius = 0;
  } else {
    Object.assign(styles, value);
  }
}
</script>

<style scoped lang="scss">
.ct {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	div {
		width: 100px;
		height: 60px;
		background-color: red;
		outline-width: medium;
	}
}
</style>
