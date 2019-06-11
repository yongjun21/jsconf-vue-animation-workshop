<template>
  <svg class="bar-chart" :viewBox="viewBox" preserveAspectRatio="xMidYMid meet">
    <rect v-for="(v, i) in data" :key="i"
      ref="bars"
      class="bar"
      v-bind="getGeom(v, i)">
    </rect>
  </svg>
</template>

<script>
import {scaleBand, scaleLinear} from 'd3'
import _range from 'lodash-es/range'

export default {
  props: {
    data: Array,
    width: {
      type: Number,
      default: 800
    },
    height: {
      type: Number,
      default: 500
    }
  },
  data () {
    return {
      visible: true
    }
  },
  computed: {
    viewBox () {
      const {width, height} = this
      const padding = 0.1 * width
      return [
        -padding,
        -padding,
        width + 2 * padding,
        height + 2 * padding
      ].join(' ')
    },
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

<style lang="scss">
.bar-chart {
  display: block;
  height: 500px;
  width: 100%;

  .bar {
    fill: #333;
  }
}
</style>
