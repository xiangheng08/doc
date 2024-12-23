<template>
  <CssDemo
    :styles="[
      { perspective: `none` },
      { perspective: `800px` },
      { perspective: `22rem` },
      { perspective: `5cm` },
      { perspective: `10em` },
      { perspective: `100px` },
      { perspective: `10px` },
    ]"
    block
  >
    <template v-slot="{ activeStyle }">
      <div class="ct flex-center">
        <div class="box" :style="activeStyle">
          <div class="flex-center face front">1</div>
          <div class="flex-center face back">2</div>
          <div class="flex-center face right">3</div>
          <div class="flex-center face left">4</div>
          <div class="flex-center face top">5</div>
          <div class="flex-center face bottom">6</div>
        </div>
      </div>
    </template>
  </CssDemo>
</template>

<style scoped lang="scss">
.ct {
  width: 100%;
  height: 280px;
  overflow: hidden;
  text-align: center;
  background: linear-gradient(skyblue, khaki);
  perspective: 800px;
  perspective-origin: 150% 150%;
  .box {
    width: 100px;
    height: 100px;
    transform-style: preserve-3d;
    transition: all 0.3s;
    .face {
      width: 100%;
      height: 100%;
      position: absolute;
      backface-visibility: inherit;
      font-size: 60px;
      color: #fff;
      &.front {
        background: rgba(90, 90, 90, 0.7);
        transform: translateZ(50px);
      }
      &.back {
        background: rgba(0, 210, 0, 0.7);
        transform: rotateY(180deg) translateZ(50px);
      }
      &.right {
        background: rgba(210, 0, 0, 0.7);
        transform: rotateY(90deg) translateZ(50px);
      }
      &.left {
        background: rgba(0, 0, 210, 0.7);
        transform: rotateY(-90deg) translateZ(50px);
      }
      &.top {
        background: rgba(210, 210, 0, 0.7);
        transform: rotateX(90deg) translateZ(50px);
      }
      &.bottom {
        background: rgba(210, 0, 210, 0.7);
        transform: rotateX(-90deg) translateZ(50px);
      }
    }
  }
}
</style>
