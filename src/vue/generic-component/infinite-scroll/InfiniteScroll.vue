<!-- InfiniteScroll.vue -->
<template>
  <div
    ref="scrollContainer"
    class="infinite-scroll-container"
    :class="{ 'position-full': positionFull }"
    @scroll="handleScroll"
  >
    <slot></slot>

    <div class="loading-tip">
      <span v-if="loading">{{ loadingText }}</span>
      <span v-if="finished">{{ finishedText }}</span>
      <span v-if="emptied">{{ emptiedText }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'

interface Props {
  loading?: boolean // 是否正在加载
  finished?: boolean // 是否全部加载完成
  emptied?: boolean // 是否为空数据
  threshold?: number // 触发加载的滚动阈值（像素）
  loadingText?: string // 加载中的提示文字
  finishedText?: string // 加载完成的提示文字
  emptiedText?: string // 空数据的提示文字
  positionFull?: boolean // 是否使用定位撑满父容器
  checkOnInit?: boolean // 新增初始化检查开关
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  finished: false,
  threshold: 0,
  loadingText: '加载中...',
  finishedText: '没有更多了',
  emptiedText: '暂无数据',
  positionFull: false,
  checkOnInit: true, // 默认开启初始化检查
})

const emit = defineEmits(['load'])

const scrollContainer = ref<HTMLElement | null>(null)

// 核心检查方法
const checkLoadMore = async (forceCheck = false) => {
  if (props.loading || props.finished) return

  await nextTick() // 等待DOM更新

  const el = scrollContainer.value
  if (!el) return

  // 强制检查或自动检查
  if (forceCheck || shouldAutoCheck(el)) {
    emit('load')
  }
}

// 判断是否需要自动加载
const shouldAutoCheck = (el: HTMLElement) => {
  const scrollBottom = el.scrollTop + el.clientHeight
  const shouldLoad = scrollBottom >= el.scrollHeight - props.threshold
  return shouldLoad
}

// 滚动处理
const handleScroll = () => {
  checkLoadMore()
}

// 兼容性处理：ResizeObserver Polyfill
const initResizeObserver = () => {
  if (!scrollContainer.value) return

  if (typeof ResizeObserver !== 'undefined') {
    let lastHeight = scrollContainer.value.clientHeight
    const observer = new ResizeObserver(() => {
      // 判断高度是否变化
      if (
        scrollContainer.value &&
        scrollContainer.value.clientHeight !== lastHeight
      ) {
        lastHeight = scrollContainer.value.clientHeight
        handleScroll()
      }
    })
    observer.observe(scrollContainer.value)
    return observer
  }
}

// 初始化检查
onMounted(() => {
  const observer = initResizeObserver()
  if (props.checkOnInit) {
    checkLoadMore(true)
  }

  // 清理
  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })
})

watch(
  () => [props.loading, props.finished],
  () => {
    if (!props.loading && !props.finished) {
      // 加载完成且还有更多数据时，再次检查
      checkLoadMore()
    }
  },
)

defineExpose({ checkLoadMore })
</script>

<style lang="scss" scoped>
.infinite-scroll-container {
  overflow-y: auto;
  height: 100%;
  position: relative;

  &.position-full {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}

.loading-tip {
  padding: 12px 0;
  text-align: center;
  color: #999;
  font-size: 0.9em;
}
</style>
