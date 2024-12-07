<script setup lang="ts">
import { ref, onMounted } from 'vue'

const show = ref(false)

const onScroll = () => {
  show.value = window.scrollY > 300
}

const scrollToTop = () => {
  window?.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window?.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
</script>

<template>
  <button
    class="scroll-to-top"
    :class="{ show }"
    @click="scrollToTop"
    title="回到顶部"
  >
    <svg width="24" height="24" viewBox="0 0 24 24">
      <path
        d="M13.204 3.107a1.75 1.75 0 0 0-2.408 0L3.806 9.73c-1.148 1.088-.378 3.02 1.204 3.02h2.24V20c0 .966.784 1.75 1.75 1.75h6A1.75 1.75 0 0 0 16.75 20v-7.25h2.24c1.582 0 2.353-1.932 1.204-3.02l-6.99-6.623Z"
      ></path>
    </svg>
  </button>
</template>

<style scoped lang="scss">
.scroll-to-top {
  position: fixed;
  right: 12px;
  bottom: 12px;
  width: 40px;
  height: 40px;
  padding: 0px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px;

  background-color: var(--vp-button-alt-bg);

  transform: translateY(52px);
  transition: transform 0.2s;

  &.show {
    transform: translateY(0px);
  }

  path {
    fill: var(--vp-c-text-2);
  }

  &:hover {
    background-color: var(--vp-button-alt-hover-bg);
  }
}
</style>
