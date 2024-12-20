<template>
  <CssDemo
    :styles="[
      { outline: 'solid' },
      { outline: 'dashed green' },
      { outline: '1rem solid' },
      { outline: 'thick double #32a1ce' },
      {
        outline: '8px ridge rgba(170, 50, 220, .6)',
        borderRadius: '1rem',
      },
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
