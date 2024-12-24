<template>
  <CssDemo
    :styles="[
      { transformStyle: 'flat' },
      { transformStyle: 'preserve-3d' },
    ]"
    padding="0 14px"
  >
    <template v-slot="{ activeStyle }">
      <div class="box" :style="activeStyle">
        <p>父盒子</p>
        <div class="child">
          <code>rotate3d(1, 1, 1, 45deg)</code>
        </div>
      </div>
    </template>
  </CssDemo>
</template>

<style scoped lang="scss">
.box {
  background: #623e3f;
  border-radius: 0.75rem;
  color: #fff;
  transform: perspective(200px) rotateY(30deg);
  p {
    text-align: center;
    width: 100%;
  }
  .child {
    background-color: #ffba08;
    border-radius: 0.2rem;
    margin: 1rem;
    padding: 0.2rem;
    transform: rotate3d(1, 1, 1, 45deg);
    code {
      color: #000;
    }
  }
}
</style>
