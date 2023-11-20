<template>
  <span><a :href="href" :target="target"><slot></slot></a></span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps({
  href: {
    type: String,
    default: '',
  },
  blank: {
    type: Boolean,
    default: true,
  },
  parent: {
    type: Boolean,
    default: false,
  },
  top: {
    type: Boolean,
    default: false,
  },
})

const href = computed(() => {
  if (props.href) {
    return withBase(props.href)
  } else {
    return false
  }
})

const target = computed(() => {
  if (props.top) {
    return '_top'
  } else if (props.parent) {
    return '_parent'
  } else if (props.blank) {
    return '_blank'
  } else {
    return '_self'
  }
})
</script>