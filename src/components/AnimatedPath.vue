<template>
  <g>
    <path :d="d" :stroke-dasharray="length" :stroke-dashoffset="offset"></path>
  </g>
</template>

<script>
import TweenLite, {Linear} from 'gsap/TweenLite'

const SPEED = 1500

export default {
  props: ['d'],
  data () {
    return {
      length: 0,
      offset: 0
    }
  },
  computed: {
    point () {
      return getPointAtLength(this.d, this.length - this.offset)
    }
  },
  methods: {
    animate () {
      const totalLength = this.length
      return TweenLite.fromTo(this.$data, totalLength / SPEED, {
        offset: totalLength
      }, {
        offset: 0,
        ease: Linear.easeNone
      })
    }
  },
  watch: {
    d: {
      handler () {
        const totalLength = getTotalLength(this.d)
        this.length = totalLength
        this.offset = totalLength
      },
      immediate: true
    },
    point (pt) {
      this.$emit('animate', pt)
    }
  }
}

const $path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
function getTotalLength (d) {
  $path.setAttribute('d', d)
  return $path.getTotalLength()
}
function getPointAtLength (d, length) {
  $path.setAttribute('d', d)
  return $path.getPointAtLength(length)
}
</script>
