<script setup lang="ts">
import { computed } from 'vue'
import { injectDragging } from './utils'

const props = withDefaults(
  defineProps<{
    size?: number | string
    width?: number | string
    height?: number | string
    tips?: string
  }>(),
  {
    size: '128px',
    tips: '拖拽文件到此区域',
  },
)

const isDragging = injectDragging()

const addUnit = (val: number | string): string => {
  if (typeof val === 'number') {
    return `${val}px`
  }
  return val
}

const style = computed(() => {
  return {
    width: addUnit(props.width || props.size),
    height: addUnit(props.height || props.size),
  }
})
</script>

<template>
  <div class="file-drop__default-content" :style="style" :class="{ dragging: isDragging }">
    <span v-if="tips">{{ tips }}</span>
    <slot></slot>
  </div>
</template>

<style lang="css" scoped>
.file-drop__default-content {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed #ccc;
  border-radius: 4px;
  color: #999;
  font-size: 14px;
  user-select: none;
}
.file-drop__default-content.dragging {
  border: 1px dashed #409eff;
}
</style>
