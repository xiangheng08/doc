<template>
  <CssDemo
    :styles="[
      { overflowWrap: 'normal' },
      { overflowWrap: 'anywhere' },
      { overflowWrap: 'break-word' },
    ]"
  >
    <template v-slot="{ activeStyle }">
      <div class="box">
        Most words are short &amp; don't need to break. But
        <strong class="word" :style="activeStyle"
          >Antidisestablishmentarianism</strong
        >
        is long. The width is set to min-content, with a max-width of 11em.
      </div>
    </template>
  </CssDemo>
</template>

<style scoped>
.box {
  background-color: rgba(255, 0, 200, 0.2);
  border: 3px solid #639;
  padding: 0.75em;
  width: min-content;
  max-width: 11em;
  height: 240px;
}
</style>
