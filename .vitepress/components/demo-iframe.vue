<script setup lang="ts">
import { shallowRef, useSlots } from 'vue'
import type EmbedIframe from './embed-iframe.vue'

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
})

const embedIframeRef = shallowRef<InstanceType<typeof EmbedIframe>>()

defineExpose({
  embedIframeRef,
})

const slots = useSlots()
</script>

<template>
  <Demo :title="title" divider-line class="demo-iframe">
    <template v-for="(_, name) in slots" #[name]>
      <slot :name="name"></slot>
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
