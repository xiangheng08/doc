<template>
	<css-demo :values="values" @change="change" height="300" property="outline-offset" :column-mode-threshold="600">
		<div class="ct">
			<p>In this demo you can control the position property for the yellow box.</p>

			<div class="box"></div>
			<div class="box active" :style="styles"></div>
			<div class="box"></div>

			<p>
				To see the effect of sticky positioning, select the position: sticky option and scroll this container.
			</p>

			<p>
				The element will scroll along with its container, until it is at the top of the container (or reaches
				the offset specified in top), and will then stop scrolling, so it stays visible.
			</p>

			<p>
				The rest of this text is only supplied to make sure the container overflows, so as to enable you to
				scroll it and see the effect.
			</p>

			<hr />

			<p>
				Far out in the uncharted backwaters of the unfashionable end of the western spiral arm of the Galaxy
				lies a small unregarded yellow sun. Orbiting this at a distance of roughly ninety-two million miles is
				an utterly insignificant little blue green planet whose ape-descended life forms are so amazingly
				primitive that they still think digital watches are a pretty neat idea.
			</p>
		</div>
	</css-demo>
</template>

<script setup lang="ts">
import { ref, CSSProperties } from 'vue';
const values: CSSProperties[] = [
	{
		position: 'static',
	},
	{
		position: 'relative',
		top: '40px',
		left: '40px',
	},
	{
		position: 'absolute',
		top: '40px',
		left: '40px',
  },
  {
		position: 'fixed',
		top: '60px',
    left: '60px',
    zIndex: 999,
	},
	{
		position: 'sticky',
    top: '20px',
	},
];

const styles = ref(values[0]);

function change(value: string | CSSProperties) {
	styles.value = value as CSSProperties;
}
</script>

<style scoped lang="scss">
.ct {
	position: relative;
	p {
		margin: 16px 0;
	}
	.box {
		width: 60px;
		height: 60px;
    display: inline-block;
		margin-right: 10px;
		background-color: darkgreen;
		&.active {
			background-color: pink;
		}
	}
}
</style>
