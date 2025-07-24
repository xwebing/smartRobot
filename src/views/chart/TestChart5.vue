<template>
  <div class="demo">
    <svg
      viewBox="0,0,111,111"
      width="100%"
      height="100%"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(0  0)">
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="#EBECEF"
          stroke="#4F5052"
          stroke-width="1"
        />
        <g transform="translate(586  0) rotate(90 0 0)">
          <path
            bid="1"
            d="M305 0L305 383.5C305 495.34 214.34 586 102.5 586L0 586L0 0L305 0"
            fill="#FFFFFF"
            stroke="#4F5052"
            stroke-width="1"
          />
        </g>
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
window.onload = function () {
  let svg = document.getElementsByTagName('svg')
  console.log(svg)
  // for (let index = 0; index < svg.length; index++) {
  //   svg[index].setAttribute(
  //     'viewBox',
  //     '0,0,' + svg[index].getBBox().width + ',' + svg[index].getBBox().height + '',
  //   )
  // }
}
</script>

<style lang="less" scoped>
.demo {
}
</style>
