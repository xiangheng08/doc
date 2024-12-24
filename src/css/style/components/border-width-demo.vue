<template>
  <CssDemo
    :styles="[
      { borderWidth: 'thick' },
      { borderWidth: '1em' },
      { borderWidth: '4px 1.25em' },
      { borderWidth: '2ex 1.25ex 0.5ex' },
      { borderWidth: '0 4px 8px 12px' },
    ]"
  >
    <template v-slot="{ activeStyle }">
      <div class="box" :style="activeStyle">这是一个有边框的盒子</div>
    </template>
  </CssDemo>
</template>

<style scoped>
.box {
  padding: 2rem 1rem;
  width: 70%;
  text-align: center;
  transition: all 0.3s;
  border-style: solid;
  border-width: 0.75rem;
  background-color: plum;
}
</style>
