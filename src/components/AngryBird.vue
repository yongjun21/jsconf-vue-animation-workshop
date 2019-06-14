<template>
  <div class="angry-bird">
    <svg :viewBox="viewBox" preserveAspectRatio="xMidYMid meet">
      <g :transform="null && transform">
        <gridlines :xRange="[-width, 2 * width]" :yRange="[-height, 2 * height]" :interval="100"></gridlines>
        <line class="guide" v-bind="lineGeom" v-show="showGuide"></line>
        <!-- FOCUS HERE -->
        <animated-path v-bind="pathGeom" ref="path" @animate="position = $event"></animated-path>
        <circle :cx="position.x" :cy="position.y" r="20"></circle>
        <!-- FOCUS HERE -->
      </g>
    </svg>

    <label>Velocity <input type="range" v-model="velocity" min="60" max="120" step="5"> {{velocity}}m/s</label>
    <label>Angle <input type="range" v-model="angle" min="10" max="80"> {{angle}}&deg;</label>
    <input type="submit" value="Launch" @click="launch">
  </div>
</template>

<script>
import {path} from 'd3-path'

import Gridlines from './Gridlines'
import AnimatedPath from './AnimatedPath'

const g = 9.8

export default {
  components: {AnimatedPath, Gridlines},
  props: {
    data: Array,
    width: {
      type: Number,
      default: 800
    },
    height: {
      type: Number,
      default: 800
    }
  },
  data () {
    return {
      position: {
        x: 0,
        y: this.height
      },
      angle: 60,
      velocity: 80,
      showGuide: true
    }
  },
  computed: {
    // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox
    viewBox () {
      const {width, height, position} = this
      const padding = 0.05 * width
      return [
        position.x - width / 2 - padding,
        position.y - height / 2 - padding,
        // -padding,
        // -padding,
        width + 2 * padding,
        height + 2 * padding
      ].join(' ')
    },
    // https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform
    transform () {
      const {width, height, position} = this
      const dx = width / 2 - position.x
      const dy = height / 2 - position.y
      return `translate(${dx} ${dy})`
    },
    /**
     * IGNORE this part, just some math
     */
    a () {
      return this.angle * Math.PI / 180
    },
    vx () {
      return Math.cos(this.a) * this.velocity
    },
    vy () {
      return Math.sin(this.a) * this.velocity
    },
    t () {
      return this.vy / g
    },
    cpx () {
      return this.vx * this.t
    },
    cpy () {
      return this.vy / this.vx * this.cpx
    },
    lineGeom () {
      const {height, vx, vy} = this
      return {
        x1: 0,
        y1: height,
        x2: vx * 3,
        y2: height - vy * 3
      }
    },
    pathGeom () {
      const {height, cpx, cpy} = this
      const p = path()
      p.moveTo(0, height)
      p.quadraticCurveTo(cpx, height - cpy, 2 * cpx, height)
      return {
        d: p.toString()
      }
    }
    /* End */
  },
  methods: {
    launch () {
      this.showGuide = false
      this.$refs.path.animate()
    }
  },
  watch: {
    velocity () {
      this.showGuide = true
    },
    angle () {
      this.showGuide = true
    }
  }
}
</script>

<style lang="scss">
.angry-bird {
  svg {
    display: block;
    max-width: 600px;
    margin: 0 auto 20px;
  }

  circle {
    fill: white;
    stroke: black;
    stroke-width: 3;
  }

  .guide {
    stroke: grey;
    stroke-width: 3;
    stroke-dasharray: 20;
  }

  path {
    fill: none;
    stroke: black;
    stroke-width: 3;
  }

  .gridlines line {
    stroke: lightgrey;
  }

  label {
    display: block;
  }

  input[type="range"] {
    vertical-align: middle;
    font-size: 1em;
    width: 200px;
  }
}
</style>
