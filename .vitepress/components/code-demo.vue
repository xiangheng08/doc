<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  description?: string
  path?: string
  rawCode?: string // 源码，用于不展开时复制
  codeRender?: string
}

withDefaults(defineProps<Props>(), {
  description: '',
  path: '',
})

const codeShow = ref(false)
</script>

<template>
  <Demo :title="description" class="batch-render-demo">
    <div class="example">
      <slot name="example"></slot>
    </div>
    <div class="code" v-if="codeShow" v-html="decodeURIComponent(codeRender || '')"></div>
    <div class="operate"></div>
  </Demo>
</template>

<style lang="scss" scoped>
.batch-render-demo :deep(.content) {
  padding: 0;
}
.example {
  padding: 22px 24px;
}
.code {
  & > :deep(div[class*='language-']) {
    margin: 0;
    border-radius: 0;
  }
}
.operate {
  margin: 0 24px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-top: 1px solid var(--vp-c-divider);
  height: 42px;
}
</style>
