<template>
  <CssDemo
    :styles="[
      { borderColor: 'red' },
      { borderColor: 'red #f015ca' },
      { borderColor: 'red yellow green' },
      { borderColor: 'red yellow green blue' },
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
