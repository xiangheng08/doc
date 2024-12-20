<template>
  <CssDemo
    :styles="[
      { outlineOffset: '0px' },
      { outlineOffset: '10px' },
      { outlineOffset: '-10px' },
    ]"
  >
    <template v-slot="{ activeStyle }">
      <div class="ct" :style="activeStyle"></div>
    </template>
  </CssDemo>
</template>

<style scoped lang="scss">
.ct {
  width: 100px;
  height: 60px;
  background-color: red;
  outline-width: medium;
  outline-style: solid;
}
</style>
