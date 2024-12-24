<template>
  <CssDemo
    :styles="[
      { overflowClipMargin: '0px' },
      { overflowClipMargin: '10px' },
      { overflowClipMargin: '20px' },
      { overflowClipMargin: '-10px' },
    ]"
  >
    <template v-slot="{ activeStyle }">
      <div class="box" :style="activeStyle">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
        aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur.
      </div>
    </template>
  </CssDemo>
</template>

<style scoped>
.box {
  border: 3px solid;
  width: 250px;
  height: 100px;
  overflow: clip;
}
</style>
