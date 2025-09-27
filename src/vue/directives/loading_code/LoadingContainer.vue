<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  background?: string
  className?: string
  zIndex?: number
}
defineProps<Props>()

const emit = defineEmits<{
  (e: 'closed'): void
}>()

const visible = ref(true)

const handleAfterLeave = () => {
  emit('closed')
}

defineExpose({
  visible,
})
</script>

<template>
  <Transition appear name="loading" @after-leave="handleAfterLeave">
    <div
      v-show="visible"
      :class="['loading-container', className]"
      :style="{ zIndex, backgroundColor: background }"
    >
      <slot></slot>
    </div>
  </Transition>
</template>

<style scoped>
.loading-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 9999;

  display: flex;
  justify-content: center;
  align-items: center;
}
.loading-enter-active,
.loading-leave-active {
  transition: opacity 0.3s;
}
.loading-enter-from,
.loading-leave-to {
  opacity: 0;
}
</style>
