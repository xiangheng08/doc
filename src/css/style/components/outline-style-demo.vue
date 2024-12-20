<template>
  <CssDemo
    :styles="[
      { outlineStyle: 'auto' },
      { outlineStyle: 'none' },
      { outlineStyle: 'dotted' },
      { outlineStyle: 'dashed' },
      { outlineStyle: 'solid' },
      { outlineStyle: 'double' },
      { outlineStyle: 'groove' },
      { outlineStyle: 'ridge' },
      { outlineStyle: 'inset' },
      { outlineStyle: 'outset' },
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
}
</style>
