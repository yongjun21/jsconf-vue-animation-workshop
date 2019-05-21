import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

delete window.IntersectionObserver
require('intersection-observer')

window.vm = new Vue(App).$mount('#app')
