<template>
  <CssDemo
    :styles="[
      { outlineWidth: 'thin' },
      { outlineWidth: 'medium' },
      { outlineWidth: 'thick' },
      { outlineWidth: '20px' },
      { outlineWidth: '5em' },
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
