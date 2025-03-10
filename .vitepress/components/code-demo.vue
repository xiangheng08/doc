<script setup lang="ts">
interface Props {
  description?: string
  path?: string
  rawSource?: string // 源码，用于不展开时复制
}

withDefaults(defineProps<Props>(), {
  description: '',
  path: '',
})
</script>

<template>
  <Demo title="批量渲染 Demo" class="batch-render-demo">
    <div class="example">
      <slot name="example"></slot>
    </div>
    <div class="code">
      <slot name="code"></slot>
    </div>
  </Demo>
</template>

<style lang="scss" scoped>
.batch-render-demo :deep(.content) {
  padding: 0;
}
</style>
