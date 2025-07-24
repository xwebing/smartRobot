<template>
  <div class="demo" id="chart1"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as d3 from 'd3'
var data = [10, 15, 30, 50, 80, 100, 55, 30, 20, 10, 8]
function redraw() {
  var chartDiv = document.getElementById('chart1')
  var svg = d3.select(chartDiv).append('svg')

  d3.selectAll('svg > g > *').remove()
  var width = chartDiv.clientWidth
  var height = chartDiv.clientHeight

  svg.attr('width', width).attr('height', 400)

  var margin = { top: 0, right: 50, bottom: 0, left: 100 },
    width = +svg.attr('width') - margin.left - margin.right,
    height = +svg.attr('height') - margin.top - margin.bottom

  var tooltip = d3.select('body').append('div').attr('class', 'toolTip')

  var x = d3.scaleLinear().range([0, width])
  var y = d3.scaleBand().range([height, 0])

  var g = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  data.sort(function (a, b) {
    return a.value - b.value
  })

  x.domain([
    0,
    d3.max(data, function (d) {
      return d.value
    }),
  ])
  y.domain(
    data.map(function (d) {
      return d.area
    }),
  ).padding(0.1)

  g.append('g')
    .attr('class', 'x axis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(
      d3
        .axisBottom(x)
        .ticks(5)
        .tickFormat(function (d) {
          return parseInt(d)
        })
        .tickSizeInner([-height]),
    )

  g.append('g').attr('class', 'y axis').call(d3.axisLeft(y))

  g.selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', 0)
    .attr('height', y.bandwidth())
    .attr('y', function (d) {
      return y(d.area)
    })
    .attr('width', function (d) {
      return x(d.value)
    })
    .on('mousemove', function (d) {
      tooltip
        .style('left', d3.event.pageX - 50 + 'px')
        .style('top', d3.event.pageY - 90 + 'px')
        .style('display', 'inline-block')
        .html(d.area + '<br><span>' + d.value + ' post ' + '</span>')
    })
    .on('mouseout', function (d) {
      tooltip.style('display', 'none')
    })
}
onMounted(() => {
  redraw()
})

window.addEventListener('resize', redraw)
</script>

<style lang="less" scoped>
.demo {
}
</style>
