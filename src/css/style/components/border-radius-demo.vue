<template>
  <CssDemo
    :styles="[
      { borderRadius: '30px' },
      { borderRadius: '25% 10%' },
      { borderRadius: '10px 20px 30px' },
      { borderRadius: '10% 30% 50% 70%' },
      { borderRadius: '10% / 50%' },
      { borderRadius: '10px 100px / 120px' },
      { borderRadius: '50% 20% / 10% 40%' },
    ]"
  >
    <template v-slot="{ activeStyle }">
      <div class="box" :style="activeStyle">这是一个有边框的盒子</div>
    </template>
  </CssDemo>
</template>

<style scoped>
.box {
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  background-color: #5b6dcd;
  padding: 10px;
}
</style>
