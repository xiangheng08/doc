<template>
  <CssDemo
    :styles="[
      { transform: 'matrix(0.866, 0.5, -0.5, 0.866, 0, 0)' },
      { transform: 'matrix(1, 2, 3, 4, 5, 6)' },
    ]"
    block
    padding="0 14px"
    overflow-hidden
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
