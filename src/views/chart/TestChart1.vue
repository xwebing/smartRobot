<template>
  <div class="demo">
    <div id="main" :style="positionStyle"></div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import * as echarts from 'echarts'

// defineProps({
//   positionStyle: {
//     type: Object,
//     default: () => ({
//       width: '100%',
//       height: '100%'
//     })
//   }
// })

let myChart = {}

const resizeFn = () => {
  setTimeout(() => {
    if (myChart?.resize) {
      myChart.resize()
    }
    console.log(myChart)
  }, 500)
}

defineExpose({ resizeFn })

const watchCharts = new ResizeObserver((entries) => {
  console.log(entries)
  resizeFn()
})

onMounted(() => {
  const option = {
    title: [
      {
        text: '主标题',
        subtext: '副标题'
      },
      {
        text: '次级标题',
        subtext: '次级副标题',
        left: 100, // 相对于主标题的位置
        top: 40 // 相对于主标题的位置
      }
    ],
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  }
  console.log(option)

  var chartDom = document.getElementById('main')
  myChart = echarts.init(chartDom, null, { renderer: 'svg' })

  myChart.setOption(option)

  watchCharts.observe(document.getElementById('main'))
})
</script>

<style lang="less" scoped>
.demo {
  position: relative;

  #main {
    width: 100%;
    height: 100vh;
  }
}
</style>
