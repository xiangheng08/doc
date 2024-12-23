<template>
  <CssDemo
    :styles="[
      { transformOrigin: 'center' },
      { transformOrigin: 'top left' },
      { transformOrigin: '50px 50px' },
      { transformOrigin: 'bottom right 60px' },
    ]"
    :extra-styles="[
      { left: '50%', top: '50%' },
      { left: '0%', top: '0%' },
      { left: '50px', top: '50px' },
      { left: '100%', top: '100%' },
    ]"
    block
    padding="0 14px"
  >
    <template v-slot="{ activeStyle, extraStyle }">
      <div class="wrap">
        <div class="box flex-center static">这是一个盒子</div>
        <div class="box flex-center" :style="activeStyle">
          这是一个盒子
          <img
            src="../images/crosshair.svg"
            alt="crosshair"
            class="crosshair"
            :style="extraStyle"
          />
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
.crosshair {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 2em;
  height: 2em;
  transition: all 0.3s;
}
</style>
