<template>
	<div class="sub-page" :class="{ shadow: shadow }">
		<div class="header">
			<div class="left">
        <slot name="left" v-if="slots.left"></slot>
        <template v-else-if="props.title">{{ props.title }}</template>
      </div>
			<div class="right">
        <slot name="right" v-if="slots.right"></slot>
        <template v-else-if="props.right">{{ props.right }}</template>
      </div>
		</div>
		<div class="body" :style="{ padding: _padding }">
      <slot></slot>
    </div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { formatCSSlength } from '@/utils/format';

const slots = defineSlots()

const props = defineProps({
  title: {
    type: String,
    default: 'demo',
  },
  right: String,
  padding: {
    type: String,
    default: '20px 24px',
  },
  shadow: {
    type: Boolean,
    default: false,
  }
});

const _padding = computed(() => formatCSSlength(props.padding))
</script>

<style scoped lang="scss">
.sub-page {
	position: relative;
	border: 1px solid var(--demo-border);
	border-radius: var(--demo-radius);
	overflow: hidden;
	margin: 1rem 0;
	box-sizing: border-box;
  background-color: var(--demo-bg);
  &.shadow{
    box-shadow: var(--demo-shadow);
  }
	.header {
		height: 2rem;
		padding: 0 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: var(--demo-header-bg);
    font-size: smaller;
    border-bottom: 1px solid var(--demo-divider-line);
	}
}
</style>
