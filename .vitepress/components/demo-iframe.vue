<script setup lang="ts">
import { shallowRef, useSlots } from 'vue'
import type EmbedIframe from './embed-iframe.vue'
import { withBase } from 'vitepress'

defineProps({
  title: {
    type: String,
    default: 'Demo iframe',
  },
  src: {
    type: String,
    default: '',
  },
  lazy: {
    type: Boolean,
    default: false,
  },
  height: {
    type: [String, Number],
    default: 150,
  },
  openPage: {
    type: Boolean,
    default: false,
  },
})

const embedIframeRef = shallowRef<InstanceType<typeof EmbedIframe>>()

defineExpose({
  embedIframeRef,
})

const slots = useSlots()
</script>

<template>
  <Demo :title="title" divider-line class="demo-iframe">
    <template #header-left v-if="slots['header-left']">
      <slot name="header-left"></slot>
    </template>
    <template #header-right v-if="slots['header-right'] || openPage">
      <slot name="header-right"></slot>
      <a v-if="openPage" :href="withBase(src)" target="_blank">
        在新页面打开
      </a>
    </template>
    <EmbedIframe ref="embedIframeRef" v-bind="{ src, lazy, height }" />
  </Demo>
</template>

<style lang="scss">
.demo-iframe {
  .content {
    padding: 0;
  }
}
</style>
