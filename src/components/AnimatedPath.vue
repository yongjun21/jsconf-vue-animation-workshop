<template>
  <path :d="d" :stroke-dasharray="length" :stroke-dashoffset="offset"></path>
</template>

<script>
import TweenLite, {Linear} from 'gsap/TweenLite'

const SPEED = 1000

export default {
  props: ['d'],
  data () {
    return {
      length: null,
      offset: null
    }
  },
  methods: {
    updateLength () {
      // https://developer.mozilla.org/en-US/docs/Web/API/SVGPathElement/getTotalLength
      const totalLength = this.$el.getTotalLength()
      this.length = totalLength
      this.offset = totalLength
    },
    animate () {
      const totalLength = this.length
      // https://greensock.com/docs/TweenLite/static.fromTo()
      return TweenLite.fromTo(this.$data, totalLength / SPEED, {
        offset: totalLength
      }, {
        offset: 0,
        ease: Linear.easeNone
      })
    }
  },
  mounted () {
    this.updateLength()
    this.$watch('d', this.updateLength)
  },
  watch: {
    offset () {
      // https://developer.mozilla.org/en-US/docs/Web/API/SVGPathElement/getPointAtLength
      const point = this.$el.getPointAtLength(this.length - this.offset)
      this.$emit('animate', point)
    }
  }
}
</script>
