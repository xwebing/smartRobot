<template>
  <div class="chart-container">
    <svg></svg>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as d3 from 'd3'

const render = () => {
  const data = [30, 80, 45, 60, 20, 90, 55] // 示例数据

  const container = d3.select('.chart-container')
  const svg = container.select('svg')

  function renderChart() {
    // 获取容器的尺寸
    const width = container.node().clientWidth
    const height = container.node().clientHeight
    console.log(height, width)
    console.dir(container.node())

    // 更新 SVG 的宽度和高度
    svg.attr('width', width).attr('height', height)

    // 设置边距
    const margin = { top: 20, right: 20, bottom: 30, left: 40 }
    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    // 创建一个比例尺
    const xScale = d3
      .scaleBand()
      .domain(data.map((d, i) => i))
      .range([0, innerWidth])
      .padding(0.1)

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data)])
      .nice()
      .range([innerHeight, 0])

    // 绘制柱状图
    svg
      .selectAll('.bar')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => xScale(i) + margin.left)
      .attr('y', (d) => yScale(d) + margin.top)
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => innerHeight - yScale(d))
      .attr('fill', 'steelblue')

    // 添加 X 轴
    svg.selectAll('.x-axis').remove()
    svg
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(${margin.left},${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickFormat((i) => i + 1))

    // 添加 Y 轴
    svg.selectAll('.y-axis').remove()
    svg
      .append('g')
      .attr('class', 'y-axis')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .call(d3.axisLeft(yScale))
  }

  // 初始渲染
  renderChart()
}

onMounted(() => render())
</script>

<style lang="less" scoped>
.chart-container {
  // width: 100%;
  // height: 100%;
  // position: relative;
}
</style>
