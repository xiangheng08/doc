<script setup lang="ts" generic="T extends Mode">
import { computed, provide, ref } from 'vue'
import { DropError, getEntries, getFiles, parseStructure, FileStructure } from './utils'
import type { Mode, DropResult } from './utils'

const props = withDefaults(
  defineProps<{
    mode: T
    full?: boolean
    showOverlay?: boolean
    overlayTitle?: string
    overlayDesc?: string
  }>(),
  {
    full: false,
    showOverlay: false,
    overlayTitle: '拖拽文件到此区域',
    overlayDesc: '支持单个或批量文件',
  },
)

const emit = defineEmits<{
  (e: 'drop', payload: DropResult<T>): void
  (e: 'error', error: DropError): void
}>()

const isDragging = ref(false)

provide('mode', props.mode)
provide('isDragging', isDragging)

const wrapperClassNames = computed(() => ({
  'full-size': props.full,
  dragging: isDragging.value,
}))

const handleDrop = async (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = false

  const files = getFiles(e)
  const entries = getEntries(e)

  const payload: DropResult<T> = {
    result: [],
    filteredItems: [],
    structureNotSupported: false,
  }

  if (props.mode === 'structure') {
    try {
      // @ts-ignore
      payload.result = await parseStructure(entries)
    } catch (error) {
      console.error(error)
      if (files.length > 0) {
        // @ts-ignore
        payload.result = files.map((file) => new FileStructure(file))
      } else {
        return
      }
    }
  } else {
    if (files.length === 0) return
    const filtered: File[] = []
    const result: File[] = []

    files.forEach((file) => {
      if (file.size === 0 && !file.type) {
        filtered.push(file)
      } else {
        result.push(file)
      }
    })
    // @ts-ignore
    payload.result = result
    payload.filteredItems = filtered
  }

  emit('drop', payload)
}

const handleDragOver = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = true
}

const handleDragLeave = () => {
  isDragging.value = false
}
</script>

<template>
  <div
    :class="['drop-zone', wrapperClassNames]"
    @dragover="handleDragOver"
    @dragleave="handleDragLeave"
    @drop.prevent="handleDrop"
  >
    <slot></slot>

    <div v-if="showOverlay && isDragging" class="overlay">
      <slot name="overlay"></slot>
      <div class="default-overlay">
        <h3 class="overlay-title">{{ overlayTitle }}</h3>
        <p class="overlay-desc">{{ overlayDesc }}</p>
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
  background: var(--overlay-bg, rgba(255, 255, 255, 0.9));
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  pointer-events: none;
}

.default-overlay {
  text-align: center;
}

.overlay-title {
  color: var(--overlay-title-color, #333);
  margin-bottom: 8px;
  font-size: var(--overlay-title-font-size, 18px);
}

.overlay-desc {
  color: var(--overlay-desc-color, #666);
  font-size: var(--overlay-desc-font-size, 14px);
}
</style>
