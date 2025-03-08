<script setup lang="ts" generic="T extends Mode">
import { computed, provide, ref, watchEffect } from 'vue'
import {
  DropError,
  getEntries,
  getFiles,
  parseStructure,
  FileStructure,
} from './utils'
import type { Mode, DropResult } from './utils'

interface Props {
  /**
   * 文件拖拽模式
   * - `file`: 文件模式
   * - `structure`: 文件结构模式
   */
  mode: T
  /**
   * 是否撑满父元素
   */
  full?: boolean
  /**
   * 是否显示遮罩层
   */
  showOverlay?: boolean
  /**
   * 遮罩层标题
   */
  overlayTitle?: string
  /**
   * 遮罩层描述
   */
  overlayDesc?: string
  /**
   * v-model:dragging
   */
  dragging?: boolean
  /**
   * 是否激活拖拽
   */
  active?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  full: false,
  showOverlay: false,
  overlayTitle: '拖拽文件到此区域',
  overlayDesc: '支持单个或批量文件',
  active: true,
})

const emit = defineEmits<{
  (e: 'drop', payload: DropResult<T>): void
  (e: 'error', error: DropError): void
  (e: 'update:dragging', dragging: boolean): void
}>()

const isDragging = ref(false)

// 提供给子组件
provide('mode', props.mode)
provide('isDragging', isDragging)

// 提供给父组件 v-model:dragging
watchEffect(() => emit('update:dragging', isDragging.value))

const wrapperClassNames = computed(() => ({
  'full-size': props.full,
  dragging: isDragging.value,
}))

const handleDrop = async (e: DragEvent) => {
  if (!props.active) return

  e.preventDefault()
  isDragging.value = false

  const files = getFiles(e)
  const entries = getEntries(e)

  const payload: DropResult<T> = {
    result: [],
    structureNotSupported: false,
    hasDirectories: false,
  }

  type Result = DropResult<T>['result']

  if (props.mode === 'structure') {
    if (entries.length === 0) return
    try {
      const structures = await parseStructure(entries)
      payload.result = structures as Result
      payload.hasDirectories = structures.some((file) =>
        file.isDirectory(),
      )
    } catch (_) {
      if (files.length === 0) return
      // 出现错误说明不支持 webkitGetAsEntry API，直接返回没有层级的文件结构列表
      payload.structureNotSupported = true
      payload.result = files.map(
        (file) => new FileStructure(file),
      ) as unknown as Result
    }
  } else {
    if (files.length === 0) return
    payload.result = files as Result
  }

  emit('drop', payload)
}

const handleDragOver = (e: DragEvent) => {
  if (!props.active) return

  e.preventDefault()
  isDragging.value = true
}

const handleDragLeave = (e: DragEvent) => {
  if (!props.active) return

  const dropZone = e.currentTarget as HTMLElement
  const relatedTarget = e.relatedTarget as HTMLElement | null

  // 判断是否仍在拖拽区域内，避免移动到子元素时误触发 dragleave
  if (!relatedTarget || !dropZone.contains(relatedTarget)) {
    isDragging.value = false
  }
}
</script>

<template>
  <div
    :class="['drop-zone', wrapperClassNames]"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @drop.prevent="handleDrop"
  >
    <slot :is-dragging="isDragging"></slot>

    <div class="overlay" :class="{ show: showOverlay && isDragging }">
      <slot name="overlay"></slot>
      <div class="default-overlay">
        <div class="overlay-title">{{ overlayTitle }}</div>
        <div class="overlay-desc">{{ overlayDesc }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.drop-zone {
  position: relative;
  width: fit-content;
  height: fit-content;
  overflow: hidden;
}

.drop-zone.full-size {
  width: 100%;
  height: 100%;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--overlay-bg, rgba(0, 0, 0, 0.8));
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  z-index: 9;
  transition: opacity var(--overlay-transition-duration, 0.2s) ease-in-out;

  opacity: 0;
  pointer-events: none;
}

.overlay.show {
  opacity: 1;
  pointer-events: auto;
}

.default-overlay {
  text-align: center;
}

.overlay-title {
  color: var(--overlay-title-color, #f5f5f5);
  font-size: var(--overlay-title-font-size, 16px);
}

.overlay-desc {
  color: var(--overlay-desc-color, #999);
  font-size: var(--overlay-desc-font-size, 12px);
}
</style>
