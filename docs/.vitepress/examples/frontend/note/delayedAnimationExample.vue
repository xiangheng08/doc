<template>
	<demo height="200px">
		<div class="container">
			<div class="animation-box flex-center">
				<div class="box flex-center" ref="boxRef">text</div>
			</div>
			<div class="range-box flex-center">
				<input type="range" min="0" max="1" step="0.01" value="0.5" ref="rangeRef" @input="calc" />
			</div>
		</div>
	</demo>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const boxRef = ref<HTMLDivElement>();
const rangeRef = ref<HTMLInputElement>();

const calc = () => {
	boxRef.value?.style.setProperty('--delay', `-${rangeRef.value?.value}s`);
};

onMounted(calc);
</script>

<style scoped lang="scss">
.container {
	.animation-box {
		height: 100px;
		.box {
			background-color: plum;
			color: #fff;
			width: 3rem;
			height: 3rem;
			--delay: 0;
			animation: move linear forwards 1s paused;
			animation-delay: var(--delay);
		}
	}
	.range-box {
		margin-top: 1rem;
	}
}

@keyframes move {
	0% {
		transform: translate(-100px, 0) rotate(0deg) scale(1);
	}
	50% {
		transform: translate(0px, -30px) rotate(180deg) scale(1.5);
	}
	100% {
		transform: translate(100px, 0) rotate(360deg) scale(1);
	}
}
</style>
