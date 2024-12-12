<script setup lang="ts">
import { defineProps, watch, shallowRef, onMounted } from 'vue'
import { withBase, useData } from 'vitepress'

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  lazy: {
    type: Boolean,
    default: false,
  },
})

const iframeRef = shallowRef<HTMLIFrameElement>()

const { isDark } = useData()

const broadcastAppearance = () => {
  if (!iframeRef.value?.contentWindow) return
  iframeRef.value.contentWindow.postMessage(
    {
      type: 'appearance',
      value: isDark.value ? 'dark' : 'light',
    },
    '*',
  )
}

watch(isDark, broadcastAppearance)

onMounted(broadcastAppearance)

const getSrc = () => {
  return (
    withBase(props.src) +
    '?appearance=' +
    (isDark.value ? 'dark' : 'light')
  )
}
</script>

<template>
  <iframe
    ref="iframeRef"
    class="embed-iframe"
    :src="getSrc()"
    frameborder="0"
    allowfullscreen
    :loading="lazy ? 'lazy' : 'eager'"
    @load="broadcastAppearance()"
  ></iframe>
</template>

<style scoped>
.embed-iframe {
  width: 100%;
  height: 100%;
}
</style>
