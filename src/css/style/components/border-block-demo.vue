<template>
  <CssDemo
    :styles="[
      {
        borderBlock: '1rem solid',
        writingMode: 'horizontal-tb',
      },
      {
        borderBlock: '1rem dashed red',
        writingMode: 'vertical-rl',
      },
      {
        borderBlock: '1rem solid',
        writingMode: 'horizontal-tb',
        direction: 'rtl',
      },
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
  width: 200px;
  height: 200px;
  text-align: center;
  transition: all 0.3s;
  border-style: solid;
  border-width: 0.75rem;
  background-color: plum;
  color: #8b008b;
  unicode-bidi: bidi-override;
}
</style>
