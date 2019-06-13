# Using Vue for DOM manipulation vs d3-select

Vue

```html
<template>
  <g class="bar-plot">
    <rect v-for="(v, i) in data" :key="i"
      class="bar"
      v-bind="getGeom(v, i)">
    </rect>
  </g>
</template>

<script>
import {scaleBand, scaleLinear} from 'd3'
import _range from 'lodash-es/range'

export default {
  props: ['data', 'width', 'height'],
  computed: {
    xScale () {
      const domain = _range(this.data.length)
      const range = [0, this.width]
      return scaleBand()
        .domain(domain)
        .rangeRound(range)
        .padding(0.1)
    },
    yScale () {
      const domain = [
        this.data.reduce((min, v) => v < min ? v : min, 0),
        this.data.reduce((max, v) => v > max ? v : max, 0)
      ]
      const range = [this.height, 0]
      return scaleLinear()
        .domain(domain)
        .rangeRound(range)
    }
  },
  methods: {
    getGeom (v, i) {
      const {xScale, yScale} = this
      const y0 = yScale(0)
      const y1 = yScale(v)
      return {
        x: xScale(i),
        y: Math.min(y0, y1),
        width: xScale.bandwidth(),
        height: Math.abs(y1 - y0)
      }
    }
  }
}
</script>
```

d3-select

```js
import d3 from 'd3'
import _range from 'lodash-es/range'

export default function renderBarPlot (data, width, height, el) {
  const bars = el.selectAll('rect')
    .data(data)

  const xDomain = _range(data.length)
  const xRange = [0, width]
  const xScale = d3.scaleBand()
    .domain(xDomain)
    .rangeRound(xRange)
    .padding(0.1)

  const yDomain = [
    data.reduce((min, v) => v < min ? v : min, 0),
    data.reduce((max, v) => v > max ? v : max, 0)
  ]
  const yRange = [height, 0]
  const yScale = d3.scaleLinear()
    .domain(yDomain)
    .rangeRound(yRange)
  
  
  bars.enter().append('rect') // handle enter
      .classed('bar', true)
    .merge(bars) // handle enter & update
      .attr('x', (d, i) => xScale(i))
      .attr('width', xScale.bandwidth())
      .attr('y', d => Math.min(yScale(0), yScale(v)))
      .attr('height', d => Math.abs(yScale(v) - yScale(0)))
  
  bars.exit().remove() // handle exit
}
```