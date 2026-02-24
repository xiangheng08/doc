<script lang="ts" setup>
import DefaultTheme from 'vitepress/theme'
import ScrollToTop from './components/scroll-to-top.vue'
import { useImageZoom } from './hooks/zoom'
import { useOutlineAutoScroll } from './hooks/outline'
import { useSidebarActiveIntoView } from './hooks/sidebar'

useImageZoom()

useOutlineAutoScroll()

useSidebarActiveIntoView()
</script>

<template>
  <DefaultTheme.Layout>
    <template #layout-bottom>
      <ScrollToTop />
    </template>
  </DefaultTheme.Layout>
</template>
