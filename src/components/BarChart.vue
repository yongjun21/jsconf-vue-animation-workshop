<template>
  <svg class="bar-chart" :viewBox="viewBox" preserveAspectRatio="xMidYMid meet" v-observe-visibility="onAppear">
    <transition-group tag="g" class="plot" appear @enter="onEnter">
      <animated-rect v-for="(v, i) in data" :key="i"
        ref="bars"
        class="bar"
        v-bind="getGeom(v, i)">
      </animated-rect>
    </transition-group>
  </svg>
</template>

<script>
import { scaleBand, scaleLinear } from 'd3'
import _range from 'lodash-es/range'
import TimelineLite from 'gsap/TimelineLite'
import { ObserveVisibility } from 'vue-observe-visibility'

import AnimatedRect from './AnimatedRect'

export default {
  components: { AnimatedRect },
  directives: { ObserveVisibility },
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
      const { width, height } = this
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
    },
    enterGeom () {
      return {
        y: this.yScale(0),
        height: 0
      }
    }
  },
  methods: {
    getGeom (v, i) {
      const { xScale, yScale } = this
      const y0 = yScale(0)
      const y1 = yScale(v)
      return {
        x: xScale(i),
        y: Math.min(y0, y1),
        width: xScale.bandwidth(),
        height: Math.abs(y1 - y0)
      }
    },
    animate () {
      this.$nextTick(() => {
        const tweens = this.$refs.bars.map($bar => $bar.animate())
        return new TimelineLite({
          tweens,
          stagger: 0.5
        })
      })
    },
    onEnter (el, done) {
      el.vm.setAnimated(this.enterGeom)
      done()
    },
    onAppear (isVisible) {
      if (!this.visible && isVisible) {
        this.$refs.bars.forEach(vm => {
          vm.setAnimated(this.enterGeom)
        })
        this.animate()
      }
      this.visible = isVisible
    }
  },
  watch: {
    data: {
      handler: 'animate',
      immediate: true
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
