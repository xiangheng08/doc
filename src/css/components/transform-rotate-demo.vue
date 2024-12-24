<template>
  <CssDemo
    :styles="[
      { transform: 'rotate(0deg)' },
      { transform: 'rotate(90deg)' },
      { transform: 'rotate(-90deg)' },
      {
        transform: 'rotate(90deg)',
        transformOrigin: 'top left',
      },
      {
        transform: 'rotate(-90deg)',
        transformOrigin: '80% 80%',
      },
      { transform: 'rotate(-0.25turn)' },
      { transform: 'rotate(3.142rad)' },
    ]"
    :extra-styles="[
      {},
      {},
      {},
      { left: '0', top: '0' },
      { left: '80%', top: '80%' },
    ]"
    block
    padding="0 14px"
    overflow-hidden
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
