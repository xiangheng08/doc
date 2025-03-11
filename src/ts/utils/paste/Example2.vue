<script setup lang="ts">
import { ref } from 'vue'
import { parsePasteEvent } from './paste'

const parsing = ref(false)

const handlePaste = async (e: ClipboardEvent) => {
  console.log(e)
  parsing.value = true
  const result = await parsePasteEvent(e, 'structure')
  parsing.value = false
  console.log('parse result', result)
}
</script>

<template>
  <input type="text" class="native" @paste="handlePaste" />
  <span v-if="parsing">解析中...</span>
</template>
