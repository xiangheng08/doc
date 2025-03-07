<script setup lang="ts">
import { parsePasteEvent } from './paste'

const handlePaste = async (e: ClipboardEvent) => {
  console.log(e)
  const result = await parsePasteEvent(e, 'structure')
  console.log('parse result', result)
}
</script>

<template>
  <input type="text" class="native" @paste="handlePaste" />
</template>
