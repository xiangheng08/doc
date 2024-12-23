<template>
  <CssDemo
    :styles="[
      { overflow: `visible` },
      { overflow: `hidden` },
      { overflow: `clip` },
      { overflow: `scroll` },
      { overflow: `auto` },
    ]"
  >
    <template v-slot="{ activeStyle }">
      <div class="box" :style="activeStyle">
        Michaelmas term lately over, and the Lord Chancellor sitting in
        Lincoln's Inn Hall. Implacable November weather. As much mud in the
        streets as if the waters had but newly retired from the face of the
        earth.
      </div>
    </template>
  </CssDemo>
</template>

<style scoped>
.box {
  width: 15em;
  height: 9em;
  border: medium dotted;
  padding: 0.75em;
  text-align: left;
}
</style>
