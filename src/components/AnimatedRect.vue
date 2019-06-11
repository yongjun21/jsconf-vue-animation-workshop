<template>
  <rect v-bind="animated"></rect>
</template>

<script>
import TweenLite from 'gsap/TweenLite'

export default {
  props: ['x', 'y', 'width', 'height'],
  data () {
    return {
      animated: {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height
      }
    }
  },
  methods: {
    animate () {
      return TweenLite.to(this.animated, 0.66667, this.$props)
    },
    setAnimated (props) {
      TweenLite.set(this.animated, props)
    }
  },
  created () {
    // this.$watch(vm => [vm.x, vm.y, vm.width, vm.height], () => this.animate())
  },
  mounted () {
    this.$el.vm = this
  }
}
</script>
