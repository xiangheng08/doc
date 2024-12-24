<template>
  <CssDemo
    :styles="[
      { borderStyle: 'none' },
      { borderStyle: 'hidden' },
      { borderStyle: 'dotted' },
      { borderStyle: 'dashed' },
      { borderStyle: 'solid' },
      { borderStyle: 'double' },
      { borderStyle: 'groove' },
      { borderStyle: 'ridge' },
      { borderStyle: 'inset' },
      { borderStyle: 'outset' },
      { borderStyle: 'dotted solid' },
      { borderStyle: 'hidden double dashed' },
      { borderStyle: 'none solid dotted dashed' },
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
  border-width: 0.75rem;
  background-color: plum;
}
</style>
