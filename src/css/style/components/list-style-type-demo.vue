<script setup lang="ts">
import { CSSProperties } from 'vue'

const types = [
  'disc',
  'circle',
  'square',
  'decimal',
  'cjk-decimal',
  'decimal-leading-zero',
  'lower-roman',
  'upper-roman',
  'lower-greek',
  'lower-alpha',
  'lower-latin',
  'upper-alpha',
  'upper-latin',
  'arabic-indic',
  'armenian',
  'bengali',
  'cambodian',
  'cjk-earthly-branch',
  'cjk-heavenly-stem',
  'cjk-ideographic',
  'devanagari',
  'ethiopic-numeric',
  'georgian',
  'gujarati',
  'gurmukhi',
  'hebrew',
  'hiragana',
  'hiragana-iroha',
  'japanese-formal',
  'japanese-informal',
  'kannada',
  'katakana',
  'katakana-iroha',
  'khmer',
  'korean-hangul-formal',
  'korean-hanja-formal',
  'korean-hanja-informal',
  'lao',
  'lower-armenian',
  'malayalam',
  'mongolian',
  'myanmar',
  'oriya',
  'persian',
  'simp-chinese-formal',
  'simp-chinese-informal',
  'tamil',
  'telugu',
  'thai',
  'tibetan',
  'trad-chinese-formal',
  'trad-chinese-informal',
  'upper-armenian',
  'disclosure-open',
  'disclosure-close',
  'none',
  '"-"',
  '"\\1F44D"',
]

const listStyleTypes = types.map<CSSProperties>((type) => ({
  listStyleType: type,
}))
</script>

<template>
  <CssDemo :styles="listStyleTypes" justify-start property="list-style-type">
    <template v-slot="{ activeStyle }">
      <ul class="list" :style="activeStyle">
        <li v-for="item in 52" :key="item">Item {{ item }}</li>
      </ul>
    </template>
  </CssDemo>
</template>

<style scoped>
.list {
  list-style-position: inside;
  padding-left: 0;
  padding-right: 10px;
  margin: 0 24px;
}
li {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &::marker {
    color: var(--vp-c-brand);
  }
}
</style>
