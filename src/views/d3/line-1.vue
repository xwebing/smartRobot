<template>
  <svg class="demo1"></svg>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as d3 from 'd3'
/**
 * 坐标tick个数定制
 * 圆圈定制
 * hover
 */

const data = [
  { name: 'dawang0', amount: 0, age: 0 },
  { name: 'dawang1', amount: 112, age: 13 },
  { name: 'dawang2', amount: 80, age: 14 },
  { name: 'dawang3', amount: 100, age: 15 },
  { name: 'dawang4', amount: 202, age: 16 },
  { name: 'dawang5', amount: 150, age: 17 },
] // 示例数据

const render = (width = 500, height = 500) => {
  // const width = 500
  // const height = 500
  // const margin = { top: 20, right: 20, bottom: 20, left: 50 }
  const margin = { top: 20, right: 20, bottom: 20, left: 50 }
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom
  d3.select('.demo1').selectAll('*').remove()
  const svg = d3.select('.demo1')

  svg.attr('width', width).attr('height', height)
  //.attr('viewBox', '[0 0 500 500]')
  // .attr('preserveAspectRatio', 'xMinYMin meet')
  // 创建一个X轴比例尺
  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.name))
    .range([0, innerWidth])
  //.padding(0.1)

  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.amount)])
    .nice()
    .range([innerHeight, 0])

  const yScale2 = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.age)])
    .nice()
    .range([innerHeight, 0])

  // 定义坐标轴
  svg
    .append('g')
    //  .attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
    .attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
    .call(d3.axisBottom(xScale).ticks(10).tickSizeOuter(0))
  // .tickSize(-width, 0, 0)
  // .tickFormat("")
  svg
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
    .call(d3.axisLeft(yScale).ticks(8))

  svg
    .append('g')
    .attr('transform', `translate(${width}, ${margin.top})`)
    .call(d3.axisLeft(yScale2).ticks(8))
  // 定义线条生成器
  const line = d3
    .line()
    .x((d) => xScale(d.name) + xScale.bandwidth() / 2 + 50)
    .y((d) => yScale(d.amount) + 20)

  const line2 = d3
    .line()
    .x((d) => xScale(d.name) + xScale.bandwidth() / 2 + 50)
    .y((d) => yScale2(d.age) + 20)

  // .curve(d3.curveMonotoneX) 曲线图

  console.log(xScale.bandwidth())

  // 绘制线条
  svg
    .append('path')

    .attr('fill', 'none')
    .attr('stroke', 'red')

    .attr('stroke-width', 2)
    // .data([data])

    //  .attr('transform', `translate(${width / 2}, ${height + margin.bottom - 10})`)
    //   .style('text-anchor', 'middle')
    .attr('d', line(data))

  svg
    .append('path')

    .attr('fill', 'none')
    .attr('stroke', 'blue')

    .attr('stroke-width', 2)
    // .data([data])

    //  .attr('transform', `translate(${width / 2}, ${height + margin.bottom - 10})`)
    //   .style('text-anchor', 'middle')
    .attr('d', line2(data))
}

const resizeFn = () => {
  const chartEl = document.querySelector('.demo1')
  // const style = getComputedStyle(chartEl, null)
  let { width, height } = chartEl.getBoundingClientRect()
  console.log(width, height)

  render(width, height)
}

window.addEventListener('resize', resizeFn)

onMounted(() => {
  render()
})
</script>

<style lang="less" scoped>
.demo1 {
}
</style>
