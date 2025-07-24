<template>
  <div id="container" class="demo"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Chart } from '@antv/g2'

let chart = {}

const initData = () => {
  // 准备数据
  const data = [
    { genre: 'Sports', sold: 275, sex: 'male' },
    { genre: 'Strategy', sold: 115, sex: 'female' },

    { genre: 'Action', sold: 120, sex: 'male' },
    { genre: 'Shooter', sold: 350, sex: 'male' },
    { genre: 'Other', sold: 150, sex: 'male' },
  ]

  // 初始化图表实例
  chart = new Chart({
    container: document.querySelector('#container'),
    autoFit: true,
    // width: 600,
    // height: 400
  })

  // 声明可视化
  chart
    .interval() // 创建一个 Interval 标记
    .data(data) // 绑定数据
    .encode('x', 'genre') // 编码 x 通道
    .encode('x', 'sex') // 编码 x 通道
    .encode('y', 'sold') // 编码 y 通道
    .legend(true) // 关闭图例

  chart.options({
    type: 'interval',
    marginTop: 40,
    // data: {
    //   type: 'fetch',
    //   value:
    //     'https://gw.alipayobjects.com/os/bmw-prod/fb9db6b7-23a5-4c23-bbef-c54a55fee580.csv',
    // },
    // encode: {
    //   x: 'letter',
    //   y: 'frequency',
    // },
    axis: {
      y: {
        // Title
        title: '',
        // titleSpacing: 30,
        // titleFill: 'steelblue',
        // // Line
        // line: true,
        // arrow: true,
        // lineArrowOffset: 10,
        // lineArrowSize: 30,
        // lineLineWidth: 10,
        // // Tick
        // tickLength: 20,
        // tickFilter: (_, i) => i % 3 !== 0,
        // // Label
        // labelFormatter: '.0%',
        // // Grid
        // gridLineDash: null,
        // gridStroke: 'red',
        // gridStrokeWidth: 5,
        // gridAreaFill: '#eee',
      },
      x: {
        title: '',
        // labelFormatter: (d) => d.repeat(3),
        // labelFontSize: 30,
        // labelSpacing: 30,
      },
    },
  })
  // 渲染可视化
  chart.render()
  console.log(chart)
}

onMounted(() => {
  initData()
})
</script>

<style lang="less" scoped>
.demo {
}
</style>
