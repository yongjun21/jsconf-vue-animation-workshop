<template>
  <div id="app">
    <bar-chart v-bind="$data"></bar-chart>
  </div>
</template>

<script>
import BarChart from './components/BarChart.vue'

export default {
  name: 'app',
  components: {
    BarChart
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
  margin-top: 60px;
  margin-bottom: 1200px;
}
</style>
