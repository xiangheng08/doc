<template>
	<css-demo :values="values" @change="change" height="300" property="outline-offset" :column-mode-threshold="600">
		<div class="ct">
			<div class="box">
				Most words are short &amp; don't need to break. But
				<strong class="word" :style="styles">Antidisestablishmentarianism</strong>
				is long. The width is set to min-content, with a max-width of 11em.
			</div>
		</div>
	</css-demo>
</template>

<script setup lang="ts">
import { ref, CSSProperties } from 'vue';
const values: CSSProperties[] = [
	{
		overflowWrap: 'normal',
	},
	{
		overflowWrap: 'anywhere',
	},
	{
		overflowWrap: 'break-word',
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
    background-color: rgba(255, 0, 200, 0.2);
    border: 3px solid #639;
    padding: 0.75em;
    width: min-content;
    max-width: 11em;
    height: 240px;
  }
}
</style>
