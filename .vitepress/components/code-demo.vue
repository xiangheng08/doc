<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { copyText } from '../utils/common'
import CodeIcon from './icons/code-icon.vue'
import CopyIcon from './icons/copy-icon.vue'
import CopiedIcon from './icons/copied-icon.vue'

interface Props {
  description?: string
  path?: string
  rawCode?: string // 源码，用于不展开时复制
  codeRender?: string
}

const props = withDefaults(defineProps<Props>(), {
  description: '',
  path: '',
})

const codeShow = ref(false)
const copied = ref(false)

const codeTitle = computed(() => {
  return codeShow.value ? '隐藏源代码' : '查看源代码'
})

const codeRef = ref<HTMLDivElement>()
const viewCode = async () => {
  codeShow.value = !codeShow.value
}

const copyTitle = computed(() => {
  return copied.value ? '复制成功' : '复制代码'
})

let copiedTimer: NodeJS.Timeout | number | undefined
const copyCode = async () => {
  await copyText(decodeURIComponent(props.rawCode || ''))
  clearTimeout(copiedTimer)
  copied.value = true
  copiedTimer = setTimeout(() => {
    copied.value = false
  }, 2000)
}

const codeRenderText = computed(() =>
  decodeURIComponent(props.codeRender || ''),
)

const codeRegionHeight = ref('auto')

const getCodeRegionHeight = () => {
  if (codeRef.value) {
    const codeHeight = codeRef.value.offsetHeight
    return codeHeight + 'px'
  }
  return 'auto'
}

onMounted(() => {
  codeRegionHeight.value = getCodeRegionHeight()
})
</script>

<template>
  <Demo :title="description" divider-line class="batch-render-demo">
    <div class="example">
      <slot name="example"></slot>
    </div>
    <div
      class="code"
      :class="{ 'code-show': codeShow }"
      :style="{ '--code-region-height': codeRegionHeight }"
    >
      <div class="code__inner" ref="codeRef" v-html="codeRenderText"></div>
    </div>
    <div class="operate" :class="{ 'code-show': codeShow }">
      <button
        class="operate-item"
        @click="copyCode"
        :title="copyTitle"
        tabindex="2"
      >
        <span class="copy-tops" :class="{ show: copied }">复制成功</span>
        <CopiedIcon v-if="copied" />
        <CopyIcon v-else />
      </button>
      <button
        class="operate-item"
        @click="viewCode"
        :title="codeTitle"
        tabindex="1"
      >
        <CodeIcon />
      </button>
    </div>
  </Demo>
</template>

<style lang="scss" scoped>
.batch-render-demo {
  overflow: visible;
  contain: paint;
  :deep(.content) {
    padding: 0;
  }
}
.example {
  padding: 22px 24px;
  border-radius: 8px 8px 0 0;
}
.code {
  height: 0;
  overflow: hidden;
  transition: 0.15s ease-in-out;
  border-top: 1px solid transparent;
  &.code-show {
    border-color: var(--vp-c-divider);
    height: var(--code-region-height);
  }
  :deep(div[class*='language-']) {
    margin: 0;
    border-radius: 0;
  }
}
.operate {
  padding: 8px 16px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-top: 1px solid var(--vp-c-divider);
  height: 40px;
  background-color: var(--vp-c-bg-alt);
  border-radius: 0 0 8px 8px;
  &.code-show {
    position: sticky;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 10;
  }
}
.operate-item {
  cursor: pointer;
  color: var(--vp-c-text-2);
  transition: color 0.25s;
  min-width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  padding: 0;
  background-color: transparent;
  &:hover {
    color: var(--vp-c-text-1);
  }
  &:not(:first-child) {
    margin-left: 8px;
  }

  .copy-tops {
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    opacity: 0;
    width: 0;
    transition: all 0.1s ease-in-out;
    &.show {
      opacity: 1;
      width: 48px;
    }
  }
}
</style>
