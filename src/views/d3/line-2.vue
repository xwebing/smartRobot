<template>
  <svg class="demo1"></svg>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as d3 from 'd3'
import fruit from '@/data/line.json'

console.log(fruit)

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
  const marginTop = 30
  const marginRight = 50
  const marginBottom = 30
  const marginLeft = 30

  // Create the horizontal, vertical and color scales.
  const x = d3
    .scaleUtc()
    .domain([fruit[0].date, fruit[fruit.length - 1].date])
    .range([marginLeft, width - marginRight])

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(fruit, (d) => d.value)])
    .range([height - marginBottom, marginTop])

  const color = d3
    .scaleOrdinal()
    .domain(fruit.map((d) => d.fruit))
    .range(d3.schemeCategory10)

  // Create the SVG container.
  const svg = d3
    .create('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', [0, 0, width, height])
    .attr('style', 'max-width: 100%; height: auto; font: 10px sans-serif;')

  svg
    .append('g')
    .attr('transform', `translate(0,${height - marginBottom})`)
    .call(
      d3
        .axisBottom(x)
        .ticks(width / 80)
        .tickSizeOuter(0),
    )

  // Add a container for each series.
  const serie = svg
    .append('g')
    .selectAll()
    .data(d3.group(fruit, (d) => d.fruit))
    .join('g')

  // Draw the lines.
  serie
    .append('path')
    .attr('fill', 'none')
    .attr('stroke', (d) => color(d[0]))
    .attr('stroke-width', 1.5)
    // .attr('d', (d) =>
    //   d3
    //     .line()
    //     .x((d) => x(d.date))
    //     .y((d) => y(d.value))(d[1]),
    // )
    .attr('d', (d) =>
      d3
        .line()
        .x((d) => x(d.date))
        .y((d) => y(d.value)),
    )
  // Append the labels.
  serie
    .append('g')
    .attr('stroke-linecap', 'round')
    .attr('stroke-linejoin', 'round')
    .attr('text-anchor', 'middle')
    .selectAll()
    .data((d) => d[1])
    .join('text')
    .text((d) => d.value)
    .attr('dy', '0.35em')
    .attr('x', (d) => x(d.date))
    .attr('y', (d) => y(d.value))
    .call((text) =>
      text
        .filter((d, i, data) => i === data.length - 1)
        .append('tspan')
        .attr('font-weight', 'bold')
        .text((d) => ` ${d.fruit}`),
    )
    .clone(true)
    .lower()
    .attr('fill', 'none')
    .attr('stroke', 'white')
    .attr('stroke-width', 6)
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
