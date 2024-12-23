<template>
  <CssDemo
    :styles="[
      { transform: 'scale(1)' },
      { transform: 'scale(0.8)' },
      { transform: 'scale(1.2)' },
      { transform: 'scale(-1)' },
      { transform: 'scale(0.4, 1)' },
      { transform: 'scale(1, 0.4)' },
      { transform: 'scaleX(0.4)' },
      { transform: 'scaleY(0.4)' },
    ]"
    block
    padding="0 14px"
  >
    <template v-slot="{ activeStyle }">
      <div class="wrap">
        <div class="box flex-center static">这是一个盒子</div>
        <div class="box flex-center" :style="activeStyle">
          这是一个盒子
        </div>
      </div>
    </template>
  </CssDemo>
</template>

<style scoped lang="scss">
.wrap {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  width: 180px;
  height: 140px;
}
.box {
  background-color: plum;
  padding: 0.75em;
  width: 100%;
  height: 100%;
  transition: all 0.3s;
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  &.static {
    opacity: 0.4;
  }
}
</style>
