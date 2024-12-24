<template>
  <CssDemo
    :styles="[
      { backfaceVisibility: 'visible' },
      { backfaceVisibility: 'hidden' },
    ]"
    block
  >
    <template v-slot="{ activeStyle }">
      <div class="ct flex-center">
        <div class="box" :style="activeStyle">
          <div class="flex-center face front">1</div>
          <div class="flex-center face back">2</div>
          <div class="flex-center face right">3</div>
          <div class="flex-center face bottom">6</div>
        </div>
      </div>
    </template>
  </CssDemo>
</template>

<style scoped lang="scss">
.ct {
  height: 280px;
  overflow: hidden;
  text-align: center;
  background: linear-gradient(skyblue, khaki);
  perspective: 800px;
  .box {
    width: 100px;
    height: 100px;
    transform-style: preserve-3d;
    perspective: 550px;
    perspective-origin: 220% 220%;
    transition: all 0.3s;
    .face {
      width: 100%;
      height: 100%;
      position: absolute;
      backface-visibility: inherit;
      background: rgba(0, 0, 0, 0.4);
      font-size: 60px;
      color: #fff;
      &.front {
        transform: translateZ(50px);
      }
      &.back {
        transform: rotateY(180deg) translateZ(50px);
        background: #e60000;
      }
      &.right {
        transform: rotateY(90deg) translateZ(50px);
      }
      &.bottom {
        transform: rotateX(-90deg) translateZ(50px);
      }
    }
  }
}
</style>
