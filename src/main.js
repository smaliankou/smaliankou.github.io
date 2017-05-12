var Vue = require('vue')
import VueRouter from 'vue-router'

var Brands = require('./views/Brands.vue')

Vue.use(VueRouter)

var router = new VueRouter({
  routes: [
    { path: '/brands', component: Brands },
  ]
})

new Vue({
  el: '#app',
  router: router
})