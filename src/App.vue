<template>
  <div id="app">
    <!-- <bar-chart v-bind="$data"></bar-chart> -->
    <angry-bird></angry-bird>
  </div>
</template>

<script>
import BarChart from './components/BarChart.vue'
import AngryBird from './components/AngryBird.vue'

export default {
  name: 'app',
  components: {
    BarChart,
    AngryBird
  },
  data () {
    return {
      data: [10, 20, 50, 40],
      width: 800,
      height: 500
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // margin-top: 120vh;
  // margin-bottom: 120vh;
}
</style>
