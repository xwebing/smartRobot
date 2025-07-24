<template>
  <div class="demo"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as d3 from 'd3'

var data = [10, 15, 30, 50, 80, 100, 55, 30, 20, 10, 8]
//定义数据，定义集合A

function render(data, width = 0, height = 0) {
  //render函数来更新图表
  // Enter
  // d3.select('div.demo')
  //   .selectAll('div.h-bar')
  //   //选中body,选中类名为h-bar的div，其实此时页面上没有这些元素，选择出图形元素的集合
  //   .data(data) // data函数将数组绑定到将要创建的图形元素上
  //   .enter() // enter函数选择没有被可视化的数据元素，render第一次调用的时候，没有数据被可视化，所以选中的是所有的数据
  //   .append('div') // 为每一个数据创建一个div，这里d3为响应的div添加了__data__属性，这个属性的值为绑定的数据值；
  //   .attr('class', 'h-bar') //类名设置为h-bar
  //   .append('span') //每个div中添加一个span

  // // Update
  // d3.select('body')
  //   .selectAll('div.h-bar')
  //   .data(data) //定义图形集合和数据集合,更新模式下，data()函数返回数据集合和图形集合的交集
  //   .style('width', function (d) {
  //     // 在和数据关联的图形更改属性，所有的d3修饰函数都可以使用这样的函数来修改图形元素的属性，这个函数有一个形参，d代表与对应图形元素关联的数据值
  //     return (d as number) * 3 + 'px'
  //   })
  //   .select('span') // 子元素能拿到父级元素的值
  //   .text((d) => {
  //     return d as number
  //   })

  // // Exit
  // d3.select('body')
  //   .selectAll('div.h-bar')
  //   .data(data)
  //   .exit() //得到没有任何数据关联的图形元素
  //   .remove() //移除这些元素
  console.log(width, height)
  const padding = 20
  // 创建容器-绘制坐标
  d3.select('div.demo').selectAll('*').remove()
  const svg = d3
    .select('div.demo')
    .insert('svg') //创建一个SVG容器
    .attr('class', 'my-svg') //类名设置为axis
    .attr('width', width || '100%') //宽度
    .attr('height', height || '100%') //高度
    // .attr('viewBox', [0, 0, width, height])
    //  .attr('style', 'max-width: 100%; height: 100vh; height: intrinsic;')
    .attr('preserveAspectRatio', 'xMinYMin meet')
    .attr('viewBox', '[0 0 100 100]')
  //   .attr('style', 'max-width: 100%; height: intrinsic;')
  //   .style('-webkit-tap-highlight-color', 'transparent')
  //   .style('overflow', 'visible')
  // document.querySelector('.demo').transform = d3.zoomIdentity.translate(0, 0).scale(1)
  // 创建容器-创建轴
  // const xScale = d3.scaleLinear([0, data.length - 1], [padding, width - padding])
  // const yScale = d3.scaleLinear(d3.extent(data), [height - padding, padding]).nice()
  const xScale = d3.scaleLinear([0, data.length - 1], [padding, width - padding])
  const yScale = d3.scaleLinear(d3.extent(data), [height - padding, padding])

  const line = d3
    .line()
    .x((d, i) => xScale(i))
    .y((d) => yScale(d))

  svg
    .append('path')
    .attr('fill', 'none')
    .attr('stroke', 'steelblue')
    .attr('stroke-width', 1.5)
    .attr('d', line(data))

  // Add the x-axis, remove the domain line, add grid lines and a label.
  // svg
  //   .append('g')
  //   .attr('transform', `translate(0, ${height})`)
  //   .call(d3.axisBottom(xScale).ticks(10).tickSizeOuter(0))

  // svg
  //   .append('g')
  //   .attr('transform', `translate(0, 500)`)
  //   .call(d3.axisBottom(xScale).ticks(10).tickSizeOuter(0))
  svg
    .append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale).ticks(10).tickSizeOuter(0))

  // Add the y-axis, remove the domain line, add grid lines and a label.
  svg
    .append('g')
    .attr('transform', `translate(${padding},0)`)
    .call(d3.axisLeft(yScale).ticks(10))
    .call((g) => g.select('.domain').remove())
    .call((g) =>
      g
        .selectAll('.tick line')
        .clone()
        .attr('x2', width - padding - padding)
        .attr('stroke-opacity', 0.1),
    )
    .call((g) =>
      g
        .append('text')
        .attr('x', -padding)
        .attr('y', 10)
        .attr('fill', 'currentColor')
        .attr('text-anchor', 'start')
        .text('↑ Daily close ($)'),
    )
}

const resizeFn = () => {
  const chartEl = document.querySelector('.chart1')
  const style = getComputedStyle(chartEl, null)
  // const height = chartEl.offsetHeight
  // const width = chartEl.offsetWidth

  let { width, height } = chartEl.getBoundingClientRect()
  render(data, width, height)
}

window.addEventListener('resize', resizeFn)
const watchCharts = new ResizeObserver((entries) => {
  console.log(entries)
  resizeFn()
})

onMounted(() => {
  // setInterval(function () {
  //   data.shift()
  //   data.push(Math.round(Math.random() * 100))
  //   render(data)
  // }, 1500)
  // watchCharts.observe(document.querySelector('.demo'))
  render(data)
})
</script>

<style lang="less" scoped>
.demo {
  margin: 12px;
  width: 100%;
  height: 100%;
  ::v-deep .h-bar {
    height: 20px;
    background: #009688;
    margin-right: 5px;
    margin-bottom: 5px;
    color: #fff;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
  }
}
</style>
