<script setup lang="ts">
import { nextTick, reactive, ref } from 'vue'
import { useSwap } from './code'
import { random } from '../../../utils/random/code'
import { sleep } from '../../../utils/sleep/code'

defineOptions({ name: 'Example6' })

const list = reactive([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
const el = ref<HTMLElement>()
useSwap(el, {
  async onSort({ draggedIndex, targetIndex }, swap) {
    console.log('onSort', draggedIndex, targetIndex)
    await sleep(random(50, 300)) // 模拟请求
    const [tmp] = list.splice(draggedIndex, 1)
    list.splice(targetIndex, 0, tmp!)
    await nextTick()
    await swap()
  },
})
</script>

<template>
  <div ref="el" class="container">
    <div v-for="item in list" :key="item" :data-id="item" class="item">{{ item }}</div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

:deep(.item) {
  position: relative;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background-color: var(--vp-c-bg-soft);

  &.swap-chosen {
    background-color: var(--vp-c-brand-3);
  }

  &.swap-before::after,
  &.swap-after::after {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: plum;
    pointer-events: none;
  }

  &.swap-before::after {
    bottom: calc(100% + 8px);
    transform: translateY(50%);
  }

  &.swap-after::after {
    top: calc(100% + 8px);
    transform: translateY(-50%);
  }
}
</style>
