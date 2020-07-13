import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Welcome from '../views/welcome/Welcome.vue'

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
]

const router = new VueRouter({
  routes
})

export default router
