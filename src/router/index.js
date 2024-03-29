import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    children:[
      {
        path: '',
        name: 'hime',
        component: () => import('../views/hime/index.vue'),
      },
     {
      path: 'xtsy',
      name: 'xtsy',
      component: () => import('../views/xtsy/index.vue'),
     },
     {
      path: 'jbxx',
      name: 'jbxx',
      component: () => import('../views/jbxx/index.vue'),
     },
     {
      path: 'kcgl',
      name: 'kcgl',
      component: () => import('../views/kcgl/htomel.vue'),
     },
     {
      path: '/cart',
      name:'cart',
      component: () => import( '../views/kcgl/cart.vue')
     }
    ]

  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
