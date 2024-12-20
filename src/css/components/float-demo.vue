<template>
  <CssDemo
    :styles="[
      { float: 'none' },
      { float: 'left' },
      { float: 'right' },
      { float: 'inline-start' },
      { float: 'inline-end' },
    ]"
    block
    padding="0 14px"
  >
    <template v-slot="{ activeStyle }">
      <div class="box" :style="activeStyle"></div>
      Ea consectetur sit Lorem pariatur do dolor fugiat ad tempor
      adipisicing. Aliqua elit adipisicing enim ullamco aute tempor ea ea
      irure proident id do. Aute duis minim est laborum non irure quis
      magna dolore deserunt ad fugiat. Ex laborum in voluptate occaecat
      nostrud qui ea est pariatur.
    </template>
  </CssDemo>
</template>

<style scoped>
.box {
  width: 70px;
  height: 70px;
  background-color: pink;
}
</style>
