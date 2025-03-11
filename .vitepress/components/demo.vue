<script setup lang="ts">
import { computed, useSlots } from 'vue'

const props = defineProps({
  title: String,
  dividerLine: Boolean,
})

const slots = useSlots()

const headerShow = computed(() => {
  return props.title || slots['header-left'] || slots['header-right']
})
</script>

<template>
  <div class="demo" :class="{ 'divider-line': dividerLine }">
    <header v-if="headerShow">
      <div class="left">
        <h4 class="title">{{ title }}</h4>
        <slot name="header-left"></slot>
      </div>
      <div class="right">
        <slot name="header-right"></slot>
      </div>
    </header>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
.demo {
  border-radius: 8px;
  overflow: hidden;
  margin: 16px 0;
  transition: background-color 0.5s ease;
  box-shadow: var(--vp-shadow-2);

  header {
    height: 48px;
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    box-shadow: inset 0 -1px var(--vp-c-gutter);

    .left,
    .right {
      height: 100%;
      display: flex;
      align-items: center;
    }

    .right {
      justify-content: flex-end;
    }

    .title {
      all: revert;
      margin: 0;
      font-weight: normal;
      line-height: 1;
    }
  }

  &.divider-line {
    border: 1px solid var(--vp-c-divider);

    header {
      border-bottom: 1px solid var(--vp-c-divider);
      box-shadow: none;
    }
  }

  .content {
    padding: 22px 24px;
  }
}

.dark .demo {
  background-color: var(--vp-c-bg-alt);
}
</style>
