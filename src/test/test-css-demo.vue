<script setup lang="ts">
import { CSSProperties } from 'vue';

const styles: CSSProperties[] = [
  { color: 'red', fontWeight: 'bold', fontSize: '20px' },
  { color: 'orange' },
  { color: 'yellow' },
  { color: 'green' },
  { color: 'cyan' },
  { color: 'blue' },
  { color: 'purple' },
]
</script>

<template>
  <CssDemo :styles="styles">
    <template v-slot="{ activeStyle }">
      <span :style="activeStyle">dada</span>
    </template>
  </CssDemo>
</template>
